const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const readline = require('readline'); // Import readline module

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Create an interface to read user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Define a function to get JSON input from the user
function getUserInput() {
    return new Promise((resolve) => {
        rl.question('Enter JSON data: ', (input) => {
            rl.close();
            resolve(input);
        });
    });
}

app.post('/bfhl', async (req, res) => {
    try {
        // Ask the user to enter JSON data
        const inputData = await getUserInput();

        if (!inputData) {
            console.error('No JSON input provided.');
            return res.status(400).send('Bad Request: Missing JSON input');
        }

        const dataArray = JSON.parse(inputData);

        const numbers = dataArray.filter(item => !isNaN(item));
        const alphabets = dataArray.filter(item => /^[A-Za-z]$/.test(item));
        const highest_alphabet = alphabets.sort((a, b) => b.localeCompare(a))[0];

        // Construct the response object
        const response = {
            "is_success": true,
            "user_id": "john_doe_17091999",
            "email": "john@xyz.com",
            "roll_number": "ABCD123",
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_alphabet": [highest_alphabet]
        };

        res.status(200).json(response);
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/bfhl', (req, res) => {
    const response = {
        operation_code: 1,
    };
    res.status(200).json(response);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
