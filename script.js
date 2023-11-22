
//type writer

var span = document.querySelector(".typewriter span");
var textArr = span.getAttribute("data-text").split(", "); 
var maxTextIndex = textArr.length; 

var sPerChar = 0.15; 
var sBetweenWord = 1.5;
var textIndex = 0; 

typing(textIndex, textArr[textIndex]); 

function typing(textIndex, text) {
    var charIndex = 0; 
    var maxCharIndex = text.length - 1; 
    
    var typeInterval = setInterval(function () {
        span.innerHTML += text[charIndex]; 
        if (charIndex == maxCharIndex) {
            clearInterval(typeInterval);
            setTimeout(function() { deleting(textIndex, text) }, sBetweenWord * 1000); 
            
        } else {
            charIndex += 1; 
        }
    }, sPerChar * 1000); 
}

function deleting(textIndex, text) {
    var minCharIndex = 0; 
    var charIndex = text.length - 1; 

    var typeInterval = setInterval(function () {
        span.innerHTML = text.substr(0, charIndex); 
        if (charIndex == minCharIndex) {
            clearInterval(typeInterval);
            textIndex + 1 == maxTextIndex ? textIndex = 0 : textIndex += 1; 
            setTimeout(function() { typing(textIndex, textArr[textIndex]) }, sBetweenWord * 1000); 
        } else {
            charIndex -= 1; 
        }
    }, sPerChar * 1000); 
}

//progressbar

const counters = document.querySelectorAll(".counter");

counters.forEach((counter) => {
  counter.innerText = "0";
  const updateCounter = () => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;
    const increment = target / 300;
    if (count < target) {
      counter.innerText = `${Math.ceil(count + increment)}`;
      setTimeout(updateCounter, 1);
    } else counter.innerText = target;
  };
  updateCounter();
});


//Darkmode

const darkModeToggles = document.querySelectorAll('.dark-mode-toggle');
const body = document.body;

// Check if the user's dark mode preference is stored
if (localStorage.getItem('darkMode') === 'enabled') {
    enableDarkMode();
}

darkModeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });
});

function enableDarkMode() {
    body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled');
}

function disableDarkMode() {
    body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'disabled');
}





//color picker


function changeColor(newColor) {
    document.documentElement.style.setProperty('--color', newColor);
    localStorage.setItem('mainColor', newColor);
}

// Check if there is a saved color in local storage and apply it
const savedColor = localStorage.getItem('mainColor');
if (savedColor) {
    changeColor(savedColor);
}

//moving div

document.addEventListener("DOMContentLoaded", function() {
    var draggableDiv = document.getElementById('draggableDiv');
    var offsetX, offsetY, isDragging = false;

    // Add touch event listeners
    draggableDiv.addEventListener('touchstart', function(e) {
        isDragging = true;
        var touch = e.touches[0];
        offsetX = touch.clientX - draggableDiv.getBoundingClientRect().left;
        offsetY = touch.clientY - draggableDiv.getBoundingClientRect().top;
    });

    draggableDiv.addEventListener('touchmove', function(e) {
        if (isDragging) {
            e.preventDefault();
            var touch = e.touches[0];
            var newX = touch.clientX - offsetX;
            var newY = touch.clientY - offsetY;

            // Ensure the draggable div stays within the window boundaries
            newX = Math.max(0, Math.min(window.innerWidth - draggableDiv.offsetWidth, newX));
            newY = Math.max(0, Math.min(window.innerHeight - draggableDiv.offsetHeight, newY));

            draggableDiv.style.left = newX + 'px';
            draggableDiv.style.top = newY + 'px';
        }
    });

    draggableDiv.addEventListener('touchend', function() {
        isDragging = false;
    });
});