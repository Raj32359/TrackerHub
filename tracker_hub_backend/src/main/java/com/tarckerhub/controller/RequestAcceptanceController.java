package com.tarckerhub.controller;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tarckerhub.model.RequestAcceptance;
import com.tarckerhub.resposit.RequestAcceptanceRepository;

@RestController
@CrossOrigin(origins = "http://localhost:9092", maxAge = 36000)
public class RequestAcceptanceController {
	
	@Autowired
	private RequestAcceptanceRepository requestAcceptanceRepository;
	
	@PostMapping("request/accept")
	public ResponseEntity<?> allowRequestAccept(@RequestBody RequestAcceptance requestAcceptance) {
		String generatedKey = RandomStringUtils.randomAlphanumeric(24);
		requestAcceptance.setGeneratedKey(generatedKey);
		requestAcceptance.setStatus("Accepted");
		
		RequestAcceptance details = requestAcceptanceRepository.getExistedDetails(requestAcceptance.getRequestId());
		if (details == null) {
			requestAcceptanceRepository.save(requestAcceptance);
			return ResponseEntity.status(HttpStatus.OK)
					.body("Accepted");
		}

		if (details != null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Already Checked Request");
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evaluating Data.");
	} 
	
	@PostMapping("request/reject")
	public ResponseEntity<?> denyRequestAccept(@RequestBody RequestAcceptance requestAcceptance) {
		String generatedKey = RandomStringUtils.randomAlphanumeric(24);
		requestAcceptance.setGeneratedKey(generatedKey);
		requestAcceptance.setStatus("Rejected");
		
		RequestAcceptance details = requestAcceptanceRepository.getExistedDetails(requestAcceptance.getRequestId());
		if (details == null) {
			requestAcceptanceRepository.save(requestAcceptance);
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE)
					.body("Rejected");
		}

		if (details != null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Already Checked Request");
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evaluating Data.");
	} 

}
