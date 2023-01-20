package com.tarckerhub.controller;

import java.util.List;

import javax.websocket.server.PathParam;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Field;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.Response;
import com.tarckerhub.model.Course;
import com.tarckerhub.model.FollowRequest;
import com.tarckerhub.model.RequestAcceptance;
import com.tarckerhub.resposit.CourseRepository;
import com.tarckerhub.resposit.CourseRequestRepository;
import com.tarckerhub.resposit.RequestAcceptanceRepository;
import com.tarckerhub.service.CourseService;
import com.tarckerhub.service.StorageService;

@RestController
@RequestMapping("/course")
@CrossOrigin(origins = "http://localhost:9092", maxAge = 36000)
public class CourseController {

	@Autowired
	private CourseRepository courseRepository;

	@Autowired
	private StorageService service;

	@Autowired
	private CourseService courseService;

	@Autowired
	private MongoTemplate mongoTemplate;

	@Autowired
	private CourseRequestRepository courseRequestRepository;

	@Autowired
	private RequestAcceptanceRepository requestAcceptanceRepository;

	@PostMapping(value = "/", consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<?> saveCourse(@RequestParam("course") String course,
			@RequestParam("file") MultipartFile file) {
		String serialID = RandomStringUtils.randomNumeric(8);
		String uploadFile = service.uploadFile(file);
		Course finalCourse = courseService.gson(course);
		finalCourse.setCourseId(serialID);
		finalCourse.setImageURL("https://trackerhub.s3.amazonaws.com/" + uploadFile);
		Course savedCourse = courseRepository.save(finalCourse);

		if (savedCourse != null) {
			return ResponseEntity.status(HttpStatus.CREATED).body(finalCourse);
		}

		if (savedCourse == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went Wrong");
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evaluating Data....");
	}

	@GetMapping("/")
	public ResponseEntity<?> listAllCourse() {
		List<Course> allCourses = courseRepository.findAll();

		if (allCourses.isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No Courses Found.");
		}

		if (allCourses != null) {
			return ResponseEntity.status(HttpStatus.OK).body(allCourses);
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evaluating Data....");
	}

	@GetMapping("/{serialId}")
	public ResponseEntity<?> listAllCourseBySerialId(@PathVariable("serialId") String serialId) {
		Course course = courseRepository.findbyCourseId(serialId);

		if (course == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No Courses Found.");
		}

		if (course != null) {
			return ResponseEntity.status(HttpStatus.OK).body(course);
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evaluating Data....");
	}

	@DeleteMapping("/{serialId}")
	public ResponseEntity<?> deleteCourseBySerialId(@PathVariable("serialId") String serialId) {
		courseRepository.deleteByCourseId(serialId);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Deleted Successfully");
	}

	@GetMapping("/CourseCollections")
	public ResponseEntity<?> getAllCouseId() {
		Query query = new Query();
		Field include = query.fields().include("courseId").include("courseName").include("professorName")
				.include("imageURL");
		List<Course> list = mongoTemplate.find(query, Course.class);

		if (list.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Courses are Assigned.");
		}

		if (list != null) {
			return ResponseEntity.ok(list);
		}
		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evalauting Data.");

	}
	
	@GetMapping("/follow/{courseId}/{email}")
	public ResponseEntity<?> followProcess(@PathVariable("courseId" ) String courseId, @PathVariable("email") String email){
		FollowRequest details = courseRequestRepository.getExistedDetails(courseId,
				email);
		
		if (details == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("You are Not yet Requested to Follow.");
		}

		if (details != null) {
			return ResponseEntity.status(HttpStatus.OK).body(details);
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evaluating Data.");
	}

	@PostMapping("/followRequest")
	public ResponseEntity<?> requestToFollow(@RequestBody FollowRequest followRequest) {
		String requestId = RandomStringUtils.randomNumeric(6);
		followRequest.setRequestId(requestId);
		FollowRequest details = courseRequestRepository.getExistedDetails(followRequest.getCourseId(),
				followRequest.getUseremail());
		if (details == null) {
			courseRequestRepository.save(followRequest);
			return ResponseEntity.status(HttpStatus.CREATED)
					.body("Request sent...!\nyou will get the access with in 24hrs.");

		}

		if (details != null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Already Request Sent to Follow the Course.");
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evaluating Data.");
	}

	@GetMapping("/followRequest")
	public ResponseEntity<?> GetRequestToFollow() {
		List<FollowRequest> list = courseRequestRepository.findAll();

		if (list == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Recent Request.");
		}

		if (list != null) {
			return ResponseEntity.status(HttpStatus.OK).body(list);
		}

		return ResponseEntity.ok(null);
	}

	@PostMapping("/sendActivatekey")
	public ResponseEntity<?> SendActivateKey(@PathVariable("requestId") String requestId,
			@RequestParam("activatedKey") String activatedKey, @RequestParam("useremail") String useremail) {
		FollowRequest details = courseRequestRepository.getExistedDetails(requestId, useremail);
		RequestAcceptance acceptance = requestAcceptanceRepository.getExistedDetails(requestId);

		if (details != null && acceptance != null) {
			if (activatedKey == acceptance.getGeneratedKey()) {
				details.setActivatedKey(activatedKey);
				details.setAuthenctication("Granted");
				courseRequestRepository.save(details);
				return ResponseEntity.status(HttpStatus.OK).body("Congratulations !");
			}
			if (activatedKey != acceptance.getGeneratedKey()) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
						.body("Invalid !\nyou have enetered wrong key. Please try again");
			}
		}

		if (details == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("you have not requested to follow.");
		}

		if (acceptance == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("you did not access to follow.");
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evaluating Data.");

	}
}
