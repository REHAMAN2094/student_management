package com.rehaman.backend.repository;

import com.rehaman.backend.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StudentRepository extends MongoRepository<Student, String> {
}
