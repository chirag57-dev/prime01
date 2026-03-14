// --- CONFIGURATION ---
// This is the address of the backend server we just started.
const API_URL_PREDICT = 'http://127.0.0.1:8000/predict';
const API_URL_PASHU = 'http://127.0.0.1:8000/api/pashu'; // Base URL for Pashu Aadhar data

// --- DOM ELEMENT SELECTION (Classification) ---
const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');
const imagePreview = document.getElementById('image-preview');
const uploadPrompt = document.getElementById('upload-prompt');
const resultArea = document.getElementById('result-area');
const resultText = document.getElementById('result-text');
const spinner = document.querySelector('.spinner'); // Uses the first one
const resetButton = document.getElementById('reset-button');

// --- DOM ELEMENT SELECTION (Aadhar Search) ---
const tagIdInput = document.getElementById('tag-id-input');
const searchButton = document.getElementById('search-button');
const aadharResultArea = document.getElementById('aadhar-result-area');
const aadharResultText = document.getElementById('aadhar-result-text');
const aadharSpinner = document.getElementById('aadhar-spinner');

// --- EVENT LISTENERS ---
// Trigger file input click when upload area is clicked
uploadArea.addEventListener('click', () => fileInput.click());

// Handle file selection
fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
});

// Drag and drop events
uploadArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    uploadArea.classList.add('drag-over');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('drag-over');
});

uploadArea.addEventListener('drop', (event) => {
    event.preventDefault();
    uploadArea.classList.remove('drag-over');
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
});

// Reset button functionality
resetButton.addEventListener('click', resetUI);

// Aadhar Search button functionality
searchButton.addEventListener('click', () => {
    const tagId = tagIdInput.value.trim();
    if (tagId.length === 12 && /^\d+$/.test(tagId)) {
        getPashuData(tagId);
    } else {
        alert('Please enter a valid 12-digit numerical Pashu Aadhar Tag ID.');
    }
});


// --- FUNCTIONS (Classification) ---
function handleFile(file) {
    if (!file.type.startsWith('image/')) {
        alert('Please upload an image file.');
        return;
    }
    
    // Display image preview
    const reader = new FileReader();
    reader.onload = (e) => {
        imagePreview.src = e.target.result;
        imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);

    // Update UI
    uploadPrompt.style.display = 'none';
    resultArea.classList.remove('hidden');
    spinner.style.display = 'block';
    resultText.innerHTML = '';
    
    // Get prediction
    getPrediction(file);
}

async function getPrediction(file) {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch(API_URL_PREDICT, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        displayClassificationResult(data);

    } catch (error) {
        console.error('Error fetching prediction:', error);
        displayClassificationError('Failed to get a prediction. Check backend status.');
    } finally {
        spinner.style.display = 'none';
        resetButton.classList.remove('hidden');
    }
}

function displayClassificationResult(data) {
    resultText.innerHTML = `
        <strong>${data.breed}</strong>
        <span>Confidence: ${data.confidence}</span>
    `;
}

function displayClassificationError(message) {
    resultText.innerHTML = `<p style="color: red;">${message}</p>`;
}

function resetUI() {
    fileInput.value = ''; // Clear the file input
    imagePreview.style.display = 'none';
    imagePreview.src = '#';
    uploadPrompt.style.display = 'block';
    resultArea.classList.add('hidden');
    resetButton.classList.add('hidden');
    resultText.innerHTML = '';
}

// --- FUNCTIONS (Aadhar Search) ---
async function getPashuData(tagId) {
    // Reset previous results and show spinner
    aadharResultArea.classList.remove('hidden');
    aadharSpinner.style.display = 'block';
    aadharResultText.innerHTML = '';

    try {
        const response = await fetch(`${API_URL_PASHU}/${tagId}`);
        const data = await response.json();

        if (!response.ok) {
            // Handle 404 (Not Found) or other errors from the API
            throw new Error(data.detail || `API Error: ${response.statusText}`);
        }

        displayAadharResult(data, tagId);

    } catch (error) {
        console.error('Error fetching Pashu Aadhar data:', error);
        displayAadharError(`Search failed: ${error.message.replace('Pashu Aadhar tag not found.', 'Pashu Aadhar tag not found in mock database.')}`);
    } finally {
        aadharSpinner.style.display = 'none';
    }
}

function displayAadharResult(data, tagId) {
    // Converts data object into a clean, formatted HTML list
    const detailList = Object.entries(data).map(([key, value]) => {
        // Simple humanization of keys
        const humanKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        return `<li><strong>${humanKey}:</strong> ${value}</li>`;
    }).join('');

    aadharResultText.innerHTML = `
        <h3>Pashu Aadhar ID: ${tagId}</h3>
        <ul class="aadhar-list">${detailList}</ul>
    `;
    // Add a quick visual style change for success
    aadharResultText.style.border = '1px solid #38a169';
    aadharResultText.style.padding = '10px';
    aadharResultText.style.borderRadius = '8px';
}

function displayAadharError(message) {
    aadharResultText.innerHTML = `<p style="color: red;">${message}</p>`;
    // Reset success styles
    aadharResultText.style.border = 'none';
    aadharResultText.style.padding = '0';
}
