const canvas = document.getElementById("telaJogo");
// A variável 'canvas' é declarada como uma constante e
        // recebe o elemento HTML 'canvas' cujo ID é 'telaJogo'. 
// Isso permite que esse elemento seja manipulado
        // através do JavaScript.

const ctx = canvas.getContext("2d");
// A variável 'ctx' é declarada como uma constante e
        // recebe o contexto de renderização 2D do canvas. 
// Este contexto fornece as funções e propriedades para
        // desenhar e manipular gráficos no canvas.

canvas.width = 800;
// Define a largura do canvas para 800 pixels.

canvas.height = 600;
// Define a altura do canvas para 600 pixels.

let nave = {

    x: canvas.width / 2,
    // Define a posição horizontal inicial da nave, que é
            // o centro do canvas no eixo X.

    y: canvas.height / 2,
    // Define a posição vertical inicial da nave, que é
            // o centro do canvas no eixo Y.

    width: 20,
    // Define a largura da nave como 20 pixels.

    height: 20,
    // Define a altura da nave como 20 pixels.

    angle: 0,
    // Inicializa o ângulo de rotação da nave como 0 radianos (nave
            // apontando para a direita na renderização inicial).

    velocidade: 0,
    // Inicializa a velocidade da nave como 0, significando que a
            // nave está parada inicialmente.

    rotacao: 0,
    // Inicializa a rotação da nave como 0, significando que a
            // nave não está rotacionando inicialmente.

    tiros: []
    // Inicializa um array vazio para armazenar os
            // tiros disparados pela nave.

};


let asteroides = [];
// Declara a variável 'asteroides' como um array vazio.
// Esta variável será usada para armazenar os objetos
            // que representam os asteroides no jogo.

let pontos = 0;
// Inicializa a variável 'pontos' com o valor 0.
// Esta variável é usada para manter a pontuação do
            // jogador ao longo do jogo.

let vidas = 3;
// Inicializa a variável 'vidas' com o valor 3. Esta variável é
            // usada para manter o número de vidas restantes do jogador.

const imagensAsteroides = [];
// Declara uma constante 'imagensAsteroides' e a inicializa
            // como um array vazio. 
// Este array será usado para armazenar as imagens dos
            // asteroides carregadas para uso no jogo.

for (let i = 1; i <= 6; i++) {
    // Inicia um loop 'for' que iterará seis vezes,
            // começando de 1 até 6. Cada iteração corresponde a
            // um dos seis asteroides diferentes.

    const img = new Image();
    // Dentro do loop, cria uma nova instância de 'Image', que é
            // um objeto HTML para imagens.

    img.src = `asteroid${i}.png`;
    // Define o atributo 'src' da imagem para o caminho do arquivo
            // correspondente, usando o número da iteração para buscar a
            // imagem correspondente (por exemplo, 'asteroid1.png').

    imagensAsteroides.push(img);
    // Adiciona a imagem recém-criada ao array 'imagensAsteroides'.

}


document.getElementById("pontuacao").innerText = `Pontuação: ${pontos}`;
// Esta linha obtém o elemento HTML com o ID 'pontuacao' e
            // define seu texto interno para mostrar a
            // pontuação atual do jogo. 
// A expressão `${pontos}` insere o valor da
            // variável 'pontos' dentro da string.

document.getElementById("vidas").innerText = `Vidas: ${vidas}`;
// Similar à linha acima, esta linha obtém o elemento
            // HTML com o ID 'vidas' e define seu texto interno
            // para mostrar o número de vidas restantes do jogador.

document.addEventListener("keydown", teclaPressionada);
// Adiciona um ouvinte de evento ao documento que detecta
            // quando qualquer tecla é pressionada. 
// Quando isso acontece, a função 'teclaPressionada' é chamada.

document.addEventListener("keyup", teclaSolta);
// Adiciona um ouvinte de evento ao documento que detecta
            // quando qualquer tecla é solta. 
// Quando isso acontece, a função 'teclaSolta' é chamada.


