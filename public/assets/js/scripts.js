// Inside public/assets/js/scripts.js
document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expense-form');
    if (expenseForm) {
        expenseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const hours = document.getElementById('hours').value;
            const rate = document.getElementById('rate').value;
            const misc = document.getElementById('misc').value;
            const total = (hours * rate) + parseFloat(misc);
            document.getElementById('total-expense').textContent = `Total Expense: $${total}`;
        });
    }

    const documentForm = document.getElementById('document-form');
    if (documentForm) {
        documentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const docType = document.getElementById('doc-type').value;
            const clientName = document.getElementById('client-name').value;
            document.getElementById('document-output').textContent = `Generated Document for ${clientName}: ${docType}`;
        });
    }

    const courtSchedulerForm = document.getElementById('court-scheduler-form');
    if (courtSchedulerForm) {
        courtSchedulerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const caseId = document.getElementById('case-id').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            document.getElementById('schedule-output').textContent = `Scheduled ${caseId} on ${date} at ${time}`;
        });
    }

    const signaturePad = document.getElementById('signature-pad');
    if (signaturePad) {
        const ctx = signaturePad.getContext('2d');
        let isDrawing = false;

        signaturePad.addEventListener('mousedown', () => {
            isDrawing = true;
        });

        signaturePad.addEventListener('mouseup', () => {
            isDrawing = false;
            ctx.beginPath();
        });

        signaturePad.addEventListener('mousemove', draw);

        function draw(event) {
            if (!isDrawing) return;
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.strokeStyle = '#000000';
            ctx.lineTo(event.clientX - signaturePad.offsetLeft, event.clientY - signaturePad.offsetTop);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(event.clientX - signaturePad.offsetLeft, event.clientY - signaturePad.offsetTop);
        }

        document.getElementById('save-signature').addEventListener('click', function() {
            const signatureURL = signaturePad.toDataURL();
            document.getElementById('signature-output').textContent = 'Signature saved successfully!';
        });
    }

    // Chatbox functionality

document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatWindow = document.getElementById('chat-window');

    // Replace with your actual API key
    const API_KEY = 'AIzaSyAbuY2DQ78nCq_RG7GPKilbwxHii2BsAdI';
    const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAbuY2DQ78nCq_RG7GPKilbwxHii2BsAdI'; // Replace with your actual API endpoint

    sendBtn.addEventListener('click', function() {
        const userMessage = chatInput.value;

        if (userMessage.trim() === '') return;

        // Display user message
        displayMessage(userMessage, 'user');

        // Clear the input field
        chatInput.value = '';

        // Send the message to the API
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                prompt: userMessage,
                max_tokens: 150 // Adjust as needed
            })
        })
        .then(response => response.json())
        .then(data => {
            const botMessage = data.choices[0].text.trim();
            displayMessage(botMessage, 'bot');
        })
        .catch(error => {
            console.error('Error:', error);
            displayMessage('Sorry, something went wrong. Please try again.', 'bot');
        });
    });

    function displayMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = message;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
});
});

