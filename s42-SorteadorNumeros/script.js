function sortearNumero() {
    /* Define a função chamada 'sortearNumero'. Esta função 
                será chamada quando o usuário clicar no 
                botão de sortear na página HTML. */

    const minimo = parseInt(document.getElementById('numeroMinimo').value);
    /* A constante 'minimo' é definida como o valor numérico 
                obtido do campo de entrada com ID 'numeroMinimo'.
       document.getElementById('numeroMinimo') acessa o 
                elemento com esse ID no documento HTML.
       .value obtém o valor atual desse campo de entrada como uma string.
       parseInt() converte essa string para um número 
                inteiro, que é armazenado em 'minimo'. */

    const maximo = parseInt(document.getElementById('numeroMaximo').value);
    /* A constante 'maximo' é definida de maneira semelhante 
                a 'minimo', mas obtém seu valor do campo de 
                entrada com ID 'numeroMaximo'.
       Isso permite acessar o limite superior para o 
                sorteio de números. */

    const contadorElemento = document.getElementById('contador');
    /* A constante 'contadorElemento' é definida para
                referenciar o elemento HTML com ID 'contador'.
       Este elemento será usado para mostrar uma contagem 
                regressiva antes de revelar o número sorteado. */

    const numeroSorteadoElemento = document.getElementById('numeroSorteado');
    /* A constante 'numeroSorteadoElemento' é definida para 
                referenciar o elemento HTML com ID 'numeroSorteado'.
       Este elemento será usado para exibir o número que 
                foi sorteado após a contagem regressiva. */

    
       if (isNaN(minimo) || isNaN(maximo) || minimo >= maximo) {
        /* Verifica três condições dentro de um único 'if':
           1. isNaN(minimo) - Checa se 'minimo' não é um número. 
                    Isso acontece se o campo de entrada 
                    correspondente estava vazio ou continha 
                    caracteres não numéricos.
           2. isNaN(maximo) - Similarmente, checa 
                    se 'maximo' não é um número.
           3. minimo >= maximo - Verifica se o valor 
                    de 'minimo' é maior ou igual ao valor de 'maximo'.
           Se qualquer uma dessas condições for verdadeira, o 
                    bloco de código dentro do 'if' será executado. */
    
            alert('Por favor, insira um intervalo válido.');
            /* Mostra uma caixa de alerta para o usuário com a 
                        mensagem "Por favor, insira um intervalo válido." 
            Isso informa ao usuário que ele precisa corrigir os 
                        valores inseridos nos campos de entrada. */
        
            return;
            /* Encerra a execução da função 'sortearNumero'. Isso 
                            impede que qualquer código subsequente na 
                            função seja executado
                            se o intervalo não for válido. */

    }
    
    contadorElemento.textContent = '5';
    /* Define o conteúdo de texto do elemento 'contadorElemento' 
                    (o parágrafo HTML com ID 'contador') para '5'.
       Isso é usado para iniciar a contagem regressiva do sorteio. */
    
    numeroSorteadoElemento.textContent = '';
    /* Limpa qualquer texto que possa estar atualmente no 
                elemento 'numeroSorteadoElemento' (o parágrafo HTML 
                com ID 'numeroSorteado').
       Isso prepara o elemento para exibir o novo número 
                sorteado após a contagem regressiva. */
    
    contadorElemento.style.opacity = '1';
    /* Ajusta a propriedade de opacidade do 'contadorElemento' 
                para '1', tornando-o totalmente opaco e visível.
       Isso é necessário porque a opacidade pode ter sido 
                definida para '0' anteriormente para ocultar o 
                elemento após um sorteio anterior. */
    
    numeroSorteadoElemento.style.opacity = '0';
    /* Define a opacidade do 'numeroSorteadoElemento' 
                para '0', tornando-o completamente 
                transparente e invisível.
       Isso garante que o número sorteado não seja 
                visível até que a contagem regressiva 
                esteja completa. */
    
    let contador = 5;
    /* Declara uma variável 'contador' e inicializa 
                com o valor '5'.
       Esta variável é usada para controlar a contagem 
                regressiva do sorteio de números. */
    
    const intervalo = setInterval(() => {
    /* Define uma constante 'intervalo' e inicia um 
                temporizador que executa a função passada 
                como primeiro argumento em intervalos 
                regulares de 1000 milissegundos (1 segundo).
        A função é uma função de seta (arrow function), que é 
                executada repetidamente a cada segundo. */

        contador--;
        /* Decrementa a variável 'contador' por 1 a cada 
                    execução da função. Esta operação é usada para 
                    atualizar a contagem regressiva visível na página. */

        contadorElemento.textContent = contador;
        /* Atualiza o texto do elemento HTML 'contadorElemento' 
                    com o valor atualizado de 'contador'.
            Isso reflete a contagem regressiva na interface do 
                    usuário, mostrando como o número diminui a 
                    cada segundo. */

        if (contador === 0) {
            /* Verifica se 'contador' atingiu 0. Se verdadeiro, 
                    executa o código dentro deste bloco, que é 
                    responsável por concluir a contagem regressiva e 
                    sortear o número. */

            clearInterval(intervalo);
            /* Chama 'clearInterval' passando a constante 'intervalo' 
                        como argumento. Isso interrompe o temporizador, 
                fazendo com que a função de seta não seja mais executada em 
                        intervalos. Isso é necessário para parar a contagem 
                        regressiva. */

            const numeroSorteado = Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
            /* Declara uma nova constante 'numeroSorteado' e atribui a 
                        ela um número aleatório dentro do intervalo 
                        definido pelos valores de 'minimo' e 'maximo'.
                Math.random() gera um número aleatório 
                        entre 0 (inclusivo) e 1 (exclusivo).
                Multiplica-se esse número pelo intervalo 
                        entre 'maximo' e 'minimo' e adiciona-se 1 para 
                        garantir que 'maximo' seja alcançável.
                Math.floor() arredonda o número para o inteiro mais 
                        próximo abaixo dele, garantindo que o 
                        resultado seja um inteiro. 
                Adiciona-se 'minimo' ao resultado para garantir que o 
                        valor sorteado não seja menor que 'minimo'. */

            contadorElemento.style.opacity = '0';
            /* Ajusta a opacidade do 'contadorElemento' para '0', 
                        fazendo-o desaparecer visualmente da página. 
                Isso é feito para focar a atenção do usuário no 
                        resultado do sorteio, que é o número sorteado. */

            numeroSorteadoElemento.textContent = numeroSorteado;
            /* Atualiza o texto do 'numeroSorteadoElemento' para 
                        mostrar o 'numeroSorteado'. 
                Isso exibe o número sorteado na interface do 
                        usuário após a contagem regressiva ter 
                        concluído. */

            numeroSorteadoElemento.style.opacity = '1';
            /* Define a opacidade de 'numeroSorteadoElemento' para '1', 
                        tornando-o completamente opaco e visível.
                Isso assegura que o número sorteado seja claramente 
                        visível para o usuário. */
        }
        
    }, 1000);
    /* O segundo argumento de 'setInterval' é 1000, o que 
                significa que a função de seta é executada a 
                cada 1000 milissegundos (1 segundo). */
        
}