function teclaPressionada(e) {
    // Define a função 'teclaPressionada', que é chamada
            // sempre que um evento de tecla pressionada é detectado.

    if (e.key === "ArrowUp") {
        // Verifica se a tecla pressionada foi a seta para cima.

        nave.velocidade = 5;
        // Se foi, ajusta a velocidade da nave para 5, fazendo
                // com que ela se mova mais rapidamente para frente.

    } else if (e.key === "ArrowLeft") {
        // Verifica se a tecla pressionada foi a
                // seta para a esquerda.
                
        nave.rotacao = -0.1;
        // Se foi, ajusta a rotação da nave para -0.1, fazendo
                // com que ela vire para a esquerda.

    } else if (e.key === "ArrowRight") {
        // Verifica se a tecla pressionada foi a
                // seta para a direita.

        nave.rotacao = 0.1;
        // Se foi, ajusta a rotação da nave para 0.1,
                // fazendo com que ela vire para a direita.

    } else if (e.key === " ") {
        // Verifica se a tecla pressionada foi a
                // barra de espaço.

        atirar();
        // Se foi, chama a função 'atirar', que é
        //  responsável por disparar um projétil da nave.

    }
}


function teclaSolta(e) {
    // Define a função 'teclaSolta', que é chamada
            // sempre que uma tecla é solta (keyup event).
            
    if (e.key === "ArrowUp") {
        // Verifica se a tecla solta foi a seta para cima.

        nave.velocidade = 0;
        // Se foi, a velocidade da nave é definida como 0,
                // fazendo com que ela pare de se mover para frente.

    } else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        // Verifica se a tecla solta foi a seta para a
                // esquerda ou para a direita.

        nave.rotacao = 0;
        // Se foi uma dessas teclas, a rotação da nave é
                // definida como 0, fazendo com que ela
                // pare de girar.

    }
}

function atirar() {
    // Define a função 'atirar', responsável por
                // criar e disparar um projétil da nave.

    const tiro = {

        x: nave.x + Math.cos(nave.angle) * nave.width,
        // Define a posição inicial x do tiro. É calculada
                // usando o cosseno do ângulo atual da nave 
        // multiplicado pela largura da nave, posicionando o
                // tiro na frente da nave.

        y: nave.y + Math.sin(nave.angle) * nave.width,
        // Define a posição inicial y do tiro, usando o seno do
                // ângulo da nave para calcular sua posição vertical.

        dx: Math.cos(nave.angle) * 5,
        // Define a velocidade horizontal do tiro (dx),
                // usando o cosseno do ângulo da nave 
        // multiplicado por 5, para determinar quão rápido o
                // tiro se move horizontalmente.

        dy: Math.sin(nave.angle) * 5
        // Define a velocidade vertical do tiro (dy), usando o
                // seno do ângulo da nave 
                // multiplicado por 5, para determinar quão rápido o
                // tiro se move verticalmente.

    };

    nave.tiros.push(tiro);
    // Adiciona o tiro recém-criado ao array 'tiros'
                // dentro do objeto 'nave', 
    // permitindo que ele seja gerenciado e desenhado junto
                // com os outros tiros existentes.

}

function criarAsteroides() {

    // Define a função 'criarAsteroides', responsável por
                // inicializar asteroides no jogo.
    for (let i = 0; i < 5; i++) {

        // Inicia um loop que irá iterar 5 vezes. Este loop é
                // usado para criar múltiplos asteroides.
        adicionarAsteroide();
        // Chama a função 'adicionarAsteroide' a cada iteração do loop.
        // Essa função é responsável por criar e configurar um único asteroide,
        // adicionando-o à lista de asteroides no jogo.

    }
}

