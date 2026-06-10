package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "student")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String rollNo;   // ← NEW
    private String name;
    private String email;
    private String course;
    private String year;     // Year / Semester  e.g. "2nd Year / Sem 4"
    private String mobile;   // ← NEW (was "phone", now consistent)
    private String city;
    private Double marks;    // Out of 100
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getRollNo() { return rollNo; }
    public void setRollNo(String rollNo) { this.rollNo = rollNo; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }

    public String getYear() { return year; }
    public void setYear(String year) { this.year = year; }

    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public Double getMarks() { return marks; }
    public void setMarks(Double marks) { this.marks = marks; }
}
