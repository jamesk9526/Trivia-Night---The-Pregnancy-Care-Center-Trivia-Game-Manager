# Trivia-Night---The-Pregnancy-Care-Center-Trivia-Game-Manager

# Pregnancy Care Center Trivia Night Web App

Welcome to the **Pregnancy Care Center Trivia Night** web application! This interactive trivia game is designed for family fun events, allowing multiple teams to compete by answering questions across various categories and difficulty levels.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [System Requirements](#system-requirements)
4. [Installation and Setup](#installation-and-setup)
   - [Downloading the Files](#downloading-the-files)
   - [Setting Up a Local Server](#setting-up-a-local-server)
5. [File Structure and Overview](#file-structure-and-overview)
   - [`index.html`](#indexhtml)
   - [`styles.css`](#stylescss)
   - [`app.js`](#appjs)
   - [`questions.csv`](#questionscsv)
6. [How to Use the Application](#how-to-use-the-application)
   - [Starting the Server](#starting-the-server)
   - [Opening the Application](#opening-the-application)
   - [Adding Teams](#adding-teams)
   - [Selecting a Question File](#selecting-a-question-file)
   - [Starting the Game](#starting-the-game)
   - [Gameplay Instructions](#gameplay-instructions)
7. [Creating and Editing Question Files](#creating-and-editing-question-files)
   - [CSV Format Explanation](#csv-format-explanation)
   - [Example `questions.csv` File](#example-questionscsv-file)
   - [Tips for Creating Your Own Question File](#tips-for-creating-your-own-question-file)
8. [Customization](#customization)
   - [Modifying Styles](#modifying-styles)
   - [Adding Sounds](#adding-sounds)
   - [Changing Difficulty Points](#changing-difficulty-points)
9. [Persistence and Sessions](#persistence-and-sessions)
   - [How Session Persistence Works](#how-session-persistence-works)
   - [Clearing Sessions](#clearing-sessions)
10. [Troubleshooting](#troubleshooting)
    - [Common Issues and Solutions](#common-issues-and-solutions)
11. [Conclusion](#conclusion)

---

## Introduction

The **Pregnancy Care Center Trivia Night** web application provides an engaging platform for hosting trivia games. It's ideal for events where families and friends can participate in a friendly competition.

## Features

- **Team Management**: Easily add and manage teams.
- **Multiple Rounds and Categories**: Customize rounds and categories to keep the game interesting.
- **Customizable Questions**: Use the provided sample questions or upload your own in CSV format.
- **Automatic Session Persistence**: The game state is saved automatically, allowing you to resume where you left off.
- **Responsive Design**: The app is optimized for various devices, including desktops, tablets, and mobile phones.
- **Engaging Animations and Feedback**: Enjoy visual effects and immediate feedback to enhance the gaming experience.

## System Requirements

- **Web Browser**: A modern web browser (Chrome, Firefox, Edge, Safari).
- **Local Web Server**: Required due to browser security restrictions when fetching local files and uploading custom question files.

---

## Installation and Setup

### Downloading the Files

You will need the following files:

- `index.html`
- `styles.css`
- `app.js`
- `questions.csv` (sample question file)
- Optional assets (e.g., images, sound files)

**Instructions**:

1. **Clone or Download the Repository**:
   - Clone the repository using Git:
     ```bash
     git clone https://github.com/yourusername/pregnancy-care-center-trivia.git
     ```
   - Or download the ZIP file and extract it to your desired location.

2. **Ensure All Files Are in the Same Directory**:
   - Place all the files in a single folder on your computer.

### Setting Up a Local Server

Due to security policies, you must run the application on a local server.

#### Option 1: Using Node.js and `http-server`

1. **Install Node.js**:
   - Download from [nodejs.org](https://nodejs.org/).

2. **Install `http-server` Globally**:
   ```bash
   npm install -g http-server
   ```

3. **Start the Server**:
   ```bash
   cd path/to/your_project_folder
   http-server
   ```

4. **Access the Application**:
   - Open your browser and navigate to `http://localhost:8080`.

#### Option 2: Using Python

- **Python 3**:
  ```bash
  python -m http.server
  ```

- **Python 2**:
  ```bash
  python -m SimpleHTTPServer
  ```

- **Access the Application**:
  - Navigate to `http://localhost:8000`.

#### Option 3: Using VSCode Live Server Extension

1. **Install the Live Server Extension**:
   - In VSCode, go to Extensions (`Ctrl+Shift+X` or `Cmd+Shift+X`).
   - Search for "Live Server" and install it.

2. **Start Live Server**:
   - Open your project in VSCode.
   - Right-click `index.html` and select "Open with Live Server".

---

## File Structure and Overview

### `index.html`

The main HTML file structuring the application's content.

**Key Sections**:

- **Header**: Displays the logo and title.
- **Main Container**: Contains the leaderboard, team management, game area, and admin panel.
- **Footer**: Contains footer content.

[View `index.html`](#indexhtml-code)

### `styles.css`

Contains all the styling for the application.

**Features**:

- Responsive design.
- CSS animations for transitions and effects.
- Theming with colors, fonts, and layouts.

[View `styles.css`](#stylescss-code)

### `app.js`

The main JavaScript file handling application logic.

**Key Functionalities**:

- Event handling for user interactions.
- Game logic for question loading, scoring, and rounds.
- Session persistence using `localStorage`.
- CSV parsing using Papa Parse library.

[View `app.js`](#appjs-code)

### `questions.csv`

A sample question file in CSV format.

**Structure**:

- Headers: `Round`, `Category`, `Difficulty`, `Question`, `Answer`.
- Each row represents a question with associated data.

[View `questions.csv`](#questionscsv-code)

---

## How to Use the Application

### Starting the Server

1. **Navigate to the Project Directory**:
   ```bash
   cd path/to/your_project_folder
   ```

2. **Start the Local Server**:
   - **Node.js**:
     ```bash
     http-server
     ```
   - **Python 3**:
     ```bash
     python -m http.server
     ```

### Opening the Application

- Open your web browser and go to `http://localhost:8080` (Node.js) or `http://localhost:8000` (Python).

### Adding Teams

1. **Locate the Team Management Section**.
2. **Enter Team Names**:
   - Input a team name in the field provided.
   - Click "Add Team".
3. **Verify Teams**:
   - Teams should appear in the team list and selection dropdown.

### Selecting a Question File

1. **Go to the Admin Panel**.
2. **Select a Question File**:
   - Choose `Default Questions` or `Upload Custom CSV File`.
3. **Upload Custom File** (if applicable):
   - Click on the file input and select your custom CSV file.

### Starting the Game

- Click "Start Game" in the admin panel.
- The game area will become visible, and team management will be hidden.

### Gameplay Instructions

1. **Viewing Questions**:
   - Questions are displayed with category and round information.
2. **Submitting Answers**:
   - Select your team, enter the answer, and click "Submit Answer".
3. **Receiving Feedback**:
   - Immediate feedback is provided, and the leaderboard updates accordingly.
4. **Proceeding to Next Question**:
   - Click "Next Question" when prompted.
5. **Ending the Game**:
   - After all rounds, the game ends, and final scores are displayed.

---

## Creating and Editing Question Files

### CSV Format Explanation

The application uses CSV files for question data.

**CSV Structure**:

- **Headers**:
  ```csv
  Round,Category,Difficulty,Question,Answer
  ```
- **Data Rows**:
  ```csv
  1,General Knowledge,Easy,What is the capital of France?,Paris
  ```

**Field Descriptions**:

- **Round**: Round number (e.g., 1, 2).
- **Category**: Question category (e.g., Science).
- **Difficulty**: `Easy`, `Medium`, or `Hard`.
- **Question**: The question text.
- **Answer**: The correct answer.

### Example `questions.csv` File

[View the full `questions.csv` content](#questionscsv-code)

### Tips for Creating Your Own Question File

1. **Use Spreadsheet Software**:
   - Create your questions in Excel or Google Sheets.
   - Export as CSV.
2. **Ensure Proper Formatting**:
   - Enclose fields with commas in double quotes.
3. **Consistency**:
   - Maintain consistent categories and difficulty levels.
4. **Test Your File**:
   - Upload and test in the application.

---

## Customization

### Modifying Styles

- **Edit `styles.css`** to change the look and feel.
- **Responsive Design**: Adjust media queries for different devices.

### Adding Sounds

- **Implement Sound Functionality in `app.js`**:
  ```javascript
  function playSound(type) {
    const audio = new Audio(`${type}.mp3`);
    audio.play();
  }
  ```
- **Add Sound Files**: Place `correct.mp3` and `incorrect.mp3` in your project directory.

### Changing Difficulty Points

- **Edit the `getPointsForDifficulty` Function in `app.js`**:
  ```javascript
  function getPointsForDifficulty(difficulty) {
    switch (difficulty) {
      case 'easy':
        return 1; // Adjust points as needed
      case 'medium':
        return 2;
      case 'hard':
        return 3;
      default:
        return 1;
    }
  }
  ```

---

## Persistence and Sessions

### How Session Persistence Works

- **Automatic Saving**: Game state is saved to `localStorage` after significant events.
- **Automatic Loading**: On page load, the app checks and loads saved sessions.
- **Data Stored**: Teams, scores, current question, answers submitted, etc.

### Clearing Sessions

- **End of Game**: Session data is cleared when the game ends.
- **Manual Clearing**: Clear browser local storage or implement a reset function.

---

## Troubleshooting

### Common Issues and Solutions

1. **Questions Not Loading**:
   - **Cause**: Not running on a local server.
   - **Solution**: Start a local server as per instructions.

2. **Cannot Add Teams**:
   - **Cause**: JavaScript errors.
   - **Solution**: Check console for errors; ensure all files are correctly linked.

3. **Session Not Persisting**:
   - **Cause**: `localStorage` issues.
   - **Solution**: Use a modern browser; avoid clearing browser data.

4. **Custom CSV File Not Loading**:
   - **Cause**: Incorrect format.
   - **Solution**: Verify CSV structure and formatting.

5. **Styles Not Applying**:
   - **Cause**: Incorrect CSS linking.
   - **Solution**: Ensure `<link>` tag in `index.html` correctly references `styles.css`.

6. **Audio Not Playing**:
   - **Cause**: Missing or incorrectly linked audio files.
   - **Solution**: Ensure audio files are in place and paths are correct.

---

## Conclusion

With this application, you have a robust platform for hosting engaging trivia nights. Customize it to fit your event's theme and enjoy interactive fun with teams.

**Feel free to reach out if you have any questions or need further assistance.**

---

## Code Files

### `index.html` Code

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Pregnancy Care Center Trivia Night</title>
  <!-- Link to external CSS file -->
  <link rel="stylesheet" href="styles.css">
  <!-- Include Google Fonts for modern typography -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
  <!-- Include Font Awesome for icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" integrity="sha384-" crossorigin="anonymous">
</head>
<body>
  <header>
    <div class="container header-container">
      <img src="logo.png" alt="Pregnancy Care Center Logo" class="logo">
      <h1>Family Fun Trivia Night</h1>
    </div>
  </header>

  <div class="container main-container">
    <!-- Leaderboard Sidebar -->
    <aside id="leaderboard">
      <h2><i class="fas fa-trophy"></i> Leaderboard</h2>
      <ul id="leaderboard-list"></ul>
    </aside>

    <!-- Main Content -->
    <main>
      <!-- Team Management -->
      <section id="team-management">
        <h2><i class="fas fa-users"></i> Teams</h2>
        <form id="team-form">
          <input type="text" id="team-name-input" placeholder="Enter Team Name" required>
          <button type="submit"><i class="fas fa-plus"></i> Add Team</button>
        </form>
        <ul id="team-list"></ul>
      </section>

      <!-- Trivia Game Area -->
      <section id="game-area" class="hidden">
        <h2>Round <span id="round-number">1</span> - Category: <span id="category-name"></span></h2>
        <div id="question-display">
          <p id="question-text"></p>
        </div>
        <div id="correct-answer-display" class="hidden">
          <h3>The correct answer is:</h3>
          <p id="correct-answer-text">[Answer Hidden]</p>
        </div>
        <form id="answer-form">
          <label for="team-select">Team:</label>
          <select id="team-select"></select>
          <input type="text" id="answer-input" placeholder="Enter your answer here" required>
          <button type="submit"><i class="fas fa-paper-plane"></i> Submit Answer</button>
        </form>
        <p id="feedback-message"></p>
        <button id="next-question" class="hidden"><i class="fas fa-forward"></i> Next Question</button>
      </section>
    </main>

    <!-- Admin Panel -->
    <aside id="admin-panel">
      <h2><i class="fas fa-cog"></i> Admin Panel</h2>
      <label for="question-file-select">Select Question File:</label>
      <select id="question-file-select">
        <option value="questions.csv">Default Questions</option>
        <option value="custom">Upload Custom CSV File</option>
      </select>
      <!-- File Input for Custom Questions -->
      <input type="file" id="custom-question-file" accept=".csv" class="hidden">
      <button id="start-game"><i class="fas fa-play"></i> Start Game</button>
      <button id="edit-scores"><i class="fas fa-edit"></i> Edit Scores</button>
      <button id="skip-question"><i class="fas fa-step-forward"></i> Skip Question</button>
    </aside>
  </div>

  <footer>
    <div class="container footer-container">
      <p>&copy; 2024 Pregnancy Care Center. All rights reserved.</p>
    </div>
  </footer>

  <!-- Include the JavaScript file -->
  <script src="app.js"></script>
  <!-- Include Papa Parse for CSV parsing -->
  <script src="https://cdn.jsdelivr.net/npm/papaparse@5.3.1/papaparse.min.js"></script>
</body>
</html>
```

[Back to Top](#table-of-contents)

### `styles.css` Code

```css
/* Import the 'Roboto' font */
body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  background-color: #f5f5f5;
  color: #333;
  overflow-x: hidden;
}

/* Container */
.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}

/* Header */
header {
  background-color: #ffffff;
  border-bottom: 1px solid #ddd;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-container {
  display: flex;
  align-items: center;
  padding: 20px 0;
}

.logo {
  height: 60px;
  margin-right: 20px;
}

header h1 {
  font-size: 2em;
  color: #4CAF50;
  animation: slideIn 1s ease-out;
}

/* Footer */
footer {
  background-color: #ffffff;
  border-top: 1px solid #ddd;
  padding: 10px 0;
  text-align: center;
}

.footer-container {
  padding: 10px 0;
}

/* Main Container */
.main-container {
  display: flex;
  flex-wrap: wrap;
  padding: 20px 0;
}

/* Sidebars */
aside {
  width: 100%;
  max-width: 200px;
  padding: 20px;
  box-sizing: border-box;
}

/* Leaderboard */
#leaderboard {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 20px;
}

/* Admin Panel */
#admin-panel {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 5px;
}

/* Main Content */
main {
  flex: 1;
  padding: 0 20px;
  box-sizing: border-box;
}

section {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
}

/* Forms */
form {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

form input[type="text"], form select {
  flex: 1;
  padding: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
}

form button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* Feedback Message */
#feedback-message {
  font-size: 1.2em;
  margin-top: 10px;
  animation: fadeIn 1s ease-out;
}

/* Animations */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  } to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 800px) {
  .main-container {
    flex-direction: column;
  }

  aside, main {
    width: 100%;
    max-width: none;
  }
}
```

[Back to Top](#table-of-contents)

### `app.js` Code

```javascript
// Global Variables
let teams = [];
let teamScores = {};
let questions = [];
let currentQuestionIndex = 0;
let currentRound = 1;
let totalRounds = 6;
let currentCategory = '';
let sessionData = {};
let answersSubmitted = {};
let correctAnswerRevealed = false;

// Element References
const teamForm = document.getElementById('team-form');
const teamNameInput = document.getElementById('team-name-input');
const teamList = document.getElementById('team-list');
const startGameButton = document.getElementById('start-game');
const questionFileSelect = document.getElementById('question-file-select');
const customQuestionFileInput = document.getElementById('custom-question-file');
const gameArea = document.getElementById('game-area');
const roundNumberSpan = document.getElementById('round-number');
const categoryNameSpan = document.getElementById('category-name');
const questionTextP = document.getElementById('question-text');
const correctAnswerDisplay = document.getElementById('correct-answer-display');
const correctAnswerText = document.getElementById('correct-answer-text');
const answerForm = document.getElementById('answer-form');
const answerInput = document.getElementById('answer-input');
const nextQuestionButton = document.getElementById('next-question');
const leaderboardList = document.getElementById('leaderboard-list');
const teamSelect = document.getElementById('team-select');
const editScoresButton = document.getElementById('edit-scores');
const skipQuestionButton = document.getElementById('skip-question');
const feedbackMessage = document.getElementById('feedback-message');

// Event Listeners
teamForm.addEventListener('submit', addTeam);
startGameButton.addEventListener('click', startGame);
answerForm.addEventListener('submit', submitAnswer);
nextQuestionButton.addEventListener('click', loadNextQuestion);
editScoresButton.addEventListener('click', editScores);
skipQuestionButton.addEventListener('click', skipQuestion);
questionFileSelect.addEventListener('change', handleQuestionFileSelection);

// Functions

// 1. Add Team
function addTeam(e) {
  e.preventDefault();
  const teamName = teamNameInput.value.trim();
  if (teamName && !teams.includes(teamName)) {
    teams.push(teamName);
    teamScores[teamName] = 0;
    updateTeamList();
    updateTeamSelect();
    teamNameInput.value = '';
    saveSession(); // Save the session after adding a team
  }
}

// ... (Rest of the functions as provided in the previous content)

// Load the session when the page is loaded
window.addEventListener('load', loadSession);
```

[Back to Top](#table-of-contents)

### `questions.csv` Code

```csv
Round,Category,Difficulty,Question,Answer
1,General Knowledge,Easy,What is the capital of France?,Paris
1,General Knowledge,Medium,Which planet is known as the Red Planet?,Mars
1,General Knowledge,Hard,Who wrote the epic poem "The Odyssey"?,Homer
2,Science,Easy,What gas do plants absorb from the atmosphere?,Carbon Dioxide
2,Science,Medium,What is the chemical symbol for Gold?,Au
2,Science,Hard,Who developed the theory of relativity?,Albert Einstein
3,History,Easy,Who was the first President of the United States?,George Washington
3,History,Medium,What year did World War II end?,1945
3,History,Hard,Who was the ancient Greek god of the sun?,Helios
4,Arts and Literature,Easy,Who wrote "Harry Potter"?,J.K. Rowling
4,Arts and Literature,Medium,Which artist cut off his own ear?,Vincent van Gogh
4,Arts and Literature,Hard,Who wrote the epic poem "Paradise Lost"?,John Milton
5,Geography,Easy,What is the largest ocean on Earth?,Pacific Ocean
5,Geography,Medium,Which country has the most natural lakes?,Canada
5,Geography,Hard,What is the capital city of Mongolia?,Ulaanbaatar
6,Entertainment,Easy,Who is the lead singer of the band Queen?,Freddie Mercury
6,Entertainment,Medium,Which movie won the Best Picture Oscar in 2020?,Parasite
6,Entertainment,Hard,What is the highest-grossing Broadway show of all time?,The Lion King
```

[Back to Top](#table-of-contents)

---

**Enjoy your trivia night!**
