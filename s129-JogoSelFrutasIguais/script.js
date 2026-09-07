// Obtém o elemento HTML para mostrar as vidas do jogador.
const vidasEl = document.getElementById("vidas");

// Obtém o elemento HTML para mostrar a pontuação do jogador.
const pontuacaoEl = document.getElementById("pontuacao");

// Obtém o elemento HTML para mostrar a fase atual do jogo.
const faseEl = document.getElementById("fase");

// Obtém o elemento HTML para mostrar o tempo restante na fase.
const tempoEl = document.getElementById("tempo");

// Obtém o elemento HTML para mostrar o número de 
        // frutas coletadas na fase.
const coletadasEl = document.getElementById("coletadas");

// Inicializa a quantidade de vidas do jogador com 3.
let vidas = 3;

// Inicializa a pontuação do jogador com 0.
let pontuacao = 0;

// Inicializa o jogo na fase 1.
let fase = 1;

// Estabelece o número de frutas que devem ser 
        // coletadas na fase atual.
let objetivoFase = 20;

// Inicializa o contador de frutas coletadas 
        // na fase atual com 0.
let coletadasNaFase = 0;

// Define o limite de tempo para a fase atual 
        // em 60 segundos.
let tempoLimite = 60;

// Inicializa a variável para controlar o tipo de 
        // fruta atualmente selecionado.
let tipoAtual = null;

// Cria uma lista de imagens das frutas disponíveis no jogo.
let frutas = ["fruta1.png", "fruta2.png", "fruta3.png", "fruta4.png", "fruta5.png"];

// Inicializa um array para armazenar as frutas 
        // que estão sendo exibidas na tela.
let frutasNaTela = [];

// Define uma variável para controlar se o jogo 
        // está em andamento.
let jogoEmAndamento = true; // Variável para controlar o fim do jogo


// Define a função para atualizar o display das 
        // informações do jogo (HUD - Heads-Up Display).
function atualizarHUD() {

    // Atualiza o texto do elemento HTML que mostra as 
            // vidas, usando o valor da variável 'vidas'.
    vidasEl.textContent = `Vidas: ${vidas}`;

    // Atualiza o texto do elemento HTML que mostra a 
            // pontuação, usando o valor da variável 'pontuacao'.
    pontuacaoEl.textContent = `Pontuação: ${pontuacao}`;

    // Atualiza o texto do elemento HTML que mostra a fase 
            // atual do jogo, usando o valor da variável 'fase'.
    faseEl.textContent = `Fase: ${fase}`;

    // Atualiza o texto do elemento HTML que mostra o tempo 
            // restante para concluir a fase, usando o 
            // valor da variável 'tempoLimite'.
    tempoEl.textContent = `Tempo: ${tempoLimite}s`;

    // Atualiza o texto do elemento HTML que mostra quantas 
            // frutas foram coletadas na fase em relação 
            // ao objetivo, usando os valores das 
            // variáveis 'coletadasNaFase' e 'objetivoFase'.
    coletadasEl.textContent = `Coletadas: ${coletadasNaFase}/${objetivoFase}`;

}


// Define a função para gerar frutas aleatoriamente 
        // na grade de jogo.
function gerarFrutas() {

    // Acessa o elemento HTML que representa a grade 
            // onde as frutas são exibidas.
    const grid = document.getElementById("grid");

    // Limpa todo o conteúdo HTML anterior dentro da 
            // grade, removendo todas as frutas existentes.
    grid.innerHTML = "";

    // Reinicia o array que mantém as frutas sendo 
            // exibidas na tela para um estado vazio.
    frutasNaTela = [];
    
    // Inicia um loop que irá executar 64 vezes (8 linhas 
            // vezes 8 colunas = 64 frutas).
    for (let i = 0; i < 8 * 8; i++) {

        // Gera um índice aleatório para selecionar 
                // uma fruta da lista de frutas disponíveis.
        const tipo = Math.floor(Math.random() * frutas.length);

        // Cria um novo elemento de imagem para representar a fruta.
        const fruta = document.createElement("img");

        // Define o caminho do arquivo de imagem da 
                // fruta usando o índice aleatório.
        fruta.src = frutas[tipo];

        // Adiciona a classe 'fruta' ao elemento de 
                // imagem para aplicar estilos CSS.
        fruta.classList.add("fruta");

        // Armazena o tipo de fruta como um atributo de 
                // dados para uso posterior na lógica do jogo.
        fruta.dataset.tipo = tipo;

        // Adiciona um ouvinte de evento que chama a 
                // função `selecionarFruta` quando a fruta é clicada.
        fruta.addEventListener("click", selecionarFruta);

        // Adiciona a nova fruta ao array `frutasNaTela`, 
                // incluindo informações sobre a fruta e 
                // se foi selecionada.
        frutasNaTela.push({ fruta, tipo, selecionada: false });

        // Anexa o elemento de imagem da fruta ao 
                // elemento grid na página.
        grid.appendChild(fruta);

    }
}


