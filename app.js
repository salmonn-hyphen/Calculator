const display = document.querySelector(".calculator-screen");
const buttons = document.querySelectorAll(".button");

//display the number when clicked the button
buttons.forEach(btn =>{
    btn.addEventListener("click",() => {
        if(btn.classList.contains("clear")){
            display.value = "";
        }else{
            const input = btn.textContent;
            display.value += input;
        }
        adjustFontSize();
    });
});

//adjust font size to show on the screen
function adjustFontSize() {
    const textLength = display.value.length;

    // You'll need to fine-tune these breakpoints and font sizes
    // Test with your specific font and desired visual feel
    if (textLength > 16) { // Very long numbers
        display.style.fontSize = "0.9em";
    } else if (textLength > 13) { // Longer numbers
        display.style.fontSize = "1.2em";
    } else if (textLength > 10) { // Medium long numbers
        display.style.fontSize = "1.6em";
    } else if (textLength > 7) { // Numbers just slightly over the 7-digit mark
        display.style.fontSize = "2.0em";
    } else { // 7 digits or less
        display.style.fontSize = "2.5em"; // Base font size from CSS
    }
}
