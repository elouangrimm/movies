// Video Sources Configuration
// To change the order of preference, simply reorder the array

const VIDEO_SOURCES = [
    { 
        name: "vidsrc-embed.ru", 
        movie: "https://vidsrc-embed.ru/embed/movie?imdb={imdb_id}", 
        tv: "https://vidsrc-embed.ru/embed/tv?imdb={imdb_id}&season={season}&episode={episode}" 
    },
    { 
        name: "2embed.cc", 
        movie: "https://2embed.cc/embed/{imdb_id}", 
        tv: "https://2embed.cc/embedtv/{imdb_id}&s={season}&e={episode}" 
    },
    { 
        name: "multiembed.mov", 
        movie: "https://multiembed.mov/?video_id={imdb_id}", 
        tv: "https://multiembed.mov/?video_id={imdb_id}&s={season}&e={episode}" 
    }
];

// Export for use in other modules
window.VIDEO_SOURCES = VIDEO_SOURCES;
