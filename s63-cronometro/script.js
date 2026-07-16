let horas = 0, minutos = 0, segundos = 0, milissegundos = 0;
/* Declara variáveis para armazenar as horas, minutos, 
            segundos e milissegundos do cronômetro.
   Inicialmente, todas essas variáveis são definidas para 0. */

let intervalo;
/* Declara uma variável 'intervalo' que será usada 
            para armazenar a referência ao setInterval,
            permitindo controlar o início e a parada do 
            cronômetro. */

let pausado = false;
/* Declara uma variável 'pausado' e a inicializa como 
            false. Esta variável é usada para controlar
            se o cronômetro está pausado ou não. */

const atualizarDisplay = () => {
    /* Define uma função 'atualizarDisplay' que atualiza o 
                display do cronômetro no navegador. */

    document.getElementById('horas').textContent = String(horas).padStart(2, '0');
    /* Busca o elemento com o ID 'horas' e atualiza seu 
                conteúdo de texto para mostrar o valor
               da variável 'horas', garantindo que sempre tenha 
               pelo menos dois dígitos, preenchendo com zeros à esquerda. */

    document.getElementById('minutos').textContent = String(minutos).padStart(2, '0');
    /* Busca o elemento com o ID 'minutos' e atualiza seu 
               conteúdo de texto para mostrar o valor
               da variável 'minutos', garantindo que sempre 
               tenha pelo menos dois dígitos, preenchendo com 
               zeros à esquerda. */

    document.getElementById('segundos').textContent = String(segundos).padStart(2, '0');
    /* Busca o elemento com o ID 'segundos' e atualiza seu 
                conteúdo de texto para mostrar o valor
               da variável 'segundos', garantindo que sempre 
               tenha pelo menos dois dígitos, preenchendo com 
               zeros à esquerda. */

    document.getElementById('milissegundos').textContent = String(Math.floor(milissegundos / 10)).padStart(2, '0');
    /* Busca o elemento com o ID 'milissegundos' e atualiza seu 
                conteúdo de texto para mostrar o valor
               da variável 'milissegundos' dividido por 10 e 
               arredondado para baixo, garantindo que sempre 
               tenha pelo menos dois dígitos, preenchendo 
               com zeros à esquerda. */

}

const iniciarCronometro = () => {
    /* Define a função 'iniciarCronometro' que inicia o cronômetro. */

    intervalo = setInterval(() => {
        /* Inicia um intervalo que executa uma função a 
                    cada 10 milissegundos.
           'intervalo' armazena a referência para esse intervalo, 
                       permitindo controlá-lo com clearInterval 
                       se necessário. */

        if (!pausado) {
            /* Checa se o cronômetro não está pausado. Se 'pausado' é 
                        falso, o cronômetro está ativo e o bloco de 
                        código será executado. */

            milissegundos += 10;
            /* Incrementa a variável 'milissegundos' em 10 a cada 
                        iteração, contando os milissegundos. */

            if (milissegundos >= 1000) {
                /* Verifica se os milissegundos alcançaram ou excederam 1000 (o 
                            que equivale a um segundo). */

                milissegundos = 0;
                /* Reinicia a contagem de milissegundos para 0. */

                segundos++;
                /* Incrementa a variável 'segundos' em 1, indicando 
                            que um segundo passou. */

            }

            if (segundos >= 60) {
                /* Verifica se os segundos alcançaram 60, o que 
                            equivale a um minuto. */

                segundos = 0;
                /* Reinicia a contagem de segundos para 0. */

                minutos++;
                /* Incrementa a variável 'minutos' em 1, indicando 
                            que um minuto passou. */

            }

            if (minutos >= 60) {
                /* Verifica se os minutos alcançaram 60, o que 
                            equivale a uma hora. */

                minutos = 0;
                /* Reinicia a contagem de minutos para 0. */

                horas++;
                /* Incrementa a variável 'horas' em 1, indicando 
                            que uma hora passou. */
                            
            }

            atualizarDisplay();
            /* Chama a função 'atualizarDisplay' para atualizar os 
                        valores mostrados no display do cronômetro. */

        }
    }, 10);

    document.getElementById('iniciar').disabled = true;
    /* Desabilita o botão 'Iniciar' para evitar reinicializações 
                enquanto o cronômetro está rodando. */

    document.getElementById('pausar').disabled = false;
    /* Habilita o botão 'Pausar', permitindo que o usuário 
                pause o cronômetro. */

    document.getElementById('continuar').disabled = true;
    /* Desabilita o botão 'Continuar', pois não é necessário 
                até que o cronômetro seja pausado. */

    document.getElementById('resetar').disabled = false;
    /* Habilita o botão 'Resetar', permitindo que o usuário 
                resete o cronômetro a qualquer momento após o início. */

}

const pausarCronometro = () => {
    /* Define a função 'pausarCronometro' que é responsável 
                por pausar a contagem do cronômetro. */

    pausado = true;
    /* Atribui o valor true à variável 'pausado'. Isso é usado 
                para interromper a contagem no intervalo definido 
                na função 'iniciarCronometro'. */

    document.getElementById('pausar').disabled = true;
    /* Busca o botão 'Pausar' pelo seu ID e desabilita-o. Isso 
                impede que o usuário clique novamente em 'Pausar'
               enquanto o cronômetro já está pausado, o que evita 
               comportamentos redundantes ou confusos na interface. */

    document.getElementById('continuar').disabled = false;
    /* Busca o botão 'Continuar' pelo seu ID e habilita-o. Isso 
               permite que o usuário possa continuar a contagem
               do cronômetro após ele ter sido pausado. */

}


