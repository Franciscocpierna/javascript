document.addEventListener('DOMContentLoaded', () => {
          // Este evento é acionado quando todo o conteúdo
          // HTML foi completamente carregado,
          // sem esperar pelo CSS, imagens ou iframes. É um bom
          // lugar para iniciar scripts que manipulam o DOM.

          const botaoGerar = document.getElementById('gerar');
          // A função 'getElementById' busca no documento HTML
          // um elemento com o ID especificado.
          // Aqui, estamos buscando o elemento com o ID 'gerar',
          // que é o botão de gerar a senha,
          // e armazenamos esse elemento na constante
          // 'botaoGerar' para uso futuro.

          const divSenha = document.getElementById('senha');
          // Aqui, da mesma forma, buscamos o elemento com o
          // ID 'senha', que é a <div> onde a senha será exibida,
          // e armazenamos esse elemento na constante 'divSenha'.

        

    botaoGerar.addEventListener('click', () => {
    // Adiciona um ouvinte de evento ao botão 'botaoGerar'.
    // Este evento 'click' é disparado quando o botão é clicado.
    // A função depois da seta '=>' é chamada toda vez que o evento ocorre.
          
        const comprimento = parseInt(document.getElementById('comprimento').value);
        // 'document.getElementById' obtém o elemento com o
        // ID 'comprimento', que é um campo de entrada do tipo número.
        // '.value' acessa o valor atual desse campo de entrada.
        // 'parseInt' converte o valor, que é uma string, para um número inteiro.
        // Este valor representa o comprimento da senha que o usuário deseja gerar.
      
        const incluirMaiusculas = document.getElementById('incluir-maiusculas').checked;
        // Busca o checkbox com ID 'incluir-maiusculas' e verifica
        // se está marcado com '.checked'.
        // Retorna 'true' se o checkbox estiver marcado (o que significa
        // que o usuário quer incluir letras maiúsculas),
        // e 'false' se não estiver.
      
        const incluirEspeciais = document.getElementById('incluir-especiais').checked;
        // Semelhante ao anterior, verifica se o checkbox para
        // incluir caracteres especiais está marcado.
      
        const incluirNumeros = document.getElementById('incluir-numeros').checked;
        // Verifica se o checkbox para incluir números na senha está marcado.
      
        const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
        // Define uma string contendo todas as letras minúsculas do alfabeto inglês,
        // que podem ser usadas na geração da senha.
      
        const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        // Define uma string contendo todas as letras maiúsculas do alfabeto inglês.
      
        const caracteresEspeciais = '!@#$%^&*()-_=+';
        // Define uma string contendo vários caracteres especiais
        // que podem ser incluídos na senha.
      
        const numeros = '0123456789';
        // Define uma string contendo todos os dígitos de 0 a 9
        // que podem ser incluídos na senha.
                    

    let conjuntoCaracteres = letrasMinusculas;
    // Inicializa a variável 'conjuntoCaracteres'
    // com a string 'letrasMinusculas'.
    // Isso significa que, por padrão, a senha gerada
    // pode conter letras minúsculas.
    // A palavra-chave 'let' é usada para declarar
    // variáveis que podem ter seu valor alterado.

    if (incluirMaiusculas) conjuntoCaracteres += letrasMaiusculas;
    // Esta linha verifica se o usuário marcou a opção
    // para incluir letras maiúsculas ('incluirMaiusculas' é verdadeiro).
    // Se verdadeiro, concatena (adiciona) a string
    // 'letrasMaiusculas' ao 'conjuntoCaracteres'.
    // Isso expande o conjunto de caracteres disponíveis
    // para incluir letras maiúsculas.

    if (incluirEspeciais) conjuntoCaracteres += caracteresEspeciais;
    // Semelhante à linha acima, mas verifica se caracteres
    // especiais devem ser incluídos.
    // Se o usuário desejar caracteres especiais, eles são
    // adicionados ao 'conjuntoCaracteres'.

    if (incluirNumeros) conjuntoCaracteres += numeros;
    // Verifica se números devem ser incluídos na senha.
    // Se 'incluirNumeros' for verdadeiro, os números são
    // adicionados ao 'conjuntoCaracteres'.

    if (conjuntoCaracteres.length === 0) {
      // Esta condição verifica se o 'conjuntoCaracteres' está vazio.
      // O '.length' retorna o comprimento da string 'conjuntoCaracteres'.
      // Se o comprimento for 0, significa que nenhum critério foi selecionado.

      divSenha.innerText = 'Por favor, selecione pelo menos um critério para gerar a senha.';
      // Define o texto da 'divSenha' para informar o usuário
      // que ele deve selecionar pelo menos um critério.
      // 'innerText' é uma propriedade que define ou retorna
      // o texto contido em um elemento DOM.

      return;
      // A palavra-chave 'return' é usada para
      // sair da função imediatamente.
      // Neste caso, impede que o restante do código
      // seja executado se nenhum critério for selecionado.

    }


    let senha = '';
    // Inicializa a variável 'senha' como uma string vazia.
    // Esta variável será usada para armazenar a
    // senha gerada ao longo do processo.

    for (let i = 0; i < comprimento; i++) {
      // Este é um laço 'for' que se repete 'comprimento' vezes,
      // onde 'comprimento' é o número de caracteres que a senha deve ter.
      // A variável 'i' é inicializada em 0 e incrementada a cada
      // iteração até que seja menor que 'comprimento'.

      const indiceAleatorio = Math.floor(Math.random() * conjuntoCaracteres.length);
      // 'Math.random()' gera um número aleatório entre 0
      // (inclusivo) e 1 (exclusivo).
      // Multiplicando isso pelo comprimento de 'conjuntoCaracteres',
      // obtemos um número entre 0 e o comprimento de 'conjuntoCaracteres' (exclusivo).
      // 'Math.floor()' arredonda o número para baixo para o
      // inteiro mais próximo, resultando em um índice válido
      // dentro do array de 'conjuntoCaracteres'.

      senha += conjuntoCaracteres[indiceAleatorio];
      // Acessa o caractere no 'conjuntoCaracteres' no índice
      // 'indiceAleatorio' e o adiciona à string 'senha'.
      // Este processo é repetido para cada iteração do laço,
      // construindo a senha caractere por caractere.

    }
    // O laço 'for' termina depois de adicionar o número
    // especificado de caracteres à senha, completando a geração da senha.


    if (incluirNumeros && !/\d/.test(senha)) {
        // Verifica se a opção de incluir números
        // está ativa ('incluirNumeros' é verdadeiro)
        // e se a senha atualmente gerada não contém nenhum
        // dígito numérico ('/\d/' é uma expressão regular que busca dígitos).
        // A função '.test()' retorna verdadeiro se encontrar um
        // dígito na senha, caso contrário retorna falso.
      
        const indiceAleatorio = Math.floor(Math.random() * senha.length);
        // Gera um índice aleatório dentro do comprimento atual da senha.
        // 'Math.random()' cria um número flutuante aleatório entre 0 e 1.
        // Multiplicando isso pelo comprimento da 'senha' e
        // usando 'Math.floor()' para arredondar para baixo,
        // conseguimos um índice inteiro dentro dos limites da string da senha.
      
        const indiceDigitoAleatorio = Math.floor(Math.random() * numeros.length);
        // Gera um índice aleatório dentro da string 'numeros',
        // que contém todos os dígitos de 0 a 9.
      
        senha = senha.substring(0, indiceAleatorio) + numeros[indiceDigitoAleatorio] + senha.substring(indiceAleatorio + 1);
        // Atualiza a senha inserindo um dígito aleatório no índice 'indiceAleatorio'.
        // 'senha.substring(0, indiceAleatorio)' retorna a
        // parte da senha antes do índice aleatório.
        // 'numeros[indiceDigitoAleatorio]' seleciona um
        // número aleatório da string 'numeros'.
        // 'senha.substring(indiceAleatorio + 1)' retorna a
        // parte da senha após o índice aleatório.
        // Essas três partes são concatenadas para formar a
        // nova senha, garantindo que pelo menos um dígito seja incluído.

      }
      
      divSenha.innerText = senha;
      // Finalmente, a senha gerada (e possivelmente ajustada
      // para incluir um número) é exibida na página.
      // 'divSenha.innerText' atribui a senha gerada ao elemento
      // da página identificado anteriormente como 'divSenha'.
      // 'innerText' é usado aqui para modificar o texto interno do
      // elemento HTML, tornando a senha visível ao usuário.
    
  });
});
