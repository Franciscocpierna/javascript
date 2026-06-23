// Função para gerar um número aleatório entre 
// min e max (inclusive)
function gerarNumeroAleatorio(min, max) {

    // Math.random() gera um número flutuante aleatório 
    // entre 0 (inclusive) e 1 (exclusivo).
    // Multiplica esse número pela diferença entre max e min
    // (ajustado para incluir o valor máximo por meio de 'max - min + 1').
    // Math.floor() arredonda o resultado para baixo, garantindo
    // que o resultado seja um número inteiro.
    // Adiciona o valor de 'min' ao resultado para garantir que o
    // intervalo comece em 'min'.
    return Math.floor(Math.random() * (max - min + 1)) + min;
  
  }
  
    
  // Função para gerar um CPF válido
  function gerarCPF() {
  
    // Gera os 9 primeiros dígitos do CPF.
    // Array.from cria um novo array com 9 elementos, cada um 
    // gerado pela função gerarNumeroAleatorio chamada para o intervalo de 0 a 9.
    let digitosCPF = Array.from({ length: 9 }, () => gerarNumeroAleatorio(0, 9));
  
    // Calcula o primeiro dígito verificador do CPF.
    // A função reduce processa cada elemento do array,
    // acumulando um resultado final baseado na função fornecida.
    let soma = digitosCPF.reduce((acc, curr, idx) => {
  
      // 'acc' (acumulador) começa em 0, conforme definido
      // pelo segundo argumento do reduce.
      // 'curr' é o valor atual do elemento no array durante a iteração.
      // 'idx' é o índice do elemento atual no array.
      // Cada dígito é multiplicado por um peso, começando de 10 e
      // decrescendo até 2 (10 - idx).
      // Essa multiplicação reflete a regra de cálculo do CPF,
      // onde cada dígito tem um peso que decresce.
      return acc + curr * (10 - idx);
    }, 0);
  
    // Aplica a fórmula do módulo 11 para determinar o
    // primeiro dígito verificador.
    let primeiroDigito = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  
    // 'soma % 11' calcula o resto da divisão da soma por 11.
    // Se o resultado for menor que 2, o primeiro dígito é 0.
    // Caso contrário, subtrai-se o resto de 11 para obter o dígito.
    // Adiciona o primeiro dígito verificador ao array de dígitos do CPF.
    digitosCPF.push(primeiroDigito); 
  
  
    // Recalcula a soma para o segundo dígito verificador, agora
    // incluindo o primeiro dígito verificador e ajustando o
    // peso para começar de 11 a 2.
    soma = digitosCPF.reduce((acc, curr, idx) => {
  
      // 'acc' é o acumulador que inicia de 0.
      // 'curr' representa o dígito atual do array de dígitos
      // do CPF (agora incluindo o primeiro dígito verificador).
      // 'idx' é o índice do elemento atual, que agora vai até 10,
      // pois o array tem 10 elementos após adicionar o primeiro dígito verificador.
      // Multiplica cada dígito por um peso decrescente de 11 até 2,
      // ajustando de acordo com o índice.
      return acc + curr * (11 - idx);
  
    }, 0);
  
    // Aplica a fórmula do módulo 11 para determinar o segundo dígito verificador.
    let segundoDigito = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  
    // Calcula o resto da divisão da soma por 11. Se o resultado
    // for menor que 2, o segundo dígito é 0.
    // Caso contrário, o segundo dígito é calculado como 11 menos
    // o resto da divisão da soma por 11.
    // Adiciona o segundo dígito verificador ao array de dígitos do CPF.
    digitosCPF.push(segundoDigito); 
  
  
    // Retorna o CPF completo como uma string, juntando todos os
    // dígitos do array em uma única sequência.
    return digitosCPF.join('');
  
  }


 // Função para formatar o CPF
 function formatarCPF(cpf) {

    // Usa a função `replace` do JavaScript, que permite
    // substituir partes de uma string baseada em uma expressão regular.
    // A expressão regular /(\d{3})(\d{3})(\d{3})(\d{2})/ é usada
    // para dividir o número do CPF em quatro grupos:
    // - \d{3} captura três dígitos numéricos, repetido três vezes
    // para os três primeiros blocos do CPF.
    // - \d{2} captura os dois dígitos finais, que são os dígitos verificadores.
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    // A string de substituição '$1.$2.$3-$4' determina o formato desejado:
    // - $1, $2, $3, e $4 referem-se aos grupos capturados pela expressão regular.
    // - Cada grupo é separado por um ponto (.) ou um traço (-),
    // formatando o CPF no padrão comum brasileiro: XXX.XXX.XXX-XX.

 }

 
 // Função principal que é executada quando o botão é clicado
 function principal() {

    // Acessa o elemento de entrada de texto onde o
    // CPF é exibido usando seu ID 'cpf'.
    const campoCPF = document.getElementById('cpf');

    // Acessa o botão responsável por iniciar a geração do
    // CPF usando seu ID 'gerar-cpf'.
    const botaoGerarCPF = document.getElementById('gerar-cpf');
  
    // Adiciona um ouvinte de evento ao botão para
    // reagir a cliques do usuário.
    botaoGerarCPF.addEventListener('click', () => {

        // Quando o botão é clicado, a função de gerar
        // um novo CPF é chamada.
        const novoCPF = gerarCPF();

        // O CPF gerado é então formatado para o formato
        // padrão brasileiro (XXX.XXX.XXX-XX).
        const cpfFormatado = formatarCPF(novoCPF);

        // O valor do campo de entrada de texto é
        // atualizado com o CPF formatado.
        campoCPF.value = cpfFormatado;
        
    });
}


// Executa a função principal quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', principal);