// Buscando o form e a lista no DOM
const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = [] //  Declare um array de nome itens

// Criando listener do submit do form
form.addEventListener("submit", (evento) => {
    // Previnindo o refresh da página
    evento.preventDefault();

    // Cria variáveis para acessar os valores enviados
    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    // chamando a função de criar elemento na lista
    criaElemento(nome.value, quantidade.value);

    // Ao enviar um item para a lista, o formulário fica em branco
    nome.value = ""
    quantidade.value = ""
})

// Função para criar elemento na lista passando o nome e quantidade
function criaElemento(nome, quantidade) {

    // Criando elemento "li" e add a classe "item"
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    // Criando elemento "strong" e incluíndo a quantidade
    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = quantidade;

    // Inserindo o elemento "strong" no elemento "li" com o nome
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += nome;

    // Inserindo o elemento "li" no elemento "lista"
    lista.appendChild(novoItem);

    // Transforme a variável já criada, itemAtual, em um objeto object que receba os valores de nome e quantidade,
    const itemAtual = {
        "nome": nome,
        "quantidade": quantidade
    }

    // Insira a variável itemAtual nesse array itens, utilizando o método push
    itens.push(itemAtual);
    
    // E transforme os valores estes valores em string. Armazena o nome e a quantidade dos valores passados para a lista
    localStorage.setItem("item", JSON.stringify(itemAtual));
}
