package com.tarckerhub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tarckerhub.model.Task;
import com.tarckerhub.resposit.TaskRepository;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/task")
@CrossOrigin(origins = "http://localhost:9092", maxAge = 36000)
@Slf4j
public class TaskController {

	@Autowired
	private TaskRepository taskRepository;

	@PostMapping("/")
	public ResponseEntity<?> addTask(@RequestBody Task task) {
		taskRepository.save(task);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	@GetMapping("/")
	public ResponseEntity<?> getTask(@PathVariable("assignmentId") String assignmentId,
			@PathVariable("email") String email) {
		List<Task> list = taskRepository.findbyAssigmentId(assignmentId, email);
		return ResponseEntity.status(HttpStatus.OK).body(list);
	}

}
