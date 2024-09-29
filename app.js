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
// Removed save and load session buttons if you decide to
// const saveSessionButton = document.getElementById('save-session');
// const loadSessionButton = document.getElementById('load-session');
const teamSelect = document.getElementById('team-select');
const editScoresButton = document.getElementById('edit-scores');
const skipQuestionButton = document.getElementById('skip-question');
const feedbackMessage = document.getElementById('feedback-message');

// Event Listeners
teamForm.addEventListener('submit', addTeam);
startGameButton.addEventListener('click', startGame);
answerForm.addEventListener('submit', submitAnswer);
nextQuestionButton.addEventListener('click', loadNextQuestion);
// Remove event listeners if you removed the buttons
// saveSessionButton.addEventListener('click', saveSession);
// loadSessionButton.addEventListener('click', loadSession);
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

// 2. Update Team List
function updateTeamList() {
  teamList.innerHTML = '';
  teams.forEach(team => {
    const li = document.createElement('li');
    li.textContent = team;
    teamList.appendChild(li);
  });
  updateLeaderboard();
}

// 3. Update Team Select
function updateTeamSelect() {
  teamSelect.innerHTML = '';
  teams.forEach(team => {
    const option = document.createElement('option');
    option.value = team;
    option.textContent = team;
    teamSelect.appendChild(option);
  });
}

// 4. Handle Question File Selection
function handleQuestionFileSelection() {
  if (questionFileSelect.value === 'custom') {
    customQuestionFileInput.classList.remove('hidden');
  } else {
    customQuestionFileInput.classList.add('hidden');
  }
}

// 5. Start Game
function startGame() {
  if (teams.length === 0) {
    alert('Please add at least one team before starting the game.');
    return;
  }
  const selectedOption = questionFileSelect.value;
  if (selectedOption === 'custom') {
    const file = customQuestionFileInput.files[0];
    if (file) {
      loadCustomQuestions(file);
    } else {
      alert('Please select a custom question file.');
    }
  } else {
    loadQuestions(selectedOption);
  }
}

// 6. Load Questions from File
function loadQuestions(filename) {
  fetch(filename)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok. Failed to load questions.');
      }
      return response.text();
    })
    .then(data => {
      questions = parseQuestions(data);
      if (questions.length === 0) {
        alert('No questions were loaded. Please check the question file.');
        return;
      }
      setupGame();
      saveSession(); // Save the session after loading questions
    })
    .catch(error => {
      console.error('Error loading questions:', error);
      alert('An error occurred while loading questions. Please ensure you are running the app on a local server and the question file exists.');
    });
}

// 7. Load Custom Questions
function loadCustomQuestions(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const data = e.target.result;
    questions = parseQuestions(data);
    if (questions.length === 0) {
      alert('No questions were loaded from the custom file. Please check the file format.');
      return;
    }
    setupGame();
    saveSession(); // Save the session after loading custom questions
  };
  reader.readAsText(file);
}

// 8. Setup Game
function setupGame() {
  currentRound = 1;
  currentQuestionIndex = 0;
  gameArea.classList.remove('hidden');
  teamForm.parentElement.classList.add('hidden');
  loadQuestion();
  updateTeamSelect();
}

// 9. Parse Questions using Papa Parse
function parseQuestions(data) {
  const parsedData = Papa.parse(data, {
    header: true,
    skipEmptyLines: true,
  });

  const parsedQuestions = parsedData.data.map((row, index) => {
    return {
      round: parseInt(row.Round),
      category: row.Category,
      difficulty: row.Difficulty.toLowerCase(),
      text: row.Question,
      answer: row.Answer,
      roundIndex: index,
    };
  });

  return parsedQuestions;
}

// 10. Load Question
function loadQuestion() {
  const question = questions.find(q => q.round === currentRound && q.roundIndex === currentQuestionIndex);
  if (question) {
    currentCategory = question.category;
    roundNumberSpan.textContent = currentRound;
    categoryNameSpan.textContent = currentCategory;
    questionTextP.textContent = question.text;
    correctAnswerText.textContent = '[Answer Hidden]';
    correctAnswerDisplay.classList.add('hidden');
    answerInput.value = '';
    answersSubmitted = {};
    correctAnswerRevealed = false;
    feedbackMessage.textContent = '';
    feedbackMessage.classList.remove('correct', 'incorrect');
    answerForm.classList.remove('hidden');
    nextQuestionButton.classList.add('hidden');
    updateTeamSelect();
  } else {
    // No more questions in this round
    currentRound++;
    currentQuestionIndex = 0;
    if (currentRound > totalRounds) {
      endGame();
    } else {
      loadQuestion();
    }
  }
}