function adicionarAsteroide() {
    // Define a função 'adicionarAsteroide', que é responsável
            // por criar um único asteroide e adicioná-lo à
            // lista de asteroides no jogo.

    let x, y;
    // Declara variáveis 'x' e 'y' para armazenar as
            // coordenadas iniciais do asteroide.

    // Gerar posições aleatórias nos cantos
    if (Math.random() < 0.5) {
        // A função Math.random() gera um número flutuante
                // aleatório entre 0.0 (inclusivo) e 1.0 (exclusivo).
        // Aqui, verifica-se se o número gerado é menor que 0.5 para
                // decidir o método de posicionamento do asteroide.
        
        // Se um número aleatório entre 0 e 1 for menor que 0.5, defina a
                // posição do asteroide ao longo das bordas horizontais do canvas.
        x = Math.random() < 0.5 ? 0 : canvas.width;
        // Novamente, Math.random() é chamado para decidir entre
                // duas opções para a coordenada 'x':
        // Se o resultado é menor que 0.5, 'x' é definido como 0, colocando o
                // asteroide no lado esquerdo do canvas.
        // Caso contrário, 'x' é definido como 'canvas.width', que é a
                // largura total do canvas, colocando o asteroide no lado direito.
        // Isso garante que o asteroide apareça nas bordas verticais
                // esquerda ou direita do canvas.

        y = Math.random() * canvas.height;
        // Aqui, Math.random() multiplica pela altura total do
                // canvas ('canvas.height') para obter uma posição 'y' aleatória.
        // Isso coloca o asteroide em qualquer altura dentro dos
                // limites verticais do canvas.
        // O resultado é um asteroide que aparece em uma das
                // bordas verticais esquerda ou direita, mas em
                // uma posição vertical aleatória.

    } else {
        // Caso contrário, se o número aleatório inicial for
                // igual ou maior que 0.5, o asteroide será posicionado ao
                // longo das bordas horizontais do canvas.

        y = Math.random() < 0.5 ? 0 : canvas.height;
        // Da mesma forma, decide se 'y' será 0, que coloca o
                // asteroide na borda superior do canvas,
        // ou 'canvas.height', que coloca o asteroide na
                // borda inferior do canvas.
        // Isso garante que o asteroide apareça nas bordas
                // horizontais superior ou inferior.

        x = Math.random() * canvas.width;
        // 'x' é definido multiplicando-se um número aleatório
                // pela largura total do canvas ('canvas.width').
        // Isso coloca o asteroide em qualquer posição ao
                // longo da largura do canvas.
        // O resultado é um asteroide que aparece em uma das
                // bordas horizontais superior ou inferior, mas
                // em uma posição horizontal aleatória.

    }

    
    let asteroide = {

        x: x,
        // A propriedade 'x' do objeto 'asteroide' é definida
                // como o valor da variável 'x', que já foi
                // calculado anteriormente.
        // Essa coordenada 'x' representa a posição horizontal
                // inicial do asteroide no canvas.
    
        y: y,
        // A propriedade 'y' do objeto 'asteroide' é definida
                // como o valor da variável 'y', determinada
                // pela lógica de posicionamento aleatório.
        // Essa coordenada 'y' representa a posição vertical
                // inicial do asteroide no canvas.
    
        dx: (Math.random() - 0.5) * 2,
        // A propriedade 'dx' define a velocidade horizontal do asteroide. 
        // 'Math.random() - 0.5' gera um número flutuante
                // entre -0.5 e 0.5. Ao multiplicar por 2, o
                // intervalo se expande para -1 a 1.
        // Isso permite que o asteroide se mova tanto para a
                // esquerda quanto para a direita no canvas.
    
        dy: (Math.random() - 0.5) * 2,
        // Similar à 'dx', a propriedade 'dy' define a
                // velocidade vertical do asteroide. 
        // O mesmo cálculo é usado aqui, permitindo que o
                // asteroide se mova para cima ou para baixo no
                // canvas com uma velocidade que varia entre -1 e 1.
    
        radius: Math.random() * 30 + 15,
        // A propriedade 'radius' determina o tamanho do asteroide. 
        // 'Math.random() * 30' gera um número aleatório entre 0 e 30.
                // Ao adicionar 15, o raio final varia entre 15 e 45.
        // Isso significa que o tamanho do asteroide será aleatório
                // dentro desses limites, afetando como ele é
                // desenhado e detectado por colisões.
    
        imagem: imagensAsteroides[Math.floor(Math.random() * imagensAsteroides.length)]
        // A propriedade 'imagem' é definida selecionando um
                // objeto de imagem aleatório do array 'imagensAsteroides'.
        // 'Math.floor(Math.random() * imagensAsteroides.length)'
                // calcula um índice inteiro aleatório dentro do
                // intervalo do número de imagens disponíveis,
                // garantindo que cada asteroide possa ter uma
                // aparência única escolhida aleatoriamente de um
                // conjunto predefinido de imagens.

    };
    
    asteroides.push(asteroide);
    // Adiciona o objeto 'asteroide' recém-criado ao
            // array 'asteroides'.

}

