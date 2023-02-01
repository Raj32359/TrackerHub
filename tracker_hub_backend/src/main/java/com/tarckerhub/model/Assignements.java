package com.tarckerhub.model;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Assignements {
	private String courseId;
	private String assigmentId;
	private String description;
	private String daysCount;
	private Date startDate;
	private Date endDate;
	private String profEmail;
	private List<String> attachements;
}
