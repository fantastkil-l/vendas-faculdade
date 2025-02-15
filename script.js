/**
 * Função para copiar a chave PIX ao clicar no botão
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

/**
 * Quando a página carrega, associamos eventos aos botões "Adicionar"
 * para somar o valor total.
 */
document.addEventListener('DOMContentLoaded', () => {
  const adicionarButtons = document.querySelectorAll('.adicionar');
  const totalCompraElement = document.getElementById('total-compra');
  let total = 0;

  // Para cada botão de "Adicionar", adicionamos um listener de clique
  adicionarButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // Localiza o <span> que tem o preço (Ex: "R$ 1.50")
      const priceSpan = button.parentElement.querySelector('span');
      if (priceSpan) {
        // Remove "R$" e converte para número
        const rawPrice = priceSpan.textContent.replace('R$', '').trim();
        const price = parseFloat(rawPrice);
        if (!isNaN(price)) {
          // Soma ao total e atualiza na tela
          total += price;
          totalCompraElement.textContent = `Total: R$ ${total.toFixed(2)}`;
        }
      }
    });
  });
});
