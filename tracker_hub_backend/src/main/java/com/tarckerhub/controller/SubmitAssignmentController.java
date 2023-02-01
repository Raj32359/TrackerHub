package com.tarckerhub.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.tarckerhub.model.Assignements;
import com.tarckerhub.model.Messages;
import com.tarckerhub.model.SubmitAssignment;
import com.tarckerhub.resposit.AssignmentRepository;
import com.tarckerhub.resposit.SubmitRepository;
import com.tarckerhub.service.MessageService;
import com.tarckerhub.service.StorageService;
import com.tarckerhub.service.SubmitAssignmentService;
import com.tarckerhub.util.SendMailService;

@RestController
@RequestMapping("/sumbitAssignment")
public class SubmitAssignmentController {

	@Autowired
	private SendMailService sender;

	@Autowired
	private MongoTemplate mongoTemplate;

	@Autowired
	private SubmitAssignmentService submitAssignmentService;

	@Autowired
	private StorageService service;

	@Autowired
	private SubmitRepository submitRepository;

	@Autowired
	private AssignmentRepository assignmentRepository;

	@PostMapping(value = "/", consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<?> addNewAssigment(@RequestParam("assignment") String assignment,
			@RequestParam("files") MultipartFile[] files) {
		String submitId = RandomStringUtils.randomAlphanumeric(10);
		SubmitAssignment submitAssignment = submitAssignmentService.gson(assignment);
		submitAssignment.setSubmitId(submitId);
		submitAssignment.setSubmittingDate(new Date());
		List<String> list = new ArrayList<>();
		if (files.length > 0) {
			for (int i = 0; i < files.length; i++) {
				String uploadFile = service.uploadFile(files[i]);
				String fileURL = ("https://trackerhuub.s3.amazonaws.com/" + uploadFile);
				list.add(fileURL);
			}
			submitAssignment.setAttachments(list);
		}

		SubmitAssignment messagedBy = submitRepository.findByAssignmentIdAndMessagedBy(submitAssignment.getAssignmentId(), submitAssignment.getMessagedBy());
		
		if (messagedBy == null) {
			Assignements assignements = assignmentRepository.findByAssigmentId(submitAssignment.getAssignmentId());
			SubmitAssignment savedSubmittedAssignment = null;
			if (submitAssignment.getSubmittingDate().before(assignements.getEndDate())) {
				savedSubmittedAssignment = submitRepository.save(submitAssignment);
			}
			if (savedSubmittedAssignment != null) {
				return ResponseEntity.status(HttpStatus.CREATED).body("Assignment Submitted Succesfully.");

			}
			if (savedSubmittedAssignment == null) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went Wrong");
			} 
		}
		
		if (messagedBy != null) { 
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You already Submitted the Assingment");
		}
		
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(submitAssignment);
	}

	@GetMapping("/{assignmentId}")
	public ResponseEntity<?> getAllMessages(@PathVariable("assignmentId") String assignmentId) {
		List<SubmitAssignment> list = submitRepository.findByAssignmentId(assignmentId);
		System.out.println("fetched list  : "+list);
		if (!list.isEmpty()) {
			return ResponseEntity.status(HttpStatus.OK).body(list);
		}
		
		if (list.isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went Wrong");
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body(list);
	}
	
	@GetMapping("/{assignmentId}/{email}")
	public ResponseEntity<?> getSubmittedAssignment(@PathVariable("assignmentId") String assignmentId, @PathVariable("email") String email) {
		SubmitAssignment submitAssignment = submitRepository.findByAssignmentIdAndMessagedBy(assignmentId, email);
		if (submitAssignment != null) {
			return ResponseEntity.status(HttpStatus.OK).body(submitAssignment);
		}
		
		if (submitAssignment == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ypu are not submitted assignment");
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body(submitAssignment);
	}
	
	@GetMapping("/student/{email}")
	public ResponseEntity<?> getAllSubmittedAssignment( @PathVariable("email") String email) {
		List<SubmitAssignment> list = submitRepository.findSubmitAssignmentsByAssignmentIdAndMessagedBy(email);
		if (!list.isEmpty()) {
			return ResponseEntity.status(HttpStatus.OK).body(list);
		}
		
		if (list.isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went Wrong");
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body(list);
	}

}
