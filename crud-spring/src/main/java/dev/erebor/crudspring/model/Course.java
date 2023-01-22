package dev.erebor.crudspring.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Data
@Entity
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("_id")
    private Long id;

    @NotBlank
    @NotNull(message = "Course name is required")
    @Length(
            min = 5,
            max = 100,
            message = "Course name must be between 3 and 100 characters"
    )
    @Column(name = "course_name", length = 100, nullable = false)
    private String name;

    @NotBlank
    @NotNull(message = "Course category is required")
    @Pattern(
            regexp = "Backend|Frontend|Fullstack",
            message = "Course category must be a valid programming language"
    )
    @Column(name = "course_category", length = 100, nullable = false)
    private String category;
}
