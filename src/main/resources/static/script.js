const API_URL = "http://localhost:9090/students";

// Load students on page load
window.onload = loadStudents;

// Load all students
function loadStudents() {

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {

            const table = document.getElementById("studentTable");
            table.innerHTML = "";

            data.forEach(student => {

                table.innerHTML += `
                    <tr>
                        <td>${student.id}</td>
                        <td>${student.name}</td>
                        <td>${student.email}</td>
                        <td>${student.course || "-"}</td>
                        <td>${student.city || "-"}</td>
                        <td>${student.phone || "-"}</td>

                        <td>

                            <button class="btn btn-warning btn-sm mb-1"
                                onclick="editStudent(
                                    ${student.id},
                                    '${student.name}',
                                    '${student.email}',
                                    '${student.course || ""}',
                                    '${student.city || ""}',
                                    '${student.phone || ""}'
                                )">

                                Edit
                            </button>

                            <button class="btn btn-danger btn-sm"
                                onclick="deleteStudent(${student.id})">

                                Delete
                            </button>

                        </td>
                    </tr>
                `;

            });

        })
        .catch(error => console.log("Error:", error));
}

// Add or Update student
document.getElementById("studentForm")
.addEventListener("submit", function(e) {

    e.preventDefault();

    const id = document.getElementById("studentId").value;

    const student = {

        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        course: document.getElementById("course").value,
        city: document.getElementById("city").value,
        phone: document.getElementById("phone").value

    };

    // Update student
    if(id) {

        fetch(`${API_URL}/${id}`, {

            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(student)

        })
        .then(() => {

            resetForm();
            loadStudents();

            alert("Student Updated Successfully");

        });

    }

    // Add student
    else {

        fetch(API_URL, {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(student)

        })
        .then(() => {

            resetForm();
            loadStudents();

            alert("Student Added Successfully");

        });

    }

});

// Edit student
function editStudent(id, name, email, course, city, phone) {

    document.getElementById("studentId").value = id;
    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
    document.getElementById("course").value = course;
    document.getElementById("city").value = city;
    document.getElementById("phone").value = phone;

}

// Delete student
function deleteStudent(id) {

    if(confirm("Are you sure you want to delete this student?")) {

        fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        })
        .then(() => {

            loadStudents();

            alert("Student Deleted Successfully");

        });

    }

}

// Reset form
function resetForm() {

    document.getElementById("studentForm").reset();
    document.getElementById("studentId").value = "";

}