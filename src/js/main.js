document.addEventListener('DOMContentLoaded', () => {
  // Get HTML Components
  const passwordInput = document.getElementById('passwordInput');
  const complexMeter = document.getElementById('progressBar');
  const scoreDisplay = document.getElementById('scoreDisplay');
  const resultsDiv = document.getElementById('results');


  // Add Listener to Input Field
  passwordInput.addEventListener('keyup', (e) => {
    // Look for number characters
    charTypes.nums = (e.target.value.match(/[0-9]/g) || '').length;
    // Look for number of lower case
    charTypes.lower = (e.target.value.match(/[a-z]/g) || '').length;
    // Look for number of upper case
    charTypes.upper = (e.target.value.match(/[A-Z]/g) || '').length;
    // Look for number of symbles
    charTypes.symbols = (e.target.value.match(/[!|+|\\|_|-|*|@|&|#|^|?|~|%|$|\[|\]]/g) || '').length;
    
    // Set Progress Bar
    let progressValue = score(e.target.value);
    complexMeter.setAttribute('aria-valuenow', progressValue);
    complexMeter.setAttribute('style', `width: ${progressValue}%`);
    if (progressValue < 50) {
    complexMeter.classList.remove('bg-success');
    if (progressValue <= 25) {
      complexMeter.classList.remove('bg-info');
      complexMeter.classList.remove('bg-warning');
      complexMeter.classList.add('bg-danger');
    } else if (progressValue > 25) {
      complexMeter.classList.remove('bg-info');
      complexMeter.classList.remove('bg-danger');
      complexMeter.classList.add('bg-warning');
    }
    } else if (progressValue < 75) {
      complexMeter.classList.remove('bg-warning');
      complexMeter.classList.remove('bg-danger');
      complexMeter.classList.add('bg-info');
    } else {
      complexMeter.classList.remove('bg-warning');
      complexMeter.classList.remove('bg-info');
      complexMeter.classList.remove('bg-danger');
      complexMeter.classList.add('bg-success');
    }

    // Populate Results Section
    scoreDisplay.innerText = progressValue;
    resultsDiv.innerHTML = '';
    results.points.map((p) => {
      resultsDiv.innerHTML += `<p class='text-success'>${p}</p>`;
    });
    results.pentalies.map((p) => {
      resultsDiv.innerHTML += `<p class='text-warning'>${p}</p>`;
  });
  }); // Read Character on every keyup event
});

// Setup Tracking Variables
let charTypes = {
  nums: 0,
  upper: 0,
  lower: 0,
  symbols: 0,
};

let results = {
  points: [],
  pentalies: [],
};

function score(password) {
  results.points = []; // Clearout old Points
  results.pentalies = []; // Clearout old pentalies
  let score = 0;
  if (password.length >= 8) {
    score += 50; //give 50 points for having at least 8 characters
    results.points.push("50 Points for having at least 8 characters");
  } else {
    score -= 50; //Loose upto 50 points for a passwrod that is too short
    results.pentalies.push("Less than 8 characters. Loose 50 Points");
  }

  // Check for complexity
  if ((charTypes.nums > 2 && charTypes.lower > 2 && charTypes.upper > 2)) {
    // Have Minimum multiple character types
    score += 25; //Get 25 points
    results.points.push("25 points for having multiple types of characters");
  } else {
    if (charTypes.nums > 0) {
      score += 5; //Only 5 points for having a single digit in password
      results.points.push("5 points for having a single digit in password");
    }
    if (charTypes.upper > 0) {
      score += 5; //Only 5 points for having a single Upper Case character
      results.points.push("5 points for having Upper Case Character");
    }
  }

  // Check for symbols
  if (charTypes.symbols > 0) {
    score += 20; //20 points for any symbols in password
    results.points.push("20 Points for having a Symbol");
  }
  if (charTypes.symbols > 1) {
    score += 5; // Full points for having multiple symbols
    results.points.push("5 Points for having more than 1 Symbol");
  }

  // Pentaly points
  if (charTypes.upper === 0) {
    score -= 15; //15 Points deducted for no Upper Case letters
    results.pentalies.push("No Upper Case Characters. Loose 15 Points");
  }
  if (charTypes.symbols === 0) {
    score -= 15; //15 Points deducted for no Symbolse used
    results.pentalies.push("No Symbols Used. Loose 15 Points")
  }
  if (charTypes.lower === password.length || (charTypes.lower + charTypes.nums) === password.length) {
    score -= 50; //Password of only lower case or lower case and numbers are too weak
    results.pentalies.push("Flat Password of lower case or lower case and numbers only. Loose 50 points");
  }
  if (charTypes.nums === password.lenght) {
    score -= 75; // Passwords of only numbers are two week
    results.pentalies.push("Password is only numbers. Loose 75 points");
  }

  return score;
};
