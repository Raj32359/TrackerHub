package com.tarckerhub.controller;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Field;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tarckerhub.model.Assignements;
import com.tarckerhub.model.Course;
import com.tarckerhub.resposit.AssignmentRepository;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/assignment")
@CrossOrigin(origins = "http://localhost:9092", maxAge = 36000)
@Slf4j
public class AssigmentController {
	
	@Autowired
	private AssignmentRepository assignmentRepository;
	
	@PostMapping("/")
	public ResponseEntity<?> addNewAssigment(@RequestBody Assignements assignement) {
		String assignmentId = RandomStringUtils.randomAlphanumeric(10);
		assignement.setAssigmentId(assignmentId);
		Date date = new Date();
		assignement.setStartDate(date);
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		int parseUnsignedInt = Integer.parseUnsignedInt(assignement.getDaysCount().toString());
		calendar.add(Calendar.DATE, parseUnsignedInt);
		Date newDate = calendar.getTime();
		assignement.setEndDate(newDate);
		Assignements assignements = assignmentRepository.save(assignement);
		
		if(assignements != null) {
			return ResponseEntity.status(HttpStatus.CREATED).body(assignement);
		}
		
		if(assignements == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went Wrong");
		}
		
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(assignement);
	}
	
	@GetMapping("/")
	public ResponseEntity<?> getAllAssignments(){
		// courseId && email in follow request, ==> Granted
		List<Assignements> list = assignmentRepository.findAll();
		if(list.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No Assignments found");
		}
		
		if(list.isEmpty()) {
			return ResponseEntity.status(HttpStatus.OK).body(list);
		}
		
		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evaluating Data.....");
		
	}
	

	
}
