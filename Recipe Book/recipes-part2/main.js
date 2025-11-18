import recipes from "./recipes.mjs";

// Creates a star rating string ⭐⭐⭐⭐☆
function generateStars(rating) {
    const filled = "⭐".repeat(Math.floor(rating));
    const empty = "☆".repeat(5 - Math.floor(rating));
    return filled + empty;
}

// Display all recipes on page load
function displayRecipes(list) {
    const container = document.querySelector("#recipes");
    container.innerHTML = ""; // clear previous results

    list.forEach(recipe => {
        const article = document.createElement("article");
        article.classList.add("recipe-card");

        article.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <div class="recipe-content">

                <h2>${recipe.name}</h2>

                <p class="description">${recipe.description}</p>

                <span class="rating" 
                    role="img" 
                    aria-label="Rating: ${recipe.rating} out of 5 stars">
                    ${generateStars(recipe.rating)}
                </span>

            </div>
        `;

        container.appendChild(article);
    });
}

// Initial load
displayRecipes(recipes);

// Search functionality (works for Part 1 and Part 2)
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#search");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const term = searchInput.value.toLowerCase().trim();

    const filtered = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(term) ||
        recipe.description.toLowerCase().includes(term)
    );

    displayRecipes(filtered);
});
