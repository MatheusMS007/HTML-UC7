// Seleciona os elementos das colunas
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
        <div class="prioridade">Prioridade: ${prioridade.charAt(0).toUpperCase() + prioridade.slice(1)}</div>
        <div class="buttons">
            <button class="next">→</button>
            <button class="prev">←</button>
        </div>`;
    // Botão para mover para Doing
    card.querySelector('.next').addEventListener('click', function() {
        doing.appendChild(card);
        this.textContent = '→'; // mantém o botão
        // Troca o evento para mover para Done
        this.onclick = function() {
            done.appendChild(card);
            this.remove(); // Remove o botão ao chegar em Done
        };
    });

    card.querySelector('.prev').addEventListener('click', function() {
        done.appendChild(card);
        this.textContent = '←'; // mantém o botão
            // Troca o evento para mover para Doing
        this.onclick = function(){
            doing.appendChild(card)
            this.remove(); // Remove o botão ao chegar em Done
        }
    });


    // Adiciona o card em To Do
    todo.appendChild(card);
    form.reset();
});
