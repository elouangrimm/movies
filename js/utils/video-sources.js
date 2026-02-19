// Video Sources Configuration
// To change the order of preference, simply reorder the array

const VIDEO_SOURCES = [
    { 
        name: "vidsrc-embed.ru", 
        movie: "https://vidsrc-embed.ru/embed/movie?imdb={imdb_id}", 
        tv: "https://vidsrc-embed.ru/embed/tv?imdb={imdb_id}&season={season}&episode={episode}" 
    },
    { 
        name: "player.videasy.net", 
        movie: "https://player.videasy.net/embed/{imdb_id}", 
        tv: "https://player.videasy.net/tv/{imdb_id}/{season}/{episode}" 
    },
    { 
        name: "2embed.cc", 
        movie: "https://2embed.cc/embed/{imdb_id}", 
        tv: "https://2embed.cc/embedtv/{imdb_id}&s={season}&e={episode}" 
    },
    { 
        name: "vidlink.pro", 
        movie: "https://vidlink.pro/embed/{imdb_id}", 
        tv: "https://vidlink.pro/tv/{imdb_id}/{season}/{episode}" 
    },
    { 
        name: "multiembed.mov", 
        movie: "https://multiembed.mov/?video_id={imdb_id}", 
        tv: "https://multiembed.mov/?video_id={imdb_id}&s={season}&e={episode}" 
    },
    { 
        name: "fsapi.xyz", 
        movie: "https://fsapi.xyz/movie/{imdb_id}", 
        tv: "https://fsapi.xyz/tv-imdb/{imdb_id}-{season}-{episode}" 
    },
    { 
        name: "gomo.to", 
        movie: "https://gomo.to/movie/{imdb_id}", 
        tv: null 
    },
    { 
        name: "vidcloud.stream", 
        movie: "https://vidcloud.stream/{imdb_id}.html", 
        tv: null 
    },
    { 
        name: "getsuperembed.link", 
        movie: "https://getsuperembed.link/?video_id={imdb_id}", 
        tv: "https://getsuperembed.link/?video_id={imdb_id}&season={season}&episode={episode}", 
        is_special: true 
    }
];

// Export for use in other modules
window.VIDEO_SOURCES = VIDEO_SOURCES;
