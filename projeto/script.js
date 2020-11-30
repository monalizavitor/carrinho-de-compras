console.log('--------------------------------------')
console.log('     Projeto Carrinho de Compras      ')
console.log('--------------------------------------')

const db = require('./database')

const readline = require('readline-sync')

const { produtos } = db

//ordenando produtos do mais barato para o mais caro
produtos.sort((a, b) => a.preco - b.preco)
console.table(produtos)

const carrinho = []

//função para validar pedidos
const shopping = () => {

    productId = parseInt(readline.question('Digite o id do produto desejado: '))

    //validando o Id
    for (i = 0; i < 1000; i++) {
        findingId = produtos.find(item => item.id === productId)
        if (findingId) {
            break;
        } else {
            productId = parseInt(readline.question('Id não encontrado, tente novamente: '))
        }
    }

   
    qtdItems = parseInt(readline.question('Digite a quantidade de produtos que deseja comprar: '))

    //validando a quantidade
    for (i = 0; i < 1000; i++) {
        if (qtdItems > 0) {
            break;
        } else {
            qtdItems = parseInt(readline.question('Digite uma quantidade válida: '))
        }
    }

    //adicionando os produtos
    const produtosCarrinho = { ...findingId, quantidade: qtdItems} 
    carrinho.push(produtosCarrinho) 

    //validação para continuar comprando
    const continueComprando = readline.question('Deseja inserir mais algum produto no carrinho? (Digite S ou N): ')
    const continueComprandoFormat = continueComprando.toLowerCase() 
    
    if (continueComprandoFormat === "n") {
        cupom = parseInt(readline.question('Digite o valor do seu cupom de desconto: '))        
    } else {
        shopping()
    }

    //validando o cupom
    for (i = 0; i < 1000; i++) {
        if (cupom > 15 || cupom < 0) {
            cupom = parseInt(readline.question('Lamento, cupom inválido! Tente novamente: '))
        } else {
            break;
        } 
    }      
  
}

shopping()

class Order {
    constructor(carrinho){
      this.newProducts = carrinho 
      this.date = new Date()
      this.subtotal = 0 
    }
    calcSubtotal() { 
      this.subtotal = this.newProducts.reduce((acumulador, item) => acumulador + (item.preco * item.quantidade), 0)
    }

    dateFormat() {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        this.date = this.date.toLocaleDateString('pt-BR', options)
    }
  }


const order = new Order (carrinho)
console.table(order.newProducts) 

//chamando a função data
order.dateFormat()
console.log(`Pedido realizado em ${order.date}.`)

//calculando o subtotal
order.calcSubtotal() 
console.log(`Valor do pedido: R$ ${order.subtotal.toFixed(2)}.`) 

//calculando o desconto
const discount = order.subtotal * (cupom / 100) 
console.log(`Valor do desconto: R$ ${discount.toFixed(2)}.`)

//calculando o total com desconto do cupom
const total = order.subtotal - discount
console.log(`Valor total do pedido R$ ${total.toFixed(2)}`)

console.log('Obrigada por comprar conosco :) ')

console.log('------------------------------------')