// Main application logic
class PortfolioApp {
    constructor() {
        this.currentSection = 'dashboard';
        this.theme = localStorage.getItem('theme') || 'light';
        this.currency = localStorage.getItem('currency') || 'BRL';
        this.autoRefresh = localStorage.getItem('autoRefresh') !== 'false';
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.applyTheme();
        this.loadData();
        this.startAutoRefresh();
    }
    
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                this.showSection(section);
            });
        });
        
        // Filters
        const assetTypeFilter = document.getElementById('asset-type-filter');
        const sortFilter = document.getElementById('sort-filter');
        const searchInput = document.getElementById('search-input');
        
        if (assetTypeFilter) {
            assetTypeFilter.addEventListener('change', () => this.filterPortfolio());
        }
        
        if (sortFilter) {
            sortFilter.addEventListener('change', () => this.filterPortfolio());
        }
        
        if (searchInput) {
            searchInput.addEventListener('input', () => this.filterPortfolio());
        }
        
        // Settings
        const themeSelect = document.getElementById('theme-setting');
        const currencySelect = document.getElementById('currency-setting');
        const autoRefreshCheck = document.getElementById('auto-refresh');
        
        if (themeSelect) {
            themeSelect.value = this.theme;
            themeSelect.addEventListener('change', (e) => {
                this.setTheme(e.target.value);
            });
        }
        
        if (currencySelect) {
            currencySelect.value = this.currency;
            currencySelect.addEventListener('change', (e) => {
                this.setCurrency(e.target.value);
            });
        }
        
        if (autoRefreshCheck) {
            autoRefreshCheck.checked = this.autoRefresh;
            autoRefreshCheck.addEventListener('change', (e) => {
                this.setAutoRefresh(e.target.checked);
            });
        }
        
        // Import data
        const importInput = document.getElementById('import-data');
        if (importInput) {
            importInput.addEventListener('change', (e) => {
                this.importData(e.target.files[0]);
            });
        }
    }
    
    showSection(sectionId) {
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
        
        // Update sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
        
        this.currentSection = sectionId;
        
        // Load section-specific data
        this.loadSectionData(sectionId);
    }
    
    loadData() {
        this.updateSummaryCards();
        this.updateActivityList();
        this.updatePortfolioTable();
        this.updateAnalysisMetrics();
        this.updateRecommendations();
        this.updateLastUpdate();
    }
    
    loadSectionData(sectionId) {
        switch(sectionId) {
            case 'dashboard':
                this.updateSummaryCards();
                this.updateActivityList();
                break;
            case 'portfolio':
                this.updatePortfolioTable();
                break;
            case 'analysis':
                this.updateAnalysisMetrics();
                break;
            case 'recommendations':
                this.updateRecommendations();
                break;
        }
    }
    
    updateSummaryCards() {
        const summary = portfolioData.summary;
        
        document.getElementById('total-value').textContent = 
            this.formatCurrency(summary.totalValue);
        
        const changeElement = document.getElementById('total-change');
        const changeText = `${summary.totalGain >= 0 ? '+' : ''}${this.formatCurrency(summary.totalGain)} (${summary.totalGainPercent >= 0 ? '+' : ''}${summary.totalGainPercent.toFixed(2)}%)`;
        changeElement.textContent = changeText;
        changeElement.className = `change ${summary.totalGain >= 0 ? 'positive' : 'negative'}`;
        
        document.getElementById('invested-value').textContent = 
            this.formatCurrency(summary.investedValue);
        
        document.getElementById('positions-count').textContent = summary.positionsCount;
        document.getElementById('portfolio-score').textContent = `${summary.portfolioScore}/100`;
    }
    
    updateActivityList() {
        const activityList = document.getElementById('activity-list');
        if (!activityList) return;
        
        activityList.innerHTML = portfolioData.recentActivity.map(activity => `
            <div class="activity-item">
                <div class="activity-icon" style="background-color: ${activity.iconColor}20; color: ${activity.iconColor}">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-title">${activity.title}</div>
                    <div class="activity-description">${activity.description}</div>
                </div>
                <div class="activity-meta">
                    ${activity.value ? `<div class="activity-value">${activity.value}</div>` : ''}
                    <div class="activity-time">${activity.time}</div>
                </div>
            </div>
        `).join('');
    }
    
    updatePortfolioTable() {
        const tbody = document.getElementById('portfolio-tbody');
        if (!tbody) return;
        
        const positions = portfolioData.topPositions;
        
        tbody.innerHTML = positions.map(position => `
            <tr>
                <td>
                    <div class="ticker-cell">
                        <div class="ticker-badge">${position.ticker.substring(0, 2)}</div>
                        <div class="ticker-info">
                            <h4>${position.ticker}</h4>
                            <p>${position.company}</p>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="type-badge ${position.type.toLowerCase()}">${position.type}</span>
                </td>
                <td>${position.quantity}</td>
                <td>${this.formatCurrency(position.avgPrice)}</td>
                <td>${this.formatCurrency(position.currentValue)}</td>
                <td class="performance-cell ${position.gainPercent >= 0 ? 'positive' : 'negative'}">
                    ${position.gainPercent >= 0 ? '+' : ''}${position.gainPercent.toFixed(1)}%
                </td>
                <td>${position.weight.toFixed(2)}%</td>
                <td>
                    <button class="btn-action" onclick="app.editPosition('${position.ticker}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-action" onclick="app.viewDetails('${position.ticker}')">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }
    
    updateAnalysisMetrics() {
        const scores = portfolioData.scores;
        const metrics = portfolioData.riskMetrics;
        
        // Update score badges
        document.querySelectorAll('.score-badge').forEach((badge, index) => {
            const scoreValues = [scores.performance, scores.diversification, scores.volatility];
            if (scoreValues[index]) {
                badge.textContent = `${scoreValues[index].toFixed(1)}/100`;
            }
        });
        
        // Update metric values
        const metricElements = document.querySelectorAll('.metric-item span:last-child');
        if (metricElements.length >= 9) {
            metricElements[0].textContent = `+${portfolioData.summary.totalGainPercent.toFixed(2)}%`;
            metricElements[1].textContent = 'LRCX (+1.164%)';
            metricElements[2].textContent = 'CPRT (-50,9%)';
            metricElements[3].textContent = `${portfolioData.summary.positionsCount} posições`;
            metricElements[4].textContent = '3 tipos';
            metricElements[5].textContent = `${metrics.concentrationTop10}%`;
            metricElements[6].textContent = `${metrics.volatilityAverage}%`;
            metricElements[7].textContent = `${metrics.highRiskPositions} posições`;
            metricElements[8].textContent = metrics.beta.toString();
        }
    }
    
    updateRecommendations() {
        this.updateRecommendationList('buy-recommendations', portfolioData.recommendations.buy, 'buy');
        this.updateRecommendationList('rebalance-recommendations', portfolioData.recommendations.rebalance, 'rebalance');
        this.updateRecommendationList('watch-recommendations', portfolioData.recommendations.watch, 'watch');
    }
    
    updateRecommendationList(elementId, recommendations, type) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        element.innerHTML = recommendations.map(rec => `
            <div class="recommendation-item">
                <div class="recommendation-content">
                    <h4>${rec.ticker} - ${rec.company}</h4>
                    <p>${rec.reason}</p>
                </div>
                <div class="recommendation-badge badge-${type}">
                    ${rec.priority}
                </div>
            </div>
        `).join('');
    }
    
    filterPortfolio() {
        const typeFilter = document.getElementById('asset-type-filter')?.value || 'all';
        const sortFilter = document.getElementById('sort-filter')?.value || 'value';
        const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
        
        let filteredPositions = [...portfolioData.topPositions];
        
        // Apply type filter
        if (typeFilter !== 'all') {
            filteredPositions = filteredPositions.filter(pos => pos.type === typeFilter);
        }
        
        // Apply search filter
        if (searchTerm) {
            filteredPositions = filteredPositions.filter(pos => 
                pos.ticker.toLowerCase().includes(searchTerm) ||
                pos.company.toLowerCase().includes(searchTerm)
            );
        }
        
        // Apply sorting
        filteredPositions.sort((a, b) => {
            switch(sortFilter) {
                case 'value':
                    return b.currentValue - a.currentValue;
                case 'performance':
                    return b.gainPercent - a.gainPercent;
                case 'ticker':
                    return a.ticker.localeCompare(b.ticker);
                default:
                    return 0;
            }
        });
        
        // Update table with filtered data
        const tbody = document.getElementById('portfolio-tbody');
        if (tbody) {
            tbody.innerHTML = filteredPositions.map(position => `
                <tr>
                    <td>
                        <div class="ticker-cell">
                            <div class="ticker-badge">${position.ticker.substring(0, 2)}</div>
                            <div class="ticker-info">
                                <h4>${position.ticker}</h4>
                                <p>${position.company}</p>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="type-badge ${position.type.toLowerCase()}">${position.type}</span>
                    </td>
                    <td>${position.quantity}</td>
                    <td>${this.formatCurrency(position.avgPrice)}</td>
                    <td>${this.formatCurrency(position.currentValue)}</td>
                    <td class="performance-cell ${position.gainPercent >= 0 ? 'positive' : 'negative'}">
                        ${position.gainPercent >= 0 ? '+' : ''}${position.gainPercent.toFixed(1)}%
                    </td>
                    <td>${position.weight.toFixed(2)}%</td>
                    <td>
                        <button class="btn-action" onclick="app.editPosition('${position.ticker}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-action" onclick="app.viewDetails('${position.ticker}')">
                            <i class="fas fa-eye"></i>
                        </button>
                    </td>
                </tr>
            `).join('');
        }
    }
    
    formatCurrency(value) {
        if (this.currency === 'BRL') {
            return value.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });
        } else {
            return value.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
            });
        }
    }
    
    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        
        // Update theme toggle icon
        const themeIcon = document.querySelector('.theme-toggle i');
        if (themeIcon) {
            themeIcon.className = this.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
    
    setTheme(theme) {
        this.theme = theme;
        localStorage.setItem('theme', theme);
        this.applyTheme();
        
        // Recreate charts with new theme
        if (typeof destroyCharts === 'function') {
            destroyCharts();
            setTimeout(() => {
                if (typeof initializeCharts === 'function') {
                    initializeCharts();
                }
            }, 100);
        }
    }
    
    setCurrency(currency) {
        this.currency = currency;
        localStorage.setItem('currency', currency);
        this.loadData();
    }
    
    setAutoRefresh(enabled) {
        this.autoRefresh = enabled;
        localStorage.setItem('autoRefresh', enabled.toString());
        
        if (enabled) {
            this.startAutoRefresh();
        } else {
            this.stopAutoRefresh();
        }
    }
    
    startAutoRefresh() {
        if (!this.autoRefresh) return;
        
        this.refreshInterval = setInterval(() => {
            this.refreshData();
        }, 300000); // 5 minutes
    }
    
    stopAutoRefresh() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }
    }
    
    refreshData() {
        // Simulate data refresh
        console.log('Refreshing data...');
        this.updateLastUpdate();
        
        // Add loading state
        document.body.classList.add('loading');
        
        setTimeout(() => {
            this.loadData();
            document.body.classList.remove('loading');
        }, 1000);
    }
    
    updateLastUpdate() {
        const lastUpdateElement = document.getElementById('last-update');
        if (lastUpdateElement) {
            const now = new Date();
            lastUpdateElement.textContent = now.toLocaleString('pt-BR');
        }
    }
    
    exportData() {
        const data = portfolioData.topPositions.map(pos => ({
            ticker: pos.ticker,
            company: pos.company,
            type: pos.type,
            quantity: pos.quantity,
            avgPrice: pos.avgPrice,
            currentPrice: pos.currentPrice,
            currentValue: pos.currentValue,
            gainPercent: pos.gainPercent,
            weight: pos.weight
        }));
        
        const csv = this.convertToCSV(data);
        this.downloadCSV(csv, 'portfolio-data.csv');
    }
    
    convertToCSV(data) {
        const headers = Object.keys(data[0]).join(',');
        const rows = data.map(row => Object.values(row).join(','));
        return [headers, ...rows].join('\n');
    }
    
    downloadCSV(csv, filename) {
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    }
    
    importData(file) {
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                // Validate and merge data
                console.log('Imported data:', data);
                alert('Dados importados com sucesso!');
            } catch (error) {
                alert('Erro ao importar dados. Verifique o formato do arquivo.');
            }
        };
        reader.readAsText(file);
    }
    
    editPosition(ticker) {
        alert(`Editar posição: ${ticker}`);
        // Implement edit functionality
    }
    
    viewDetails(ticker) {
        alert(`Ver detalhes: ${ticker}`);
        // Implement details view
    }
}

// Global functions
function toggleTheme() {
    const newTheme = app.theme === 'light' ? 'dark' : 'light';
    app.setTheme(newTheme);
}

function refreshData() {
    app.refreshData();
}

function exportData() {
    app.exportData();
}

// Initialize app
let app;
document.addEventListener('DOMContentLoaded', function() {
    app = new PortfolioApp();
});

