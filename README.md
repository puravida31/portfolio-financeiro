# Portfolio Financeiro

Um dashboard completo para acompanhamento de investimentos pessoais, desenvolvido para ser hospedado no GitHub Pages.

## 🚀 Funcionalidades

### 📊 Dashboard Principal
- **Visão Geral**: Patrimônio total, valor investido, ganhos/perdas e score geral
- **Gráficos Interativos**: Distribuição por classe de ativo e performance por setor
- **Atividade Recente**: Histórico de transações e atualizações

### 💼 Gestão de Carteira
- **Tabela Detalhada**: Todas as posições com filtros e busca
- **Filtros Avançados**: Por tipo de ativo, performance e ticker
- **Ordenação**: Por valor, performance ou nome do ativo

### 📈 Análise Avançada
- **Métricas de Performance**: Retorno total, melhor e pior ativo
- **Análise de Diversificação**: Total de ativos, classes e concentração
- **Gestão de Risco**: Volatilidade, beta da carteira e alertas

### 💡 Recomendações Inteligentes
- **Comprar Mais**: Ativos com potencial de crescimento
- **Rebalancear**: Posições com concentração elevada
- **Monitorar**: Ativos que precisam de atenção

### ⚙️ Configurações
- **Temas**: Modo claro e escuro
- **Moedas**: Real (BRL) e Dólar (USD)
- **Importação/Exportação**: Dados em CSV e JSON

## 🎨 Design

- **Interface Moderna**: Design responsivo e profissional
- **Tema Escuro/Claro**: Alternância automática ou manual
- **Animações Suaves**: Transições e micro-interações
- **Mobile-First**: Otimizado para todos os dispositivos

## 🛠️ Tecnologias

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com variáveis CSS
- **JavaScript**: Funcionalidades interativas
- **Chart.js**: Gráficos responsivos
- **Font Awesome**: Ícones vetoriais

## 📱 Responsividade

O site é totalmente responsivo e funciona perfeitamente em:
- 📱 Smartphones
- 📱 Tablets
- 💻 Desktops
- 🖥️ Monitores grandes

## 🚀 Como Usar

### Deploy no GitHub Pages

1. **Fork ou Clone** este repositório
2. **Ative o GitHub Pages** nas configurações do repositório
3. **Selecione a branch main** como fonte
4. **Acesse** seu site em `https://seuusuario.github.io/portfolio-financeiro`

### Personalização

1. **Edite o arquivo `data.js`** com seus dados reais
2. **Customize as cores** no arquivo `styles.css`
3. **Adicione suas posições** na estrutura de dados
4. **Configure as recomendações** conforme sua estratégia

## 📊 Estrutura de Dados

```javascript
const portfolioData = {
    summary: {
        totalValue: 605798.36,
        investedValue: 531652.55,
        totalGain: 74145.81,
        totalGainPercent: 13.95,
        positionsCount: 57,
        portfolioScore: 78.0
    },
    // ... mais dados
};
```

## 🔧 Configuração

### Dados da Carteira
Edite o arquivo `data.js` para incluir:
- Suas posições atuais
- Preços de compra e atuais
- Tipos de ativos (FII, Stock, REIT)
- Recomendações personalizadas

### Personalização Visual
No arquivo `styles.css`, você pode alterar:
- Cores do tema (variáveis CSS)
- Fontes e tamanhos
- Espaçamentos e layouts
- Animações e transições

## 📈 Métricas Incluídas

- **Performance Total**: Ganho/perda geral da carteira
- **Diversificação**: Distribuição entre classes de ativos
- **Volatilidade**: Análise de risco das posições
- **Concentração**: Peso das principais posições
- **Beta**: Correlação com o mercado

## 🔒 Privacidade

- **Dados Locais**: Todas as informações ficam no seu navegador
- **Sem Servidor**: Não há envio de dados para servidores externos
- **GitHub Pages**: Hospedagem gratuita e segura
- **Código Aberto**: Transparência total do funcionamento

## 📝 Licença

Este projeto é de código aberto e pode ser usado livremente para fins pessoais.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir melhorias
- Adicionar funcionalidades
- Melhorar a documentação

## 📞 Suporte

Para dúvidas ou sugestões, abra uma issue no repositório.

---

**Desenvolvido com ❤️ para acompanhamento financeiro pessoal**

