// Chart configurations and initialization
let charts = {};

// Initialize all charts
function initializeCharts() {
    initAssetDistributionChart();
    initPerformanceChart();
}

// Asset Distribution Pie Chart
function initAssetDistributionChart() {
    const ctx = document.getElementById('assetDistributionChart').getContext('2d');
    
    const data = portfolioData.assetDistribution;
    const labels = Object.keys(data);
    const values = labels.map(key => data[key].percentage);
    const colors = ['#3b82f6', '#10b981', '#f59e0b'];
    
    charts.assetDistribution = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels.map(label => {
                const info = data[label];
                return `${label} (${info.count} posições)`;
            }),
            datasets: [{
                data: values,
                backgroundColor: colors,
                borderColor: colors.map(color => color + '20'),
                borderWidth: 2,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label;
                            const value = context.parsed;
                            const total = portfolioData.summary.totalValue;
                            const amount = (total * value / 100).toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            });
                            return `${label}: ${value.toFixed(1)}% (${amount})`;
                        }
                    }
                }
            },
            cutout: '60%'
        }
    });
}

// Performance Bar Chart
function initPerformanceChart() {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    
    const data = portfolioData.performanceByType;
    const labels = Object.keys(data);
    const values = Object.values(data);
    
    charts.performance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Performance (%)',
                data: values,
                backgroundColor: values.map(value => 
                    value > 0 ? '#10b981' : '#ef4444'
                ),
                borderColor: values.map(value => 
                    value > 0 ? '#059669' : '#dc2626'
                ),
                borderWidth: 1,
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Performance: ${context.parsed.y.toFixed(1)}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Update charts when data changes
function updateCharts() {
    Object.values(charts).forEach(chart => {
        chart.update();
    });
}

// Destroy charts (useful for theme changes)
function destroyCharts() {
    Object.values(charts).forEach(chart => {
        chart.destroy();
    });
    charts = {};
}

// Responsive chart handling
function handleChartResize() {
    Object.values(charts).forEach(chart => {
        chart.resize();
    });
}

// Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for the DOM to be fully ready
    setTimeout(initializeCharts, 100);
});

// Handle window resize
window.addEventListener('resize', handleChartResize);