function desenharNave() {
    // Define a função 'desenharNave' responsável por
            // desenhar a nave no canvas.

    ctx.save();
    // Salva o estado atual do contexto 'ctx' do canvas.
            // Isso inclui a posição atual, transformações,
            // e outros estados.
    // Isso é útil para garantir que mudanças feitas ao
            // desenhar a nave não afetem outras partes do desenho.

    ctx.translate(nave.x, nave.y);
    // Translada o contexto do canvas para a posição (x, y) da nave.
    // Isso define o ponto central do novo sistema de
            // coordenadas para a posição da nave, facilitando o desenho.

    ctx.rotate(nave.angle);
    // Rotaciona o contexto do canvas pelo ângulo da nave.
    // Isso permite que a nave seja desenhada na orientação
            // correta de acordo com sua direção atual.

    ctx.beginPath();
    // Inicia um novo caminho no canvas. Isso é necessário antes de
            // começar a desenhar formas como linhas.

    ctx.moveTo(-nave.width / 2, nave.height / 2);
    // Move o ponto inicial para a parte traseira esquerda da
            // nave, com base no seu tamanho.
    // As coordenadas são relativas ao ponto central da nave, agora
            // alinhadas com a origem do sistema de coordenadas (nave.x, nave.y).

    ctx.lineTo(nave.width / 2, 0);
    // Desenha uma linha do ponto inicial até a "ponta" da nave, que é
            // o ponto mais distante na frente da nave.

    ctx.lineTo(-nave.width / 2, -nave.height / 2);
    // Desenha outra linha da "ponta" da nave até a
            // parte traseira direita da nave.

    ctx.closePath();
    // Fecha o caminho conectando o último ponto ao ponto
            // inicial, completando o triângulo que forma a nave.

    ctx.fillStyle = "white";
    // Define a cor de preenchimento do caminho como branco.

    ctx.fill();
    // Preenche o caminho com a cor definida, no caso, branco,
            // efetivamente desenhando a nave.

    ctx.restore();
    // Restaura o estado anterior do contexto 'ctx' que
            // foi salvo com ctx.save().
    // Isso reverte todas as transformações e modificações
            // aplicadas ao contexto durante o desenho da nave,
            // garantindo que outras partes do desenho não sejam afetadas.

}

function desenharTiros() {
    // Define a função 'desenharTiros', que é responsável por
            // desenhar todos os tiros disparados pela nave no canvas.

    ctx.fillStyle = "red";
    // Define a cor de preenchimento do contexto do canvas como vermelho. 
    // Isso especifica que todos os tiros desenhados a seguir
            // serão preenchidos com a cor vermelha.

    for (let tiro of nave.tiros) {
        // Inicia um loop 'for...of' para iterar sobre cada
                // objeto 'tiro' no array 'tiros' da nave.
        // Este loop permite acessar cada tiro individualmente
                // para desenhá-lo no canvas.

        ctx.beginPath();
        // Inicia um novo caminho no canvas. É necessário
                // para começar a desenhar formas.

        ctx.arc(tiro.x, tiro.y, 2, 0, Math.PI * 2);
        // Desenha um arco (ou círculo completo, neste caso)
                // para representar o tiro.
        // 'tiro.x' e 'tiro.y' são as coordenadas do
                // centro do tiro no canvas.
        // '2' é o raio do círculo, tornando o tiro
                // visivelmente pequeno.
        // '0' e 'Math.PI * 2' são os ângulos de início e
                // fim do arco, descrevendo um círculo completo.

        ctx.fill();
        // Preenche o círculo (tiro) com a cor vermelha
                // definida anteriormente.
        // Isso efetivamente desenha o tiro na posição
                // especificada com a cor especificada.

    }
}

