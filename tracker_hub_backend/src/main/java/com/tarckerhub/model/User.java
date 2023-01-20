package com.tarckerhub.model;

import java.util.List;

import javax.validation.constraints.NotNull;

import org.bson.types.Binary;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

	private String username;

	@Indexed(unique = true)
	@NotNull(message = "Please Enter Email")
	private String email;
	private String salt;
	private String password;
	private String role;
	private Binary image;
	
	@DBRef
	private List<Course> courses;
}
