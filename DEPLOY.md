# Deploy no GitHub Pages

Este guia mostra como hospedar seu Portfolio Financeiro no GitHub Pages gratuitamente.

## 📋 Pré-requisitos

- Conta no GitHub
- Repositório criado (público ou privado com GitHub Pro)

## 🚀 Passo a Passo

### 1. Preparar o Repositório

1. **Crie um novo repositório** no GitHub
   - Nome sugerido: `portfolio-financeiro`
   - Marque como público (necessário para GitHub Pages gratuito)

2. **Faça upload dos arquivos** ou clone e faça push:
   ```bash
   git clone https://github.com/seuusuario/portfolio-financeiro.git
   cd portfolio-financeiro
   # Copie todos os arquivos do projeto aqui
   git add .
   git commit -m "Adicionar dashboard financeiro"
   git push origin main
   ```

### 2. Ativar GitHub Pages

1. **Acesse as configurações** do repositório
   - Vá para `Settings` > `Pages`

2. **Configure a fonte**
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`

3. **Salve as configurações**
   - Clique em `Save`

### 3. Acessar o Site

Após alguns minutos, seu site estará disponível em:
```
https://seuusuario.github.io/portfolio-financeiro
```

## ⚙️ Configurações Avançadas

### Custom Domain (Opcional)

Se você tem um domínio próprio:

1. **Adicione um arquivo `CNAME`** na raiz do projeto:
   ```
   meuportfolio.com
   ```

2. **Configure o DNS** do seu domínio:
   - Tipo: CNAME
   - Nome: www (ou @)
   - Valor: seuusuario.github.io

### HTTPS

O GitHub Pages fornece HTTPS automaticamente para:
- Domínios `.github.io`
- Domínios customizados (após configuração)

## 🔧 Personalização dos Dados

### Editando Seus Dados

1. **Abra o arquivo `data.js`**
2. **Substitua os dados de exemplo** pelos seus:

```javascript
const portfolioData = {
    summary: {
        totalValue: SEU_PATRIMONIO_TOTAL,
        investedValue: SEU_VALOR_INVESTIDO,
        // ... outros dados
    },
    
    topPositions: [
        {
            ticker: "SUA_ACAO",
            company: "Nome da Empresa",
            quantity: QUANTIDADE,
            avgPrice: PRECO_MEDIO,
            currentPrice: PRECO_ATUAL,
            // ... outros campos
        }
        // ... suas outras posições
    ]
};
```

### Atualizando Dados

Para atualizar os dados:

1. **Edite o arquivo `data.js`**
2. **Faça commit e push**:
   ```bash
   git add data.js
   git commit -m "Atualizar dados da carteira"
   git push origin main
   ```

3. **Aguarde alguns minutos** para o site atualizar

## 📱 Testando Localmente

Antes de fazer deploy, teste localmente:

```bash
# Navegue até a pasta do projeto
cd portfolio-financeiro

# Inicie um servidor local
python3 -m http.server 8000

# Acesse no navegador
# http://localhost:8000
```

## 🔒 Segurança e Privacidade

### Dados Sensíveis

**⚠️ IMPORTANTE**: Não inclua informações sensíveis como:
- Números de conta
- CPF/RG
- Senhas
- Dados bancários completos

### Recomendações

- Use apenas tickers e valores
- Considere usar valores aproximados
- Mantenha o repositório privado se preferir
- Use GitHub Pro para Pages privado

## 🔄 Atualizações Automáticas

### GitHub Actions (Opcional)

Para atualizações automáticas, crie `.github/workflows/update.yml`:

```yaml
name: Update Portfolio Data

on:
  schedule:
    - cron: '0 9 * * 1-5'  # Segunda a sexta, 9h
  workflow_dispatch:

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Update data
        run: |
          # Script para buscar cotações atuais
          # e atualizar data.js
      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add data.js
          git commit -m "Auto-update portfolio data" || exit 0
          git push
```

## 🐛 Solução de Problemas

### Site não carrega

1. **Verifique se o GitHub Pages está ativo**
2. **Confirme que os arquivos estão na branch correta**
3. **Aguarde até 10 minutos** para propagação

### Dados não aparecem

1. **Verifique erros no console** do navegador (F12)
2. **Confirme a sintaxe** do arquivo `data.js`
3. **Teste localmente** primeiro

### Gráficos não funcionam

1. **Verifique a conexão** com CDN do Chart.js
2. **Teste em navegador diferente**
3. **Verifique console** para erros JavaScript

## 📞 Suporte

Para problemas específicos:

1. **Verifique a documentação** do GitHub Pages
2. **Abra uma issue** no repositório
3. **Consulte a comunidade** GitHub

---

**🎉 Parabéns! Seu dashboard financeiro está online!**

