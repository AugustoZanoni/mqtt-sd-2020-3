// importação do pacote mqtt
var mqtt = require('mqtt');

// conexão estabelecida com o broker mqtt do servidor de teste do mosquitto
var client  = mqtt.connect('mqtt://test.mosquitto.org');


const LISTA_CARDAPIO = 'lista-cardapio',
    LISTA_CARRINHO = 'lista-carrinho',
    PEGA_ITEM = 'pega-item',
    REMOVE_ITEM = 'remove-item',
    NOVO_ITEM_CARDAPIO = 'novo-item';


// descrição do carro1
const carro1 = {
  modelo: "versa",
  marca: "nissan",
  cor: "cinza",
};

// adicionado o listener para o evento 'connect' (que executa quando a conexão é estabelecida)
client.on('connect', function() {

  client.publish(PEGA_ITEM, '3');
  client.publish(LISTA_CARRINHO, "");
  // // publica os dados do carro1 no tópico "registra-carro"
  // client.publish('registra-carro', JSON.stringify(carro1));

  // // publica os dados do carro2 no tópico "registra-carro"
  // client.publish('registra-carro', JSON.stringify(carro2));

  // // publica os dados do carro3 no tópico "registra-carro"
  // client.publish('registra-carro', JSON.stringify(carro3));

  // o cliente subscreve no tópico "resultado-lista-carros" para obter os resultados da requisição "lista-carros"
  client.subscribe(LISTA_CARDAPIO, function (err) {
    if (!err) {
      console.log(`Subscrito no tópico ${LISTA_CARDAPIO} com sucesso!`);

      // se tudo deu certo, após imprimir uma mensagem na tela, publica uma requisição "lista-carros"
      // ATENÇÃO! APESAR DE ESTAR USANDO A IDEIA DE CLIENTE E SERVIDOR, ESSE PARADIGMA NÃO É PARA SER
      // USADO EM PRODUÇÃO DESSA FORMA, POIS TODOS OS PROCESSOS SUBSCRITOS NO TÓPICO "lista-carros"
      // RESPONDERÃO À REQUISIÇÃO
      
    }
  });
  //client.publish(LISTA_CARDAPIO, "");

});

// adicionado o listener para o evento 'message' (que executa quando uma mensagem é recebida)
client.on('message', function (topic, message) {

  // o cliente testa se a mensagem foi recebida no tópico "resultado-lista-carros"
  if (topic === LISTA_CARDAPIO) {
    // recuperada a lista de carros como um objeto
    const lista = message.toString();

    // lista é impressa e a conexão é encerrada
    console.log(lista);
    client.end(); 
  }

});

// .publish('resultado-consulta-carro', JSON.stringify(listaDeCarros[nrCarro]));
//             break;
