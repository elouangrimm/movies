// Main initialization for index page
document.addEventListener("DOMContentLoaded", () => {
    // Initialize services
    const omdbService = new OMDbService(OMDb_API_KEY);
    const storageService = new StorageService();

    // Initialize UI components
    const searchUI = new SearchUI(omdbService);
    const recentlyWatchedUI = new RecentlyWatchedUI(storageService);
});
