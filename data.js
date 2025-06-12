// Portfolio data based on the real analysis
const portfolioData = {
    summary: {
        totalValue: 605798.36,
        investedValue: 531652.55,
        totalGain: 74145.81,
        totalGainPercent: 13.95,
        positionsCount: 57,
        portfolioScore: 78.0
    },
    
    assetDistribution: {
        FII: { value: 430410, percentage: 71.0, count: 10 },
        Stock: { value: 118954, percentage: 19.6, count: 24 },
        REIT: { value: 56435, percentage: 9.3, count: 23 }
    },
    
    performanceByType: {
        Stock: 61.8,
        FII: 6.5,
        REIT: 4.8
    },
    
    topPositions: [
        {
            ticker: "HGLG11",
            type: "FII",
            company: "HGLG11",
            quantity: 134,
            avgPrice: 172.33,
            currentPrice: 184.65,
            currentValue: 24702.86,
            gain: 1610.86,
            gainPercent: 7.0,
            weight: 4.08
        },
        {
            ticker: "HGRE11",
            type: "FII",
            company: "HGRE11",
            quantity: 63,
            avgPrice: 172.67,
            currentPrice: 198.57,
            currentValue: 12510.35,
            gainPercent: 15.0,
            weight: 2.06
        },
        {
            ticker: "HGRU11",
            type: "FII",
            company: "HGRU11",
            quantity: 75,
            avgPrice: 162.09,
            currentPrice: 163.09,
            currentValue: 12232.89,
            gainPercent: 0.6,
            weight: 2.02
        },
        {
            ticker: "LRCX",
            type: "Stock",
            company: "Lam Research",
            quantity: 5,
            avgPrice: 75.15,
            currentPrice: 950.00,
            currentValue: 4750.00,
            gainPercent: 1164.1,
            weight: 0.78
        },
        {
            ticker: "NVDA",
            type: "Stock",
            company: "Nvidia",
            quantity: 13,
            avgPrice: 29.00,
            currentPrice: 135.00,
            currentValue: 1755.00,
            gainPercent: 365.6,
            weight: 0.29
        },
        {
            ticker: "AAPL",
            type: "Stock",
            company: "Apple",
            quantity: 9,
            avgPrice: 146.80,
            currentPrice: 220.00,
            currentValue: 1980.00,
            gainPercent: 49.9,
            weight: 0.33
        },
        {
            ticker: "MSFT",
            type: "Stock",
            company: "Microsoft",
            quantity: 2,
            avgPrice: 361.43,
            currentPrice: 450.00,
            currentValue: 900.00,
            gainPercent: 24.5,
            weight: 0.15
        },
        {
            ticker: "META",
            type: "Stock",
            company: "Meta",
            quantity: 1,
            avgPrice: 225.20,
            currentPrice: 520.00,
            currentValue: 520.00,
            gainPercent: 130.9,
            weight: 0.09
        },
        {
            ticker: "GOOGL",
            type: "Stock",
            company: "Google",
            quantity: 3,
            avgPrice: 88.63,
            currentPrice: 175.00,
            currentValue: 525.00,
            gainPercent: 97.5,
            weight: 0.09
        }
    ],
    
    recommendations: {
        buy: [
            {
                ticker: "LRCX",
                company: "Lam Research",
                reason: "Performance excepcional (+1.164%) e baixo peso na carteira (4,3%)",
                priority: "ALTA"
            },
            {
                ticker: "NVDA",
                company: "Nvidia",
                reason: "Performance excelente (+366%) e baixo peso na carteira (1,6%)",
                priority: "ALTA"
            },
            {
                ticker: "AAPL",
                company: "Apple",
                reason: "Performance sólida (+50%) e baixo peso na carteira (1,8%)",
                priority: "ALTA"
            },
            {
                ticker: "AMZN",
                company: "Amazon",
                reason: "Gap crítico na carteira - empresa essencial",
                priority: "ALTA"
            },
            {
                ticker: "PLTR",
                company: "Palantir",
                reason: "Líder em IA empresarial com crescimento explosivo",
                priority: "ALTA"
            }
        ],
        rebalance: [
            {
                ticker: "HGLG11",
                company: "HGLG11",
                reason: "Concentração alta (22,4%) - considerar reduzir posição",
                priority: "MÉDIA"
            },
            {
                ticker: "HGRE11",
                company: "HGRE11",
                reason: "Concentração alta (11,4%) - considerar reduzir posição",
                priority: "MÉDIA"
            },
            {
                ticker: "HGRU11",
                company: "HGRU11",
                reason: "Concentração alta (11,1%) - considerar reduzir posição",
                priority: "MÉDIA"
            }
        ],
        watch: [
            {
                ticker: "CPRT",
                company: "Copart",
                reason: "Performance ruim (-50,9%) - monitorar de perto",
                priority: "BAIXA"
            },
            {
                ticker: "FAST",
                company: "Fastenal",
                reason: "Performance negativa (-26,5%) - avaliar fundamentos",
                priority: "BAIXA"
            }
        ]
    },
    
    recentActivity: [
        {
            type: "buy",
            icon: "fas fa-arrow-up",
            iconColor: "#10b981",
            title: "Compra realizada",
            description: "NVDA - 13 ações adicionadas",
            time: "2 horas atrás",
            value: "+$1.755"
        },
        {
            type: "dividend",
            icon: "fas fa-coins",
            iconColor: "#f59e0b",
            title: "Dividendo recebido",
            description: "HGLG11 - Rendimento mensal",
            time: "1 dia atrás",
            value: "+R$ 234"
        },
        {
            type: "update",
            icon: "fas fa-sync-alt",
            iconColor: "#3b82f6",
            title: "Cotações atualizadas",
            description: "Todas as posições sincronizadas",
            time: "3 horas atrás",
            value: ""
        },
        {
            type: "alert",
            icon: "fas fa-exclamation-triangle",
            iconColor: "#ef4444",
            title: "Alerta de concentração",
            description: "HGLG11 representa 22,4% da carteira",
            time: "1 dia atrás",
            value: ""
        }
    ],
    
    scores: {
        performance: 77.9,
        diversification: 100.0,
        volatility: 56.0,
        overall: 78.0
    },
    
    riskMetrics: {
        volatilityAverage: 44.0,
        highRiskPositions: 16,
        concentrationTop10: 76.1,
        beta: 1.15
    }
};

// Market data for additional context
const marketData = {
    indices: {
        SP500: { value: 5234.18, change: 0.85, changePercent: 0.016 },
        NASDAQ: { value: 16341.23, change: -23.45, changePercent: -0.14 },
        IBOV: { value: 126543.21, change: 1234.56, changePercent: 0.98 }
    },
    
    currencies: {
        USDBRL: { value: 5.45, change: 0.02, changePercent: 0.37 },
        EURBRL: { value: 5.89, change: -0.01, changePercent: -0.17 }
    }
};

// Export data for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { portfolioData, marketData };
}

