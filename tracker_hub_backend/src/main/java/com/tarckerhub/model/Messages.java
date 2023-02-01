package com.tarckerhub.model;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Messages {

	private String id;
	private String messageId;
	private String assignmentId;
	private String description;
	private String messagedBy;
	private Date messageDate;
	private List<String> attachments;
}
