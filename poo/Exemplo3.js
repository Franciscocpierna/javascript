  // Define a classe Animal como base para outros tipos de animais
  class Animal {

    // Construtor da classe Animal que é chamado quando uma nova instância é criada
    constructor(nome) {

      // 'this.nome' se refere à propriedade 'nome' da instância atual da classe
      // Aqui o valor passado como argumento 'nome' é atribuído à propriedade 'nome' do objeto criado
      this.nome = nome; // Armazena o nome do animal na propriedade 'nome'
    }

    // Método emitirSom é definido para ser usado por todas as instâncias da classe Animal
    emitirSom() {

      // Utiliza a propriedade 'nome' do objeto atual para imprimir uma mensagem no console
      // A mensagem diz que o animal está fazendo um som, porém é uma frase genérica
      console.log(`${this.nome} faz um som.`); // Exibe no console o som que o animal faz de forma genérica
    
    }
}

// Define a classe Cachorro que herda de Animal, utilizando a palavra-chave 'extends'
class Cachorro extends Animal {

  // Sobrescreve o método emitirSom que é herdado de Animal
  emitirSom() {

    // Este método é uma implementação específica para cachorros
    // Acessa 'this.nome', que é a propriedade 'nome' herdada da classe Animal
    // 'this.nome' contém o nome do cachorro, que é utilizado na mensagem de saída
    // Imprime uma mensagem no console indicando que o cachorro com o nome especificado está latindo
    console.log(`${this.nome} late.`); // Exemplo: se 'this.nome' for 'Rex', imprime 'Rex late.'
  }
}


// Define a classe Gato que herda as características da classe Animal
class Gato extends Animal {

    // Sobrescreve o método emitirSom herdado de Animal
    emitirSom() {
      
    // Acessa 'this.nome', que é a propriedade 'nome' herdada da classe Animal
    // 'this.nome' contém o nome do gato, que é utilizado na mensagem de saída
    // Este método personaliza o som produzido para o comportamento específico dos gatos
    // Imprime uma mensagem no console indicando que o gato com o nome especificado está miando
    console.log(`${this.nome} mia.`); // Exemplo: se 'this.nome' for 'Mingau', imprime 'Mingau mia.'
  }
}


// Cria uma instância da classe Cachorro chamada 'cachorro'
const cachorro = new Cachorro('Rex');

// Cria uma instância da classe Gato chamada 'gato'
const gato = new Gato('Mingau');

// Chama o método emitirSom do objeto 'cachorro', que está definido na classe Cachorro
cachorro.emitirSom(); // Saída: Rex late.

// Chama o método emitirSom do objeto 'gato', que está definido na classe Gato
gato.emitirSom(); // Saída: Mingau mia.
