// importação do pacote mqtt
var mqtt = require('mqtt');

// conexão estabelecida com o broker mqtt do servidor de teste do mosquitto
var client = mqtt.connect('mqtt://test.mosquitto.org');


const LISTA_CARDAPIO = 'lista-cardapio',
  LISTA_CARRINHO = 'lista-carrinho',
  PEGA_ITEM = 'pega-item',
  REMOVE_ITEM = 'remove-item',
  NOVO_ITEM_CARDAPIO = 'novo-item';

// adicionado o listener para o evento 'connect' (que executa quando a conexão é estabelecida)
client.on('connect', function () {

  client.subscribe(LISTA_CARDAPIO, function (err) {
    if (!err) {
      console.log(`Subscrito no tópico ${LISTA_CARDAPIO} com sucesso!`);

      // se tudo deu certo, após imprimir uma mensagem na tela, publica uma requisição "lista-carros"
      // ATENÇÃO! APESAR DE ESTAR USANDO A IDEIA DE CLIENTE E SERVIDOR, ESSE PARADIGMA NÃO É PARA SER
      // USADO EM PRODUÇÃO DESSA FORMA, POIS TODOS OS PROCESSOS SUBSCRITOS NO TÓPICO "lista-carros"
      // RESPONDERÃO À REQUISIÇÃO

    }
  });

  client.subscribe(LISTA_CARRINHO, function (err) {
    if (!err) {
      console.log(`Subscrito no tópico ${LISTA_CARRINHO} com sucesso! \n`);
    }
  });


  client.publish(PEGA_ITEM, '3');
  client.publish(PEGA_ITEM, '2');
  client.publish(LISTA_CARRINHO, "");

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
