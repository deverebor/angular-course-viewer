package dev.erebor.crudspring.controller;

import dev.erebor.crudspring.model.Course;
import dev.erebor.crudspring.repository.CourseRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@AllArgsConstructor
public class CourseController {
    
    private final CourseRepository courseRepository;
    @GetMapping
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {
        return courseRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Course addCourse(@RequestBody Course course) {
        return courseRepository.save(course);
    }
}
