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

// Carrega o carrinho, pontos e inventory do localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || { items: [], total: 0 };
let points = parseInt(localStorage.getItem('points'), 10) || 0;
let products = JSON.parse(localStorage.getItem('inventory')) || [];

// Referências
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

  cart.items.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');

    // Nome + quantidade
    const nameP = document.createElement('p');
    nameP.textContent = `${item.name} (x${item.qty})`;

    // Subtotal
    const subTotal = item.price * item.qty;
    const priceSpan = document.createElement('span');
    priceSpan.textContent = `R$ ${subTotal.toFixed(2)}`;

    // Botões + e - (para remover)
    const cartButtonsDiv = document.createElement('div');
    cartButtonsDiv.classList.add('cart-buttons');

    // Botão "-" (vermelho)
    const minusBtn = document.createElement('button');
    minusBtn.classList.add('btn-minus');
    minusBtn.textContent = '-';
    minusBtn.addEventListener('click', () => {
      removeOneItem(item, index);
    });

    cartButtonsDiv.appendChild(minusBtn);

    // Monta a estrutura
    itemDiv.appendChild(nameP);
    itemDiv.appendChild(priceSpan);
    itemDiv.appendChild(cartButtonsDiv);

    cartItemsDiv.appendChild(itemDiv);
  });

  // Exibe total e pontos
  cartTotal.textContent = `Total: R$ ${cart.total.toFixed(2)}`;
  pointsInfo.textContent = `Você possui ${points} pontos! (Descontos em viagens, etc.)`;
}

/**
 * Remove 1 unidade do item no carrinho
 */
function removeOneItem(item, index) {
  // Se a quantidade for > 0
  if (item.qty > 0) {
    item.qty -= 1;
    cart.total -= item.price;
    // Remove pontos
    points -= Math.round(item.price);

    // Devolve ao estoque
    let prod = products.find(p => p.id === item.id);
    if (prod) {
      prod.quantity += 1;
    }

    // Se qty chegar a 0, remove do array
    if (item.qty === 0) {
      cart.items.splice(index, 1);
    }

    // Salva no localStorage
    localStorage.setItem('inventory', JSON.stringify(products));
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('points', points.toString());

    // Re-renderiza
    renderCart();
  }
}

// Chama a função
renderCart();
