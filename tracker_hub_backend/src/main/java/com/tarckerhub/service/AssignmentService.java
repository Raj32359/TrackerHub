package com.tarckerhub.service;

import java.io.IOException;
import java.util.Date;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tarckerhub.model.Assignements;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AssignmentService {
	public Assignements gson(String assignements) {
		Assignements JSONAssignements = new Assignements();
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			JSONAssignements = objectMapper.readValue(assignements, Assignements.class);
		} catch (IOException e) {
			log.error("Assignements Service Error "+new Date()+". \n"+e.toString());
		}
		return JSONAssignements;
	}
}
