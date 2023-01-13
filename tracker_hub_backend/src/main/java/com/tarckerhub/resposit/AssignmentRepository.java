package com.tarckerhub.resposit;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tarckerhub.model.Assignements;

public interface AssignmentRepository extends MongoRepository<Assignements, String> {

}
