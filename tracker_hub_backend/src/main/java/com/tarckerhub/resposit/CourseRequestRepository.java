package com.tarckerhub.resposit;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.tarckerhub.model.FollowRequest;

public interface CourseRequestRepository extends MongoRepository<FollowRequest, String> {
	
	@Query("{$and:[{courseId:?0}, {useremail:?1}]}")
	public FollowRequest getExistedDetails(String courseId, String userEmail);
	

}
