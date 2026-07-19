// ========================================
// Quiz Data
// ========================================

const quizzes = {
  iot: {
    title: "🌐 IoT Basics",

    questions: [
      {
        question: "Which protocol is lightweight for IoT communication?",

        options: ["HTTP", "MQTT", "FTP", "SMTP"],

        answer: "MQTT",
      },

      {
        question: "Which board has built-in Wi-Fi?",

        options: ["Arduino Uno", "ESP32", "8051", "Raspberry Pi Pico"],

        answer: "ESP32",
      },

      {
        question: "IoT stands for?",

        options: [
          "Internet of Things",

          "Interface of Things",

          "Internet of Technology",

          "Input of Things",
        ],

        answer: "Internet of Things",
      },

      {
        question: "Which cloud platform is commonly used with IoT?",

        options: ["ThingSpeak", "MS Paint", "Photoshop", "Excel"],

        answer: "ThingSpeak",
      },

      {
        question: "ESP32 mainly communicates using?",

        options: ["Wi-Fi & Bluetooth", "VGA", "HDMI", "RS232 Only"],

        answer: "Wi-Fi & Bluetooth",
      },
    ],
  },

  arduino: {
    title: "🤖 Arduino Programming",

    questions: [
      {
        question: "Which function runs only once?",

        options: ["loop()", "setup()", "main()", "start()"],

        answer: "setup()",
      },

      {
        question: "Which function repeats continuously?",

        options: ["repeat()", "setup()", "loop()", "while()"],

        answer: "loop()",
      },

      {
        question: "Which function sets pin mode?",

        options: ["digitalWrite()", "analogRead()", "pinMode()", "pinWrite()"],

        answer: "pinMode()",
      },

      {
        question: "Which function reads analog values?",

        options: [
          "analogRead()",

          "digitalRead()",

          "analogWrite()",

          "readPin()",
        ],

        answer: "analogRead()",
      },

      {
        question: "Which language is used in Arduino?",

        options: ["Python", "Embedded C/C++", "Java", "PHP"],

        answer: "Embedded C/C++",
      },
    ],
  },

  sensors: {
    title: "📡 Sensors & Modules",

    questions: [
      {
        question: "Which sensor measures temperature?",

        options: ["DHT11", "IR", "LDR", "PIR"],

        answer: "DHT11",
      },

      {
        question: "Which sensor detects distance?",

        options: ["Ultrasonic", "LDR", "IR", "DHT11"],

        answer: "Ultrasonic",
      },

      {
        question: "LDR detects?",

        options: ["Light", "Heat", "Distance", "Humidity"],

        answer: "Light",
      },

      {
        question: "PIR sensor detects?",

        options: ["Motion", "Light", "Temperature", "Pressure"],

        answer: "Motion",
      },

      {
        question: "IR stands for?",

        options: [
          "Infrared",

          "Internal Reading",

          "Input Relay",

          "Internet Relay",
        ],

        answer: "Infrared",
      },
    ],
  },

  embedded: {
    title: "⚡ Embedded C",

    questions: [
      {
        question: "GPIO stands for?",

        options: [
          "General Purpose Input Output",

          "General Port IO",

          "Global Pin Output",

          "General Processing IO",
        ],

        answer: "General Purpose Input Output",
      },

      {
        question: "Which loop executes at least once?",

        options: ["for", "while", "do...while", "foreach"],

        answer: "do...while",
      },

      {
        question: "Which keyword defines a function?",

        options: ["void", "class", "struct", "define"],

        answer: "void",
      },

      {
        question: "Which operator compares equality?",

        options: ["=", "==", "!=", ">"],

        answer: "==",
      },

      {
        question: "Pointers store?",

        options: ["Memory Address", "Characters", "Arrays", "Files"],

        answer: "Memory Address",
      },
    ],
  },
};

// ========================================
// DOM Elements
// ========================================

const moduleCards = document.querySelectorAll(".module-card");

const homeSection = document.getElementById("home-section");

const quizSection = document.getElementById("quiz-section");

const resultSection = document.getElementById("result-section");

const moduleTitle = document.getElementById("module-title");

const questionCounter = document.getElementById("question-counter");

const question = document.getElementById("question");

const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");

const radios = document.querySelectorAll("input[name='answer']");

const nextBtn = document.getElementById("next-btn");

const backBtn = document.getElementById("back-btn");

const errorMessage = document.getElementById("error-message");

const scoreText = document.getElementById("score-text");

