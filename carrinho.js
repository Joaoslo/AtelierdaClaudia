// Adicionar ao carrinho
function adicionarAoCarrinho(idProduto, elemento) {
    fetch('api/verificar_sessao.php')
        .then(response => response.json())
        .then(data => {
            if (data.logado) {
                // Usuário logado - adiciona ao carrinho
                fetch('api/adicionar_carrinho.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        id_produto: idProduto, 
                        quantidade: 1 
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        mostrarPopup('Produto adicionado ao carrinho com sucesso!');
                        
                        // Mudar aparência do botão temporariamente
                        const botao = elemento;
                        const textoOriginal = botao.textContent;
                        botao.textContent = '✔ Adicionado';
                        botao.style.backgroundColor = '#4CAF50';
                        
                        setTimeout(() => {
                            botao.textContent = textoOriginal;
                            botao.style.backgroundColor = '';
                        }, 2000);
                    } else {
                        alert('Erro: ' + data.message);
                    }
                });
            } else {
                // Usuário não logado
                if (confirm('Você precisa estar logado para adicionar itens ao carrinho. Deseja fazer login agora?')) {
                    window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.href);
                }
            }
        });
}

// Funções para o popup
function mostrarPopup(mensagem) {
    const popup = document.getElementById('carrinhoPopup');
    document.getElementById('popupMessage').textContent = mensagem;
    popup.style.display = 'block';
}

function fecharPopup() {
    document.getElementById('carrinhoPopup').style.display = 'none';
}

// Fechar popup quando clicar no X
document.querySelector('.close-popup').addEventListener('click', fecharPopup);

// Fechar popup quando clicar fora
window.addEventListener('click', function(event) {
    const popup = document.getElementById('carrinhoPopup');
    if (event.target == popup) {
        fecharPopup();
    }
});