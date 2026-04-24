package com.rehaman.backend.service;

import com.rehaman.backend.model.Student;
import com.rehaman.backend.repository.StudentRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class StudentService {
    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Map<String, Object> getStudents(Integer page, Integer limit, String sortBy, String sortOrder) {
        int safePage = page == null || page < 1 ? 1 : page;
        int safeLimit = limit == null || limit < 1 ? 5 : limit;
        String safeSortBy = (sortBy == null || sortBy.isBlank()) ? "name" : sortBy;
        String safeSortOrder = (sortOrder == null || sortOrder.isBlank()) ? "asc" : sortOrder;

        Sort sort = Sort.by("asc".equalsIgnoreCase(safeSortOrder) ? Sort.Direction.ASC : Sort.Direction.DESC, safeSortBy);
        PageRequest pageRequest = PageRequest.of(safePage - 1, safeLimit, sort);

        var studentsPage = studentRepository.findAll(pageRequest);
        long totalStudents = studentRepository.count();

        Map<String, Object> response = new HashMap<>();
        response.put("students", studentsPage.getContent());
        response.put("totalPages", (int) Math.ceil((double) totalStudents / safeLimit));
        response.put("currentPage", safePage);
        return response;
    }

    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }

    public Student updateStudent(String id, Student student) {
        Optional<Student> existing = studentRepository.findById(id);
        if (existing.isEmpty()) {
            return null;
        }
        Student toUpdate = existing.get();
        toUpdate.setName(student.getName());
        toUpdate.setAge(student.getAge());
        toUpdate.setCourse(student.getCourse());
        return studentRepository.save(toUpdate);
    }

    public Student deleteStudent(String id) {
        Optional<Student> existing = studentRepository.findById(id);
        if (existing.isEmpty()) {
            return null;
        }
        Student student = existing.get();
        studentRepository.deleteById(id);
        return student;
    }
}
