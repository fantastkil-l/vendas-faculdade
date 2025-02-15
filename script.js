/**
 * Função para copiar a chave PIX
 * É chamada diretamente no HTML (onclick="copiarChavePIX()")
 */
function copiarChavePIX() {
  const chavePixElement = document.getElementById('chave-pix');
  const chave = chavePixElement.textContent.trim();

  // Tenta copiar usando a API Clipboard
  navigator.clipboard.writeText(chave)
    .then(() => {
      alert('Chave PIX copiada com sucesso!');
    })
    .catch((err) => {
      console.error('Erro ao copiar a chave PIX:', err);
    });
}

/**
 * Aguarda o carregamento do DOM para associar eventos aos botões de "Adicionar"
 */
document.addEventListener('DOMContentLoaded', () => {
  const adicionarButtons = document.querySelectorAll('.adicionar');
  const totalCompraElement = document.getElementById('total-compra');
  let total = 0; // Variável para armazenar o valor total

  // Para cada botão de "Adicionar", adicionamos um listener de clique
  adicionarButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // Encontra o elemento <span> que contém o preço dentro do mesmo "produto-item"
      const priceSpan = button.parentElement.querySelector('span');
      
      if (priceSpan) {
        // Exemplo de priceSpan.textContent: "R$ 1.50"
        const rawPrice = priceSpan.textContent.replace('R$', '').trim();
        const price = parseFloat(rawPrice);

        if (!isNaN(price)) {
          total += price;
          // Atualiza o elemento #total-compra com o novo valor
          totalCompraElement.textContent = `Total: R$ ${total.toFixed(2)}`;
        }
      }
    });
  });
});
