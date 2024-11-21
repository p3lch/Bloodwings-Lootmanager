
document.addEventListener('DOMContentLoaded', async function () {
    const inputField = document.getElementById('inputField');
    const addButton = document.getElementById('addButton');
    const downloadButton = document.getElementById('downloadButton');
    const listContainer = document.getElementById('listContainer');
    let savedItems = [];

    // Fetch the list from GitHub
    async function fetchListFromGitHub() {
        try {
            const response = await fetch('https://raw.githubusercontent.com/<P3lch>/<Bloodwings-Lootmanager>/main/saved_list.json');
            if (response.ok) {
                savedItems = await response.json();
                savedItems.forEach(item => addItemToList(item));
            } else {
                console.error('Error fetching the list from GitHub:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching the list from GitHub:', error);
        }
    }

    // Add new item when button is clicked
    addButton.addEventListener('click', function () {
        const inputValue = inputField.value.trim();
        if (inputValue) {
            addItemToList(inputValue);
            savedItems.push(inputValue);
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

    // Load the list from GitHub
    await fetchListFromGitHub();
});
