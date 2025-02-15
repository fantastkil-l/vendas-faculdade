/**
 * Copiar a chave PIX ao clicar no botão
 */
function copiarChavePIX() {
  const chavePixElement = document.getElementById('chave-pix');
  const chave = chavePixElement.textContent.trim();

  navigator.clipboard.writeText(chave)
    .then(() => {
      alert('Chave PIX copiada com sucesso!');
    })
    .catch((err) => {
      console.error('Erro ao copiar a chave PIX:', err);
    });
}

// Carrega o carrinho e pontos do localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || { items: [], total: 0 };
let points = parseInt(localStorage.getItem('points'), 10) || 0;

const cartItemsDiv = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const pointsInfo = document.getElementById('points-info');

/**
 * Renderiza o carrinho
 */
function renderCart() {
  cartItemsDiv.innerHTML = '';

  if (cart.items.length === 0) {
    cartItemsDiv.innerHTML = '<p>Seu carrinho está vazio.</p>';
    cartTotal.textContent = 'Total: R$ 0.00';
    pointsInfo.textContent = '';
    return;
  }

  // Lista de itens
  cart.items.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');

    const nameP = document.createElement('p');
    nameP.textContent = `${item.name} (x${item.qty})`;

    const priceSpan = document.createElement('span');
    let subTotal = item.price * item.qty;
    priceSpan.textContent = `R$ ${subTotal.toFixed(2)}`;

    itemDiv.appendChild(nameP);
    itemDiv.appendChild(priceSpan);
    cartItemsDiv.appendChild(itemDiv);
  });

  // Total
  cartTotal.textContent = `Total: R$ ${cart.total.toFixed(2)}`;

  // Pontos
  pointsInfo.textContent = `Você possui ${points} pontos! (Descontos em viagens, etc.)`;
}

// Chama a função
renderCart();

