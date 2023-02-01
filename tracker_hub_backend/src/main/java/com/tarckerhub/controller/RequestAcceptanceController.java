package com.tarckerhub.controller;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tarckerhub.model.FollowRequest;
import com.tarckerhub.model.MailInfo;
import com.tarckerhub.model.RequestAcceptance;
import com.tarckerhub.resposit.CourseRequestRepository;
import com.tarckerhub.resposit.RequestAcceptanceRepository;
import com.tarckerhub.util.SendMailService;

@RestController
@CrossOrigin(origins = "http://localhost:9092", maxAge = 36000)
public class RequestAcceptanceController {

	@Autowired
	private RequestAcceptanceRepository requestAcceptanceRepository;

	@Autowired
	private CourseRequestRepository courseRequestRepository;

	SendMailService sender;

	public RequestAcceptanceController(SendMailService sender) {
		this.sender = sender;
	}

	@PostMapping("/request/accept/{email}")
	public ResponseEntity<?> allowRequestAccept(@RequestBody RequestAcceptance requestAcceptance,
			@PathVariable("email") String email) {
		String generatedKey = RandomStringUtils.randomAlphanumeric(24);
		requestAcceptance.setGeneratedKey(generatedKey);
		requestAcceptance.setStatus("Accepted");
		RequestAcceptance details = requestAcceptanceRepository.getExistedDetails(requestAcceptance.getRequestId());
		if (details == null) {
			requestAcceptanceRepository.save(requestAcceptance);
			MailInfo mail = new MailInfo(email, "Secret Key", "Secrete key for Course :: " + generatedKey);
			sender.sendMail(mail);
			FollowRequest followRequest = courseRequestRepository.findByRequestId(requestAcceptance.getRequestId());
			followRequest.setAuthentication("Accepted");
			courseRequestRepository.save(followRequest);
			return ResponseEntity.status(HttpStatus.OK).body("Accepted");
		}

		if (details != null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Already Checked Request");
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evaluating Data.");
	}

	@PostMapping("request/reject/{email}")
	public ResponseEntity<?> denyRequestAccept(@RequestBody RequestAcceptance requestAcceptance, @PathVariable("email") String email) {
		String generatedKey = RandomStringUtils.randomAlphanumeric(24);
		requestAcceptance.setGeneratedKey(generatedKey);
		requestAcceptance.setStatus("Rejected");

		RequestAcceptance details = requestAcceptanceRepository.getExistedDetails(requestAcceptance.getRequestId());
		if (details == null) {
			requestAcceptanceRepository.save(requestAcceptance);
			FollowRequest followRequest = courseRequestRepository.findByRequestId(requestAcceptance.getRequestId());
			followRequest.setAuthentication("Rejected");
			courseRequestRepository.save(followRequest);
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Rejected");
		}

		if (details != null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Already Checked Request");
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evaluating Data.");
	}

}
