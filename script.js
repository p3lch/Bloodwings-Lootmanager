
document.addEventListener('DOMContentLoaded', function () {
    const inputField = document.getElementById('inputField');
    const addButton = document.getElementById('addButton');
    const downloadButton = document.getElementById('downloadButton');
    const listContainer = document.getElementById('listContainer');

    // Load saved items from LocalStorage on page load
    const savedItems = JSON.parse(localStorage.getItem('savedList')) || [];
    savedItems.forEach(item => {
        addItemToList(item);
    });

    // Add new item when button is clicked
    addButton.addEventListener('click', function () {
        const inputValue = inputField.value.trim();
        if (inputValue) {
            addItemToList(inputValue);
            savedItems.push(inputValue);
            localStorage.setItem('savedList', JSON.stringify(savedItems));
            inputField.value = ''; // Clear the input field
        }
    });

    // Download the list as a JSON file
    downloadButton.addEventListener('click', function () {
        const blob = new Blob([JSON.stringify(savedItems, null, 2)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'saved_list.json';
        link.click();
    });

    // Function to add item to the list
    function addItemToList(text) {
        const listItem = document.createElement('li');
        listItem.textContent = text;
        listContainer.appendChild(listItem);
    }
});