// Define a função que é chamada quando uma 
        // fruta é clicada.
function selecionarFruta(event) {

    // Verifica se o jogo ainda está em andamento; se não, 
            // ignora os cliques subsequentes.
    if (!jogoEmAndamento) return; // Se o jogo terminou, a 
                                  // função para aqui e não executa o resto do código.

    // Obtém o elemento da fruta que foi clicado, 
            // acessível através do evento de clique.
    const fruta = event.target;
    
    // Extrai o tipo da fruta do atributo de dados, que
            // foi armazenado como uma string, e o 
            // converte para um número inteiro.
    const tipo = parseInt(fruta.dataset.tipo, 10);

    // Verifica se é a primeira fruta a ser selecionada 
            // desde a última reinicialização ou início do jogo.
    if (tipoAtual === null) {

        // Se nenhuma fruta foi selecionada ainda (tipoAtual é 
                // null), define tipoAtual para o tipo da
                //  fruta clicada.
        tipoAtual = tipo;

    }

    // Verifica se a fruta clicada é do mesmo tipo que o tipoAtual, 
            // que é o tipo de fruta selecionado anteriormente.
    if (tipo === tipoAtual) {

        // Adiciona uma classe CSS à fruta clicada para alterar 
                // sua aparência visual, indicando que 
                // foi selecionada.
        fruta.classList.add("fruta-selecionada");

        // Encontra a fruta no array frutasNaTela para 
                // atualizar seu estado para 'selecionada'.
        const frutaInfo = frutasNaTela.find(f => f.fruta === fruta);

        // Se a fruta foi encontrada no array, marca-a 
                // como selecionada.
        if (frutaInfo) frutaInfo.selecionada = true;

        // Incrementa a pontuação e o número de frutas 
                // coletadas na fase atual.
        pontuacao += 1;
        coletadasNaFase += 1;

        // Atualiza as informações exibidas no HUD (display 
                // do jogo) com os novos valores.
        atualizarHUD();

        // Verifica se o jogador alcançou o objetivo de 
                // coletar um certo número de frutas da 
                // mesma espécie na fase.
        if (coletadasNaFase >= objetivoFase) {

            // Se sim, avança para a próxima fase do jogo.
            avancarFase(); // Avança para a próxima fase

            // Interrompe a função para evitar que outras 
                    // verificações sejam feitas após avançar de fase
            return; 

        }

        // Verifica se todas as frutas do mesmo tipo
                //  já foram selecionadas.
        const todasSelecionadas = frutasNaTela.every(f => f.tipo !== tipoAtual || f.selecionada);

        if (todasSelecionadas) {

            // Se todas as frutas de um tipo foram selecionadas,
                    //  substitui essas frutas por novas.
            substituirFrutasSelecionadas(tipoAtual);

            // Reseta tipoAtual para null, permitindo ao jogador 
                    // escolher um novo tipo de fruta na próxima seleção.
            tipoAtual = null;

        }

    } else {

        // Se a fruta clicada não é do tipo atualmente selecionado.
        // Reduz o número de vidas do jogador.
        vidas -= 1;

        // Atualiza o display com as informações novas,
                //  incluindo a vida restante.
        atualizarHUD();

        // Exibe um alerta informando que uma fruta 
                // errada foi selecionada.
        alert("Você selecionou uma fruta diferente!");

        // Verifica se o jogador ainda tem vidas restantes.
        if (vidas <= 0) {

            // Se não tiver mais vidas, termina o jogo.
            finalizarJogo();
            return;

        }

        // Recarrega as frutas na tela, começando um
                //  novo ciclo de seleção.
        recarregarFrutas();

    }

}


// Define uma função chamada 'substituirFrutasSelecionadas'
        // que recebe 'tipo' como parâmetro.
