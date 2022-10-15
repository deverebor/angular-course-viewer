package dev.erebor.crudspring.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Course {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("_id")
    private Long id;

    @Column(name = "course_name", length = 200, nullable = false)
    private String name;
    
    @Column(name = "course_category", length = 100, nullable = false)
    private String category;
}
