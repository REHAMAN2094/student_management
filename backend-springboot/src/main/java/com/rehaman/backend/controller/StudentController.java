package com.rehaman.backend.controller;

import com.rehaman.backend.model.Student;
import com.rehaman.backend.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/students")
public class StudentController {
    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public Map<String, Object> getStudents(@RequestParam(required = false) Integer page,
                                           @RequestParam(required = false) Integer limit,
                                           @RequestParam(required = false) String sortBy,
                                           @RequestParam(required = false) String sortOrder) {
        return studentService.getStudents(page, limit, sortBy, sortOrder);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Student createStudent(@Valid @RequestBody Student student) {
        return studentService.createStudent(student);
    }

    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable String id, @Valid @RequestBody Student student) {
        return studentService.updateStudent(id, student);
    }

    @DeleteMapping("/{id}")
    public Student deleteStudent(@PathVariable String id) {
        return studentService.deleteStudent(id);
    }
}
