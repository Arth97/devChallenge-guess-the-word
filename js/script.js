// script.js

const words = ["example", "javascript", "coding", "challenge"];
let currentWord = "";
let tries = 0;
let mistakes = 0;

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
	// Seleccionar una palabra aleatoria del array
	currentWord = words[Math.floor(Math.random() * words.length)];
	// Mostrar la palabra mezclada en el input
	const scrambled = scrambleWord(currentWord);
	console.log("scrambled", scrambled)
	document.getElementById('input-word').value = scrambled;
	// Crear los campos de entrada
	createInputFields(currentWord.length);
	// Reiniciar contadores
	tries = 0;
	mistakes = 0;
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
		// Verificar si la letra es correcta
		if (value === currentWord[index]) {
			input.classList.add('correct');
			input.classList.remove('incorrect');
		} else {
			input.classList.add('incorrect');
			input.classList.remove('correct');
			mistakes++;
		}
		
		// Mover al siguiente input
		const inputs = document.querySelectorAll('.letter-input');
		const nextInput = inputs[index + 1];
		if (nextInput) {
			nextInput.focus();
		}
		
		// Verificar si todas las letras están completas
		checkWin();
	}
	updateUI();
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
			alert('¡Felicitaciones! Has adivinado la palabra correctamente.');
		} else if (tries >= 5) {
			alert('Game Over. La palabra correcta era: ' + currentWord);
		}
		updateUI();
	}
}

function updateUI() {
	// Actualizar los puntos de intentos
	const dots = document.querySelectorAll('.dot');
	dots.forEach((dot, index) => {
		dot.classList.toggle('dot-on', index >= tries);
	});
	
	// Actualizar el contador de errores
	const mistakesElement = document.querySelector('.text-small:last-child');
	mistakesElement.textContent = `Mistakes: ${mistakes}`;
}

function resetGame() {
	// Limpiar todos los campos
	document.querySelectorAll('.letter-input').forEach(input => {
		input.value = '';
		input.classList.remove('correct', 'incorrect');
	});
	
	// Reiniciar contadores
	tries = 0;
	mistakes = 0;
	
	// Generar nueva palabra
	generateRandomWord();
}

document
	.querySelector('.button-random')
	.addEventListener('click', generateRandomWord);
document
	.querySelector('.button-reset')
	.addEventListener('click', resetGame);

// Initial load
generateRandomWord();