// Seleciona os elementos das colunas e do formulário
const form = document.getElementById('formKaban');
const todo = document.getElementById('todo');
const doing = document.getElementById('doing');
const done = document.getElementById('done');

// Ao enviar o formulário, cria uma nova tarefa em To Do
form.addEventListener('submit', function(event) {
    event.preventDefault();
    // Pega os valores dos campos
    const titulo = document.getElementById('titulo').value.trim();
    const descricao = document.getElementById('descricao').value.trim();
    const prioridade = document.getElementById('prioridade').value;
    if (!titulo || !descricao || !prioridade) return;

    // Cria o card da tarefa
    const card = document.createElement('div');
    card.className = 'kaban-card prioridade-' + prioridade;
    card.innerHTML = `<div class="titulo">${titulo}</div>
        <div class="descricao">${descricao}</div>
        <div class="prioridade">Prioridade: ${prioridade.charAt(0).toUpperCase() + prioridade.slice(1)}</div>`;

    // Cria o botão de editar
    const btnEdit = document.createElement('button');
    btnEdit.textContent = 'Editar';
    card.appendChild(btnEdit);

    // Função de edição
    btnEdit.addEventListener('click', function() {
        // Seleciona os elementos de texto
        const tituloDiv = card.querySelector('.titulo');
        const descricaoDiv = card.querySelector('.descricao');
        // Cria inputs para edição
        const inputTitulo = document.createElement('input'); 
        inputTitulo.value = tituloDiv.textContent;
        const inputDescricao = document.createElement('textarea');
        inputDescricao.value = descricaoDiv.textContent;
        // Substitui os textos pelos inputs
        card.replaceChild(inputTitulo, tituloDiv);
        card.replaceChild(inputDescricao, descricaoDiv);
        // Troca o botão Editar por Salvar
        btnEdit.style.display = 'none';
        const btnSalvar = document.createElement('button');
        btnSalvar.textContent = 'Salvar';
        card.insertBefore(btnSalvar, card.firstChild); // Insere antes do botão →
        btnSalvar.addEventListener('click', function() {
            // Atualiza os textos
            const novoTitulo = document.createElement('div');
            novoTitulo.className = 'titulo';
            novoTitulo.textContent = inputTitulo.value;
            const novaDescricao = document.createElement('div');
            novaDescricao.className = 'descricao';
            novaDescricao.textContent = inputDescricao.value;
            card.replaceChild(novoTitulo, inputTitulo);
            card.replaceChild(novaDescricao, inputDescricao);
            btnSalvar.remove();
            btnEdit.style.display = '';
        });
    });

    // Cria o botão para mover para Doing/Done
    const btnNext = document.createElement('button');
    btnNext.textContent = '→';
    card.appendChild(btnNext);

    // Evento para mover para Doing
    btnNext.addEventListener('click', function() {
        doing.appendChild(card);
        btnNext.textContent = '→';
        // Remove evento antigo
        btnNext.replaceWith(btnNext.cloneNode(true));
        // Adiciona novo evento para mover para Done
        const btnNext2 = card.querySelector('button:last-of-type');
        btnNext2.addEventListener('click', function() {
            done.appendChild(card);
            btnNext2.remove(); // Remove o botão ao chegar em Done
        });
    }, { once: true });

    // Adiciona o card em To Do
    todo.appendChild(card);
    form.reset();
});