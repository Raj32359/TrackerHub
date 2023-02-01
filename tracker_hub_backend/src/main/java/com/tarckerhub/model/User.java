package com.tarckerhub.model;

import java.util.List;

import javax.validation.constraints.NotNull;

import org.bson.types.Binary;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

	private String id;
	private String username;

	@Indexed(unique = true)
	@NotNull(message = "Please Enter Email")
	private String email;
	private String salt;
	private String password;
	private String role;
	private String bioData;
	private Binary image;
	private List<String> courses;
}