const performance = document.getElementById("performance");

const reviewList = document.getElementById("review-list");

const restartBtn = document.getElementById("restart-btn");

// ========================================
// Variables
// ========================================

let currentQuiz = [];

let currentModule = "";

let currentQuestion = 0;

let score = 0;

let userAnswers = [];

// ========================================
// Start Quiz When Module is Selected
// ========================================

moduleCards.forEach((card) => {
  card.addEventListener("click", () => {
    currentModule = card.dataset.module;

    currentQuiz = quizzes[currentModule].questions;

    currentQuestion = 0;

    score = 0;

    userAnswers = [];

    homeSection.classList.add("hidden");
    resultSection.classList.add("hidden");
    quizSection.classList.remove("hidden");

    moduleTitle.textContent = quizzes[currentModule].title;

    nextBtn.textContent = "Next →";

    loadQuestion();
  });
});

// ========================================
// Load Question
// ========================================

function loadQuestion() {
  clearSelection();

  errorMessage.classList.add("hidden");

  const q = currentQuiz[currentQuestion];

  questionCounter.textContent = `Question ${currentQuestion + 1} of ${currentQuiz.length}`;

  question.textContent = q.question;

  option1.textContent = q.options[0];
  option2.textContent = q.options[1];
  option3.textContent = q.options[2];
  option4.textContent = q.options[3];

  radios[0].value = q.options[0];
  radios[1].value = q.options[1];
  radios[2].value = q.options[2];
  radios[3].value = q.options[3];

  if (currentQuestion === currentQuiz.length - 1) {
    nextBtn.textContent = "Submit Quiz";
  } else {
    nextBtn.textContent = "Next →";
  }
}

// ========================================
// Clear Radio Selection
// ========================================

function clearSelection() {
  radios.forEach((radio) => {
    radio.checked = false;
  });
}

// ========================================
// Get Selected Answer
// ========================================

function getSelectedAnswer() {
  let answer = "";

  radios.forEach((radio) => {
    if (radio.checked) {
      answer = radio.value;
    }
  });

  return answer;
}

// ========================================
// Next / Submit Button
// ========================================

nextBtn.addEventListener("click", () => {
  const selected = getSelectedAnswer();

  if (selected === "") {
    errorMessage.classList.remove("hidden");

    return;
  }

  errorMessage.classList.add("hidden");

  userAnswers.push(selected);

  if (selected === currentQuiz[currentQuestion].answer) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < currentQuiz.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

// ========================================
// Back Button
// ========================================

backBtn.addEventListener("click", () => {
  quizSection.classList.add("hidden");

  resultSection.classList.add("hidden");

  homeSection.classList.remove("hidden");
});

// ========================================
// Show Result
// ========================================

function showResult() {
  quizSection.classList.add("hidden");
  resultSection.classList.remove("hidden");

  scoreText.textContent = `${score} / ${currentQuiz.length}`;

  if (score === currentQuiz.length) {
    performance.textContent = "🏆 Excellent! Perfect Score!";
  } else if (score >= 4) {
    performance.textContent = "🎉 Great Job! Keep Learning!";
  } else if (score >= 3) {
    performance.textContent = "👍 Good Work! Practice More!";
  } else {
    performance.textContent = "📚 Keep Practicing! You'll Improve!";
  }

  reviewList.innerHTML = "";

  let wrongCount = 0;

  currentQuiz.forEach((q, index) => {
    if (userAnswers[index] !== q.answer) {
      wrongCount++;

      const card = document.createElement("div");

      card.className = "review-card";

      card.innerHTML = `
                <h4>Question ${index + 1}</h4>

                <p><strong>${q.question}</strong></p>

                <p class="wrong">
                    ❌ Your Answer:
                    ${userAnswers[index]}
                </p>

                <p class="correct">
                    ✅ Correct Answer:
                    ${q.answer}
                </p>
            `;

      reviewList.appendChild(card);
    }
  });

  const reviewSection = document.getElementById("review-section");

  if (wrongCount === 0) {
    reviewSection.classList.add("hidden");
  } else {
    reviewSection.classList.remove("hidden");
  }
}

// ========================================
// Choose Another Module Button
// ========================================

restartBtn.addEventListener("click", () => {
  resultSection.classList.add("hidden");

  quizSection.classList.add("hidden");

  homeSection.classList.remove("hidden");

  currentQuestion = 0;

  score = 0;

  userAnswers = [];

  clearSelection();
});

// ========================================
// End of Script
// ========================================
