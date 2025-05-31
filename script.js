const searchInput = document.getElementById("movieSearch");
const suggestionsContainer = document.getElementById("suggestions");

const OMDb_API_KEY = "2a319841";

const OMDb_BASE_URL = "https://www.omdbapi.com/";

// --- Debounce Function ---
// Prevents API calls on every keystroke
let debounceTimeout;
function debounce(func, delay) {
    return function (...args) {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// --- Fetch Suggestions from OMDb ---
async function fetchSuggestionsOMDb(query) {
    if (!query || query.length < 3) {
        // OMDb generally needs ~3 chars
        suggestionsContainer.innerHTML = "";
        suggestionsContainer.style.display = "none";
        return;
    }

    // Use OMDb's search ('s=') parameter
    const url = `${OMDb_BASE_URL}?apikey=${OMDb_API_KEY}&s=${encodeURIComponent(
        query
    )}`; // Search movies and series

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Check OMDb's specific response format
        if (data.Response === "True" && data.Search) {
            displaySuggestionsOMDb(data.Search);
        } else {
            // Handle cases like "Movie not found!" or other errors
            console.log("OMDb API Response:", data.Error || "No results found");
            suggestionsContainer.innerHTML = ""; // Clear previous potentially wrong suggestions
            suggestionsContainer.style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching OMDb suggestions:", error);
        suggestionsContainer.innerHTML =
            '<div class="suggestion-item">Error fetching results.</div>';
        suggestionsContainer.style.display = "block";
    }
}

// --- Display Suggestions from OMDb ---
function displaySuggestionsOMDb(results) {
    suggestionsContainer.innerHTML = ""; // Clear previous suggestions

    if (!results || results.length === 0) {
        suggestionsContainer.style.display = "none";
        return;
    }

    const limitedResults = results.slice(0, 6); // Limit to 6 results

    limitedResults.forEach((result) => {
        // OMDb provides imdbID directly in search results!
        if (!result.imdbID || !result.Title || !result.Year) {
            return; // Skip results missing essential info
        }

        const item = document.createElement("div");
        item.classList.add("suggestion-item");

        // Store IMDb ID directly, no need for a second fetch!
        item.dataset.imdbId = result.imdbID;

        const type = result.Type ? ` (${result.Type})` : ""; // Add type (movie/series)

        item.innerHTML = `
            <div class="suggestion-info">
                <span class="suggestion-title">${result.Title}</span>
                <span class="suggestion-year">${result.Year}${type}</span>
            </div>
        `;

        // Add click listener to redirect using the stored IMDb ID
        item.addEventListener("click", handleSuggestionClickOMDb);

        suggestionsContainer.appendChild(item);
    });

    suggestionsContainer.style.display =
        limitedResults.length > 0 ? "block" : "none";
}

// --- Handle Suggestion Click (OMDb version) ---
function handleSuggestionClickOMDb(event) {
    const selectedItem = event.target.closest(".suggestion-item");
    if (!selectedItem) return;

    const imdbId = selectedItem.dataset.imdbId; // Get IMDb ID directly
    const selectedTitle =
        selectedItem.querySelector(".suggestion-title").textContent;

    if (imdbId) {
        console.log(`Selected IMDb ID: ${imdbId}`);
        searchInput.value = selectedTitle; // Update input field (optional UX)
        suggestionsContainer.innerHTML = ""; // Clear suggestions
        suggestionsContainer.style.display = "none";
        redirectToVidSrc(imdbId, selectedTitle); // Call your redirect function
    } else {
        console.error("Could not find IMDb ID in the selected item's data.");
        alert("Error: Could not get IMDb ID for this selection.");
    }
}

function redirectToVidSrc(imdbCode, selectedTitle) {
    // Basic validation (IMDb IDs start with 'tt' followed by numbers)
    if (imdbCode && imdbCode.startsWith("tt") && imdbCode.length > 2) {
        const url = `https://vidsrc.in/embed/${imdbCode}/color-3700b3`;
        posthog.capture("movie watched", {
            code: imdbCode,
            title: selectedTitle
        })
        console.log(`Redirecting to: ${url}`);
        window.location.href = url;
    } else {
        console.error(`Invalid IMDb code provided for redirect: ${imdbCode}`);
        alert("An error occurred: Invalid IMDb code format.");
    }
}

// --- Event Listener for Search Input ---
searchInput.addEventListener(
    "input",
    debounce((event) => {
        fetchSuggestionsOMDb(event.target.value);
    }, 350)
); // 350ms delay

// --- Optional: Hide suggestions when clicking outside ---
document.addEventListener("click", (event) => {
    const searchContainer = document.querySelector(".search-container");
    if (searchContainer && !searchContainer.contains(event.target)) {
        suggestionsContainer.style.display = "none";
    }
});

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && suggestionsContainer.children.length > 0) {
        event.preventDefault(); // Prevent form submission if it were in a form
        const firstSuggestion =
            suggestionsContainer.querySelector(".suggestion-item");
        if (firstSuggestion) {
            handleSuggestionClickOMDb({ target: firstSuggestion }); // Simulate click
        }
    }
});
