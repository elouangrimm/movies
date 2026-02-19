// Source Tester Application
class SourceTester {
    constructor() {
        this.sources = [];
        this.currentType = 'movie';
        this.currentImdbId = 'tt4772188';
        this.currentSeason = 1;
        this.currentEpisode = 1;
        this.activeSourceIndex = null;
        
        this.initializeElements();
        this.initializeEventListeners();
        this.loadSourcesFromStorage();
        this.renderSources();
    }
    
    initializeElements() {
        // Input elements
        this.imdbInput = document.getElementById('imdb-id');
        this.seasonInput = document.getElementById('season-input');
        this.episodeInput = document.getElementById('episode-input');
        this.sourceNameInput = document.getElementById('source-name');
        this.sourceUrlInput = document.getElementById('source-url');
        
        // Buttons
        this.typeMovieBtn = document.getElementById('type-movie');
        this.typeTvBtn = document.getElementById('type-tv');
        this.addSourceBtn = document.getElementById('add-source-btn');
        this.exportBtn = document.getElementById('export-btn');
        
        // Containers
        this.sourcesContainer = document.getElementById('sources-container');
        this.episodeSection = document.getElementById('episode-section');
        
        // Iframe
        this.sourceIframe = document.getElementById('source-iframe');
        this.currentUrlDisplay = document.getElementById('current-url-display');
    }
    
    initializeEventListeners() {
        // Type switching
        this.typeMovieBtn.addEventListener('click', () => this.setType('movie'));
        this.typeTvBtn.addEventListener('click', () => this.setType('tv'));
        
        // IMDB ID change
        this.imdbInput.addEventListener('change', () => {
            this.currentImdbId = this.imdbInput.value.trim();
            if (this.activeSourceIndex !== null) {
                this.loadSource(this.activeSourceIndex);
            }
        });
        
        // Season/Episode change
        this.seasonInput.addEventListener('change', () => {
            this.currentSeason = parseInt(this.seasonInput.value);
            if (this.activeSourceIndex !== null) {
                this.loadSource(this.activeSourceIndex);
            }
        });
        
        this.episodeInput.addEventListener('change', () => {
            this.currentEpisode = parseInt(this.episodeInput.value);
            if (this.activeSourceIndex !== null) {
                this.loadSource(this.activeSourceIndex);
            }
        });
        
        // Add source
        this.addSourceBtn.addEventListener('click', () => this.addSource());
        
        // Export
        this.exportBtn.addEventListener('click', () => this.exportSources());
    }
    
    setType(type) {
        this.currentType = type;
        
        if (type === 'movie') {
            this.typeMovieBtn.classList.add('active');
            this.typeTvBtn.classList.remove('active');
            this.episodeSection.style.display = 'none';
        } else {
            this.typeTvBtn.classList.add('active');
            this.typeMovieBtn.classList.remove('active');
            this.episodeSection.style.display = 'block';
        }
        
        // Reload current source if one is active
        if (this.activeSourceIndex !== null) {
            this.loadSource(this.activeSourceIndex);
        }
    }
    
    addSource() {
        const name = this.sourceNameInput.value.trim();
        const url = this.sourceUrlInput.value.trim();
        
        if (!name || !url) {
            alert('Please enter both source name and URL pattern');
            return;
        }
        
        // Validate URL pattern
        if (!url.includes('{imdb_id}')) {
            alert('URL pattern must contain {imdb_id} placeholder');
            return;
        }
        
        const source = {
            name: name,
            url: url,
            status: 'untested',
            id: Date.now()
        };
        
        this.sources.push(source);
        this.saveSourcesToStorage();
        this.renderSources();
        
        // Clear inputs
        this.sourceNameInput.value = '';
        this.sourceUrlInput.value = '';
    }
    
    deleteSource(index) {
        if (confirm(`Are you sure you want to delete "${this.sources[index].name}"?`)) {
            this.sources.splice(index, 1);
            
            // Reset active source if it was deleted
            if (this.activeSourceIndex === index) {
                this.activeSourceIndex = null;
                this.sourceIframe.src = '';
                this.currentUrlDisplay.textContent = 'No source loaded';
            } else if (this.activeSourceIndex !== null && this.activeSourceIndex > index) {
                this.activeSourceIndex--;
            }
            
            this.saveSourcesToStorage();
            this.renderSources();
        }
    }
    
    toggleStatus(index) {
        const source = this.sources[index];
        
        // Cycle through statuses: untested -> working -> not-working -> untested
        if (source.status === 'untested') {
            source.status = 'working';
        } else if (source.status === 'working') {
            source.status = 'not-working';
        } else {
            source.status = 'untested';
        }
        
        this.saveSourcesToStorage();
        this.renderSources();
    }
    
