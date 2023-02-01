package com.tarckerhub.resposit;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.tarckerhub.model.Assignements;

public interface AssignmentRepository extends MongoRepository<Assignements, String> {

	@Query("{profEmail : ?0}")
	List<Assignements> findAllAssignmentsByProfessor(String email);
	
	@Query("{courseId : ?0}")
	public Assignements  findByCourseId(String courseId);
	
	@Query("{assigmentId : ?0}")
	public Assignements  findByAssigmentId(String assigmentId);

}
