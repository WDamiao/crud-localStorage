let item = document.getElementById("item")
let quantidade = document.getElementById("quantidade")
let btnAdicionar = document.getElementById("btnAdicionar")
let ul = document.getElementById("lista")
let listaItem = JSON.parse(localStorage.getItem("lista")) || []
let id = 0
let editId = null

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

document.getElementById("btnAtualiza").addEventListener("click", atualizaElemento)

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
    li = `<li id="${novoItem.id}"><strong>${quantidade.value}</strong>${item.value}${botaoEdita(novoItem.id)}${botaoDelete()}</li>`
    ul.innerHTML += li
    item.value = ""
    quantidade.value = ""
}

function mostraLista(listaItem) {
    let li = ""
    listaItem.forEach(element => {
        li = `<li id="${element.id}">
        <strong>${element.quantidade}</strong>${element.nome} ${botaoEdita(element.id)} ${botaoDelete()}</li>`
        ul.innerHTML += li
    });
}

function botaoEdita(id) {
    let obj = listaItem.find(el => el.id == id)
    let botao = `<button type="button" onclick="editaElemento(${obj.id})" class="btnEdita">Editar</button>`
    return botao
}

function toggleFade() {
    let fade = document.getElementById("fade")
    fade.classList.toggle("hide")

}

function editaElemento(idAtual) {
    editId = idAtual
    let obj = listaItem.find(el => el.id == idAtual)
    toggleFade()
    document.getElementById("modalEdit").setAttribute("style", "display:flex")
    document.getElementById("editItem").value = obj.nome
    document.getElementById("editQuantidade").value = obj.quantidade
}

function fecharModal() {
    editId = null
    document.getElementById("editItem").value = ""
    document.getElementById("editQuantidade").value = ""
    toggleFade()
    document.getElementById("modalEdit").setAttribute("style", "display:none")
}

function atualizaElemento() {
    if (editId != null) {
        let tag = document.getElementById(`${editId}`)
        let item = listaItem.find(el => el.id == editId)
        item.nome = document.getElementById("editItem").value
        item.quantidade = parseInt(document.getElementById("editQuantidade").value)
        localStorage.setItem("lista", JSON.stringify(listaItem))
        ul.innerHTML = ""
        mostraLista(listaItem)
        toggleFade()
        document.getElementById("modalEdit").setAttribute("style", "display:none")
    } else { console.log("erro") }
}

function botaoDelete() {
    let botao = `<button type="button" onclick="deletaElemento(this.parentNode)" class='btnDelete'>X</button>`
    return botao
}

function deletaElemento(tag) {
    tag.remove()
    let item = listaItem.find(item => item.id == tag.id)
    let deletarItem = listaItem.indexOf(item)
    listaItem.splice(deletarItem, 1)
    localStorage.setItem("lista", JSON.stringify(listaItem))
}
