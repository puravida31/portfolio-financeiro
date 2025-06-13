
const tickers = ["NVDA", "MSFT", "GOOGL", "AMZN", "META"];
const metas = {
  NVDA: 1200, MSFT: 950, GOOGL: 300, AMZN: 250, META: 520
};

tickers.forEach(ticker => {
  fetch(`/api/price?ticker=${ticker}`)
    .then(r => r.json())
    .then(data => {
      const price = parseFloat(data.price);
      document.getElementById(`${ticker}-price`).innerText = `$${price.toFixed(2)}`;
      const pct = Math.min(100, (price / metas[ticker]) * 100);
      const bar = document.getElementById(`${ticker}-bar`);
      bar.style.width = `${pct}%`;
      bar.innerText = `${pct.toFixed(0)}%`;
    })
    .catch(() => {
      document.getElementById(`${ticker}-price`).innerText = "Erro";
    });
});
