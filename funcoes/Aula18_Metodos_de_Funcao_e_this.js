/*
No JavaScript, métodos de função são funções associadas a
objetos (ou classes), e o valor de this dentro desses métodos
refere-se ao objeto ao qual o método pertence. Esse mecanismo é
utilizado para acessar propriedades e outros métodos do objeto,
permitindo que os métodos manipulem os dados do objeto de
forma eficiente e encapsulada.

Abaixo, vou demonstrar um exemplo que cria um objeto
contaBancaria com propriedades e métodos. Os métodos utilizam
this para acessar e modificar as propriedades do objeto.

Exemplo: Objeto contaBancaria com Métodos
*/

// Define a função construtora `ContaBancaria` que inicializa uma nova instância de uma conta bancária.
// Recebe dois parâmetros: `titular`, que é o nome do titular da conta, e `saldoInicial`, que
// é o saldo inicial da conta.
function ContaBancaria(titular, saldoInicial) {

    // Atribui o valor do parâmetro `titular` à propriedade `titular` do objeto
    // criado pela função construtora.
    this.titular = titular;
  
    // Atribui o valor do parâmetro `saldoInicial` à propriedade `saldo` do objeto,
    // representando o saldo da conta.
    this.saldo = saldoInicial;
  
    // Adiciona o método `depositar` ao objeto. Este método permite adicionar dinheiro ao saldo da conta.
    this.depositar = function(valor) {
  
      // Verifica se o `valor` passado para o depósito é maior que 0.
      if (valor > 0) {
  
        // Se positivo, adiciona o `valor` ao saldo da conta.
        this.saldo += valor;
  
        // Imprime uma mensagem confirmando o depósito e mostrando o saldo atual.
        console.log(`Depósito de R$${valor} realizado com sucesso. Saldo atual: R$${this.saldo}.`);
      
      } else {
  
        // Se o `valor` não for positivo, imprime uma mensagem de erro.
        console.log("O valor do depósito deve ser positivo.");
  
      }
    };
  
    // Adiciona o método `sacar` ao objeto. Este método permite retirar dinheiro do saldo da conta.
    this.sacar = function(valor) {
  
      // Verifica se o `valor` a ser sacado é positivo e menor ou igual ao saldo atual da conta.
      if (valor > 0 && valor <= this.saldo) {
  
        // Se a condição for verdadeira, subtrai o `valor` do saldo da conta.
        this.saldo -= valor;
  
        // Imprime uma mensagem confirmando o saque e mostrando o saldo atual.
        console.log(`Saque de R$${valor} realizado com sucesso. Saldo atual: R$${this.saldo}.`);
      
      } else {
  
        // Se o `valor` for negativo ou maior que o saldo, imprime uma mensagem de erro.
        console.log("Saque não realizado. Verifique se o valor é positivo e se há saldo suficiente.");
      
      }
    };
  
    // Adiciona o método `consultarSaldo` ao objeto. Este método permite verificar o saldo atual da conta.
    this.consultarSaldo = function() {
  
      // Imprime o saldo atual da conta.
      console.log(`Saldo atual: R$${this.saldo}.`);
  
    };
  }
  
  // Cria uma instância de `ContaBancaria` chamada `minhaConta`, inicializando-a com o
  // nome do titular "João Silva" e um saldo inicial de 1000.
  var minhaConta = new ContaBancaria("João Silva", 1000);
  
  // Utiliza o método `depositar` da instância `minhaConta` para adicionar 500 ao saldo.
  minhaConta.depositar(500);
  
  // Utiliza o método `sacar` para retirar 200 do saldo.
  minhaConta.sacar(200);

  // Utiliza o método `sacar` para retirar 300 do saldo.
  minhaConta.sacar(300);

  
  // Utiliza o método `sacar` para retirar 300 do saldo.
  minhaConta.sacar(300);

  // Utiliza o método `depositar` da instância `minhaConta` para adicionar 500 ao saldo.
  minhaConta.depositar(500);

  
  // Utiliza o método `consultarSaldo` para imprimir o saldo atual da conta.
  minhaConta.consultarSaldo();


  // ------------------------------

  

/*
Vamos criar outro exemplo que demonstra o uso de métodos
de função e o operador this em JavaScript, desta vez
focando em um objeto que representa um carro. Esse objeto
carro terá propriedades como marca, modelo, e quilometragem,
e incluirá métodos para dirigir (que aumenta a quilometragem) e
exibirInformacoes (que mostra informações sobre o carro).

Exemplo: Objeto Carro com Métodos

*/


// Define a função construtora `Carro`, que inicializa um novo objeto Carro.
// Recebe três parâmetros: `marca`, `modelo`, e `quilometragemInicial` que são
// usados para inicializar as propriedades do carro.
function Carro(marca, modelo, quilometragemInicial) {

    // Atribui o valor do parâmetro `marca` à propriedade `marca` do novo objeto.
    this.marca = marca;
  
    // Atribui o valor do parâmetro `modelo` à propriedade `modelo` do novo objeto.
    this.modelo = modelo;
  
    // Atribui o valor do parâmetro `quilometragemInicial` à propriedade `quilometragem` do novo objeto.
    this.quilometragem = quilometragemInicial;
  
    // Define o método `dirigir` no novo objeto.
    // Este método simula a ação de dirigir o carro por uma certa distância, aumentando a quilometragem.
    this.dirigir = function(quilometros) {
  
      // Verifica se a distância `quilometros` a ser dirigida é maior que 0.
      if (quilometros > 0) {
  
        // Se sim, adiciona essa distância ao valor da propriedade `quilometragem`.
        this.quilometragem += quilometros;
  
        // Imprime uma mensagem no console mostrando a distância dirigida e a quilometragem atual do carro.
        console.log(`Você dirigiu ${quilometros} km. Quilometragem atual: ${this.quilometragem} km.`);
      
      } else {
  
        // Se a distância `quilometros` for menor ou igual a 0, imprime uma mensagem
        // solicitando uma distância válida.
        console.log("Por favor, insira uma distância válida para dirigir.");
      
      }
    };
  
    // Define o método `exibirInformacoes` no novo objeto.
    // Este método imprime as informações do carro no console.
    this.exibirInformacoes = function() {
  
      // Imprime a marca, o modelo e a quilometragem atual do carro.
      console.log(`Carro: ${this.marca} ${this.modelo}. Quilometragem: ${this.quilometragem} km.`);
    
    };
  }
  
  // Cria uma instância do objeto Carro chamada `meuCarro`, inicializando-a com valores
  // específicos para marca, modelo e quilometragem inicial.
  var meuCarro = new Carro("Toyota", "Corolla", 50000);
  
  // Chama o método `dirigir` no objeto `meuCarro`, simulando a ação de dirigir o carro por 150 quilômetros.
  meuCarro.dirigir(150);
  
  // Chama o método `exibirInformacoes` para imprimir as informações do carro `meuCarro` no console.
  meuCarro.exibirInformacoes();