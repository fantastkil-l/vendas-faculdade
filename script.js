async function carregarEstoque() {
    const response = await fetch('estoque.json');
    const estoque = await response.json();

    let listaEstoque = document.getElementById('estoque');
    listaEstoque.innerHTML = '';

    for (let item in estoque) {
        let li = document.createElement('li');
        li.innerText = `${item}: ${estoque[item]}`;
        listaEstoque.appendChild(li);
    }
}

async function carregarPedidos() {
    const response = await fetch('pedidos.json');
    const pedidos = await response.json();

    let listaPedidos = document.getElementById('pedidos');
    listaPedidos.innerHTML = '';

    pedidos.forEach(pedido => {
        let li = document.createElement('li');
        li.innerText = `${pedido.nome} pediu ${pedido.quantidade} ${pedido.produto}`;
        listaPedidos.appendChild(li);
    });
}

function copiarChavePIX() {
    let chave = document.getElementById("chavePix").innerText;
    navigator.clipboard.writeText(chave);
    alert("Chave PIX copiada!");
}

setInterval(carregarEstoque, 5000);
setInterval(carregarPedidos, 5000);
