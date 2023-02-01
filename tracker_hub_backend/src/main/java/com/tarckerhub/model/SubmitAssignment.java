package com.tarckerhub.model;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubmitAssignment {

	private String id;
	private Date submittingDate;
	private String submitId;
	private String assignmentId;
	private String description;
	private String messagedBy;
	private List<String> attachments;

}
