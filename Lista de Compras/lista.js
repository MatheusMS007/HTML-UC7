window.addEventListener('DOMContentLoaded', function() { // Espera o HTML carregar antes de rodar o JS
    
    const inputProduto = document.getElementById('produto'); // Seleciona o campo de texto onde o usuário digita o produto
    const selectCategoria = document.getElementById('Categoria'); // Seleciona o campo de categoria
    const btnAdicionar = document.getElementById('adicionar'); // Seleciona o botão de adicionar
    const listaLimpeza = document.getElementById('Limpeza'); // Seleciona a lista de limpeza
    const listaFrutas = document.getElementById('Frutas'); // Seleciona a lista de frutas
    const listaBebidas = document.getElementById('Bebidas'); // Seleciona a lista de bebidas
    const listaConcluidos = document.getElementById('concluidos'); // Seleciona a lista de concluídos

    // Adiciona o produto na lista da categoria 
    btnAdicionar.addEventListener('click', function(event) {
        event.preventDefault(); // Evita que o formulário recarregue a página

        const produto = inputProduto.value.trim(); // Pega o valor do campo de texto e remove espaços extras
        const categoria = selectCategoria.value; // Pega o valor selecionado no campo de categoria

        if (produto === '' || categoria === '') {
            return;// Não faz nada se não preencher tudo
        }

        const btnConcluir = document.createElement('button'); // cria um botão para concluir
        btnConcluir.textContent = 'concluir';

        // Quando clicar no item, ele vai para a lista de concluídos
        li.addEventListener('click', function() {
            li.parentNode.removeChild(li); // Remove da lista atual
            listaConcluidos.appendChild(li); // Adiciona na lista de concluídos
        });


        // Adiciona na lista da categoria correta
        if (categoria === 'Limpeza') {
            listaLimpeza.appendChild(li);
        } else if (categoria === 'Frutas') {
            listaFrutas.appendChild(li);
        } else if (categoria === 'Bebidas') {
            listaBebidas.appendChild(li);
        }

        // Limpa o campo de texto e volta o foco para ele
        inputProduto.value = '';
        inputProduto.focus();
    });

    // Limpar toda a lista de concluídos ao duplo clique
    listaConcluidos.addEventListener('dblclick', function() {
        listaConcluidos.innerHTML = '';
    });
});