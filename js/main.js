// Buscando o form e a lista no DOM
const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [] //  Declare um array de nome itens || esse sinal declara para trazer verdadeiro ou falso. alterar valores de tipo texto, para valores JavaScript com o método JSON.parse

// Aplicamos o método forEach() para manter os itens criados na página, mesmo após atualizá-la
itens.forEach((elemento) => {
    criaElemento(elemento);
})

// Criando listener do submit do form
form.addEventListener("submit", (evento) => {
    // Previnindo o refresh da página
    evento.preventDefault();

    // Cria variáveis para acessar os valores enviados
    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    // Const para conferir elemento nome no array itens 
    const existe = itens.find(elemento => elemento.nome === nome.value);

         // Transforme a variável já criada, itemAtual, em um objeto object que receba os valores de nome e quantidade,
         const itemAtual = {
            "nome": nome.value,
            "quantidade": quantidade.value
    }

    // Condicional para conferir se o elemento existe
    if (existe) {
        itemAtual.id = existe.id

        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    } else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;

     // chamando a função de criar elemento na lista
        criaElemento(itemAtual);

    // Insira a variável itemAtual nesse array itens, utilizando o método push
        itens.push(itemAtual);
    }
   
    // E transforme os valores estes valores em string. Armazena o nome e a quantidade dos valores passados para a lista
    localStorage.setItem("itens", JSON.stringify(itens));

    // Ao enviar um item para a lista, o formulário fica em branco
    nome.value = ""
    quantidade.value = ""
})

// Função para criar elemento na lista passando o nome e quantidade
function criaElemento(item) {

    // Criando elemento "li" e add a classe "item"
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    // Criando elemento "strong" e incluíndo a quantidade
    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id;

    // Inserindo o elemento "strong" no elemento "li" com o nome
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id));

    // Inserindo o elemento "li" no elemento "lista"
    lista.appendChild(novoItem);
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

// Função para criar botão com evento de click nos itens, e retornar os itens clicados
function botaoDeleta(id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

// Função para deletar os itens enviados da função botaoDeleta no array de itens e no navegador
function deletaElemento(tag, id) {
    tag.remove()

    // remover item do array
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens));
}