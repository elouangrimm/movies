// Storage Utility
// Handles localStorage operations for recently watched items

class StorageService {
    constructor() {
        this.storageKey = "recentlyWatched";
        this.maxItems = 3;
    }

    /**
     * Get recently watched items
     * @returns {Array} - Array of recently watched items
     */
    getRecentlyWatched() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error("Error reading from localStorage:", error);
            return [];
        }
    }

    /**
     * Add an item to recently watched
     * @param {Object} item - Item to add
     * @param {string} item.imdbId - IMDb ID
     * @param {string} item.type - Type (movie or tv)
     * @param {string} item.title - Title
     * @param {string} [item.year] - Release year
     * @param {string} [item.poster] - Poster URL
     * @param {number} [item.season] - Season number (for TV shows)
     * @param {number} [item.episode] - Episode number (for TV shows)
     * @param {number} [item.progress] - Watch progress percentage
     * @param {number} [item.currentTime] - Current playback position in seconds
     * @param {number} [item.duration] - Total duration in seconds
     */
    addToRecentlyWatched(item) {
        try {
            let recentlyWatched = this.getRecentlyWatched();
            
            // Remove existing entry if it exists for the same content (update it instead of creating a new one if it's the exact same progress, but if progress changes just update the existing one and put it on top)
            const existingIndex = recentlyWatched.findIndex(
                entry => entry.imdbId === item.imdbId
            );
            
            let newItem = {
                imdbId: item.imdbId,
                type: item.type,
                title: item.title,
                year: item.year,
                poster: item.poster,
                season: item.season,
                episode: item.episode,
                progress: item.progress,
                currentTime: item.currentTime,
                duration: item.duration,
                watchedAt: new Date().toISOString()
            };

            // if we are updating, keep previous poster/title if not provided
            if (existingIndex > -1) {
                const old = recentlyWatched[existingIndex];
                if (!newItem.title) newItem.title = old.title;
                if (!newItem.poster) newItem.poster = old.poster;
                if (!newItem.year) newItem.year = old.year;
                
                // If it's TV, update the season/episode dynamically
                
                recentlyWatched.splice(existingIndex, 1);
            }

            // Add to beginning
            recentlyWatched.unshift(newItem);

            // Keep only the most recent items
            if (recentlyWatched.length > this.maxItems) {
                recentlyWatched = recentlyWatched.slice(0, this.maxItems);
            }

            localStorage.setItem(this.storageKey, JSON.stringify(recentlyWatched));
        } catch (error) {
            console.error("Error saving to localStorage:", error);
        }
    }

    /**
     * Clear all recently watched items
     */
    clearRecentlyWatched() {
        try {
            localStorage.removeItem(this.storageKey);
        } catch (error) {
            console.error("Error clearing localStorage:", error);
        }
    }
}

// Export the class for use in other modules
window.StorageService = StorageService;
