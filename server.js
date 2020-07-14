// importação do pacote mqtt
var mqtt = require('mqtt');

// conexão estabelecida com o broker mqtt do servidor de teste do mosquitto
var server = mqtt.connect('mqtt://test.mosquitto.org');

// constantes definidas com os nomes dos tópicos utilizados pelo processo

const LISTA_CARDAPIO = 'lista-cardapio',
    LISTA_CARRINHO = 'lista-carrinho',
    PEGA_ITEM = 'pega-item',
    REMOVE_ITEM_CARDAPIO = 'remove-item',
    INSERE_ITEM_CARDAPIO = 'novo-item';



// vetor que representa o "banco de dados" de carros
let cardapio = [

    {  item: "Rafael's Cheddar Burguer", preco: "30.90" ,id: 1},
    {  item: "Rafael's Bacon Burguer", preco: "28.90"   ,id: 2},
    {  item: "Rafael's Classic Burguer", preco: "25.90" ,id: 3},
    {  item: "Macarronada Grande", preco: "25.90"       ,id: 4},
    {  item: "Macarronada Média", preco: "20.90"        ,id: 5},
    {  item: "Macarronada Pequena", preco: "15.90"      ,id: 6}

],
    carrinho = [];
let total = 0;

// adicionado o listener para o evento 'connect' (que executa quando a conexão é estabelecida)
server.on('connect', function () {
    // o processo subscreve em um tópico e, caso não ocorram erros, imprime uma mensagem na tela

    server.subscribe(LISTA_CARDAPIO, (err) => {
        if (!err) {
            console.log('Subscrito com Sucesso em Lista Cardápio');
        }
    })

    server.subscribe(LISTA_CARRINHO, (err) => {
        if (!err) {
            console.log('Subscrito com Sucesso em Lista Carrinho');
        }
    })

    server.subscribe(PEGA_ITEM, (err) => {
        if (!err) {
            console.log('Subscrito com Sucesso em Pega Item');
        }
    })

    server.subscribe(INSERE_ITEM_CARDAPIO, (err) => {
        if (!err) {
            console.log('Subscrito com Sucesso em Isere Item');
        }
    })

    server.subscribe(REMOVE_ITEM_CARDAPIO, (err) => {
        if (!err) {
            console.log('Subscrito com Sucesso em Remove Item Cardapio');
        }
    })


});

// adicionado o listener para o evento 'message' (que executa quando uma mensagem é recebida)
server.on('message', function (topic, message) {

    // o cliente testa em qual tópico a mensagem foi recebida
    switch (topic) {
        case LISTA_CARDAPIO:
            server.publish('retorna-lista-cardapio', JSON.stringify(cardapio));
            break;
        case PEGA_ITEM:
            // caso seja uma mensagem de registro, adiciona no "banco de dados"
            const id = parseInt(message);
            console.log('Função Pega Item com ID: ' + id)
            let item = cardapio.find(n => n.id == id);
            if (item) {
                carrinho.push(item);
            }
            //find
            break;

        case INSERE_ITEM_CARDAPIO:
            //let item = JSON.parse(message);
            let novoItem = JSON.parse(message);
            novoItem.id = cardapio.length + 1
            cardapio.push(novoItem);
            console.log('função novo item no dardápio: ' + novoItem)
            break;

        case LISTA_CARRINHO:
            for (i in carrinho) {
                console.log(carrinho[i])
                total = total + parseFloat(carrinho[i].preco)
            }
            total = total
            server.publish('retorna-lista-carrinho', JSON.stringify(carrinho)+ "\ntotal: "+total);
            break;
        case REMOVE_ITEM_CARDAPIO:
            let iD = parseInt(message);

            let indexItemExistente = cardapio.findIndex(
                n => n.id == iD
            );
    
            if (indexItemExistente != -1) {
                cardapio.splice(indexItemExistente, 1);
            } 
            break
    }
});

