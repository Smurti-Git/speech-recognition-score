document.addEventListener("DOMContentLoaded", () => {
    let recognition;
    let isListening = false;
    let textList = [];
    let totalScore = 0;
    let historyList = []; // Holds the history of saved texts
  const themeToggle = document.getElementById('themeToggle');

    // Load history from localStorage when the page loads
    loadHistoryFromStorage();

    // Handle the recognition start/stop button
    document.getElementById("start").addEventListener("click", () => {
        if (isListening) {
            stopRecognition(); // Stop recognition when clicked
        } else {
            startRecognition(); // Start recognition when clicked
        }
    });

    // Handle the "Copy" button
    document.getElementById("copy").addEventListener("click", () => {
        const textToCopy = document.getElementById("textareaInput").value;
        if (textToCopy) {
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    
                })
                .catch((err) => {
                    console.error("Error copying text: ", err);
                });
        } else {
            alert("No text to copy!");
        }
    });

    // Handle the "Clear" button
    document.getElementById("clear").addEventListener("click", () => {
        document.getElementById("textareaInput").value = ""; // Clear the textarea
        totalScore = 0;
        document.getElementById("totalScore").textContent = `Total Score: ${totalScore}`;
    });

    // Handle Save History button
    document.getElementById("saveHistory").addEventListener("click", () => {
        const currentSessionText = document.getElementById("textareaInput").value.trim();
        if (currentSessionText) {
            historyList.push(currentSessionText); // Save the current session's recognized text
            updateHistorySection(); // Update the history section on the UI
            saveHistoryToStorage(); // Save the updated history to localStorage
        } else {
            alert("No text to save in history!");
        }
    });

    // New functionality: Copy all text from the textarea to the text input section
    document.getElementById("copyToInput").addEventListener("click", () => {
        const textareaValue = document.getElementById("textareaInput").value;
        const inputField = document.getElementById("textInput");
        if (textareaValue.trim()) {
            inputField.value = textareaValue; // Copy the entire text from textarea to input field
        } else {
            alert("No text to copy to input!");
        }
    });

    // Function to start speech recognition
    function startRecognition() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
                recognition.lang = "en-US";
                recognition.interimResults = true; // Allow interim results
                recognition.continuous = true; // Allow continuous speech recognition
                recognition.maxAlternatives = 1;

                recognition.onresult = (event) => {
                    let finalTranscript = ""; // To hold only final transcribed text

                    // Process all results (final + interim)
                    for (let i = event.resultIndex; i < event.results.length; i++) {
                        let transcript = event.results[i][0].transcript;
                        if (event.results[i].isFinal) {
                            finalTranscript = transcript; // Capture only final transcriptions
                        }
                    }

                    // Only append the final transcribed text to the existing session
                    if (finalTranscript) {
                        const resultElement = document.getElementById("textareaInput");
                        resultElement.value += " " + finalTranscript.trim(); // Append to the textarea with final text
                    }
                };

                recognition.onerror = (event) => {
                    console.error("Error occurred in recognition: ", event.error);
                };

                recognition.onend = () => {
                    if (isListening) {
                        recognition.start(); // Restart recognition if it ends unexpectedly (to keep it running)
                    }
                };

                recognition.start();
                console.log("Recognition started");
            })
            .catch((err) => {
                console.error("Error getting user media: ", err.name, err.message);
                alert("Microphone access is required for speech recognition. Please allow microphone access.");
            });

        isListening = true;
        document.getElementById("start").innerText = "Stop Recognition"; // Update button text
    }

    // Stop speech recognition
    function stopRecognition() {
        if (recognition && isListening) {
            recognition.stop(); // Stop recognition
            isListening = false;
            document.getElementById("start").innerText = "Start Recognition"; // Update button text
        }
    }

    // Add item to the list
    window.addToList = function() {
        const textInput = document.getElementById('textInput').value.trim();
        const numberInput = document.getElementById('numberInput').value.trim();
        if (textInput === '' || numberInput === '') {
            return;
        }

        const listItem = document.createElement('li');
        listItem.className = 'list-item';
        listItem.innerHTML = `<span class="text">Text: ${textInput}</span> <span class="score">Score: ${numberInput}</span> <button onclick="removeItem(this)" style="margin-left: 10px;">&#10060;</button>`;
        document.getElementById('list').appendChild(listItem);

        textList.push({ text: textInput, score: parseInt(numberInput, 10) });
        document.getElementById('inputForm').reset();
        updateTotalScore();
    };

    // Remove item from the list
    window.removeItem = function(button) {
        const listItem = button.parentElement;
        const text = listItem.querySelector('.text').innerText.split(': ')[1];
        textList = textList.filter(item => item.text !== text);
        listItem.remove();
        updateTotalScore();
    };

    // Check for matches in textarea and highlight them
    window.checkMatch = function() {
        const textareaValue = document.getElementById('textareaInput').value;
        const listItems = document.querySelectorAll('.list-item');
        totalScore = 0;
        listItems.forEach(item => {
            const textValue = item.querySelector('.text').innerText.split(': ')[1];
            const scoreValue = parseInt(item.querySelector('.score').innerText.split(': ')[1], 10);
            if (textareaValue.includes(textValue)) {
                item.classList.add('highlight');
                totalScore += scoreValue;
            } else {
                item.classList.remove('highlight');
            }
        });
        updateTotalScore();
    };

    // Update total score
    function updateTotalScore() {
        document.getElementById('totalScore').innerText = `Total Score: ${totalScore}`;
    }

    // Update history section with saved history
    function updateHistorySection() {
        const historyListElement = document.getElementById('historyList');
        historyListElement.innerHTML = ''; // Clear existing history list
        historyList.forEach((text, index) => {
            const historyItem = document.createElement('li');
            historyItem.innerHTML = `${text} <button onclick="removeHistory(${index})" style="margin-left: 10px;">&#10060;</button>`;
            historyListElement.appendChild(historyItem);
        });
    }

    // Remove a history item
    window.removeHistory = function(index) {
        historyList.splice(index, 1); // Remove from the array
        updateHistorySection(); // Update the UI
        saveHistoryToStorage(); // Save updated history to localStorage
    };

    // Save the current history to localStorage
    function saveHistoryToStorage() {
        localStorage.setItem("historyList", JSON.stringify(historyList));
    }

    // Load history from localStorage
    function loadHistoryFromStorage() {
        const savedHistory = localStorage.getItem("historyList");
        if (savedHistory) {
            historyList = JSON.parse(savedHistory);
            updateHistorySection(); // Update the UI with the loaded history
        }
    }
});



    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      themeToggle.textContent = document.body.classList.contains('dark-mode') ? 'Enable Light Mode' : 'Enable Dark Mode';
    });

