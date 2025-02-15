// Array inicial de produtos
const initialProducts = [
  { id: 1, name: 'pacoquinha', price: 1.50, quantity: 40, img: 'pacoquinha.jpg' },
  { id: 2, name: 'freegells', price: 2.00, quantity: 20, img: 'freegells.jpg' },
  { id: 3, name: 'salgadinho torcida', price: 4.50, quantity: 8,  img: 'salgadinho_torcida.jpg' },
  { id: 4, name: 'biscoitos', price: 3.00, quantity: 15, img: 'biscoitos.jpg' }
];

// Carrega do localStorage ou usa initialProducts
let products = JSON.parse(localStorage.getItem('inventory')) || initialProducts;

// Carrega carrinho do localStorage ou inicia vazio
let cart = JSON.parse(localStorage.getItem('cart')) || { items: [], total: 0 };

// Carrega pontos do localStorage ou inicia em 0
let points = parseInt(localStorage.getItem('points'), 10) || 0;

// Referências no DOM
const productList = document.getElementById('product-list');
const totalCompraElement = document.getElementById('total-compra');

/**
 * Renderiza os produtos na tela
 */
function renderProducts() {
  productList.innerHTML = '';

  products.forEach((prod) => {
    // Cria o card
    const card = document.createElement('div');
    card.classList.add('product-card');

    // Imagem quadrada
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('image-container');
    const img = document.createElement('img');
    img.src = prod.img;
    img.alt = prod.name;
    imgContainer.appendChild(img);

    // Título
    const title = document.createElement('h3');
    title.textContent = prod.name;

    // Quantidade disponível
    const qtyText = document.createElement('p');
    qtyText.textContent = `Quantidade: ${prod.quantity}`;

    // Preço
    const priceSpan = document.createElement('span');
    priceSpan.classList.add('price');
    priceSpan.textContent = `R$ ${prod.price.toFixed(2)}`;

    // Botão "+" (verde)
    const plusButton = document.createElement('button');
    plusButton.classList.add('btn-plus');
    plusButton.textContent = '+';

    // Evento de clique em "+"
    plusButton.addEventListener('click', () => {
      if (prod.quantity > 0) {
        // Decrementa o estoque
        prod.quantity -= 1;
        qtyText.textContent = `Quantidade: ${prod.quantity}`;

        // Atualiza o carrinho
        cart.total += prod.price;
        let cartItem = cart.items.find(item => item.id === prod.id);
        if (cartItem) {
          cartItem.qty += 1;
        } else {
          cart.items.push({ id: prod.id, name: prod.name, price: prod.price, qty: 1 });
        }

        // Atualiza pontos (1 ponto por R$1, arredondado)
        points += Math.round(prod.price);

        // Salva no localStorage
        localStorage.setItem('inventory', JSON.stringify(products));
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('points', points.toString());

        // Exibe o total na tela (se estava hidden)
        totalCompraElement.style.display = 'block';
        totalCompraElement.textContent = `Total: R$ ${cart.total.toFixed(2)}`;
      } else {
        alert('Produto esgotado!');
      }
    });

    // Monta a estrutura do card
    card.appendChild(imgContainer);
    card.appendChild(title);
    card.appendChild(qtyText);
    card.appendChild(priceSpan);
    card.appendChild(plusButton);

    productList.appendChild(card);
  });
}

// Inicializa a renderização
renderProducts();

// Se já houver itens no carrinho, exibe o total
if (cart.total > 0) {
  totalCompraElement.style.display = 'block';
  totalCompraElement.textContent = `Total: R$ ${cart.total.toFixed(2)}`;
}
