package dev.erebor.crudspring.repository;

import dev.erebor.crudspring.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {

}
