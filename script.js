
document.getElementById('dynamicButton').addEventListener('click', function () {
    const dynamicText = document.getElementById('dynamicText');
    const newText = "You've clicked the button!";
    dynamicText.textContent = newText;

    // Speichere den Text in LocalStorage
    localStorage.setItem('savedText', newText);

    // Optional: Biete das Herunterladen des Textes an
    const blob = new Blob([newText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'saved_text.txt';
    link.textContent = "Download Saved Text";
    document.body.appendChild(link);

    dynamicText.style.color = "#007bff";
    dynamicText.style.fontWeight = "bold";
});

// Beim Laden der Seite gespeicherte Daten wiederherstellen
window.addEventListener('load', function () {
    const savedText = localStorage.getItem('savedText');
    if (savedText) {
        document.getElementById('dynamicText').textContent = savedText;
    }
});