// Esta função é responsável por substituir as frutas
        // que foram selecionadas e são do mesmo tipo especificado.
function substituirFrutasSelecionadas(tipo) {

    // Itera sobre cada elemento do array 'frutasNaTela' 
            // usando 'forEach'.
    // 'item' representa cada fruta individual dentro da 
            // array durante a iteração.
    frutasNaTela.forEach(item => {

        // Verifica se a fruta atual (item) é do tipo que 
                // precisa ser substituído e se já foi selecionada.
        if (item.tipo === tipo && item.selecionada) {

            // Gera um novo tipo aleatório para a fruta.
            // 'Math.floor' arredonda para baixo o número gerado, 
                    // garantindo que é um índice válido.
            // 'Math.random()' gera um número aleatório entre 0 e 1, 
                    // que é multiplicado pelo número de frutas disponíveis.
            const novoTipo = Math.floor(Math.random() * frutas.length);

            // Atualiza o tipo da fruta no array para esse novo tipo.
            item.tipo = novoTipo;

            // Atualiza o atributo 'src' do elemento de imagem da 
                    // fruta para o novo arquivo de imagem 
                    // correspondente ao 'novoTipo'.
            item.fruta.src = frutas[novoTipo];

            // Atualiza o tipo de dados da fruta para o novo 
                    // tipo no HTML, usado para lógica de seleção.
            item.fruta.dataset.tipo = novoTipo;

            // Remove a classe CSS 'fruta-selecionada' que dá 
                    // estilo à fruta como selecionada.
            item.fruta.classList.remove("fruta-selecionada");

            // Define o estado de seleção da fruta para 'false', 
                    // indicando que ela não está mais selecionada.
            item.selecionada = false;

        }

    });

    // Após a iteração e possíveis substituições de todas as 
            // frutas selecionadas, atualiza o HUD (Display de cabeçalho).
    // 'atualizarHUD()' é uma função que atualiza a interface 
            // gráfica do usuário com os valores atuais de 
            // vidas, pontuação, etc.
    atualizarHUD();

}


// Define a função chamada 'avancarFase', que é responsável por 
        // administrar a lógica de transição entre as fases do jogo.
function avancarFase() {

    // Exibe uma mensagem para o usuário indicando que a 
            // fase atual foi completada com sucesso.
    exibirMensagem("Fase Completa!");

    // Incrementa o número da fase atual em 1, 
            // avançando para a próxima fase.
    fase += 1;

    // Incrementa o objetivo de frutas a serem coletadas 
            // para a próxima fase em 10.
    // Isso faz com que cada nova fase exija mais frutas a 
            // serem coletadas do que a fase anterior.
    objetivoFase += 10;

    // Reinicia o contador de frutas coletadas para zero 
            // ao iniciar uma nova fase.
    coletadasNaFase = 0;

    // Define o limite de tempo para completar a
            // nova fase em 60 segundos.
    tempoLimite = 60;

    // Reseta a variável 'tipoAtual' para null, indicando que o 
            // jogador precisa selecionar um novo tipo de fruta
            // na próxima interação de seleção de fruta.
    tipoAtual = null;

    // Chama a função 'gerarFrutas' para preencher a 
            // grade de jogo com novas frutas aleatórias.
    // Isso é necessário para iniciar a nova fase com 
            // uma configuração fresca de frutas.
    gerarFrutas();

    // Atualiza o display do jogo (HUD) para refletir as 
            // mudanças como nova fase, novo objetivo e tempo.
    atualizarHUD();

}


// Define a função 'exibirMensagem', que é responsável por
        // mostrar mensagens temporárias ao usuário.
function exibirMensagem(texto) {

    // Mostra uma caixa de diálogo alerta com a mensagem 
            // passada como parâmetro 'texto'.
    // O alerta é uma função do navegador que bloqueia 
            // outras interações até que o usuário o feche.
    alert(texto);

}


// Define a função 'recarregarFrutas', responsável por 
        // reiniciar a grade de frutas após um erro de 
        // seleção pelo jogador.
