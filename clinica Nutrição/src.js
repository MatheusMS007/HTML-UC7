// conteúdo da página carregado
window.onload = function() {
    // Procura pelo formulário na página pelo id 'form-cadastro'
    var form = document.getElementById('form-cadastro');
    // Procura pela área onde as mensagens serão exibidas (opcional)
    var mensagem = document.getElementById('mensagem');

    // Se o formulário existir na página
    if (form) {
        // Quando o formulário for enviado
        form.onsubmit = function(event) {
            // Impede que a página recarregue ao enviar
            event.preventDefault();
            // Pega os valores dos campos do formulário
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;  
                // mostra mensagem de sucesso
                if (mensagem) {
                    mensagem.innerText = 'Cadastro realizado com sucesso!';
                    mensagem.style.color = 'green';
                } else {
                    alert('Cadastro realizado com sucesso!');
                }
                // para salvar os dados
                form.reset(); // Limpa o formulário
            }
        }
    }