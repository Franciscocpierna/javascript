/*
Enunciado do Exercício: Sistema de Controle de Biblioteca

Você foi encarregado de desenvolver um sistema simples de controle para uma
biblioteca usando JavaScript. O sistema deve permitir registrar os livros da
biblioteca e permitir que os usuários façam empréstimos e devoluções de livros. O número de cópias de cada livro na biblioteca é limitado, portanto, é necessário garantir que não mais livros do que o disponível sejam emprestados.

Requisitos

Classe Livro:
    Atributos:
        titulo (público): o título do livro.
        autor (público): o nome do autor do livro.
        #copias (privado): a quantidade de cópias do livro disponíveis 
            na biblioteca.

Métodos:
    constructor(titulo, autor, copias): inicializa um novo livro com título, 
        autor e número de cópias.
    emprestar(): método público que permite emprestar um livro, diminuindo o 
        número de cópias disponíveis. Se não houver mais cópias disponíveis, 
        deve informar ao usuário que o livro não pode ser emprestado.
    devolver(): método público que permite devolver um livro, aumentando o 
        número de cópias disponíveis.
    #verificarDisponibilidade(): método privado que retorna true se houver 
        cópias disponíveis, false caso contrário.

Implementação e Teste:
    Criar instâncias de Livro com diferentes títulos, autores e quantidades 
        de cópias.
    Testar a funcionalidade de empréstimo e devolução, incluindo tentativas 
        de empréstimo quando não houver cópias disponíveis.
*/

// Definição da classe Livro
class Livro {

    // Campo privado para armazenar o número de cópias disponíveis do
    // livro. O uso de '#' indica que o campo é privado e não acessível fora da classe.
    #copias; 

    // Construtor da classe, chamado quando um novo objeto Livro é criado.
    constructor(titulo, autor, copias) {
    
      // Atribui o título do livro ao campo público 'titulo'. Este campo 
      // pode ser acessado diretamente em instâncias da classe.
      this.titulo = titulo; 

      // Atribui o nome do autor ao campo público 'autor'. Este campo também é
      // público e acessível externamente.
      this.autor = autor;   

      // Atribui o número inicial de cópias ao campo privado '#copias'. Esse
      // valor só pode ser modificado internamente pela classe.
      this.#copias = copias; 
    }
  
    // Método privado para verificar a disponibilidade de cópias do livro.
    #verificarDisponibilidade() {

      // Retorna verdadeiro se houver pelo menos uma cópia disponível,
      // falso caso contrário.
      return this.#copias > 0; 

    }
  
    // Método público para emprestar um livro.
    emprestar() {

      // Verifica a disponibilidade chamando o método privado.
      if (this.#verificarDisponibilidade()) { 

        // Se houver cópias disponíveis, decrementa o número de cópias.
        this.#copias--; 

        // Exibe uma mensagem no console sobre o empréstimo.
        console.log(`Livro emprestado: ${this.titulo}. Cópias restantes: ${this.#copias}.`); 
      
    } else {

        // Caso não haja cópias disponíveis, informa o usuário.
        console.log(`Não há cópias disponíveis do livro: ${this.titulo}.`); 

      }
    }
  
    // Método público para devolver um livro.
    devolver() {

      // Incrementa o número de cópias disponíveis quando um livro é devolvido.
      this.#copias++; 

      // Exibe uma mensagem no console sobre a devolução.
      console.log(`Livro devolvido: ${this.titulo}. Cópias restantes: ${this.#copias}.`); 
    }
}

// Criação de uma instância da classe Livro

// Cria um novo livro "1984" de George Orwell com 3 cópias disponíveis.
const livro1 = new Livro("1984", "George Orwell", 3); 

// Uso dos métodos públicos da classe Livro para emprestar e devolver livros, testando a funcionalidade
livro1.emprestar(); // Tenta emprestar uma cópia, decrementando o contador de cópias.
livro1.emprestar(); // Tenta emprestar outra cópia.
livro1.devolver();  // Devolve uma cópia, incrementando o contador de cópias.
livro1.emprestar(); // Tenta emprestar mais uma cópia.
livro1.emprestar(); // Tenta emprestar outra cópia, possivelmente alcançando o limite de cópias disponíveis.
livro1.emprestar(); // Tenta emprestar outra cópia
livro1.devolver();  // Devolve uma cópia, incrementando novamente o contador de cópias.