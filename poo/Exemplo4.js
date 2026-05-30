// Definição da classe base AlunoEscolaPai para representar informações básicas de um aluno
class AlunoEscolaPai {

    // Construtor da classe que é chamado ao criar uma nova instância de AlunoEscolaPai
    constructor(codigo, nome, sexo, idade) {
  
      // 'this.codigo' armazena um identificador único para cada aluno, facilitando referências futuras
      this.codigo = codigo;
  
      // 'this.nome' armazena o nome do aluno, essencial para identificação pessoal
      this.nome = nome;
  
      // 'this.sexo' armazena o sexo do aluno, podendo ser usado em análises demográficas
      this.sexo = sexo;
  
      // 'this.idade' armazena a idade do aluno, útil para determinação de faixas etárias
      this.idade = idade;
  
    }
  
    // Método para imprimir os dados do aluno no console, proporcionando uma verificação rápida
    imprimirNaTela() {
  
      // Imprime o código do aluno, importante para identificação em sistemas acadêmicos
      console.log(`Código: ${this.codigo}`);
  
      // Imprime o nome do aluno, o aspecto mais básico de identificação pessoal
      console.log(`Nome: ${this.nome}`);
  
      // Imprime o sexo do aluno, informação relevante para dados estatísticos
      console.log(`Sexo: ${this.sexo}`);
  
      // Imprime a idade do aluno, útil para segmentação por faixa etária
      console.log(`Idade: ${this.idade}`);
  
      // Insere uma linha em branco para melhor visualização no console após a listagem de dados
      console.log('');
    }
  }
  
  
    
    // Definição da classe AlunoEscolaFilho que herda de AlunoEscolaPai
    class AlunoEscolaFilho extends AlunoEscolaPai {
  
        // Construtor de AlunoEscolaFilho, que inicializa a instância com dados pré-definidos
        constructor() {
  
          // Chama o construtor da classe base (AlunoEscolaPai) com valores específicos
          // 'super' é usado para acessar e chamar funções do pai de um objeto
          super(1, "Cleonice", "Feminino", 19); // Define código, nome, sexo e idade para a instância de AlunoEscolaFilho
          // Esses valores são específicos para esta instância e são passados para o construtor da classe pai
        
        }
    }
  
    // Definição da classe AlunoEscolaNeto que também herda de AlunoEscolaPai
    class AlunoEscolaNeto extends AlunoEscolaPai {
  
        // Construtor de AlunoEscolaNeto, que também inicializa a instância com dados específicos
        constructor() {
  
          // Chama o construtor da classe base (AlunoEscolaPai) com valores diferentes
          super(2, "Allan", "Masculino", 28); // Define código, nome, sexo e idade para a instância de AlunoEscolaNeto
          // Esses valores são personalizados para representar outra pessoa dentro da mesma estrutura escolar
        
        }
    }
  
  
    
  // Cria uma instância de AlunoEscolaFilho e imprime seus dados
  const dadosEscolaFilho = new AlunoEscolaFilho(); // Instancia a classe AlunoEscolaFilho, que automaticamente inicializa os atributos herdados
  dadosEscolaFilho.imprimirNaTela(); // Chama o método imprimirNaTela() para exibir os atributos de dadosEscolaFilho
  

  // Cria uma instância de AlunoEscolaNeto e depois modifica seus atributos
  const dadosNeto = new AlunoEscolaNeto(); // Instancia a classe AlunoEscolaNeto com valores iniciais definidos no construtor da classe

  // Modifica os atributos de dadosNeto
  dadosNeto.nome = "Alfredo Alves"; // Altera o nome inicialmente definido no construtor para "Alfredo Alves"
  dadosNeto.idade = 38; // Altera a idade inicialmente definida no construtor para 38

  // Imprime os dados modificados de dadosNeto
  dadosNeto.imprimirNaTela(); // Chama o método imprimirNaTela() para exibir os novos atributos modificados de dadosNeto
