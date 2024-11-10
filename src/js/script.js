const display = document.getElementById('resultado');
let currentNumber = '';
let previousNumber = '';
let operator = null;
let hasCalculated = false;

// Seleciona todos os botões da calculadora
const buttons = document.querySelectorAll('.button');

// Adiciona um event listener a cada botão
buttons.forEach(button => {
  button.addEventListener('click', handleButtonClick);
});

// Adiciona um event listener para o teclado
document.addEventListener('keydown', handleKeyPress);

// Função para lidar com o clique nos botões
function handleButtonClick(event) {
  const value = event.target.dataset.value;

  if (/\d|\./.test(value)) {
    handleNumberInput(value);
  } else if (['+', '-', '*', '/'].includes(value)) {
    handleOperatorInput(value);
  } else if (value === '=') {
    calculate();
  } else if (value === 'C') {
    clear();
  } else if (value === '<') {
    backspace();
  }
}

// Função para lidar com a entrada de números
function handleNumberInput(number) {
  // Verifica se o número a ser adicionado é um ponto e se já existe um ponto no número atual
  if (number === '.' && currentNumber.includes('.')) {
    return; 
  }

  if (hasCalculated) {
    // Se acabou de ser calculado, reinicia o estado da calculadora
    currentNumber = number;
    hasCalculated = false;
  } else {
    currentNumber += number;
  }

  updateDisplay();
}

// Função para lidar com a entrada de operadores
function handleOperatorInput(op) {
  if (currentNumber === '' && !hasCalculated) {
    return; // Não faz nada se não houver número atual ou anterior
  }

  if (previousNumber !== '' && currentNumber !== '') {
    calculate(); 
  }

  operator = op;
  previousNumber = currentNumber;
  currentNumber = '';
  updateDisplay();
}

// Função para calcular o resultado
function calculate() {
  if (operator === null || currentNumber === '') {
    return;
  }

  const prev = parseFloat(previousNumber);
  const curr = parseFloat(currentNumber);

  switch (operator) {
    case '+':
      currentNumber = (prev + curr).toString();
      break;
    case '-':
      currentNumber = (prev - curr).toString();
      break;
    case '*':
      currentNumber = (prev * curr).toString();
      break;
    case '/':
      if (curr === 0) {
        alert('Não é possível dividir por 0');
        return;
      }
      currentNumber = (prev / curr).toString();
      break;
  }

  previousNumber = '';
  operator = null;
  hasCalculated = true;
  updateDisplay();
}

// Função para limpar a calculadora
function clear() {
  currentNumber = '';
  previousNumber = '';
  operator = null;
  hasCalculated = false;
  updateDisplay();
}

// Função para apagar o último dígito
function backspace() {
  currentNumber = currentNumber.slice(0, -1); 
  updateDisplay(); 
}

// Função para lidar com a entrada do teclado
function handleKeyPress(event) {
  const key = event.key;

  if (key === 'Enter') {
    event.preventDefault(); 
    calculate();
  } else if (key === 'Backspace') {
    backspace();
  } else if (/\d|\./.test(key)) {
    handleNumberInput(key);
  } else if (['+', '-', '*', '/'].includes(key)) {
    handleOperatorInput(key);
  }
}

// Função para atualizar o display da calculadora
function updateDisplay() {
  display.value = previousNumber + ' ' + (operator || '') + ' ' + currentNumber;
}