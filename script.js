document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('studentForm');
    const registrationSection = document.getElementById('registrationSection');
    const recordsSection = document.getElementById('recordsSection');
    const studentRecords = document.getElementById('studentRecords');
    const registerBtn = document.getElementById('registerBtn');
    const viewRecordsBtn = document.getElementById('viewRecordsBtn');
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // Function to display student records
    const displayStudents = () => {
        studentRecords.innerHTML = students.map((student, index) => `
            <tr>
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button class="edit" onclick="editStudent(${index})">Edit</button>
                    <button class="delete" onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `).join('');
    };

    // Function to show registration section
    const showRegistrationSection = () => {
        registrationSection.style.display = 'block';
        recordsSection.style.display = 'none';
        displayStudents(); // Ensure records are not shown in registration mode
    };

    // Function to show records section
    const showRecordsSection = () => {
        registrationSection.style.display = 'none';
        recordsSection.style.display = 'block';
        displayStudents(); // Display records when switching to records section
    };

    // Add event listeners to navigation buttons
    registerBtn.addEventListener('click', showRegistrationSection);
    viewRecordsBtn.addEventListener('click', showRecordsSection);

    // Validate form fields
    const validateForm = () => {
        const name = form.studentName.value.trim();
        const id = form.studentID.value.trim();
        const email = form.email.value.trim();
        const contact = form.contactNo.value.trim();

        if (!name || !id || !email || !contact) {
            return { valid: false, message: 'Please fill in all fields.' };
        }

        if (!/^[a-zA-Z\s]+$/.test(name)) {
            return { valid: false, message: 'Student name must contain only characters.' };
        }

        if (!/^\d+$/.test(id)) {
            return { valid: false, message: 'Student ID must contain only numbers.' };
        }

        if (!/^\d+$/.test(contact)) {
            return { valid: false, message: 'Contact number must contain only numbers.' };
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            return { valid: false, message: 'Please enter a valid email address.' };
        }

        return { valid: true };
    };

    // Submit form and add new student
    const submitForm = event => {
        event.preventDefault();
        const validationResult = validateForm();

        if (!validationResult.valid) {
            alert(validationResult.message);
            return;
        }

        const name = form.studentName.value.trim();
        const id = form.studentID.value.trim();
        const email = form.email.value.trim();
        const contact = form.contactNo.value.trim();

        students.push({ name, id, email, contact });
        localStorage.setItem('students', JSON.stringify(students));
        displayStudents();
        form.reset();
    };

    // Edit existing student details
    window.editStudent = index => {
        const student = students[index];

        // Remove the current student record from the array
        students.splice(index, 1);
        displayStudents();

        // Fill the form with existing student details for editing
        form.studentName.value = student.name;
        form.studentID.value = student.id;
        form.email.value = student.email;
        form.contactNo.value = student.contact;

        // Navigate to the registration section for editing
        showRegistrationSection();
    };

    // Delete student from records
    window.deleteStudent = index => {
        if (confirm('Are you sure you want to delete this record?')) {
            students.splice(index, 1);
            localStorage.setItem('students', JSON.stringify(students));
            displayStudents();
        }
    };

    // Initialize form submission handler
    form.onsubmit = submitForm;

    // Display initial students
    showRegistrationSection(); 
});
