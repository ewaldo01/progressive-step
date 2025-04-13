document.getElementById('predictionForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Collect form data
    const formData = {
        Pclass: parseInt(document.getElementById('Pclass').value),
        Age: parseFloat(document.getElementById('Age').value),
        SibSp: parseInt(document.getElementById('SibSp').value),
        Parch: parseInt(document.getElementById('Parch').value),
        Fare: parseFloat(document.getElementById('Fare').value),
        Sex_male: parseInt(document.getElementById('Sex_male').value),
        Embarked_Q: parseInt(document.getElementById('Embarked_Q').value),
        Embarked_S: parseInt(document.getElementById('Embarked_S').value),
    };

    // Send the request to FastAPI backend
    const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    // Handle the response
    if (response.ok) {
        const data = await response.json();
        document.getElementById('predictionOutput').textContent = `Prediction: ${data.prediction === 1 ? 'Survived' : 'Did not survive'}`;
    } else {
        document.getElementById('predictionOutput').textContent = 'Error: Could not get prediction';
    }
});