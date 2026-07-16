let horas = 0, minutos = 0, segundos = 0;
/* Declara três variáveis, 'horas', 'minutos' e 
        'segundos', inicializando todas com 0.
   Essas variáveis armazenam os valores atuais de 
           horas, minutos e segundos do temporizador. */

let intervalo;
/* Declara a variável 'intervalo' sem inicializar um
         valor. Esta variável será usada para 
         armazenar a referência ao setInterval que controla a 
         contagem do tempo, permitindo que ela seja parada ou 
         reiniciada conforme necessário. */

let pausado = false;
/* Declara e inicializa a variável 'pausado' com o 
        valor booleano false. Esta variável é usada para controlar
         se o temporizador está pausado. Se true, a contagem do 
         tempo está pausada; se false, o temporizador está ativo. */

const atualizarDisplay = () => {
    /* Define uma função chamada 'atualizarDisplay' que 
            atualiza o conteúdo textual dos elementos HTML 
            que mostram o tempo do temporizador, formatando as 
            horas, minutos e segundos para sempre mostrarem 
            dois dígitos. */

    document.getElementById('horas').textContent = String(horas).padStart(2, '0');
    /* Acessa o elemento com ID 'horas' e atualiza seu 
            conteúdo textual. 
       Converte o valor da variável 'horas' para uma string e 
               usa 'padStart(2, '0')' para garantir que o valor
               sempre tenha pelo menos dois dígitos, preenchendo 
               com zeros à esquerda se necessário. */

    document.getElementById('minutos').textContent = String(minutos).padStart(2, '0');
    /* Funciona de maneira semelhante à linha anterior, mas 
               para o elemento com ID 'minutos' e a 
               variável 'minutos'. */

    document.getElementById('segundos').textContent = String(segundos).padStart(2, '0');
    /* Funciona de maneira semelhante às linhas anteriores, 
               mas para o elemento com ID 'segundos' e a 
               variável 'segundos'. */

}


