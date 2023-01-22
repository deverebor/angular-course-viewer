package dev.erebor.crudspring.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.hibernate.validator.constraints.Length;

@Data
@Entity
@SQLDelete(sql = "UPDATE Course SET course_status = 'Inactive' WHERE id = ?")
@Where(clause = "course_status = 'Active'")
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
            message = "Course name must be between 5 and 100 characters"
    )
    @Column(name = "course_name", length = 100, nullable = false)
    private String name;

    @NotBlank
    @NotNull(message = "Course category is required")
    @Length(
            max = 100,
            message = "Course category must be between 5 and 100 characters"
    )
    @Pattern(
            regexp = "Backend|Frontend|Fullstack",
            message = "Course category must be a valid programming language"
    )
    @Column(name = "course_category", length = 100, nullable = false)
    private String category;

    @NotBlank
    @NotNull(message = "Course status is required")
    @Length(
            max = 20,
            message = "Course status must be between 5 and 100 characters"
    )
    @Pattern(
            regexp = "Active|Inactive",
            message = "Course status must be a valid programming language"
    )
    @Column(name = "course_status", length = 20, nullable = false)
    private String status = "Active";
}
