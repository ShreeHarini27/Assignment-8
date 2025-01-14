async function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const department = document.getElementById('department').value;
    const message = document.getElementById('message').value;

    // Validation (already handled by 'required' attributes)
    if (!name || !email || !department || !message) {
        alert("Please fill all fields.");
        return false;
    }

    // Prepare data for submission
    const formData = {
        name: name,
        email: email,
        department: department,
        message: message
    };

    try {
        // Send data to MockAPI
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        // Check if the request was successful
        if (response.ok) {
            const data = await response.json();
            displayResult(data);
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function displayResult(data) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h3>Registration Successful!</h3>
        <p>Name: ${data.name}</p>
        <p>Email: ${data.email}</p>
        <p>Department: ${data.department}</p>
        <p>Message: ${data.message}</p>
        <p>Submitted ID: ${data.id}</p>
    `;
}
