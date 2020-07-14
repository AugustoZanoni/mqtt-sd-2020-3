// importação do pacote mqtt
var mqtt = require('mqtt');

// conexão estabelecida com o broker mqtt do servidor de teste do mosquitto
var client = mqtt.connect('mqtt://test.mosquitto.org');


const LISTA_CARDAPIO = 'lista-cardapio',
  LISTA_CARRINHO = 'lista-carrinho',
  PEGA_ITEM = 'pega-item',
  REMOVE_ITEM_CARDAPIO = 'remove-item',
  INSERE_ITEM_CARDAPIO = 'novo-item',
  RETORNA_LISTA_CARDAPIO = 'retorna-lista-cardapio',
  RETORNA_LISTA_CARRINHO ='retorna-lista-carrinho';

  let novoItem = {
    item: "Rafael's Podrão Burguer",
    preco: "15.90"
  };

// adicionado o listener para o evento 'connect' (que executa quando a conexão é estabelecida)
client.on('connect', function () {

  client.subscribe(RETORNA_LISTA_CARDAPIO, function (err) {
    if (!err) {
      console.log(`Subscrito no tópico ${LISTA_CARDAPIO} com sucesso!`);

    }
// Gambiarra Rafel's Lista Cardapio
    //client.publish(LISTA_CARDAPIO,"");
  });

  client.subscribe(RETORNA_LISTA_CARRINHO, function (err) {
    if (!err) {
      console.log(`Subscrito no tópico ${LISTA_CARRINHO} com sucesso! \n`);
    }
// Gambiarra Rafel's Lista Carrinho
    //client.publish(LISTA_CARRINHO, "");
  });

// Adicionar Item Carrinho --> PEGA_ITEM, id
  // client.publish(PEGA_ITEM, '3');
  // client.publish(PEGA_ITEM, '2');

// Insere Item Cardapio, String Obj Item
      client.publish(INSERE_ITEM_CARDAPIO,JSON.stringify(novoItem))

// Remove Item Cardapio, string id
      client.publish(REMOVE_ITEM_CARDAPIO,"2")

});

// adicionado o listener para o evento 'message' (que executa quando uma mensagem é recebida)
client.on('message', function (topic, message) {
  const lista = message.toString();

  if (LISTA_CARDAPIO || LISTA_CARRINHO) {
    // lista é impressa e a conexão é encerrada
    console.log(lista);
  }

});

// .publish('resultado-consulta-carro', JSON.stringify(listaDeCarros[nrCarro]));
//             break;
