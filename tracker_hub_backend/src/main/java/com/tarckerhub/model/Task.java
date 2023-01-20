package com.tarckerhub.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Task {

	private String assigmentId;
	private String useremail;
	private String taskId;
	private List<String> attachments;
	private String description;
}
