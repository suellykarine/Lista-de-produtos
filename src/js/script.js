function montarListaProdutos(listaProdutos) {
    const ul = document.querySelector('.containerListaProdutos ul');
    ul.innerHTML = '';

    listaProdutos.forEach((produto) => {

        criarProdutoTela(produto, ul)


    });



}

function criarProdutoTela(produto, ul) {
    let precoTotal = 0
    const li = document.createElement('li');
    const img = document.createElement('img');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    const span = document.createElement('span');
    const nutrientes = document.createElement('ol')
    const botao = document.createElement('button')

    img.src = produto.img;
    img.alt = produto.nome;
    h3.innerText = produto.nome;
    p.innerText = produto.preco;
    span.innerText = produto.secao;
    botao.id = produto.id
    botao.innerText = "Adicionar ao carrinho"

    botao.addEventListener("click", adicionarAoCarrinho)


    li.appendChild(img);
    li.appendChild(h3);
    li.appendChild(p);
    li.appendChild(span);


    let liNutrientes = null
    for (let i = 0; i < produto.componentes.length; i++) {

        liNutrientes = document.createElement('li')
        liNutrientes.innerText = produto.componentes[i]
        nutrientes.appendChild(liNutrientes)

    }


    li.appendChild(nutrientes)
    li.appendChild(botao)



    ul.appendChild(li);

}



function filtrarPorHortifruti() {
    const listaHortifruti = produtos.filter((produto) => {
        return produto.secao === 'Hortifruti';
    });
    montarListaProdutos(listaHortifruti);
}
const botaoMostrarHortifruti = document.querySelector('.estiloGeralBotoes--filtrarHortifruti');

botaoMostrarHortifruti.addEventListener('click', filtrarPorHortifruti);


function mostrarTodos() {
    montarListaProdutos(produtos)
}

const botaoMostrarTodos = document.getElementById("btnMostrarTodos")
botaoMostrarTodos.addEventListener("click", mostrarTodos)





function filtrarNome() {
    const inputFiltrarNome = document.getElementById("filtroNome").value


    const produtosFiltrados = produtos.filter((produto) => {

        return ((produto.nome.toLowerCase() == inputFiltrarNome.toLowerCase()) || (produto.secao.toLowerCase() == inputFiltrarNome.toLowerCase()) || (produto.categoria.toLowerCase() == inputFiltrarNome.toLowerCase()))
    });
    montarListaProdutos(produtosFiltrados);
}

const botaoBuscarNome = document.getElementById("btnBuscar")
botaoBuscarNome.addEventListener("click", filtrarNome)

mostrarTodos()



const arrayCarrinhnoCompra = []

function adicionarAoCarrinho(event) {
    console.log('oi')

    const btnAddCarrinho = event.target


    if (btnAddCarrinho.tagName == "BUTTON") {
        const idProduto = btnAddCarrinho.id

        const ulCarrinho = document.querySelector('.containerCarrinho ul');

        const produtoSelecionado = produtos.find((produto) => produto.id == idProduto);
        arrayCarrinhnoCompra.push(produtoSelecionado)
        console.log(arrayCarrinhnoCompra)


        criarProdutoTela(produtoSelecionado, ulCarrinho)
        precoTotalCarrinho()
    }
}

function precoTotalCarrinho() {
    let soma = arrayCarrinhnoCompra.reduce((total, produto) => total + Number(produto.preco), 0)

    let precoTotal = document.getElementById("precoTotal")



    precoTotal.innerText = soma
}