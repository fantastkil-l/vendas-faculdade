// Dados do estoque com imagens e preços
const produtos = {
    "pacoquinha": { "quantidade": 40, "preco": 1.50, "imagem": "pacoquinha.jpg" },
    "freegells": { "quantidade": 24, "preco": 2.00, "imagem": "freegells.jpg" },
    "salgadinho_torcida": { "quantidade": 8, "preco": 4.50, "imagem": "salgadinho_torcida.jpg" },
    "biscoitos": { "quantidade": 6, "preco": 3.00, "imagem": "biscoitos.jpg" }
};

// Função para carregar o estoque e exibir os produtos
function carregarEstoque() {
    let estoqueContainer = document.getElementById('estoque');
    estoqueContainer.innerHTML = '';

    for (let item in produtos) {
        let produto = produtos[item];

        let produtoCard = document.createElement('div');
        produtoCard.classList.add('produto-card');
        produtoCard.dataset.produto = item;
        produtoCard.addEventListener('click', () => adicionarUmItem(item));

        let img = document.createElement('img');
        img.src = produto.imagem;
        img.alt = item;
        img.width = 60;

        let infoDiv = document.createElement('div');
        infoDiv.classList.add('produto-info');
        infoDiv.innerHTML = `<strong>${item.replace("_", " ")}</strong><br>Quantidade disponível: ${produto.quantidade}`;

        let preco = document.createElement('span');
        preco.classList.add('produto-preco');
        preco.innerText = `R$ ${produto.preco.toFixed(2)}`;

        let inputQuantidade = document.createElement('input');
        inputQuantidade.type = 'number';
        inputQuantidade.min = 0;
        inputQuantidade.max = produto.quantidade;
        inputQuantidade.value = 0;
        inputQuantidade.classList.add('quantidade-selecao');
        inputQuantidade.dataset.produto = item;
        inputQuantidade.addEventListener('input', calcularTotal);

        produtoCard.appendChild(img);
        produtoCard.appendChild(infoDiv);
        produtoCard.appendChild(preco);
        produtoCard.appendChild(inputQuantidade);

        estoqueContainer.appendChild(produtoCard);
    }
}

// Função para adicionar um item ao carrinho ao clicar no produto
function adicionarUmItem(produtoNome) {
    let input = document.querySelector(`input[data-produto='${produtoNome}']`);
    if (input) {
        let quantidadeAtual = parseInt(input.value);
        if (quantidadeAtual < produtos[produtoNome].quantidade) {
            input.value = quantidadeAtual + 1;
            calcularTotal();
        }
    }
}

// Função para calcular o total da compra
function calcularTotal() {
    let total = 0;
    let inputs = document.querySelectorAll('.quantidade-selecao');

    inputs.forEach(input => {
        let produto = produtos[input.dataset.produto];
        let quantidade = parseInt(input.value);
        if (!isNaN(quantidade)) {
            total += quantidade * produto.preco;
        }
    });
    
    document.getElementById('total-compra').innerText = `Total: R$ ${total.toFixed(2)}`;
}

// Função para copiar a chave PIX
function copiarChavePIX() {
    let chave = "SUA-CHAVE-PIX-ALEATÓRIA";
    navigator.clipboard.writeText(chave);
    alert("Chave PIX copiada!");
}

// Carrega o estoque automaticamente ao abrir a página
window.onload = () => {
    carregarEstoque();
    document.getElementById('total-compra').innerText = "Total: R$ 0.00";
};
