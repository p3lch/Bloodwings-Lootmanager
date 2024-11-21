
document.getElementById('dynamicButton').addEventListener('click', function() {
    const dynamicText = document.getElementById('dynamicText');
    dynamicText.textContent = "You've clicked the button!";
    dynamicText.style.color = "#007bff";
    dynamicText.style.fontWeight = "bold";
});
