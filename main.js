let item = document.getElementById("item")
let quantidade = document.getElementById("quantidade")
let btnAdicionar = document.getElementById("btnAdicionar")
let ul = document.getElementById("lista")
let listaItem = JSON.parse(localStorage.getItem("lista")) || []
let id = 0

mostraLista(listaItem)

btnAdicionar.addEventListener("click", function (e) {
    e.preventDefault()
    if (quantidade.value != "" && item.value != "") {
        adicionaItem(item, quantidade)

    } else {
        alert("preencha os campos")
    }
})
//Salva ao pressionar Enter
quantidade.addEventListener("keyup", function (e) {
    if (e.key == 'Enter') {
        if (quantidade.value != "" && item.value != "") {
            adicionaItem(item, quantidade)
        } else {
            alert("preencha os campos")
        }
    }
})

function adicionaItem(item, quantidade) {
    novoItem = { nome: "", quantidade: "", id: 0 }
    novoItem.nome = item.value
    novoItem.quantidade = parseInt(quantidade.value)
    let listaFiltrada = listaItem.filter(element => element.id == novoItem.id)
    while (listaFiltrada.length > 0) {
        if (novoItem.id == listaFiltrada[0].id) {
            novoItem.id++;
            listaFiltrada = listaItem.filter(element => element.id == novoItem.id)
        }
    }
    listaItem.push(novoItem)
    localStorage.setItem("lista", JSON.stringify(listaItem))
    let li = ""
    li = `<li id="${novoItem.id}"><strong>${quantidade.value}</strong>${item.value}${botaoEdita()}${botaoDelete()}</li>`
    ul.innerHTML += li
    item.value = ""
    quantidade.value = ""
}

function mostraLista(listaItem) {
    let li = ""
    listaItem.forEach(element => {
        li = `<li id="${element.id}">
        <strong>${element.quantidade}</strong>${element.nome} ${botaoEdita()} ${botaoDelete()}</li>`
        ul.innerHTML += li
    });
}

function botaoEdita() {
    let botao = `<button type="button" onclick="editaElemento(this.parentNode)" class="btnEdita">Editar</button>`
    return botao
}

function toggleFade(){
    let fade = document.getElementById("fade")
    fade.classList.toggle("hide")
}

function editaElemento(tag) {
    toggleFade()
    document.getElementById("modalEdit").setAttribute("style", "display:flex")
    let editItem = document.getElementById("editItem")
    let editQuantidade = document.getElementById("editQuantidade")
    let encontrado = listaItem.find(el => el.id == tag.id)
    editItem.value = encontrado.nome
    editQuantidade.value = encontrado.quantidade
    atualizaElemento(encontrado, tag)
    console.log(encontrado)
}

function fecharModal() {
        document.getElementById("editItem").value = ""
        document.getElementById("editQuantidade").value=""
        toggleFade()
        document.getElementById("modalEdit").setAttribute("style", "display:none")
}

function atualizaElemento(encontrado, tag) {

    document.getElementById("btnAtualiza").addEventListener("click", function () {
        toggleFade()
        encontrado.quantidade = parseInt(document.getElementById("editQuantidade").value)
        encontrado.nome = document.getElementById("editItem").value
        localStorage.setItem("lista", JSON.stringify(listaItem))
        tag.children[0].value = encontrado.quantidade
        tag.remove()
        ul.innerHTML = ""
        mostraLista(listaItem)
        document.getElementById("modalEdit").setAttribute("style", "display:none")
    }, { once: true })


}

function botaoDelete() {
    let botao = `<button type="button" onclick="deletaElemento(this.parentNode)" class='btnDelete'>X</button>`
    return botao
}

function deletaElemento(tag) {
    console.log("click")
    tag.remove()
    let item = listaItem.find(item => item.id == tag.id)
    let deletarItem = listaItem.indexOf(item)
    listaItem.splice(deletarItem, 1)
    localStorage.setItem("lista", JSON.stringify(listaItem))
}
