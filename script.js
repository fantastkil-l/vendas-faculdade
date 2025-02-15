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
 * e geramos o QR Code inicial (valor 0).
 */
document.addEventListener('DOMContentLoaded', () => {
  const adicionarButtons = document.querySelectorAll('.adicionar');
  const totalCompraElement = document.getElementById('total-compra');
  let total = 0;

  // Gera o QR Code inicial com total = 0
  atualizaQRCodePix(total);

  // Para cada botão de "Adicionar", adiciona um listener de clique
  adicionarButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const priceSpan = button.parentElement.querySelector('span');
      if (priceSpan) {
        const rawPrice = priceSpan.textContent.replace('R$', '').trim();
        const price = parseFloat(rawPrice);
        if (!isNaN(price)) {
          total += price;
          totalCompraElement.textContent = `Total: R$ ${total.toFixed(2)}`;
          // Atualiza o QR Code Pix com o novo total
          atualizaQRCodePix(total);
        }
      }
    });
  });
});

/**
 * Gera e atualiza o QR Code Pix de acordo com o total do carrinho.
 * Usamos a biblioteca Pix (JuniorB2SS) para criar o payload e gerar a imagem Base64.
 */
function atualizaQRCodePix(total) {
  // Monta o payload Pix
  const brcode = Pix({
    version: '01',
    key: '4c5a1c62-0a1d-4761-ab63-668faa2adfe0', // Substitua se desejar outra chave
    name: 'Fulano de Tal',   // Nome do recebedor (máx. 25 chars)
    city: 'SAO PAULO',       // Cidade do recebedor (máx. 15 chars)
    transactionId: '***',    // ID da transação (até 25 chars)
    message: 'Carrinho Faculdade', // Mensagem opcional
    value: total             // Valor numérico do carrinho
  });

  // Gera a imagem do QR Code em Base64
  const base64QrCode = brcode.base64();

  // Substitui a imagem <img id="qrcode-pix"> pelo QR Code gerado
  const qrCodeImg = document.getElementById('qrcode-pix');
  qrCodeImg.src = base64QrCode;
}
