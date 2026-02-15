let addBtn = document.querySelector(".add-btn");
let form = document.querySelector("form");
let inputs = document.querySelectorAll("input");
let cardGrid = document.querySelector(".card-grid");
let cancelBtn = document.querySelector(".cancel-card");
let noResults = document.querySelector(".no-results");
let searchBox = document.querySelector("#search-box");

addBtn.addEventListener("click", () => form.style.display = "block");

cancelBtn.addEventListener("click", () => form.style.display = "none");

// Save to LocalStorage
function saveToLocalStorage(obj) {

    if (localStorage.getItem("saveCards") === null) {
        let oldCards = [];
        oldCards.push(obj);
        localStorage.setItem("saveCards", JSON.stringify(oldCards));
    }
    else {
        let oldCards = localStorage.getItem("saveCards");
        oldCards = JSON.parse(oldCards);
        oldCards.push(obj);
        localStorage.setItem("saveCards", JSON.stringify(oldCards));
    }
}

form.addEventListener("submit", (dets) => {
    dets.preventDefault();

    const imageUrl = inputs[0].value.trim();
    const heading = inputs[1].value.trim();
    const about = inputs[2].value.trim();

    if (imageUrl === "" || heading === "" || about === "") {
        alert("All fields are required");
        return;
    }

    saveToLocalStorage({
        imageUrl,
        heading,
        about,
    });

    form.reset();
    form.style.display = "none";
    showCards();

});

// Create Cards
function showCards() {
    cardGrid.innerHTML = "";
    let allCards = JSON.parse(localStorage.getItem("saveCards")) || [];
    allCards.forEach((task, index) => {
        let card = document.createElement("div");
        card.classList.add("card");

        let img = document.createElement("img");
        img.setAttribute("src", task.imageUrl);

        let cardContent = document.createElement("div");
        cardContent.classList.add("card-content");

        let h3 = document.createElement("h3");
        h3.textContent = task.heading;

        let p = document.createElement("p");
        p.textContent = task.about;

        let cardActions = document.createElement("div");
        cardActions.classList.add("card-actions");

        let actionBtns = document.createElement("div");
        actionBtns.classList.add("action-btns");

        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        actionBtns.appendChild(editBtn);
        actionBtns.appendChild(deleteBtn);

        cardActions.appendChild(actionBtns);

        cardContent.appendChild(h3);
        cardContent.appendChild(p);
        cardContent.appendChild(cardActions);

        card.appendChild(img);
        card.appendChild(cardContent);

        cardGrid.appendChild(card);

        // DeleteBtn
        deleteBtn.addEventListener("click", () => {
            deleteCard(index);
        });

        editBtn.addEventListener("click", () => {
            editCard(index);
        });
    });

}
showCards();

// delete cards
function deleteCard(index) {
    let allCards = JSON.parse(localStorage.getItem("saveCards"));
    allCards.splice(index, 1);
    localStorage.setItem("saveCards", JSON.stringify(allCards));
    showCards();
}

// edit cards
function editCard(index) {
    let allCards = JSON.parse(localStorage.getItem("saveCards"));
    let card = allCards[index];

    let newImageUrl = prompt("Enter new image URL:", card.imageUrl);
    let newHeading = prompt("Enter new heading:", card.heading);
    let newAbout = prompt("Enter new about:", card.about);

    if (newImageUrl !== null && newHeading !== null && newAbout !== null) {
        allCards[index] = {
            imageUrl: newImageUrl,
            heading: newHeading,
            about: newAbout
        };
        localStorage.setItem("saveCards", JSON.stringify(allCards));
        showCards();
    }
}


// Search
searchBox.addEventListener("input", function () {
    let searchText = searchBox.value.toLowerCase();
    let found = false;

    document.querySelectorAll(".card h3").forEach((heading) => {
        let card = heading.closest(".card");
        let headingText = heading.textContent.toLowerCase();

        if (headingText.includes(searchText)) {
            card.style.display = "block";
            found = true;

        }
        else {
            card.style.display = "none";
        }
    });
    if (found) {
        noResults.style.display = "none";
    } else {
        noResults.style.display = "block";
    }
});