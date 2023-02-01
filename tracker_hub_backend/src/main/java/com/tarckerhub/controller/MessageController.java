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

import com.tarckerhub.model.Messages;
import com.tarckerhub.resposit.MessageRepository;
import com.tarckerhub.service.MessageService;
import com.tarckerhub.service.StorageService;
import com.tarckerhub.util.SendMailService;

@RestController
@RequestMapping("/message")
public class MessageController {

	@Autowired
	private SendMailService sender;

	@Autowired
	private MongoTemplate mongoTemplate;

	@Autowired
	private MessageService messageService;

	@Autowired
	private StorageService service;

	@Autowired
	private MessageRepository messageRepository;

	@PostMapping(value = "/", consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<?> addNewAssigment(@RequestParam("message") String message,
			@RequestParam("files") MultipartFile[] files) {
		String assignmentId = RandomStringUtils.randomAlphanumeric(10);
		Messages messages = messageService.gson(message);
		messages.setMessageId(assignmentId);
		messages.setMessageDate(new Date());
		List<String> list = new ArrayList<>();
		if (files.length > 0) {
			for (int i = 0; i < files.length; i++) {
				String uploadFile = service.uploadFile(files[i]);
				String fileURL = ("https://trackerhuub.s3.amazonaws.com/" + uploadFile);
				list.add(fileURL);
			}
			messages.setAttachments(list);
		}
		Messages savedMessages = messageRepository.save(messages);

		if (savedMessages != null) {
			return ResponseEntity.status(HttpStatus.CREATED).body("Commented Well !");

		}

		if (savedMessages == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went Wrong");
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body(messages);
	}

	@GetMapping("/{assignmentId}")
	public ResponseEntity<?> getAllMessages(@PathVariable("assignmentId") String assignmentId) {
		List<Messages> list = messageRepository.findByAssignmentId(assignmentId);
		if (!list.isEmpty()) {
			return ResponseEntity.status(HttpStatus.OK).body(list);
		}
		
		if (list.isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went Wrong");
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body(list);
	}

}
