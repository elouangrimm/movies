// Main initialization for player page
document.addEventListener("DOMContentLoaded", async () => {
    // Initialize services
    const omdbService = new OMDbService(OMDb_API_KEY);
    const storageService = new StorageService();

    // Initialize player UI
    const playerUI = new PlayerUI(omdbService, storageService, VIDEO_SOURCES);
    await playerUI.init();
});