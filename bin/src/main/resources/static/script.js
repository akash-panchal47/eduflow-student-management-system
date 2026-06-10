const API_URL = "http://localhost:9090/students";

// Load students when page opens
window.onload = loadStudents;

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
                        <td>
                            <button class="btn btn-warning btn-sm"
                                onclick="editStudent(${student.id}, '${student.name}', '${student.email}')">
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

// Handle form submit (CREATE or UPDATE)
document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("studentId").value;

    const student = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value
    };

    if (id) {
        // UPDATE
        fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(student)
        }).then(() => {
            resetForm();
            loadStudents();
        });
    } else {
        // CREATE
        fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(student)
        }).then(() => {
            resetForm();
            loadStudents();
        });
    }
});

// Fill form for edit
function editStudent(id, name, email) {
    document.getElementById("studentId").value = id;
    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
}

// Delete student
function deleteStudent(id) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => loadStudents());
}

// Reset form
function resetForm() {
    document.getElementById("studentForm").reset();
    document.getElementById("studentId").value = "";
}