// 11. Submit Answer
function submitAnswer(e) {
  e.preventDefault();
  const teamName = teamSelect.value;
  const userAnswer = answerInput.value.trim();
  if (teamName && userAnswer) {
    const question = questions.find(q => q.round === currentRound && q.roundIndex === currentQuestionIndex);
    if (!answersSubmitted[teamName]) {
      answersSubmitted[teamName] = userAnswer;
      if (userAnswer.toLowerCase() === question.answer.toLowerCase()) {
        // Correct answer
        playSound('correct');
        teamScores[teamName] += getPointsForDifficulty(question.difficulty);
        updateLeaderboard();
        revealCorrectAnswer(question.answer);
        feedbackMessage.textContent = `Correct! Well done, ${teamName}.`;
        feedbackMessage.classList.add('correct');
        // Remove team from selection
        const optionToRemove = teamSelect.querySelector(`option[value="${teamName}"]`);
        if (optionToRemove) {
          optionToRemove.remove();
        }
        answerForm.classList.add('hidden');
        nextQuestionButton.classList.remove('hidden');
        saveSession(); // Save the session after a correct answer
      } else {
        // Incorrect answer
        playSound('incorrect');
        feedbackMessage.textContent = `Incorrect answer, ${teamName}. Try again!`;
        feedbackMessage.classList.add('incorrect');
        // Remove team from selection to prevent multiple immediate attempts
        const optionToRemove = teamSelect.querySelector(`option[value="${teamName}"]`);
        if (optionToRemove) {
          optionToRemove.remove();
        }
        // Check if all teams have attempted
        if (teamSelect.options.length === 0 && !correctAnswerRevealed) {
          // All teams have attempted
          feedbackMessage.textContent = 'All teams have attempted. Moving to next question.';
          answerForm.classList.add('hidden');
          nextQuestionButton.classList.remove('hidden');
          revealCorrectAnswer(question.answer);
        }
        saveSession(); // Save the session after an incorrect answer
      }
    } else {
      feedbackMessage.textContent = 'You have already submitted an answer for this question.';
    }
    answerInput.value = '';
  } else {
    alert('Please select a team and enter an answer.');
  }
}

// 12. Reveal Correct Answer
function revealCorrectAnswer(answer) {
  correctAnswerText.textContent = answer;
  correctAnswerDisplay.classList.remove('hidden');
  correctAnswerRevealed = true;
}

// 13. Get Points for Difficulty
function getPointsForDifficulty(difficulty) {
  switch (difficulty) {
    case 'easy':
      return 1;
    case 'medium':
      return 2;
    case 'hard':
      return 3;
    default:
      return 1;
  }
}

// 14. Load Next Question
function loadNextQuestion() {
  currentQuestionIndex++;
  const questionExists = questions.some(q => q.round === currentRound && q.roundIndex === currentQuestionIndex);
  if (questionExists) {
    loadQuestion();
  } else {
    // Move to next round
    currentRound++;
    currentQuestionIndex = 0;
    if (currentRound <= totalRounds) {
      loadQuestion();
    } else {
      endGame();
    }
  }
  saveSession(); // Save the session after loading the next question
}

// 15. Update Leaderboard
function updateLeaderboard() {
  leaderboardList.innerHTML = '';
  // Sort teams by score
  const sortedTeams = Object.keys(teamScores).sort((a, b) => teamScores[b] - teamScores[a]);
  sortedTeams.forEach(team => {
    const li = document.createElement('li');
    li.textContent = `${team}: ${teamScores[team]} pts`;
    leaderboardList.appendChild(li);
  });
}

// 16. End Game
function endGame() {
  alert('Game Over! Check the leaderboard for final scores.');
  // Clear the session data since the game is over
  localStorage.removeItem('triviaSession');
}

// 17. Save Session
function saveSession() {
  sessionData = {
    teams,
    teamScores,
    currentRound,
    currentQuestionIndex,
    questions,
    answersSubmitted,
    correctAnswerRevealed,
    currentCategory,
  };
  localStorage.setItem('triviaSession', JSON.stringify(sessionData));
}

// 18. Load Session
function loadSession() {
  const savedSession = localStorage.getItem('triviaSession');
  if (savedSession) {
    sessionData = JSON.parse(savedSession);
    teams = sessionData.teams;
    teamScores = sessionData.teamScores;
    currentRound = sessionData.currentRound;
    currentQuestionIndex = sessionData.currentQuestionIndex;
    questions = sessionData.questions;
    answersSubmitted = sessionData.answersSubmitted || {};
    correctAnswerRevealed = sessionData.correctAnswerRevealed || false;
    currentCategory = sessionData.currentCategory || '';
    updateTeamList();
    updateTeamSelect();
    if (questions && questions.length > 0) {
      gameArea.classList.remove('hidden');
      teamForm.parentElement.classList.add('hidden');
      loadQuestion();
    }
  }
}

// 19. Edit Scores
function editScores() {
  teams.forEach(team => {
    const newScore = prompt(`Enter new score for ${team}:`, teamScores[team]);
    if (newScore !== null && !isNaN(newScore)) {
      teamScores[team] = parseInt(newScore);
    }
  });
  updateLeaderboard();
  saveSession(); // Save the session after editing scores
}

// 20. Skip Question
function skipQuestion() {
  revealCorrectAnswer(questions.find(q => q.round === currentRound && q.roundIndex === currentQuestionIndex).answer);
  answerForm.classList.add('hidden');
  nextQuestionButton.classList.remove('hidden');
  saveSession(); // Save the session after skipping a question
}

// 21. Play Sound
function playSound(type) {
  // Implement sound playing functionality if desired
}

// Load the session when the page is loaded
window.addEventListener('load', loadSession);
