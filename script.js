const searchInput = document.getElementById("movieSearch");
const suggestionsContainer = document.getElementById("suggestions");

const OMDb_BASE_URL = "https://www.omdbapi.com/";

let debounceTimeout;
function debounce(func, delay) {
    return function (...args) {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

async function fetchSuggestionsOMDb(query) {
    if (!query || query.length < 3) {
        suggestionsContainer.innerHTML = "";
        suggestionsContainer.style.display = "none";
        return;
    }

    const url = `${OMDb_BASE_URL}?apikey=${OMDb_API_KEY}&s=${encodeURIComponent(
        query
    )}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.Response === "True" && data.Search) {
            displaySuggestionsOMDb(data.Search);
        } else {
            console.log("OMDb API Response:", data.Error || "No results found");
            suggestionsContainer.innerHTML = "";
            suggestionsContainer.style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching OMDb suggestions:", error);
        suggestionsContainer.innerHTML =
            '<div class="suggestion-item">Error fetching results.</div>';
        suggestionsContainer.style.display = "block";
    }
}

function displaySuggestionsOMDb(results) {
    suggestionsContainer.innerHTML = "";

    if (!results || results.length === 0) {
        suggestionsContainer.style.display = "none";
        return;
    }

    const limitedResults = results.slice(0, 6);

    limitedResults.forEach((result) => {
        if (!result.imdbID || !result.Title || !result.Year) {
            return;
        }

        const item = document.createElement("div");
        item.classList.add("suggestion-item");
        item.dataset.imdbId = result.imdbID;
        item.dataset.type = result.Type;

        const type = result.Type ? ` (${result.Type})` : "";

        item.innerHTML = `
            <div class="suggestion-info">
                <span class="suggestion-title">${result.Title}</span>
                <span class="suggestion-year">${result.Year}${type}</span>
            </div>
        `;

        item.addEventListener("click", handleSuggestionClickOMDb);
        suggestionsContainer.appendChild(item);
    });

    suggestionsContainer.style.display =
        limitedResults.length > 0 ? "block" : "none";
}

function handleSuggestionClickOMDb(event) {
    const selectedItem = event.target.closest(".suggestion-item");
    if (!selectedItem) return;

    const imdbId = selectedItem.dataset.imdbId;
    const type = selectedItem.dataset.type;
    const selectedTitle =
        selectedItem.querySelector(".suggestion-title").textContent;

    if (imdbId) {
        searchInput.value = selectedTitle;
        suggestionsContainer.innerHTML = "";
        suggestionsContainer.style.display = "none";
        redirectToPlayer(imdbId, type);
    } else {
        console.error("Could not find IMDb ID in the selected item's data.");
        alert("Error: Could not get IMDb ID for this selection.");
    }
}

function redirectToPlayer(imdbCode, type) {
    let url = `player.html?id=${imdbCode}&type=${type}`;
    if (type === 'series') {
        url += '&season=1&episode=1';
    }
    window.location.href = url;
}

searchInput.addEventListener(
    "input",
    debounce((event) => {
        fetchSuggestionsOMDb(event.target.value);
    }, 350)
);

document.addEventListener("click", (event) => {
    const searchContainer = document.querySelector(".search-container");
    if (searchContainer && !searchContainer.contains(event.target)) {
        suggestionsContainer.style.display = "none";
    }
});

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && suggestionsContainer.children.length > 0) {
        event.preventDefault();
        const firstSuggestion =
            suggestionsContainer.querySelector(".suggestion-item");
        if (firstSuggestion) {
            handleSuggestionClickOMDb({ target: firstSuggestion });
        }
    }
});
