class TMDbService {
    constructor() {
        this.apiKey = window.config?.tmdbApiKey || "15d2ea6d0dc1d476efbca3eba2b9bbfb"; // Add a public key if not configured
        this.baseUrl = "https://api.themoviedb.org/3";
    }

    async getTmdbId(imdbId, type) {
        if (!this.apiKey) {
            console.error("TMDB API Key missing");
            return null;
        }
        try {
            const url = `${this.baseUrl}/find/${imdbId}?api_key=${this.apiKey}&external_source=imdb_id`;
            const response = await fetch(url);
            const data = await response.json();
            
            if (type === 'movie' && data.movie_results && data.movie_results.length > 0) {
                return data.movie_results[0].id;
            } else if (type !== 'movie' && data.tv_results && data.tv_results.length > 0) {
                return data.tv_results[0].id;
            }
            return null;
        } catch (error) {
            console.error("Error finding TMDB ID:", error);
            return null;
        }
    }
}
window.TMDbService = TMDbService;
