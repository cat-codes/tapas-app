//Defiing global variables
const addItems = document.querySelector(".add-items"); // Input form
const itemsList = document.querySelector(".plates"); // List to display items
const items = JSON.parse(localStorage.getItem("items")) || []; // Items array

// Storing updated array in local storage
function saveItems(items) {
    localStorage.setItem("items", JSON.stringify(items));
}

// Displaying items' list
function displayItems() {
    itemsList.innerHTML = items.map((item, index) => {
        return `<li>
            <input type="checkbox" data-index=${index} id=${index} ${item.done ? "checked" : ""} /> 
            <label for=${index}><span>${item.text}</span></label>
            <button class = "delete" data-index=${index}>X</button>
        </li>`;
    }).join((""));
}

// Toggling checkboxes
function toggleCheck(event) {
    if(!event.target.matches("input")) return;
    const itemIndex = event.target.dataset.index;
    items[itemIndex].done = !items[itemIndex].done;
    saveItems(items);
}

itemsList.addEventListener("click", toggleCheck);

// Adding new item
addItems.addEventListener("submit", function(event) {
    event.preventDefault();
    const text = this.querySelector("[name=item]").value;
    const item = {
        text,
        done: false
    };
    items.push(item); // Adds item to array
    this.reset(); // Clears input field
    console.log(items); // Console.logs updated array
    displayItems(); // Displays item on web page
    saveItems(items);
});

// Removing item
function deleteItem(event) {
    if(!event.target.matches("button")) return;
    const itemIndex = event.target.dataset.index;
    items.splice(itemIndex, 1);
    saveItems(items);
    displayItems();
}

itemsList.addEventListener("click", deleteItem);

displayItems();