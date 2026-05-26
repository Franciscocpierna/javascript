/*
Exercício: Extrair Pessoas com Nomes que Começam com 'A'

Você está desenvolvendo um sistema que precisa processar uma lista de
nomes de pessoas e extrair todos os nomes que começam com a letra 'A'. 

O objetivo é criar uma função que recebe uma lista de nomes e retorna
uma nova lista contendo apenas os nomes que começam com 'A'.

Descrição do Exercício:
- Criar uma Lista de Nomes: Crie uma lista inicial contendo vários nomes de pessoas.
- Função de Filtragem de Nomes: Implemente uma função que filtra os nomes, extraindo apenas
aqueles que começam com a letra 'A'.
- Exibir a Lista Filtrada: Após filtrar os nomes, exiba a nova lista de nomes que começam com 'A'.*/

// Lista inicial de nomes
// Aqui declaramos uma variável chamada 'listaDeNomes' e atribuímos a ela um array
// que contém sete nomes de pessoas.
// Alguns destes nomes começam com a letra 'A', enquanto outros não.
let listaDeNomes = ['Alice', 'Bruno', 'Ana', 'Alexandre', 'Carla', 'Antônio', 'Amanda', "João", 'Angela'];

// Função para extrair nomes que começam com 'A'
// Esta função chamada 'extrairNomesComA' é definida para receber um parâmetro chamado
// 'nomes', que é esperado ser uma lista de nomes.
function extrairNomesComA(nomes) {

    // Utiliza o método 'filter' para criar um novo array contendo apenas os nomes que começam com 'A'.
    // 'filter' percorre cada elemento do array 'nomes' e aplica a função especificada a cada um deles.
    // A função dentro de 'filter' recebe cada 'nome' como argumento e retorna verdadeiro se
    // o nome começar com 'A', permitindo que ele seja incluído no novo array.
    let nomesComA = nomes.filter(nome => {

        // O método 'startsWith' é usado aqui para verificar se o nome começa com a letra 'A'.
        // 'startsWith' retorna 'true' se a string nome começa com 'A', caso contrário, retorna 'false'.
        return nome.startsWith('A');
        
    });

    // Retorna a nova lista de nomes que começam com 'A'
    // Após filtrar os nomes, a função retorna 'nomesComA', que é o novo array
    // apenas com os nomes que satisfazem o critério.
    return nomesComA;

}

// Chama a função para extrair nomes com 'A' e guarda o resultado
// Aqui chamamos a função 'extrairNomesComA', passando 'listaDeNomes' como argumento.
// O resultado desta função é armazenado na variável 'nomesFiltrados'.
let nomesFiltrados = extrairNomesComA(listaDeNomes);

// Mostra a lista filtrada no console
// Por fim, usamos 'console.log' para imprimir no console a frase 'Nomes que começam
// com A:' seguido por 'nomesFiltrados'.
// Isso mostra quais nomes da lista original começam com a letra 'A'.
console.log('Nomes que começam com A:', nomesFiltrados);