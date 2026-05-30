// Define a classe Pai que contém informações sobre uma propriedade
class Pai {

    // Método que imprime os detalhes da casa do Pai
    imprimiDadosCasaPai() {
      console.log("----- Dados casa Pai -----");
      console.log("Código: 1");
      console.log("Proprietário: Matheus Alves");
      console.log("Estado: Santa Catarina");
      console.log("Cidade: Lages");
      console.log("Valor: R$ 500.000,00");
      console.log("\n"); // Insere uma linha em branco para melhorar a leitura dos dados
    }
}

// Define a classe Mae que contém informações sobre outra propriedade
class Mae {

  // Método que imprime os detalhes da casa da Mae
  imprimiDadosCasaMae() {
    console.log("----- Dados casa Mae -----");
    console.log("Código: 2");
    console.log("Proprietária: Alice Alves");
    console.log("Estado: Santa Catarina");
    console.log("Cidade: Florianópolis");
    console.log("Valor: R$ 4.500.000,00");
    console.log("\n"); // Insere uma linha em branco para separar as informações
  }
}


// Define a classe Filho que gerencia informações relacionadas aos pais
class Filho {

  // Construtor da classe Filho, chamado ao criar uma nova instância
  constructor() {

    // Cria uma instância da classe Pai e atribui à propriedade 'pai'
    this.pai = new Pai();

    // Cria uma instância da classe Mae e atribui à propriedade 'mae'
    this.mae = new Mae();

  }

  // Método para imprimir os dados da casa do Pai
  imprimiDadosCasaPai() {

    // Chama o método 'imprimiDadosCasaPai' do objeto 'pai'
    // Este método é definido na classe Pai e imprime detalhes sobre a casa do pai
    this.pai.imprimiDadosCasaPai();
    
  }

  // Método para imprimir os dados da casa da Mae
  imprimiDadosCasaMae() {

    // Chama o método 'imprimiDadosCasaMae' do objeto 'mae'
    // Este método é definido na classe Mae e imprime detalhes sobre a casa da mãe
    this.mae.imprimiDadosCasaMae();

  }
}


// Uso prático das classes definidas para demonstrar funcionalidades

// Cria uma nova instância da classe Filho
const dadosFilho = new Filho();

// Imprimindo dados da casa do Pai usando o método 'imprimiDadosCasaPai'
// Este método chama o método correspondente no objeto 'pai' contido dentro da instância 'dadosFilho'
dadosFilho.imprimiDadosCasaPai();

// Imprimindo dados da casa da Mae usando o método 'imprimiDadosCasaMae'
// Este método chama o método correspondente no objeto 'mae' contido dentro da instância 'dadosFilho'
dadosFilho.imprimiDadosCasaMae();