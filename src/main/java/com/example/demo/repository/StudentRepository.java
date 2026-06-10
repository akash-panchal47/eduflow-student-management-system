package com.example.demo.repository;

import com.example.demo.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

// JpaRepository provides all CRUD methods automatically
public interface StudentRepository extends JpaRepository<Student, Long> {
}