function recarregarFrutas() {

    // Itera sobre cada 'item' no array 'frutasNaTela'. 
            // Cada 'item' representa uma fruta na tela.
    frutasNaTela.forEach(item => {

        // Remove a classe 'fruta-selecionada' do elemento fruta. 
                // Esta classe é usada para destacar visualmente 
                // as frutas selecionadas.
        item.fruta.classList.remove("fruta-selecionada");

        // Define o estado de 'selecionada' do item como false, 
                // indicando que a fruta não está mais selecionada.
        item.selecionada = false;

    });

    // Reseta a variável 'tipoAtual' para null. Isso é necessário 
            // porque o jogador cometeu um erro ao selecionar uma fruta,
            // e a lógica do jogo exige que se comece uma nova 
            // tentativa de seleção sem um tipo predefinido.
    tipoAtual = null;

    // Chama a função 'gerarFrutas' para preencher novamente a 
            // grade com novas frutas.
    // Isso assegura que o jogador tenha uma nova chance de 
            // fazer seleções corretas com uma grade recém-preenchida.
    gerarFrutas();

}


// Define a função 'finalizarJogo', que é chamada 
        // para encerrar o jogo.
function finalizarJogo() {

    // Verifica se o jogo está atualmente em andamento 
            // usando a variável 'jogoEmAndamento'.
    if (jogoEmAndamento) {

        // Se o jogo ainda estiver em andamento, define
                // 'jogoEmAndamento' como false.
        // Isso impede novas interações com o jogo, efetivamente 
                // encerrando a sessão de jogo.
        jogoEmAndamento = false;

        // Chama a função 'exibirMensagem' para mostrar ao 
                // jogador que o jogo terminou.
        // A mensagem "Fim do Jogo!" é exibida em 
                // uma caixa de alerta.
        exibirMensagem("Fim do Jogo!");

    }
}


// Define a função 'iniciarJogo', que prepara e inicia 
        // uma nova partida do jogo.
function iniciarJogo() {

    // Inicializa a quantidade de vidas do jogador com 3.
    vidas = 3;

    // Inicializa a pontuação do jogador com 0.
    pontuacao = 0;

    // Inicializa o jogo na primeira fase.
    fase = 1;

    // Estabelece o número inicial de frutas a serem 
            // coletadas na primeira fase como 20.
    objetivoFase = 20;

    // Inicializa o contador de frutas coletadas na 
            // fase atual com 0.
    coletadasNaFase = 0;

    // Define o limite de tempo para a fase atual 
            // em 60 segundos.
    tempoLimite = 60;

    // Reseta a variável que controla o tipo de fruta 
            // atualmente selecionado para null.
    tipoAtual = null;

    // Seta o estado do jogo para 'em andamento', 
            // permitindo que interações ocorram.
    jogoEmAndamento = true;

    // Chama a função 'gerarFrutas' para preencher a grade 
            // com frutas aleatórias no início do jogo.
    gerarFrutas();

    // Chama a função 'atualizarHUD' para exibir as 
            // informações atualizadas no display do jogo.
    atualizarHUD();

    // Configura um temporizador que executa uma função a 
            // cada 1000 milissegundos (1 segundo).
    setInterval(() => {

        // Verifica se o jogo ainda está em andamento e 
                // se há tempo restante.
        if (jogoEmAndamento && tempoLimite > 0) {

            // Reduz o tempo limite em 1 segundo a cada 
                    // iteração do intervalo.
            tempoLimite -= 1;

            // Atualiza o HUD para refletir a mudança 
                    // no tempo restante.
            atualizarHUD();

        } else if (jogoEmAndamento && tempoLimite === 0) {

            // Caso o tempo tenha esgotado, reduz 
                    // uma vida do jogador.
            vidas -= 1;

            // Atualiza o HUD para mostrar a redução de vida.
            atualizarHUD();

            // Verifica se ainda restam vidas.
            if (vidas > 0) {

                // Exibe uma mensagem alertando que o tempo esgotou.
                exibirMensagem("Tempo Esgotado!");

                // Reinicia o tempo limite para mais 60 segundos.
                tempoLimite = 60;

                // Chama a função para recarregar as frutas na 
                        // grade, dando ao jogador uma nova chance 
                        // de continuar jogando.
                recarregarFrutas();

            } else {

                // Se não restam vidas, finaliza o jogo.
                finalizarJogo();
                
            }
        }

        // O intervalo de tempo para a execução da função 
                // interna é de 1 segundo.
    }, 1000); 

}

// Chama a função 'iniciarJogo' para começar o 
        // jogo assim que o script é carregado.
iniciarJogo();