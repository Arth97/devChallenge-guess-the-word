// script.js

const words = ["example", "javascript", "coding", "challenge"];
let currentWord = "";
let tries = 0;
let mistakes = [];

function scrambleWord(word) {
	let letters = word.split('');
	for (let i = letters.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[letters[i], letters[j]] = [letters[j], letters[i]];
	}
	const scrambled = letters.join('');
	return scrambled === word ? scrambleWord(word) : scrambled;
}

function generateRandomWord() {
	currentWord = words[Math.floor(Math.random() * words.length)];
	const scrambled = scrambleWord(currentWord);
	document.getElementById('input-word').value = scrambled;
	createInputFields(currentWord.length);
	tries = 0;
	mistakes = [];
	updateUI();
}

function createInputFields(length) {
	const lettersContainer = document.querySelector('.letters');
	lettersContainer.innerHTML = '';
	
	for (let i = 0; i < length; i++) {
		const input = document.createElement('input');
		input.type = 'text';
		input.maxLength = 1;
		input.className = 'letter-input';
		input.dataset.index = i;
		input.addEventListener('input', handleInput);
		lettersContainer.appendChild(input);
	}
}

function handleInput(event) {
	const input = event.target;
	const index = parseInt(input.dataset.index);
	const value = input.value.toLowerCase();
	
	if (value) {
		if (value !== currentWord[index]) {
			mistakes.push(value);
		}
		
		const inputs = document.querySelectorAll('.letter-input');
		const nextInput = inputs[index + 1];
		if (nextInput) {
			nextInput.focus();
		}
		
		checkWin();
	}
	// updateUI();
}

function checkWin() {
	const inputs = document.querySelectorAll('.letter-input');
	let completed = true;
	let allCorrect = true;
	
	inputs.forEach((input, index) => {
		if (!input.value) {
			completed = false;
		} else if (input.value.toLowerCase() !== currentWord[index]) {
			allCorrect = false;
		}
	});
	
	if (completed) {
		tries++;
		if (allCorrect) {
			alert('🎉 Success');
		} else if (tries >= 5) {
			alert('Game Over. Correct word is: ' + currentWord);
		}
		updateUI();
	}
}

function updateUI() {
	const triesElement = document.querySelector('.text-small:first-child');
	triesElement.textContent = `Tries(${tries}/5): `;

	const dots = document.querySelectorAll('.dot');
	dots.forEach((dot, index) => {
		if (tries>index)
		dot.classList.remove('dot-off');
		dot.classList.add('dot-on');
	});
	
	const mistakesElement = document.querySelector('.text-small:last-child');
	const mistakesJoined = mistakes.join(', ')
	mistakesElement.textContent = `Mistakes: ${mistakesJoined}`;
}

function resetGame() {
	tries = 0;
	mistakes = [];
	generateRandomWord();
	const dots = document.querySelectorAll('.dot');
	dots.forEach((dot, index) => {
		dot.classList.add('dot-off');
		dot.classList.remove('dot-on');
	});
}

document
	.querySelector('.button-random')
	.addEventListener('click', generateRandomWord);
document
	.querySelector('.button-reset')
	.addEventListener('click', resetGame);

// Initial load
generateRandomWord();