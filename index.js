document.addEventListener("DOMContentLoaded", () => {
    const recentlyWatchedContainer = document.getElementById("recently-watched");
    const recentlyWatched = JSON.parse(localStorage.getItem("recentlyWatched")) || [];

    if (recentlyWatched.length > 0) {
        recentlyWatchedContainer.innerHTML = "<h2>Recently Watched</h2>";
        const list = document.createElement("ul");
        recentlyWatchedContainer.appendChild(list);

        recentlyWatched.forEach(item => {
            const listItem = document.createElement("li");
            let title = `${item.title}`;
            if (item.type === "tv") {
                title += ` (Season ${item.season}, Episode ${item.episode})`;
            }
            listItem.innerHTML = `<a href="player.html?id=${item.imdbId}&type=${item.type}${item.type === 'tv' ? `&season=${item.season}&episode=${item.episode}`: ''}">${title}</a>`;
            list.appendChild(listItem);
        });
    }
});
