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

  // Gera o QR Code inicial (valor 0)
  atualizaQRCodePix(total);

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
 * 1) Cria o payload Pix usando a lib Pix (JuniorB2SS).
 * 2) Desenha o QR Code com a lib qrcode.js a partir do payload.
 */
function atualizaQRCodePix(total) {
  // Monta o payload Pix
  const brcode = Pix({
    version: '01',
    key: '4c5a1c62-0a1d-4761-ab63-668faa2adfe0', // Altere se quiser outra chave
    name: 'Fulano de Tal',   // Máximo 25 caracteres
    city: 'SAOPAULO',        // Máximo 15 caracteres, sem espaços ou acentos
    transactionId: '***',    // Até 25 chars
    message: 'Carrinho Online',
    value: total
  });

  // Payload EMV (texto)
  const payload = brcode.payload();

  // Limpa o container do QR Code antes de redesenhar
  const qrcodeDiv = document.getElementById('qrcode-pix');
  qrcodeDiv.innerHTML = '';

  // Cria um novo QR Code usando a biblioteca qrcode.js
  new QRCode(qrcodeDiv, {
    text: payload,
    width: 200,
    height: 200
  });
}