const continuarCronometro = () => {
    /* Define a função 'continuarCronometro' que é responsável 
                por continuar a contagem do cronômetro após 
                ter sido pausado. */

    pausado = false;
    /* Atribui o valor false à variável 'pausado'. Isso permite 
                que o intervalo na função 'iniciarCronometro' 
                continue a contagem do tempo. */

    document.getElementById('pausar').disabled = false;
    /* Busca o botão 'Pausar' pelo seu ID e habilita-o novamente. 
                Isso permite que o usuário possa pausar o 
                cronômetro novamente se necessário. */

    document.getElementById('continuar').disabled = true;
    /* Busca o botão 'Continuar' pelo seu ID e desabilita-o. 
               Isso impede que o usuário clique em 'Continuar'
               enquanto o cronômetro já está contando, mantendo a 
               consistência e evitando comportamentos redundantes 
               na interface. */

}


const resetarCronometro = () => {
    /* Define a função 'resetarCronometro' responsável por 
                reiniciar completamente o cronômetro. */

    clearInterval(intervalo);
    /* Chama a função 'clearInterval' passando a variável 'intervalo'. 
               Isso interrompe o intervalo de tempo estabelecido,
               parando a contagem do cronômetro que foi iniciada na 
               função 'iniciarCronometro'. */

    horas = 0;
    /* Reinicia a variável 'horas' para 0, zerando a 
                contagem de horas no cronômetro. */

    minutos = 0;
    /* Reinicia a variável 'minutos' para 0, zerando a 
                contagem de minutos no cronômetro. */

    segundos = 0;
    /* Reinicia a variável 'segundos' para 0, zerando a 
                contagem de segundos no cronômetro. */

    milissegundos = 0;
    /* Reinicia a variável 'milissegundos' para 0, zerando a 
                contagem de milissegundos no cronômetro. */

    pausado = false;
    /* Atribui o valor false à variável 'pausado'. Isso garante 
                que o cronômetro não esteja em estado de 
                pausa após o reset. */

    atualizarDisplay();
    /* Chama a função 'atualizarDisplay' para atualizar o 
                display do cronômetro, refletindo que todos os 
                valores foram zerados. */

    document.getElementById('iniciar').disabled = false;
    /* Busca o botão 'Iniciar' pelo seu ID e habilita-o. 
                Isso permite que o usuário possa iniciar o 
                cronômetro novamente após o reset. */

    document.getElementById('pausar').disabled = true;
    /* Busca o botão 'Pausar' pelo seu ID e desabilita-o. 
    Isso impede que o usuário tente pausar o cronômetro 
                quando ele não está em contagem. */

    document.getElementById('continuar').disabled = true;
    /* Busca o botão 'Continuar' pelo seu ID e desabilita-o. 
    Isso impede que o usuário tente continuar a contagem do 
               cronômetro quando ele está resetado. */

    document.getElementById('resetar').disabled = true;
    /* Busca o botão 'Resetar' pelo seu ID e desabilita-o. 
    Isso impede que o usuário tente resetar o cronômetro 
                quando ele já está resetado, evitando 
                redundância e mantendo a consistência do 
                estado do interface. */

}


document.getElementById('iniciar').addEventListener('click', iniciarCronometro);
/* Busca o elemento com ID 'iniciar' (o botão Iniciar) e 
            adiciona um ouvinte de evento.
   Este ouvinte é acionado quando o botão é clicado, 
               chamando a função 'iniciarCronometro'.
   Essa função inicia a contagem do cronômetro. */


document.getElementById('pausar').addEventListener('click', pausarCronometro);
/* Busca o elemento com ID 'pausar' (o botão Pausar) e 
            adiciona um ouvinte de evento.
    Este ouvinte é acionado quando o botão é clicado, 
            chamando a função 'pausarCronometro'.
    Essa função pausa a contagem do cronômetro. */

document.getElementById('continuar').addEventListener('click', continuarCronometro);
/* Busca o elemento com ID 'continuar' (o botão Continuar) e 
            adiciona um ouvinte de evento.
    Este ouvinte é acionado quando o botão é clicado, chamando a 
            função 'continuarCronometro'.
    Essa função continua a contagem do cronômetro 
            após uma pausa. */

document.getElementById('resetar').addEventListener('click', resetarCronometro);
/* Busca o elemento com ID 'resetar' (o botão Resetar) e 
            adiciona um ouvinte de evento.
    Este ouvinte é acionado quando o botão é clicado, 
            chamando a função 'resetarCronometro'.
    Essa função reseta completamente a contagem do cronômetro, 
            zerando horas, minutos, segundos e milissegundos. */


atualizarDisplay();
/* Chama a função 'atualizarDisplay' logo após o 
            carregamento da página.
   Isso garante que o display do cronômetro seja 
            inicializado com todos os valores em zero. */

document.getElementById('pausar').disabled = true;
/* Desabilita o botão 'Pausar' inicialmente. Como o 
            cronômetro começa sem contagem, 
            o botão Pausar não deve estar disponível até 
            que o cronômetro seja iniciado. */

document.getElementById('continuar').disabled = true;
/* Desabilita o botão 'Continuar' inicialmente. Este botão 
            só deve ser habilitado após o cronômetro ser pausado,
            então inicialmente não tem função até que uma pausa ocorra. */

document.getElementById('resetar').disabled = true;
/* Desabilita o botão 'Resetar' inicialmente. 
            Semelhante aos outros botões, 
            não há necessidade de resetar um cronômetro que ainda 
            não começou a contar. */