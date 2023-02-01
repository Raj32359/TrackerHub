package com.tarckerhub.resposit;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.tarckerhub.model.SubmitAssignment;

public interface SubmitRepository extends MongoRepository<SubmitAssignment, String> {

	@Query("{'assignmentId':?0}")
	List<SubmitAssignment> findByAssignmentId(String assignmentId);
	
	@Query("{'assignmentId':?0, {'messagedBy':?1}")
	SubmitAssignment findByAssignmentIdAndMessagedBy(String assignmentId, String email);
	
	@Query("{'messagedBy':?0}")
	List<SubmitAssignment> findSubmitAssignmentsByAssignmentIdAndMessagedBy(String email);

}
