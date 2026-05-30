/*
Herança em JavaScript é um conceito fundamental da
programação orientada a objetos (OOP), que permite a
uma classe herdar propriedades e métodos de outra classe.

Em JavaScript, isso é comumente realizado usando o class e
extends keywords introduzidas no ECMAScript 2015 (ES6).

Herança permite a criação de uma hierarquia de classes e
reutilização de código.

Vamos ver um exemplo prático para ilustrar a herança.*/

// Classe Pai: Representa um pai no contexto familiar
class Pai {

    // Construtor da classe Pai, inicializa uma nova instância com o nome do pai
    constructor(nome) {
  
      // 'this.nomePai' armazena o nome do pai dentro da instância da classe
      this.nomePai = nome; // Nome do pai é armazenado ao criar um objeto da classe Pai
    
    }
  }
  
  // Classe Mae: Representa uma mãe no contexto familiar
  class Mae {
  
    // Construtor da classe Mae, inicializa uma nova instância com o nome da mãe
    constructor(nome) {
  
      // 'this.nomeMae' armazena o nome da mãe dentro da instância da classe
      this.nomeMae = nome; // Nome da mãe é armazenado ao criar um objeto da classe Mae
    
    }
  }
  
    
    // Classe Filho: Representa um filho no contexto familiar
    class Filho {
  
      // Construtor da classe Filho, inicializa uma nova instância com o nome do filho, seus pais e sua escola
      constructor(nome, pai, mae, escola) {
        
        // 'this.nome' armazena o nome do filho dentro da instância da classe
        this.nome = nome; // Nome do filho é armazenado ao criar um objeto da classe Filho
  
        // 'this.nomePai' extrai e armazena o nome do pai a partir do objeto pai fornecido
        this.nomePai = pai.nomePai; // Acessa a propriedade 'nomePai' do objeto pai e armazena no filho
  
        // 'this.nomeMae' extrai e armazena o nome da mãe a partir do objeto mae fornecido
        this.nomeMae = mae.nomeMae; // Acessa a propriedade 'nomeMae' do objeto mae e armazena no filho
  
        // 'this.escola' armazena o nome da escola do filho dentro da instância da classe
        this.escola = escola; // Nome da escola é armazenado ao criar um objeto da classe Filho
      }
    }
  
    
    // Exemplo de uso das classes definidas anteriormente
    // Cria uma instância da classe Pai com o nome "Roberto"
    const pai = new Pai("Roberto");
  
    // Cria uma instância da classe Mae com o nome "Ana"
    const mae = new Mae("Ana");
    
    // Cria uma instância da classe Filho com o nome "Lucas", passando as instâncias de Pai e Mae e
    // o nome da escola
    const filho = new Filho("Lucas", pai, mae, "Escola ABC");
  
    // Exibe no console as informações do objeto 'filho'
    // Acessa a propriedade 'nome' do objeto 'filho' para obter o nome do filho
    // Acessa a propriedade 'nomePai' do objeto 'filho' para obter o nome do pai
    // Acessa a propriedade 'nomeMae' do objeto 'filho' para obter o nome da mãe
    // Acessa a propriedade 'escola' do objeto 'filho' para obter o nome da escola
    console.log(`Filho: ${filho.nome}, Pai: ${filho.nomePai}, Mãe: ${filho.nomeMae}, Escola: ${filho.escola}`);
    