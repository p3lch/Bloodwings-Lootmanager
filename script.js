
document.addEventListener('DOMContentLoaded', function () {
    const inputField = document.getElementById('inputField');
    const addButton = document.getElementById('addButton');
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

    // Function to add item to the list
    function addItemToList(text) {
        const listItem = document.createElement('li');
        listItem.textContent = text;
        listContainer.appendChild(listItem);
    }
});