function desenharAsteroides() {
    // Define a função 'desenharAsteroides', que é
            // responsável por desenhar todos os asteroides
            // presentes no array 'asteroides' no canvas.

    for (let asteroide of asteroides) {
        // Inicia um loop 'for...of' para iterar sobre cada
                // objeto 'asteroide' no array 'asteroides'.
        // Este loop permite acessar cada asteroide individualmente
                // para desenhá-lo no canvas.

        ctx.drawImage(
            asteroide.imagem, 
            asteroide.x - asteroide.radius, 
            asteroide.y - asteroide.radius, 
            asteroide.radius * 2, 
            asteroide.radius * 2
        );
        // Utiliza o método 'drawImage' do contexto do
                // canvas para desenhar a imagem do asteroide.
        // 'asteroide.imagem' é a imagem previamente carregada
                // que será usada para o desenho do asteroide.
        // 'asteroide.x - asteroide.radius' e 'asteroide.y - asteroide.radius'
                // calculam a posição superior esquerda da imagem,
        // garantindo que o centro da imagem esteja alinhado com a
                // posição (x, y) do asteroide no canvas.
        // 'asteroide.radius * 2' tanto para largura quanto
                // para altura define o tamanho da imagem,
                // fazendo com que o diâmetro da imagem seja
                // igual ao diâmetro do asteroide (2 vezes o raio).
        // Essa abordagem garante que a imagem do asteroide seja
                // centralizada corretamente em sua posição (x, y).

    }
}

function moverNave() {
    // Define a função 'moverNave' que atualiza a posição da
            // nave baseada em sua rotação e velocidade.
    
    nave.angle += nave.rotacao;
    // Atualiza o ângulo de rotação da nave. 'nave.rotacao'
            // pode ser positivo ou negativo,
    // o que faz a nave girar para a direita ou esquerda
            // respectivamente. O ângulo é acumulativo,
    // significando que a nave continuará a girar enquanto o
            // valor de rotação não for zero.

    nave.x += Math.cos(nave.angle) * nave.velocidade;
    // Atualiza a posição horizontal 'x' da nave. 'Math.cos(nave.angle)'
            // calcula o cosseno do ângulo atual,
    // que define a direção horizontal do movimento. Isso é
            // multiplicado pela 'nave.velocidade' para mover a nave
    // na direção que ela está apontando, com base em seu
            // ângulo de rotação.

    nave.y += Math.sin(nave.angle) * nave.velocidade;
    // Similar à atualização de 'x', atualiza a posição vertical 'y' da
            // nave. 'Math.sin(nave.angle)' calcula o seno
    // do ângulo atual, que define a direção vertical do movimento.
            // Isso também é multiplicado pela 'nave.velocidade'.

    if (nave.x < 0) nave.x = canvas.width;
    // Verifica se a nave ultrapassou o limite esquerdo do canvas.
            // Se sim, ela é reposicionada para o lado direito,
            // criando um efeito de "loop" ou tela contínua.

    if (nave.x > canvas.width) nave.x = 0;
    // Verifica se a nave ultrapassou o limite direito do canvas.
            // Se sim, ela é reposicionada para o lado esquerdo,
            // mantendo o efeito de "loop".

    if (nave.y < 0) nave.y = canvas.height;
    // Verifica se a nave ultrapassou o limite superior do canvas.
            // Se sim, ela é reposicionada no limite inferior,
            // permitindo que a nave apareça na parte inferior
            // quando ela sai pela parte superior.

    if (nave.y > canvas.height) nave.y = 0;
    // Verifica se a nave ultrapassou o limite inferior do canvas.
    // Se sim, ela é reposicionada no limite superior,
            // mantendo o comportamento de "loop" vertical.

}

