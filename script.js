
document.addEventListener('DOMContentLoaded', async function () {
    const inputField = document.getElementById('inputField');
    const addButton = document.getElementById('addButton');
    const downloadButton = document.getElementById('downloadButton');
    const listContainer = document.getElementById('listContainer');
    let savedItems = [];

    // Fetch the list from GitHub with cache-busting headers
    async function fetchListFromGitHub() {
        try {
            const response = await fetch(`https://raw.githubusercontent.com/p3lch/Bloodwings-Lootmanager/main/saved_list.json?timestamp=${new Date().getTime()}`, {
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            });
            console.log('Fetching list:', response.status, response.statusText);
            if (response.ok) {
                savedItems = await response.json();
                console.log('Fetched items:', savedItems);
                listContainer.innerHTML = ''; // Clear current list
                savedItems.forEach(item => addItemToList(item));
            } else {
                console.error('Error fetching the list from GitHub:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching the list from GitHub:', error);
        }
    }

    // Add new item to the list (only updates UI, not GitHub directly)
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
