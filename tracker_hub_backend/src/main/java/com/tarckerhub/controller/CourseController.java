package com.tarckerhub.controller;

import java.util.List;

import javax.websocket.server.PathParam;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.tarckerhub.model.Course;
import com.tarckerhub.resposit.CourseRepository;
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
	
	@PostMapping(value = "/", consumes = { MediaType.APPLICATION_JSON_VALUE,MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<?> saveCourse(@RequestParam("course") String course, @RequestParam("file") MultipartFile file ){
		String serialID = RandomStringUtils.randomNumeric(8);
		String uploadFile = service.uploadFile(file);
		Course finalCourse = courseService.gson(course);
		finalCourse.setCourseId(serialID);
		finalCourse.setImageURL("https://trackerhub.s3.amazonaws.com/"+uploadFile);
		Course savedCourse  = courseRepository.save(finalCourse);
		
		if(savedCourse != null) {
			return ResponseEntity.status(HttpStatus.CREATED).body(finalCourse);
		}
		
		if(savedCourse == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went Wrong");
		}
		
		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evaluating Data....");
	}
	
	@GetMapping("/")
	public ResponseEntity<?> listAllCourse(){
		List<Course> allCourses = courseRepository.findAll();
		
		if(allCourses.isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No Courses Found.");
		}
		
		if(allCourses != null) {
			return ResponseEntity.status(HttpStatus.OK).body( allCourses);
		}
		
		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evaluating Data....");
	}
	
	@GetMapping("/{serialId}")
	public ResponseEntity<?> listAllCourseBySerialId(@PathVariable("serialId") String serialId){
		Course course = courseRepository.findbyCourseId(serialId);
		
		if(course == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No Courses Found.");
		}
		
		if(course != null) {
			return ResponseEntity.status(HttpStatus.OK).body( course);
		}
		
		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evaluating Data....");
	}
	
	@DeleteMapping("/{serialId}")
	public ResponseEntity<?> deleteCourseBySerialId(@PathVariable("serialId") String serialId){
		courseRepository.deleteByCourseId(serialId);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Deleted Successfully");
	}

}
