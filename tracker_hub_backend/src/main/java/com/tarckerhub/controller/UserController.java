package com.tarckerhub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tarckerhub.model.Login;
import com.tarckerhub.model.User;
import com.tarckerhub.resposit.UserRepository;
import com.tarckerhub.util.HashingPasswordGenerator;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserRepository userRepository;

	@PostMapping("/signup")
	public ResponseEntity<?> saveUser(@RequestBody User user) {
		String salt = HashingPasswordGenerator.getSlat(30);
		user.setSalt(salt);
		String mySecuredPassword = HashingPasswordGenerator.generatingSecurePassword(user.getPassword(), salt);
		user.setPassword(mySecuredPassword);
		userRepository.save(user);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	@PostMapping("/login")
	public ResponseEntity<?> userLogin(@RequestBody Login login) {
		User user = userRepository.findUserByEmail(login.getEmail());
		if (user == (null)) {
			return ResponseEntity.ok("User Not Found " + login.getEmail().toString());
		}
		boolean mySecuredPassword = HashingPasswordGenerator.verifyUserPassword(login.getPassword(), user.getPassword(),
				user.getSalt());
		if (mySecuredPassword) {
			return ResponseEntity.ok(user);
		} else {
			return ResponseEntity.ok("EMail / Password are Invalid");
		}
	}

}
