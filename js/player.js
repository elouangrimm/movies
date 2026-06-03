// Main initialization for player page
document.addEventListener("DOMContentLoaded", async () => {
    // Initialize services
    const omdbService = new OMDbService(OMDb_API_KEY);
    const tmdbService = new TMDbService();
    const storageService = new StorageService();

    // Initialize player UI
    const playerUI = new PlayerUI(omdbService, tmdbService, storageService);
    await playerUI.init();
});