const iniciarTemporizador = () => {
    /* Define a função 'iniciarTemporizador' que é responsável 
               por iniciar a contagem do temporizador. */

    if (intervalo) clearInterval(intervalo);
    /* Verifica se já existe um intervalo ativo armazenado 
               na variável 'intervalo'.
       Se existir, utiliza 'clearInterval' para parar o temporizador 
               anterior, evitando que múltiplos
               temporizadores funcionem ao mesmo tempo. */

    horas = parseInt(document.getElementById('entrada-horas').value);
    minutos = parseInt(document.getElementById('entrada-minutos').value);
    segundos = parseInt(document.getElementById('entrada-segundos').value);
    /* Recupera os valores dos campos de entrada (inputs) para 
               horas, minutos e segundos no formulário.
       Utiliza 'document.getElementById' para acessar cada 
               campo pelo seu ID e 'parseInt' para converter
               o valor de string para um número inteiro.
       Esses valores são então atribuídos às variáveis 
               'horas', 'minutos' e 'segundos'. */

    if (horas === 0 && minutos === 0 && segundos === 0) {
        alert('Defina um tempo válido para o temporizador.');
        /* Verifica se todos os campos de tempo estão 
                  definidos como zero.
           Se verdadeiro, exibe um alerta ao usuário para 
                  definir um tempo válido, indicando que o 
                  temporizador não pode ser iniciado com 
                  todos os campos zerados. */
        return;
        /* Encerra a execução da função se o tempo não 
                  for válido, evitando que o temporizador seja iniciado. */

    }

    atualizarDisplay();
    /* Chama a função 'atualizarDisplay' para atualizar a 
               interface do usuário com os valores de tempo
               recém-definidos nos campos de entrada. */

    pausado = false;
    /* Define a variável 'pausado' como false, indicando 
               que o temporizador não está pausado e está pronto
               para começar ou continuar a contagem. */

       intervalo = setInterval(() => {
        /* Cria um intervalo que executa a função anônima a 
                  cada 1000 milissegundos (1 segundo).
           A variável 'intervalo' armazena a referência 
                  desse intervalo para permitir que ele seja
                  interrompido com clearInterval quando necessário. */
    
        if (!pausado) {
            /* Verifica se o temporizador não está pausado antes 
                     de proceder com a contagem regressiva. */
    
            if (segundos === 0) {
                /* Verifica se os segundos chegaram a zero para então 
                        processar minutos e horas. */
    
                if (minutos === 0) {
                    /* Verifica se os minutos também estão a zero, indicando 
                              que é necessário decrementar as horas. */
    
                    if (horas === 0) {
                        /* Se as horas também estão a zero, o temporizador 
                                 alcançou o final da contagem.
                           É necessário então parar o intervalo e 
                                 notificar o usuário. */

                        clearInterval(intervalo);
                        /* Para o intervalo de tempo, interrompendo a 
                                 contagem regressiva. */
    
                        alert('O tempo acabou!');
                        /* Exibe um alerta indicando que o tempo do 
                                 temporizador expirou. */
    
                        reiniciarBotoes();
                        /* Chama a função 'reiniciarBotoes' para restabelecer os 
                                 estados iniciais dos botões. */
    
                        return;
                        /* Sai da função para evitar mais execuções após o 
                                 término do temporizador. */

                    } else {

                        /* Se ainda houver horas restantes, decrementa uma hora e 
                                 ajusta minutos e segundos para 59. */
                        horas--;
                        minutos = 59;
                        segundos = 59;

                    }

                } else {

                    /* Se ainda houver minutos, apenas decrementa um 
                              minuto e ajusta os segundos para 59. */
                    minutos--;
                    segundos = 59;

                }

            } else {

                /* Se os segundos ainda não estão a zero, 
                        simplesmente decrementa um segundo. */
                segundos--;

            }

            atualizarDisplay();
            /* Atualiza o display do temporizador para 
                     mostrar o tempo atualizado. */

        }
        
    }, 1000);
    /* O intervalo executa a função a cada 1 segundo (1000 milissegundos). */
    
    document.getElementById('iniciar').disabled = true;
    /* Desabilita o botão de iniciar, pois o temporizador já 
               está em execução e não deve ser reiniciado. */
    
    document.getElementById('pausar').disabled = false;
    /* Habilita o botão de pausar, permitindo ao usuário 
               pausar o temporizador se necessário. */
    
    document.getElementById('continuar').disabled = true;
    /* Mantém o botão de continuar desabilitado, já que só 
               deve ser habilitado após o temporizador 
               ser pausado. */
    
    document.getElementById('resetar').disabled = false;
    /* Habilita o botão de resetar, permitindo ao usuário 
               resetar o temporizador a qualquer momento 
               após o início. */
    
}



const reiniciarBotoes = () => {
    /* Define a função 'reiniciarBotoes' que é responsável 
            por configurar o estado inicial dos botões 
            quando o temporizador é resetado ou quando a 
            página é carregada. */

    document.getElementById('iniciar').disabled = false;
    /* Habilita o botão 'Iniciar'. Isso permite ao 
            usuário iniciar o temporizador. 
       É importante que este botão esteja habilitado 
            inicialmente para permitir que o temporizador 
            seja iniciado. */

    document.getElementById('pausar').disabled = true;
    /* Desabilita o botão 'Pausar' porque não faz sentido 
            pausar um temporizador que ainda não foi iniciado. */

    document.getElementById('continuar').disabled = true;
    /* Desabilita o botão 'Continuar' inicialmente, pois ele 
            só deve ser habilitado após o temporizador ser pausado. */

    document.getElementById('resetar').disabled = true;
    /* Desabilita o botão 'Resetar' inicialmente, pois não 
            há necessidade de resetar um temporizador que 
            não começou. */

}

const pausarTemporizador = () => {
    /* Define a função 'pausarTemporizador' que é 
               responsável por pausar a contagem do 
               temporizador. */

    pausado = true;
    /* Atribui o valor true à variável 'pausado'. Isso é 
               usado para interromper a contagem no intervalo 
               definido na função 'iniciarTemporizador'. 
       Quando 'pausado' é true, o código dentro do intervalo 
               que decrementa o tempo não será executado. */

    document.getElementById('pausar').disabled = true;
    /* Busca o botão 'Pausar' pelo seu ID e desabilita-o. Isso 
               impede que o usuário clique novamente em 'Pausar'
               enquanto o temporizador já está pausado, o que 
               evita comportamentos redundantes ou confusos 
               na interface. */

    document.getElementById('continuar').disabled = false;
    /* Busca o botão 'Continuar' pelo seu ID e habilita-o. 
               Isso permite que o usuário possa continuar a contagem
               do temporizador após ele ter sido pausado. */

}

