// Dados do estoque com imagens e preços
const produtos = {
    "pacoquinha": { "quantidade": 40, "preco": 1.50, "imagem": "imagens/pacoquinha.jpg" },
    "freegells": { "quantidade": 24, "preco": 2.00, "imagem": "imagens/freegells.jpg" },
    "salgadinho_torcida": { "quantidade": 8, "preco": 4.50, "imagem": "imagens/salgadinho_torcida.jpg" },
    "biscoitos": { "quantidade": 6, "preco": 3.00, "imagem": "imagens/biscoitos.jpg" }
};

// Função para carregar o estoque e exibir os produtos
function carregarEstoque() {
    let estoqueContainer = document.getElementById('estoque');
    estoqueContainer.innerHTML = '';

    for (let item in produtos) {
        let produto = produtos[item];

        let produtoCard = document.createElement('div');
        produtoCard.classList.add('produto-card');

        let img = document.createElement('img');
        img.src = produto.imagem;
        img.alt = item;

        let infoDiv = document.createElement('div');
        infoDiv.classList.add('produto-info');
        infoDiv.innerHTML = `<strong>${item.replace("_", " ")}</strong><br>Quantidade: ${produto.quantidade}`;

        let preco = document.createElement('span');
        preco.classList.add('produto-preco');
        preco.innerText = `R$ ${produto.preco.toFixed(2)}`;

        produtoCard.appendChild(img);
        produtoCard.appendChild(infoDiv);
        produtoCard.appendChild(preco);

        estoqueContainer.appendChild(produtoCard);
    }
}

// Função para copiar a chave PIX
function copiarChavePIX() {
    let chave = "SUA-CHAVE-PIX-ALEATÓRIA";
    navigator.clipboard.writeText(chave);
    alert("Chave PIX copiada!");
}

// Carrega o estoque automaticamente ao abrir a página
carregarEstoque();
