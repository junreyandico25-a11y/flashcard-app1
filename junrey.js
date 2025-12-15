document.addEventListener('DOMContentLoaded', () => {
    const flashcardInner = document.getElementById('flashcard-inner');
    const questionEl = document.getElementById('question');
    const choicesEl = document.getElementById('choices');
    const feedbackEl = document.getElementById('feedback');
    const resetButton = document.getElementById('reset-button');
    
    let currentCardIndex = 0;
    let score = 0;
    
    const flashcards = [
        {
        question: "1. What is the largest planet in our solar system?",
        choices: ["Mars", "Jupiter", "Saturn", "Neptune"],
        answer: "Jupiter"
    },
    {
        question: "2. Which element has the chemical symbol 'O'?",
        choices: ["Gold", "Oxygen", "Osmium", "Iron"],
        answer: "Oxygen"
    },
    {
        question: "3. Who painted the Mona Lisa?",
        choices: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        answer: "Leonardo da Vinci"
    },
    {
        question: "4. What is the capital city of Australia?",
        choices: ["Sydney", "Melbourne", "Canberra", "Perth"],
        answer: "Canberra"
    },
    {
        question: "5. What is the unit of electric resistance?",
        choices: ["Volt", "Ampere", "Watt", "Ohm"],
        answer: "Ohm"
    },
    {
        question: "6. Which ocean is the largest and deepest?",
        choices: ["Atlantic Ocean", "Indian Ocean", "Southern Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean"
    },
    {
        question: "7. In what year did the Titanic sink?",
        choices: ["1912", "1905", "1918", "1923"],
        answer: "1912"
    },
    {
        question: "8. How many legs does a spider have?",
        choices: ["Six", "Eight", "Ten", "Four"],
        answer: "Eight"
    },
    {
        question: "9. What is the hardest natural substance on Earth?",
        choices: ["Gold", "Iron", "Diamond", "Quartz"],
        answer: "Diamond"
    },
    {
        question: "10. Which mythological creature is half-man, half-bull?",
        choices: ["Centaur", "Sphinx", "Minotaur", "Cyclops"],
        answer: "Minotaur"
    }
    ];
    
    const totalCards = flashcards.length;

    function loadCard(index) {
        flashcardInner.classList.remove('is-flipped');
        feedbackEl.className = 'feedback';
        
        const card = flashcards[index];
        questionEl.textContent = card.question;
        choicesEl.innerHTML = '';

        card.choices.forEach(choice => {
            const button = document.createElement('button');
            button.textContent = choice;
            button.addEventListener('click', () => handleChoiceClick(choice, card.answer));
            choicesEl.appendChild(button);
        });
        
        resetButton.textContent = (index === totalCards - 1) ? "Finish Quiz" : "Next Question";
    }

    function handleChoiceClick(selectedChoice, correctAnswer) {
        disableChoices(); 
        
        if (selectedChoice === correctAnswer) {
            feedbackEl.textContent = "Correct!";
            feedbackEl.classList.add('correct');
            score++; 
        } else {
            feedbackEl.textContent = "Incorrect. The correct answer was " + correctAnswer + ".";
            feedbackEl.classList.add('incorrect');
        }
        
        flashcardInner.classList.add('is-flipped');
    }

    function disableChoices() {
        Array.from(choicesEl.children).forEach(button => {
            button.disabled = true;
        });
    }

    function displayFinalScore() {
        flashcardInner.classList.remove('is-flipped');
        questionEl.textContent = "Quiz Complete!";
        choicesEl.innerHTML = `
            <h2>Score:</h2>
            <p style="font-size: 2em; font-weight: bold; color: white">${score} / ${totalCards}</p>
            <button id="restart-button" style="margin-top: 20px;">Restart Quiz</button>
        `;
        
        document.querySelector('.flashcard-back').style.display = 'none';
        document.getElementById('restart-button').addEventListener('click', () => {
            currentCardIndex = 0;
            score = 0;
            document.querySelector('.flashcard-back').style.display = 'flex';
            loadCard(currentCardIndex);
        });
    }

    function goToNextCard() {
        if (currentCardIndex < totalCards - 1) {
            currentCardIndex++;
            loadCard(currentCardIndex);
        } else {
            displayFinalScore();
        }
    }

    resetButton.addEventListener('click', goToNextCard);

    loadCard(currentCardIndex);
});