    loadSource(index) {
        const source = this.sources[index];
        if (!source) return;
        
        const url = this.buildUrl(source.url);
        this.sourceIframe.src = url;
        this.currentUrlDisplay.textContent = url;
        this.activeSourceIndex = index;
        
        this.renderSources();
    }
    
    buildUrl(pattern) {
        let url = pattern
            .replace('{imdb_id}', this.currentImdbId);
        
        if (this.currentType === 'tv') {
            url = url
                .replace('{season}', this.currentSeason)
                .replace('{episode}', this.currentEpisode);
        }
        
        return url;
    }
    
    renderSources() {
        this.sourcesContainer.innerHTML = '';
        
        if (this.sources.length === 0) {
            this.sourcesContainer.innerHTML = '<p style="color: #7f8c8d; font-size: 0.9rem; text-align: center; padding: 20px;">No sources added yet</p>';
            return;
        }
        
        this.sources.forEach((source, index) => {
            const sourceItem = document.createElement('div');
            sourceItem.className = 'source-item';
            if (index === this.activeSourceIndex) {
                sourceItem.classList.add('active');
            }
            
            const statusText = source.status === 'working' ? '✓ Working' : 
                              source.status === 'not-working' ? '✗ Not Working' : 
                              '? Untested';
            
            sourceItem.innerHTML = `
                <div class="source-item-header">
                    <div class="source-name">${this.escapeHtml(source.name)}</div>
                    <div class="source-actions">
                        <button class="status-btn ${source.status}" data-index="${index}">${statusText}</button>
                        <button class="delete-btn" data-index="${index}">Delete</button>
                    </div>
                </div>
                <div class="source-url">${this.escapeHtml(source.url)}</div>
            `;
            
            // Click to load
            sourceItem.addEventListener('click', (e) => {
                if (!e.target.classList.contains('status-btn') && 
                    !e.target.classList.contains('delete-btn')) {
                    this.loadSource(index);
                }
            });
            
            // Status button
            const statusBtn = sourceItem.querySelector('.status-btn');
            statusBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleStatus(index);
            });
            
            // Delete button
            const deleteBtn = sourceItem.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteSource(index);
            });
            
            this.sourcesContainer.appendChild(sourceItem);
        });
    }
    
    exportSources() {
        const workingSources = this.sources.filter(s => s.status === 'working');
        
        if (workingSources.length === 0) {
            alert('No working sources to export. Mark sources as "Working" first.');
            return;
        }
        
        // Create a detailed export for LLM
        let exportText = '# Video Source Validation Results\n\n';
        exportText += `**Test Date:** ${new Date().toISOString()}\n`;
        exportText += `**Test IMDB ID:** ${this.currentImdbId}\n`;
        exportText += `**Content Type:** ${this.currentType}\n\n`;
        
        if (this.currentType === 'tv') {
            exportText += `**Test Season:** ${this.currentSeason}\n`;
            exportText += `**Test Episode:** ${this.currentEpisode}\n\n`;
        }
        
        exportText += '## Valid Sources\n\n';
        exportText += 'The following video sources have been validated and confirmed as working:\n\n';
        
        workingSources.forEach((source, index) => {
            exportText += `### ${index + 1}. ${source.name}\n\n`;
            exportText += '**URL Pattern:**\n```\n';
            exportText += source.url + '\n';
            exportText += '```\n\n';
            exportText += '**Pattern Variables:**\n';
            exportText += '- `{imdb_id}`: IMDB identifier (e.g., tt4772188)\n';
            if (source.url.includes('{season}')) {
                exportText += '- `{season}`: Season number\n';
            }
            if (source.url.includes('{episode}')) {
                exportText += '- `{episode}`: Episode number\n';
            }
            exportText += '\n**Test URL:**\n```\n';
            exportText += this.buildUrl(source.url) + '\n';
            exportText += '```\n\n';
            exportText += '---\n\n';
        });
        
        // Add summary statistics
        exportText += '## Summary\n\n';
        exportText += `- Total sources tested: ${this.sources.length}\n`;
        exportText += `- Working sources: ${workingSources.length}\n`;
        exportText += `- Failed sources: ${this.sources.filter(s => s.status === 'not-working').length}\n`;
        exportText += `- Untested sources: ${this.sources.filter(s => s.status === 'untested').length}\n`;
        
        // Download as file
        const blob = new Blob([exportText], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `video-sources-validated-${Date.now()}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert(`Exported ${workingSources.length} working source(s) to markdown file!`);
    }
    
    saveSourcesToStorage() {
        try {
            localStorage.setItem('tester-sources', JSON.stringify(this.sources));
        } catch (e) {
            console.error('Error saving sources to localStorage:', e);
        }
    }
    
    loadSourcesFromStorage() {
        try {
            const saved = localStorage.getItem('tester-sources');
            if (saved) {
                this.sources = JSON.parse(saved);
            }
        } catch (e) {
            console.error('Error loading sources from localStorage:', e);
            this.sources = [];
        }
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SourceTester();
});
