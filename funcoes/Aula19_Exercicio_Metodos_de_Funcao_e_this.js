/*
Exercício: Implementação de um Relógio

Descrição do Exercício

Imagine que você precisa criar um objeto Relogio que mantém o
tempo (horas, minutos, segundos) e oferece funcionalidades
para ajustar o tempo, adicionar minutos, adicionar segundos e
exibir o tempo atual no formato HH:MM:SS. Use métodos de
função e o operador this para interagir com as propriedades
do objeto Relogio.

Requisitos

Construtor Relogio: Crie uma função construtora Relogio
que inicializa o relógio com horas, minutos e segundos
dados como argumentos.

Método ajustarTempo: Este método aceita horas, minutos e
segundos como argumentos e ajusta o tempo do relógio de acordo.

Método adicionarMinutos: Adiciona uma certa quantidade de
minutos ao tempo atual do relógio. Certifique-se de atualizar
as horas se necessário.

Método adicionarSegundos: Similar ao método anterior, mas
para adicionar segundos. Atualize minutos e horas quando necessário.

Método exibirTempo: Exibe o tempo atual no formato HH:MM:SS.

*/

// Declara a função construtora `Relogio` que inicializa um novo objeto Relogio.
// Recebe três parâmetros representando horas, minutos e segundos para configurar o tempo inicial do relógio.
function Relogio(horas, minutos, segundos) {

    // Inicializa as propriedades do objeto com os valores fornecidos.
    this.horas = horas;
    this.minutos = minutos;
    this.segundos = segundos;
  
    // Define o método `ajustarTempo` para configurar um novo tempo no relógio.
    this.ajustarTempo = function(horas, minutos, segundos) {
  
      // Atribui os novos valores de horas, minutos e segundos às propriedades correspondentes do objeto.
      this.horas = horas;
      this.minutos = minutos;
      this.segundos = segundos;
  
    };
  
    // Define o método `adicionarMinutos` para adicionar minutos ao tempo atual do relógio.
    this.adicionarMinutos = function(minutos) {
  
      // Incrementa a propriedade `minutos` com o valor fornecido.
      this.minutos += minutos;
  
      // Verifica se os minutos excedem 60 para ajustar as horas e minutos corretamente.
      while (this.minutos >= 60) {
        this.minutos -= 60; // Subtrai 60 minutos e incrementa a hora em uma unidade.
        this.horas += 1;
      }
    };
  
    // Define o método `adicionarSegundos` para adicionar segundos ao tempo atual do relógio.
    this.adicionarSegundos = function(segundos) {
  
      // Incrementa a propriedade `segundos` com o valor fornecido.
      this.segundos += segundos;
  
      // Verifica se os segundos excedem 60 para ajustar os minutos e horas corretamente.
      while (this.segundos >= 60) {
        this.segundos -= 60; // Subtrai 60 segundos e usa o método `adicionarMinutos` para incrementar os minutos.
        this.adicionarMinutos(1);
      }
    };
  
    // Define o método `exibirTempo` no protótipo do objeto `Relogio`.
    // Este método é responsável por formatar e exibir o tempo armazenado nas propriedades do objeto.
    this.exibirTempo = function() {
  
      // A função utiliza template literals, que permitem a inserção de expressões dentro de
      // strings através de `${...}`.
      // Cada componente do tempo (horas, minutos, segundos) é convertido para string e formatado
      // individualmente.
      
      // `this.horas.toString().padStart(2, '0')`:
      // 1. `this.horas.toString()`: Converte a propriedade `horas` para uma string. Isso é
      // necessário para usar o método `padStart`.
      // 2. `.padStart(2, '0')`: Garante que a string tenha pelo menos 2 caracteres de comprimento,
      // preenchendo com '0' à esquerda se necessário.
      //    Se `horas` for menor que 10, o resultado será uma string de dois dígitos com
      // um '0' à esquerda (ex: "09").
      //    Se `horas` for 10 ou mais, a string permanecerá inalterada, pois já tem 2 ou mais dígitos.
      
      // O mesmo processo é aplicado para `minutos` e `segundos`:
      // - `this.minutos.toString().padStart(2, '0')` assegura que os minutos sejam exibidos
      // como dois dígitos, preenchendo com '0' se necessário.
      // - `this.segundos.toString().padStart(2, '0')` faz o mesmo para os segundos.
      
      // Finalmente, as partes formatadas são concatenadas com ":" entre elas para formar
      // uma string no formato HH:MM:SS.
      // Essa string formatada é então passada para `console.log`, que exibe o tempo formatado no console.
      console.log(`${this.horas.toString().padStart(2, '0')}:${this.minutos.toString().padStart(2, '0')}:${this.segundos.toString().padStart(2, '0')}`);
    
    };
  
  
  }
  
  // Cria uma instância do objeto `Relogio` chamada `meuRelogio`, inicializando-a com
  // 10 horas, 45 minutos e 25 segundos.
  var meuRelogio = new Relogio(10, 45, 25);
  
  // Utiliza o método `exibirTempo` para mostrar o tempo inicial.
  meuRelogio.exibirTempo(); // Exibe 10:45:25.
  
  // Adiciona 20 minutos ao tempo atual do relógio.
  meuRelogio.adicionarMinutos(20);

  // Exibe o tempo após a adição dos minutos.
  meuRelogio.exibirTempo(); // Exibe 11:05:25.
  
  // Adiciona 3700 segundos (mais de uma hora) ao tempo atual do relógio.
  meuRelogio.adicionarSegundos(3700);

  // Exibe o tempo após a adição dos segundos, mostrando o ajuste correto de horas e minutos.
  meuRelogio.exibirTempo();
  

  // Adiciona 20 minutos ao tempo atual do relógio.
  meuRelogio.adicionarMinutos(20);

  // Exibe o tempo após a adição dos segundos, mostrando o ajuste correto de horas e minutos.
  meuRelogio.exibirTempo();