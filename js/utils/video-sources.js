// Video Sources Configuration
// To change the order of preference, simply reorder the array

const VIDEO_SOURCES = [
    { 
        name: "vidlink", 
        movie: "https://vidlink.pro/movie/{imdb_id}", 
        tv: "https://vidlink.pro/tv/{imdb_id}/{season}/{episode}" 
    },
    { 
        name: "vidsrc-embed.ru", 
        movie: "https://vidsrc-embed.ru/embed/movie?imdb={imdb_id}", 
        tv: "https://vidsrc-embed.ru/embed/tv?imdb={imdb_id}&season={season}&episode={episode}" 
    },
    { 
        name: "vidsrc.me", 
        movie: "https://vidsrc.me/embed/movie/{imdb_id}", 
        tv: "https://vidsrc.me/embed/tv/{imdb_id}/{season}/{episode}" 
    },
    { 
        name: "2embed", 
        movie: "https://2embed.cc/embed/{imdb_id}", 
        tv: "https://2embed.cc/embedtv/{imdb_id}&s={season}&e={episode}" 
    },
    { 
        name: "multiembed", 
        movie: "https://multiembed.mov/?video_id={imdb_id}", 
        tv: "https://multiembed.mov/?video_id={imdb_id}&s={season}&e={episode}" 
    }
];

// Export for use in other modules
window.VIDEO_SOURCES = VIDEO_SOURCES;
