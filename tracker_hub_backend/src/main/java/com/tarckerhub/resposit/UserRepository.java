package com.tarckerhub.resposit;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.tarckerhub.model.User;

public interface UserRepository extends MongoRepository<User, String> {

	@Query("{email:?0}")
	User findUserByEmail(String email);

}
