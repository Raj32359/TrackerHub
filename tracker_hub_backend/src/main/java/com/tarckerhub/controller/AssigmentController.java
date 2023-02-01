package com.tarckerhub.controller;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.tarckerhub.model.Assignements;
import com.tarckerhub.model.FollowRequest;
import com.tarckerhub.model.MailInfo;
import com.tarckerhub.model.User;
import com.tarckerhub.resposit.AssignmentRepository;
import com.tarckerhub.resposit.CourseRequestRepository;
import com.tarckerhub.resposit.UserRepository;
import com.tarckerhub.service.AssignmentService;
import com.tarckerhub.service.StorageService;
import com.tarckerhub.util.SendMailService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/assignment")
@CrossOrigin(origins = "http://localhost:9092", maxAge = 36000)
@Slf4j
public class AssigmentController {

	@Autowired
	private AssignmentRepository assignmentRepository;

	@Autowired
	private AssignmentService assignmentService;

	@Autowired
	private StorageService service;

	@Autowired
	private MongoTemplate mongoTemplate;

	@Autowired
	private CourseRequestRepository courseRequestRepository;
	
	@Autowired
	private UserRepository userRepository;

	SendMailService sender;

	public AssigmentController(SendMailService sender) {
		this.sender = sender;
	}

	@PostMapping(value = "/", consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<?> addNewAssigment(@RequestParam("assignment") String assignment,
			@RequestParam("files") MultipartFile[] files) {
		String assignmentId = RandomStringUtils.randomAlphanumeric(10);
		Date date = new Date();
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		Assignements assignements = assignmentService.gson(assignment);
		int parseUnsignedInt = Integer.parseUnsignedInt(assignements.getDaysCount().toString());
		calendar.add(Calendar.DATE, parseUnsignedInt);
		Date newDate = calendar.getTime();
		assignements.setStartDate(date);
		assignements.setAssigmentId(assignmentId);
		assignements.setEndDate(newDate);
		List<String> list = new ArrayList<>();
		if (files.length > 0) {
			for (int i = 0; i < files.length; i++) {
				String uploadFile = service.uploadFile(files[i]);
				String fileURL = ("https://trackerhuub.s3.amazonaws.com/" + uploadFile);
				list.add(fileURL);
			}
			assignements.setAttachements(list);
		}
		Assignements savedAssignments = assignmentRepository.save(assignements);

		if (savedAssignments != null) {
			List<FollowRequest> followRequestList = courseRequestRepository
					.findUsersByRequestIdAndAuthenctication(assignements.getCourseId(), "Accepted");

			if (followRequestList != null) {
				for (int i = 0; i < followRequestList.size(); i++) {
					MailInfo mail = new MailInfo(followRequestList.get(i).getUseremail(),
							"New Assignement on CourseID :: " + assignements.getCourseId(),
							" Please Check the Assignment.");
					sender.sendMail(mail);
				}
			}
			return ResponseEntity.status(HttpStatus.CREATED).body("Assignment Published Succesfully.");

		}

		if (savedAssignments == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went Wrong");
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body(assignements);
	}

	// Role :: Professor
	@GetMapping("/{email}")
	public ResponseEntity<?> getAllAssignments(@PathVariable("email") String email) {
		// courseId && email in follow request, ==> Granted
		List<Assignements> list = assignmentRepository.findAllAssignmentsByProfessor(email);
		if (list.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Assignments found");
		}

		if (!list.isEmpty()) {
			return ResponseEntity.status(HttpStatus.OK).body(list);
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evaluating Data.....");
	}

	
	//Role Student
	@GetMapping("/student/{email}")
	public ResponseEntity<?> getStudentAssigments(@PathVariable("email") String email) {
		// courseId && email in follow request, ==> Granted
		User user = userRepository.findUserByEmail(email);
		List<Assignements> list = new ArrayList<>();
		if(user.getCourses() !=null) {
			for (int i = 0; i < user.getCourses().size(); i++) {
				Assignements assignements = assignmentRepository.findByCourseId(user.getCourses().get(i));
				list.add(assignements);
			}
		}
		if (list.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Assignments found");
		}

		if (!list.isEmpty()) {
			return ResponseEntity.status(HttpStatus.OK).body(list);
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evaluating Data.....");
	}

}