function moverTiros() {
    // Define a função 'moverTiros', responsável por atualizar a
            // posição de cada tiro disparado pela nave e remover
            // tiros que saem do canvas.

    for (let i = nave.tiros.length - 1; i >= 0; i--) {
        // Inicia um loop for que percorre o array de tiros da
                // nave de trás para frente.
        // Isso é feito porque a remoção de elementos de um array
                // durante a iteração pode afetar os índices dos
                // elementos se começar do início.

        let tiro = nave.tiros[i];
        // A variável 'tiro' armazena a referência ao tiro atual no
                // array, facilitando o acesso às suas propriedades.

        tiro.x += tiro.dx;
        // Atualiza a posição horizontal 'x' do tiro,
                // adicionando 'tiro.dx' à sua posição atual.
        // 'tiro.dx' é a velocidade horizontal do tiro, que pode
                // ser positiva ou negativa, dependendo da direção.

        tiro.y += tiro.dy;
        // Atualiza a posição vertical 'y' do tiro, adicionando
                // 'tiro.dy' à sua posição atual.
        // 'tiro.dy' é a velocidade vertical do tiro, que também
                // pode ser positiva ou negativa.

        if (tiro.x < 0 || tiro.x > canvas.width || tiro.y < 0 || tiro.y > canvas.height) {
            // Verifica se o tiro saiu dos limites do canvas.
                    // Isso ocorre se 'tiro.x' ou 'tiro.y' são
                    // menores que zero,
            // ou 'tiro.x' é maior que a largura do canvas, ou 'tiro.y' é
                    // maior que a altura do canvas.

            nave.tiros.splice(i, 1);
            // Se o tiro saiu do canvas, ele é removido do array
                    // de tiros usando o método 'splice'.
            // 'i' é o índice atual do tiro, e '1' é o número de
                    // tiros a serem removidos.
            // Remover o tiro previne que o jogo continue processando
                    // tiros que não são mais visíveis,
                    // otimizando recursos e desempenho.

        }
    }
}

function moverAsteroides() {
    // Define a função 'moverAsteroides', que é responsável
                // por atualizar a posição dos asteroides no jogo.

    for (let asteroide of asteroides) {
        // Inicia um loop 'for...of', iterando sobre
                // cada 'asteroide' no array 'asteroides'.
        // Este loop permite acessar cada asteroide
                // individualmente para atualizar sua posição.

        asteroide.x += asteroide.dx;
        // Atualiza a posição horizontal 'x' do asteroide,
                // adicionando 'asteroide.dx' à sua posição atual.
        // 'asteroide.dx' representa a velocidade horizontal do
                // asteroide, que define quão rápido e em que
                // direção ele se move horizontalmente.

        asteroide.y += asteroide.dy;
        // Atualiza a posição vertical 'y' do asteroide,
                // adicionando 'asteroide.dy' à sua posição atual.
        // 'asteroide.dy' representa a velocidade vertical do
                // asteroide, que define quão rápido e em que
                // direção ele se move verticalmente.

        if (asteroide.x < 0) asteroide.x = canvas.width;
        // Verifica se o asteroide ultrapassou o limite
                // esquerdo do canvas (x < 0).
        // Se sim, reposiciona o asteroide para o limite
                // direito do canvas (x = canvas.width),
        // criando um efeito de "loop" ou continuidade, como
                // se o espaço do jogo fosse circular.

        if (asteroide.x > canvas.width) asteroide.x = 0;
        // Verifica se o asteroide ultrapassou o limite
                // direito do canvas (x > canvas.width).
        // Se sim, reposiciona o asteroide para o limite
                // esquerdo do canvas (x = 0),
                // mantendo o efeito de "loop".

        if (asteroide.y < 0) asteroide.y = canvas.height;
        // Verifica se o asteroide ultrapassou o limite
                // superior do canvas (y < 0).
        // Se sim, reposiciona o asteroide para o limite
                // inferior do canvas (y = canvas.height),
                // permitindo que o asteroide apareça na parte
                // inferior quando ele sai pela parte superior.

        if (asteroide.y > canvas.height) asteroide.y = 0;
        // Verifica se o asteroide ultrapassou o limite inferior
                // do canvas (y > canvas.height).
        // Se sim, reposiciona o asteroide para o limite
                // superior do canvas (y = 0),
                // mantendo o comportamento de "loop" vertical.

    }
}


