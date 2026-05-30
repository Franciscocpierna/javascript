/*
Exercício: Sistema de Gerenciamento Escolar

Objetivo: Criar um programa simples para gerenciar informações de 
estudantes e professores em uma escola usando JavaScript.

Descrição:
Você precisa desenvolver um programa básico para ajudar a organizar 
informações sobre estudantes e professores em uma escola. O programa deve 
mostrar detalhes específicos de cada pessoa, como nome, idade e, para 
estudantes, número de matrícula, e para professores, o departamento em que 
trabalham.

Tarefas:

Criar a Classe Pessoa:
    - Crie uma classe chamada Pessoa que tenha um nome e uma idade.
    - Adicione uma função para mostrar o nome e a idade da pessoa.

Criar a Classe Estudante:
    - Crie uma classe chamada Estudante que herde da classe Pessoa.
    - Adicione um número de matrícula para cada estudante.
    - Mostre o nome, idade e número de matrícula do estudante.

Criar a Classe Professor:
    - Crie uma classe chamada Professor que herde da classe Pessoa.
    - Adicione um departamento para cada professor.
    - Mostre o nome, idade e departamento do professor.

Demonstração:
    - Crie alguns estudantes e professores.
    - Mostre as informações de cada um deles.
*/

// Declaração da classe Pessoa como a classe base para representar uma
// pessoa genérica
class Pessoa {

    // O construtor é um método especial que é chamado quando um novo
    // objeto desta classe é criado
    constructor(nome, idade) {

        // A palavra-chave 'this' refere-se à instância atual do objeto sendo criado
        this.nome = nome; // Armazena o nome fornecido como argumento no campo 'nome' da instância
        this.idade = idade; // Armazena a idade fornecida como argumento no campo 'idade' da instância
    }

    // Método 'imprimirDetalhes' definido para exibir informações sobre a pessoa
    imprimirDetalhes() {
        
        // 'console.log' é uma função que imprime a informação fornecida no console do navegador ou terminal
        console.log(`Nome: ${this.nome}`); // Imprime o nome da pessoa utilizando template literals para incorporar a variável
        console.log(`Idade: ${this.idade}`); // Imprime a idade da pessoa, também utilizando template literals
    }
}


// Declaração da classe Estudante que herda da classe Pessoa usando a palavra-chave 'extends'
class Estudante extends Pessoa {

    // Construtor da classe Estudante, chamado ao criar uma nova instância
    constructor(nome, idade, numeroDeMatricula) {

        // Chama o construtor da classe base (Pessoa) com 'nome' e 'idade'
        super(nome, idade); // A função 'super' é usada para chamar o construtor da classe pai
        
        // Atribui o número de matrícula fornecido ao atributo 'numeroDeMatricula' do objeto
        this.numeroDeMatricula = numeroDeMatricula; // Armazena o número de matrícula na instância do estudante
    
    }

    // Método para imprimir os detalhes do estudante, sobrescrevendo o método da classe base
    imprimirDetalhes() {

        // Chama o método imprimirDetalhes da classe base (Pessoa) para imprimir nome e idade
        super.imprimirDetalhes(); // Utiliza 'super' para acessar e executar o método da classe base
        
        // Imprime o número de matrícula do estudante
        console.log(`Matrícula: ${this.numeroDeMatricula}`); // Mostra o número de matrícula usando template literals
    
    }
}


// Declaração da classe Professor que herda funcionalidades da classe Pessoa
class Professor extends Pessoa {

    // Construtor da classe Professor, que é invocado ao criar uma nova instância
    constructor(nome, idade, departamento) {
    
        // Chama o construtor da classe base (Pessoa) passando 'nome' e 'idade'
        super(nome, idade); // A função 'super' é usada para acessar o construtor da classe pai, inicializando 'nome' e 'idade'
    
        // Atribui o valor do parâmetro 'departamento' ao atributo 'departamento' do objeto
        this.departamento = departamento; // Armazena o departamento associado ao professor na instância
    
    }

    // Método para imprimir os detalhes do professor, sobrescrevendo o método da classe base
    imprimirDetalhes() {
    
        // Chama o método imprimirDetalhes da classe base (Pessoa) para imprimir nome e idade
        super.imprimirDetalhes(); // Utiliza 'super' para acessar e executar o método da classe base
    
        // Imprime o departamento do professor
        console.log(`Departamento: ${this.departamento}`); // Mostra o departamento usando template literals
    
    }
}


// Exemplo de uso criando estudantes
const estudante1 = new Estudante("Lucas", 20, "20243030");
const estudante2 = new Estudante("Marta", 22, "20243560");
const estudante3 = new Estudante("Carlos", 19, "20243250");

// Criando professores
const professor1 = new Professor("Dra. Silva", 45, "Matemática");
const professor2 = new Professor("Dr. Santos", 50, "História");
const professor3 = new Professor("Dra. Lopes", 40, "Ciências");

// Imprimindo detalhes dos estudantes
estudante1.imprimirDetalhes();
estudante2.imprimirDetalhes();
estudante3.imprimirDetalhes();

// -------------------------------------

// Imprimindo detalhes dos professores
professor1.imprimirDetalhes();
professor2.imprimirDetalhes();
professor3.imprimirDetalhes();

// Demonstração de como os objetos podem ser utilizados em cenários reais
// Por exemplo, podemos simular um ano passando e os estudantes avançando de idade
// estudante1.idade = estudante1.idade + 1
estudante1.idade++;
estudante2.idade++;
estudante3.idade++;

// Reimprimindo detalhes para mostrar o avanço de idade
console.log("Depois de um ano:");
estudante1.imprimirDetalhes();
estudante2.imprimirDetalhes();
estudante3.imprimirDetalhes();