package com.tarckerhub.resposit;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.tarckerhub.model.Task;

public interface TaskRepository extends MongoRepository<Task, String> {

	@Query("{assigmentId: ?0, useremail: ?1}")
	List<Task> findbyAssigmentId(String assignmentId, String email);

}