function detectarColisoes() {
    // Define a função 'detectarColisoes', responsável por
                // verificar e tratar colisões entre tiros
                // disparados pela nave e asteroides.

    for (let i = nave.tiros.length - 1; i >= 0; i--) {
        // Inicia um loop 'for' que percorre o array de tiros da
                // nave de trás para frente.
        // Isso é feito para evitar problemas com os índices ao
                // modificar o array (removendo elementos) durante a iteração.

        let tiro = nave.tiros[i];
        // A variável 'tiro' armazena a referência ao tiro atual no
                // array, facilitando o acesso às suas propriedades.

        for (let j = asteroides.length - 1; j >= 0; j--) {
            // Inicia outro loop 'for' aninhado que percorre o
                    // array de asteroides, também de trás para frente,
                    // por razões semelhantes às do loop
                    // externo (modificação do array durante a iteração).

            let asteroide = asteroides[j];
            // A variável 'asteroide' armazena a referência ao
                    // asteroide atual no array.

            let dist = Math.hypot(tiro.x - asteroide.x, tiro.y - asteroide.y);
            // Calcula a distância entre o tiro e o asteroide
                    // usando a função Math.hypot,
                    // que retorna a raiz quadrada da soma dos
                    // quadrados das diferenças entre as coordenadas x e y
                    // dos dois objetos.

            if (dist < asteroide.radius) {
                // Verifica se a distância calculada é menor
                        // que o raio do asteroide,
                        // o que indica uma colisão entre o
                        // tiro e o asteroide.

                pontos += 10;
                // Incrementa a pontuação do jogador em 10 pontos
                        // devido à colisão bem-sucedida.

                document.getElementById("pontuacao").innerText = `Pontuação: ${pontos}`;
                // Atualiza o elemento HTML que mostra a pontuação
                        // para refletir os novos pontos.

                nave.tiros.splice(i, 1);
                // Remove o tiro do array de tiros da nave,
                        // utilizando o método 'splice'
                        // que remove um elemento em um índice
                        // específico, neste caso 'i'.

                asteroides.splice(j, 1);
                // Remove o asteroide do array de asteroides, também
                        // usando o método 'splice'
                // que remove um elemento em um índice específico,
                        // neste caso 'j'.

                adicionarAsteroide();
                // Chama a função 'adicionarAsteroide' para
                        // substituir o asteroide destruído por um novo,
                        // mantendo o número total de asteroides em jogo.

                break;
                // Interrompe o loop interno caso uma colisão
                        // seja detectada e tratada,
                        // evitando verificações desnecessárias
                        // após a remoção do tiro e do asteroide.

            }
        }
    }


    for (let asteroide of asteroides) {
        // Inicia um loop 'for...of' para iterar sobre cada
                // objeto 'asteroide' no array 'asteroides'.
        // Este loop permite acessar cada asteroide individualmente
                // para verificar colisões com a nave.
    
        let dist = Math.hypot(nave.x - asteroide.x, nave.y - asteroide.y);
        // Calcula a distância entre a nave e o asteroide
                // usando a função Math.hypot.
        // Essa função retorna a raiz quadrada da soma dos quadrados
                // das diferenças entre as coordenadas x e y dos dois objetos.
        // 'nave.x - asteroide.x' e 'nave.y - asteroide.y' são as
                // diferenças nas posições horizontal e
                // vertical, respectivamente.
    
        if (dist < asteroide.radius) {
            // Verifica se a distância calculada é menor
                    // que o raio do asteroide,
                    // o que indica que o asteroide tocou ou está
                    // muito próximo da nave, configurando uma colisão.
    
            vidas--;
            // Decrementa a contagem de vidas da nave por uma
                    // unidade, indicando que a nave foi atingida.
    
            document.getElementById("vidas").innerText = `Vidas: ${vidas}`;
            // Atualiza o elemento HTML que mostra o número de
                    // vidas restantes, refletindo a perda de uma vida.
    
            if (vidas <= 0) {
                // Verifica se o número de vidas da nave é menor ou
                        // igual a zero, o que indica que o jogador
                        // perdeu todas as vidas.

                alert("Game Over!");
                // Exibe uma mensagem de alerta ao usuário
                        // informando que o jogo terminou.
    
                document.location.reload();
                // Recarrega a página, efetivamente reiniciando o jogo.

            }
    
            asteroides.splice(asteroides.indexOf(asteroide), 1);
            // Remove o asteroide que colidiu com a nave do array 'asteroides'.
            // 'asteroides.indexOf(asteroide)' encontra o índice do
                        // asteroide específico no array para garantir
                        // que o asteroide correto seja removido.
    
            adicionarAsteroide();
            // Chama a função 'adicionarAsteroide' para criar e
                        // adicionar um novo asteroide ao jogo,
                        // mantendo o número total de asteroides e o
                        // desafio constante.
    
            break;
            // Sai do loop 'for', pois não é necessário continuar
                        // verificando colisões depois de uma
                        // colisão detectada e tratada,
                        // e para evitar modificações adicionais no
                        // array 'asteroides' que possam interferir
                        // com a iteração do loop.

        }
    }
    
}

