// OMDb API Service
// Centralized module for all OMDb API interactions

class OMDbService {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = "https://www.omdbapi.com/";
    }

    /**
     * Search for movies/TV shows by query
     * @param {string} query - Search query
     * @returns {Promise<Array>} - Array of search results
     */
    async search(query) {
        if (!query || query.length < 3) {
            return [];
        }

        const url = `${this.baseUrl}?apikey=${this.apiKey}&s=${encodeURIComponent(query)}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            if (data.Response === "True" && data.Search) {
                return data.Search;
            } else {
                console.log("OMDb API Response:", data.Error || "No results found");
                return [];
            }
        } catch (error) {
            console.error("Error fetching OMDb search results:", error);
            throw error;
        }
    }

    /**
     * Get details for a specific movie/TV show by IMDb ID
     * @param {string} imdbId - IMDb ID
     * @returns {Promise<Object>} - Movie/TV show details
     */
    async getDetails(imdbId) {
        const url = `${this.baseUrl}?apikey=${this.apiKey}&i=${imdbId}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            if (data.Response === "True") {
                return data;
            } else {
                throw new Error(data.Error || "Failed to fetch details");
            }
        } catch (error) {
            console.error("Error fetching OMDb details:", error);
            throw error;
        }
    }

    /**
     * Get total seasons for a TV series
     * @param {string} imdbId - IMDb ID of the series
     * @returns {Promise<number>} - Number of seasons
     */
    async getTotalSeasons(imdbId) {
        try {
            const data = await this.getDetails(imdbId);
            return parseInt(data.totalSeasons, 10) || 1;
        } catch (error) {
            console.error("Error fetching total seasons:", error);
            return 1;
        }
    }

    /**
     * Get episodes for a specific season
     * @param {string} imdbId - IMDb ID of the series
     * @param {number} season - Season number
     * @returns {Promise<Array>} - Array of episodes
     */
    async getSeasonEpisodes(imdbId, season) {
        const url = `${this.baseUrl}?apikey=${this.apiKey}&i=${imdbId}&season=${season}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            if (data.Response === "True" && data.Episodes) {
                return data.Episodes;
            } else {
                throw new Error(data.Error || "Failed to fetch episodes");
            }
        } catch (error) {
            console.error("Error fetching episodes:", error);
            return [];
        }
    }

    /**
     * Get title for a movie/TV show
     * @param {string} imdbId - IMDb ID
     * @returns {Promise<string>} - Title
     */
    async getTitle(imdbId) {
        try {
            const data = await this.getDetails(imdbId);
            return data.Title || "Unknown Title";
        } catch (error) {
            console.error("Error fetching title:", error);
            return "Unknown Title";
        }
    }
}

// Export the class for use in other modules
window.OMDbService = OMDbService;
