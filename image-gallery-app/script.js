let gallery = document.querySelector(".gallery");
let btn = document.querySelector(".btn");
let loader = document.querySelector(".loader");

let page = 1;

loader.classList.remove("hidden");

btn.addEventListener("click", () => {
    loadImages();
});

function displayImages(images) {
    images.forEach(img => {
        const imageElement = document.createElement("img");
        const height = Math.floor(Math.random() * 200) + 200;
        imageElement.src = `https://picsum.photos/id/${img.id}/300/${height}`;
        imageElement.alt = img.author;
        gallery.appendChild(imageElement);
    });
}

// Fetch images from API
async function loadImages() {
    try {
        loader.classList.remove("hidden");
        const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=15`);
        const data = await response.json();
        displayImages(data);
        page++;
        loader.classList.add("hidden");
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

// Load images on page load
loadImages();