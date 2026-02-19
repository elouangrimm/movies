// Search UI Module
// Handles movie/TV show search interface

class SearchUI {
    constructor(omdbService) {
        this.omdbService = omdbService;
        this.searchInput = document.getElementById("movieSearch");
        this.suggestionsContainer = document.getElementById("suggestions");
        this.maxResults = 6;
        
        this.init();
    }

    init() {
        if (!this.searchInput || !this.suggestionsContainer) {
            console.error("Required DOM elements not found for SearchUI");
            return;
        }

        // Set up event listeners
        this.searchInput.addEventListener(
            "input",
            Utils.debounce((event) => {
                this.fetchSuggestions(event.target.value);
            }, 350)
        );

        this.searchInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter" && this.suggestionsContainer.children.length > 0) {
                event.preventDefault();
                const firstSuggestion = this.suggestionsContainer.querySelector(".suggestion-item");
                if (firstSuggestion) {
                    this.handleSuggestionClick({ target: firstSuggestion });
                }
            }
        });

        // Close suggestions when clicking outside
        document.addEventListener("click", (event) => {
            const searchContainer = document.querySelector(".search-container");
            if (searchContainer && !searchContainer.contains(event.target)) {
                this.suggestionsContainer.style.display = "none";
            }
        });
    }

    async fetchSuggestions(query) {
        if (!query || query.length < 3) {
            this.suggestionsContainer.innerHTML = "";
            this.suggestionsContainer.style.display = "none";
            return;
        }

        try {
            const results = await this.omdbService.search(query);
            this.displaySuggestions(results);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
            this.suggestionsContainer.innerHTML = 
                '<div class="suggestion-item">Error fetching results.</div>';
            this.suggestionsContainer.style.display = "block";
        }
    }

    displaySuggestions(results) {
        this.suggestionsContainer.innerHTML = "";

        if (!results || results.length === 0) {
            this.suggestionsContainer.style.display = "none";
            return;
        }

        const limitedResults = results.slice(0, this.maxResults);

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

            item.addEventListener("click", (event) => this.handleSuggestionClick(event));
            this.suggestionsContainer.appendChild(item);
        });

        this.suggestionsContainer.style.display = limitedResults.length > 0 ? "block" : "none";
    }

    handleSuggestionClick(event) {
        const selectedItem = event.target.closest(".suggestion-item");
        if (!selectedItem) return;

        const imdbId = selectedItem.dataset.imdbId;
        const type = selectedItem.dataset.type;
        const selectedTitle = selectedItem.querySelector(".suggestion-title").textContent;

        if (imdbId) {
            this.searchInput.value = selectedTitle;
            this.suggestionsContainer.innerHTML = "";
            this.suggestionsContainer.style.display = "none";
            this.redirectToPlayer(imdbId, type);
        } else {
            console.error("Could not find IMDb ID in the selected item's data.");
            alert("Error: Could not get IMDb ID for this selection.");
        }
    }

    redirectToPlayer(imdbCode, type) {
        // Track the selection with PostHog
        if (window.posthog) {
            posthog.capture("movie_selected", {
                imdb_id: imdbCode,
                type: type,
            });
        }

        let url = `player.html?id=${imdbCode}&type=${type}`;
        if (type === 'series') {
            url += '&season=1&episode=1';
        }
        window.location.href = url;
    }
}

// Export the class for use in other modules
window.SearchUI = SearchUI;