const continuarTemporizador = () => {
    /* Define a função 'continuarTemporizador' que é responsável 
               por continuar a contagem do temporizador após 
               ter sido pausado. */

    pausado = false;
    /* Atribui o valor false à variável 'pausado'. Isso permite 
               que o intervalo na função 'iniciarTemporizador' 
               continue a contagem do tempo. */

    document.getElementById('pausar').disabled = false;
    /* Busca o botão 'Pausar' pelo seu ID e habilita-o novamente. 
               Isso permite que o usuário possa pausar o 
               temporizador novamente se necessário. */

    document.getElementById('continuar').disabled = true;
    /* Busca o botão 'Continuar' pelo seu ID e desabilita-o. 
               Isso impede que o usuário clique em 'Continuar'
               enquanto o temporizador já está contando, mantendo a 
               consistência e evitando comportamentos redundantes 
               na interface. */

}

const resetarTemporizador = () => {
    /* Define a função 'resetarTemporizador' responsável 
               por reiniciar completamente o temporizador,
               zerando todas as variáveis de tempo e parando 
               qualquer contagem ativa. */

    clearInterval(intervalo);
    /* Utiliza a função 'clearInterval' para parar o 
               intervalo de tempo que está controlando 
               o temporizador.
       'intervalo' é a referência ao setInterval 
               iniciado pela função 'iniciarTemporizador'.
       Isso efetivamente para o temporizador, impedindo 
               que ele continue a contar. */

    horas = 0;
    /* Reinicia a variável 'horas' para 0, zerando a 
            contagem de horas no temporizador. */

    minutos = 0;
    /* Reinicia a variável 'minutos' para 0, zerando a 
            contagem de minutos no temporizador. */

    segundos = 0;
    /* Reinicia a variável 'segundos' para 0, zerando a 
            contagem de segundos no temporizador. */

    pausado = false;
    /* Define a variável 'pausado' como false. Isso garante 
            que o temporizador não esteja em estado de pausa
            após ser resetado, permitindo que ele seja 
            reiniciado sem interferência. */

    atualizarDisplay();
    /* Chama a função 'atualizarDisplay' para atualizar os 
            elementos de display do temporizador na interface do usuário.
       Como as variáveis de tempo foram zeradas, o 
            display mostrará '00:00:00'. */

    reiniciarBotoes();
    /* Chama a função 'reiniciarBotoes' para restabelecer os 
            estados iniciais dos botões de controle.
       Isso geralmente envolve desabilitar os botões que 
            não devem ser usáveis quando o temporizador está parado
            e garantindo que o botão 'Iniciar' esteja habilitado. */

}



document.getElementById('iniciar').addEventListener('click', iniciarTemporizador);
/* Adiciona um ouvinte de evento ao botão 'Iniciar'. Quando 
            clicado, a função 'iniciarTemporizador' será chamada,
            iniciando a contagem do temporizador. */

document.getElementById('pausar').addEventListener('click', pausarTemporizador);
/* Adiciona um ouvinte de evento ao botão 'Pausar'. Quando 
         clicado, a função 'pausarTemporizador' será chamada,
         pausando a contagem do temporizador. */

document.getElementById('continuar').addEventListener('click', continuarTemporizador);
/* Adiciona um ouvinte de evento ao botão 'Continuar'. 
         Quando clicado, a função 'continuarTemporizador' será chamada,
         continuando a contagem do temporizador após uma pausa. */

document.getElementById('resetar').addEventListener('click', resetarTemporizador);
/* Adiciona um ouvinte de evento ao botão 'Resetar'. Quando 
         clicado, a função 'resetarTemporizador' será chamada,
         resetando todas as variáveis e a contagem do temporizador. */

atualizarDisplay();
/* Chama a função 'atualizarDisplay' na inicialização para 
         garantir que o display mostre o estado inicial do 
         temporizador, geralmente "00:00:00".
*/

reiniciarBotoes();
/* Chama a função 'reiniciarBotoes' na inicialização para 
         garantir que os botões estejam no estado correto antes 
         de qualquer ação do usuário. */