/*
Métodos privados em programação orientada a objetos (POO) são fundamentais 
para a implementação de uma técnica conhecida como encapsulamento. Vamos 
explorar o que são, para que servem e quando utilizá-los.

O que são Métodos Privados?
Métodos privados são funções definidas dentro de uma classe que não podem ser 
acessadas ou chamadas de fora da classe. Eles só podem ser utilizados 
internamente pela própria classe. Em linguagens de programação como 
Java, C++, e recentemente em JavaScript com a adição de símbolos como # antes 
do nome do método, você pode definir explicitamente esses métodos como 
privados.

Para que servem os Métodos Privados?
Encapsulamento: Os métodos privados são um pilar do encapsulamento, que é o
  princípio de esconder os detalhes internos de implementação de uma classe e
  expor apenas o necessário para o mundo externo. Isso ajuda a proteger os 
  dados internos da classe contra modificações indesejadas e uso inadequado.

Redução de Complexidade: Ao esconder detalhes internos e mostrar apenas os 
  métodos que são necessários para interação externa, a complexidade é 
  reduzida para o usuário da classe.

Manutenção e Evolução: Com métodos privados, a manutenção do código se torna 
  mais fácil, pois mudanças nos métodos privados não afetam outras partes do 
  sistema que utilizam a classe. Isso também facilita a evolução do sistema, 
  pois o desenvolvedor pode modificar os detalhes internos da implementação 
  sem alterar a interface pública.

Controle de acesso: Os métodos privados garantem que certas funcionalidades 
  críticas sejam acessadas apenas de maneira controlada, evitando que sejam 
  utilizadas de maneira incorreta ou em contextos inapropriados.

Quando usar Métodos Privados?
Quando uma funcionalidade é auxiliar: Se um método é apenas um auxiliar para 
  outro método público e não faz sentido ser chamado de fora da classe, ele 
  deve ser privado. Isso mantém a interface pública da classe limpa e focada.

Para proteger o estado interno da classe: Se um método modifica ou utiliza 
  detalhes internos do estado de uma classe que não devem ser expostos ou 
  modificados externamente, ele deve ser privado. Isso garante a integridade 
  dos dados.

Quando buscando segurança e robustez: Em situações onde é crítico que o 
  processo interno não seja interrompido ou utilizado de forma inadequada, 
  métodos privados ajudam a proteger esses processos.

Para evitar uso indevido: Se um método pode ser mal interpretado ou usado 
  incorretamente se exposto publicamente, torná-lo privado pode evitar esses 
  problemas.

Em resumo, métodos privados são essenciais para uma boa arquitetura de 
software, promovendo uma melhor organização, segurança e flexibilidade no 
desenvolvimento de aplicações orientadas a objetos.


Exemplo Usando Campos Privados

Com a introdução de campos privados no JavaScript (ES2020),
agora podemos tornar o encapsulamento mais explícito.
Campos privados são prefixados com #, e só podem ser acessados
dentro da classe.*/

// Definição da classe Funcionario
class Funcionario {

    // Declaração de um campo privado para armazenar o nome do funcionário.
    // Os campos privados são acessíveis apenas dentro da classe.
    #nome; 
  
    // Declaração de um campo privado para armazenar a idade do funcionário. 
    // A privacidade garante o encapsulamento dos dados.
    #idade; 
  
    // Construtor da classe Funcionario, que é chamado automaticamente ao
    // criar uma nova instância da classe.
    constructor(nome, idade) {
  
      // Atribuição do valor do parâmetro 'nome' ao campo privado #nome.
      this.#nome = nome; 
  
      // Atribuição do valor do parâmetro 'idade' ao campo privado #idade.
      this.#idade = idade;
  
    }

    // Método privado para calcular o salário do funcionário. Este método não
    // pode ser chamado fora da classe.
    #calcularSalario(horasTrabalhadas, taxaHora) {

        // A operação abaixo calcula o salário multiplicando as horas trabalhadas 
        // pela taxa por hora.
        return horasTrabalhadas * taxaHora; // Retorna o salário calculado, que é um valor numérico.
    
    }

    // Método público que envolve o acesso ao método privado para calcular e exibir o salário.
    exibirSalario(horasTrabalhadas, taxaHora) {

        // Invocação do método privado #calcularSalario para calcular o salário
        // com base nas horas e taxa fornecidas.
        const salario = this.#calcularSalario(horasTrabalhadas, taxaHora);

        // Exibição do salário, incorporando o nome do funcionário, acessível
        // através do campo privado #nome.
        console.log(`O salário de ${this.#nome} é R$ ${salario}`);
        
    }

    // Método público para obter o nome do funcionário. Encapsula o acesso
    // ao campo privado #nome.
    getNome() {

        // Retorna o nome do funcionário, preservando o encapsulamento dos dados.
        return this.#nome; 

    }

    // Método público para obter a idade do funcionário. Encapsula o acesso ao
    // campo privado #idade.
    getIdade() {

        // Retorna a idade do funcionário, preservando o encapsulamento dos dados.
        return this.#idade; 
        
    }
  
  

}

// Criando múltiplas instâncias da classe Funcionario
const funcionario1 = new Funcionario('João', 30);
const funcionario2 = new Funcionario('Maria', 24);
const funcionario3 = new Funcionario('Carlos', 41);

// Teste 1: Cálculo do salário com horas e taxas normais
funcionario1.exibirSalario(40, 20); // Esperado: "O salário de João é $800"

// funcionario1.calcularSalario(40, 20);

funcionario2.exibirSalario(35, 18); // Esperado: "O salário de Maria é $630"

// Teste 2: Cálculo do salário com horas extras
funcionario3.exibirSalario(50, 22); // Esperado: "O salário de Carlos é $1100"

// Teste 3: Cálculo do salário com trabalho parcial
funcionario1.exibirSalario(20, 20); // Esperado: "O salário de João é $400"

// Teste 4: Acesso aos dados dos funcionários usando getters
console.log(`Nome: ${funcionario2.getNome()}`); // Esperado: "Nome: Maria"
console.log(`Idade: ${funcionario3.getIdade()}`); // Esperado: "Idade: 41"

// Teste 5: Cálculo do salário sem trabalho (0 horas)
funcionario2.exibirSalario(0, 18); // Esperado: "O salário de Maria é $0"

  /*
  Neste exemplo, #nome e #idade são variáveis privadas da
  classe Funcionario, enquanto #calcularSalario é um método privado
  para calcular o salário do funcionário. Esses membros privados
  fornecem encapsulamento, garantindo que apenas os métodos
  públicos da classe tenham acesso a eles.*/
  