function desenhar() {
    // Define a função 'desenhar', que é a função principal de
                // renderização do jogo. Ela coordena a
                // renderização e a lógica do jogo.

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Limpa completamente o canvas. 'clearRect' remove
                // qualquer conteúdo previamente desenhado no canvas,
    // começando do ponto (0,0) até a largura e altura total do
                // canvas. Isso prepara o canvas para uma nova
                // atualização de quadro.

    desenharNave();
    // Chama a função 'desenharNave' para desenhar a
                // nave do jogador no canvas.

    desenharTiros();
    // Chama a função 'desenharTiros' para desenhar todos os
                // tiros atualmente ativos disparados pela nave.

    desenharAsteroides();
    // Chama a função 'desenharAsteroides' para desenhar todos os
                // asteroides presentes no array de asteroides.

    moverNave();
    // Chama a função 'moverNave' para atualizar a posição da
                // nave com base em sua velocidade e rotação.

    moverTiros();
    // Chama a função 'moverTiros' para atualizar a posição de
                // cada tiro disparado, e remover os que saíram do canvas.

    moverAsteroides();
    // Chama a função 'moverAsteroides' para atualizar a posição dos
                // asteroides, garantindo que eles se movam pelo canvas.

    detectarColisoes();
    // Chama a função 'detectarColisoes' para verificar e tratar
                // colisões entre tiros e asteroides, e entre a
                // nave e asteroides.

    requestAnimationFrame(desenhar);
    // Solicita ao navegador que programe uma nova chamada à
                // função 'desenhar' assim que possível.
    // Isso cria um loop de animação, permitindo que o jogo
                // seja atualizado de forma suave e contínua.

}

criarAsteroides();
// Chama a função 'criarAsteroides' no início do jogo para
            // criar um conjunto inicial de asteroides no canvas.

setInterval(adicionarAsteroide, 5000);
// Usa 'setInterval' para adicionar um novo asteroide ao
            // jogo a cada 5000 milissegundos (5 segundos).
// Isso garante que novos desafios sejam adicionados periodicamente,
            // mantendo o jogo interessante e desafiador.

desenhar();
// Chama a função 'desenhar' para iniciar o loop de animação e
            // iniciar o jogo efetivamente.