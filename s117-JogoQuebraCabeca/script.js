// Adiciona um ouvinte de eventos para o
        // evento 'DOMContentLoaded'.
// Este evento é disparado quando o documento HTML foi
        // completamente carregado e analisado, sem esperar
        // que estilos, imagens e subframes terminem de carregar.
// A função fornecida será executada assim que o DOM estiver pronto.
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona o elemento com o id 'containerQuebraCabeca' e
            // o armazena na variável containerQuebraCabeca.
    // Este elemento é o contêiner onde as peças do
            // quebra-cabeça serão exibidas.
    const containerQuebraCabeca = document.getElementById('containerQuebraCabeca');

    // Seleciona o elemento com o id 'entradaImagem' e
            // o armazena na variável entradaImagem.
    // Este é o campo de entrada de arquivo usado
            // para carregar a imagem do quebra-cabeça.
    const entradaImagem = document.getElementById('entradaImagem');

    // Seleciona o elemento com o id 'selecaoTamanho' e
            // o armazena na variável selecaoTamanho.
    // Este é o menu suspenso onde o usuário seleciona o
            // número de peças do quebra-cabeça.
    const selecaoTamanho = document.getElementById('selecaoTamanho');

    // Cria um novo elemento <div> que será usado para
            // mostrar a pontuação do jogador.
    const pontuacaoDisplay = document.createElement('div');

    // Insere o novo elemento pontuacaoDisplay no corpo do
            // documento, antes do containerQuebraCabeca.
    // Isso garante que a pontuação seja exibida acima do quebra-cabeça.
    document.body.insertBefore(pontuacaoDisplay, containerQuebraCabeca);

    // Define o tamanho da fonte do pontuacaoDisplay como 20 pixels.
    pontuacaoDisplay.style.fontSize = '20px';

    // Define uma margem superior de 10 pixels para o pontuacaoDisplay.
    pontuacaoDisplay.style.marginTop = '10px';

    // Declara uma variável urlImagem para armazenar
            // a URL da imagem carregada.
    // Inicialmente, esta variável é uma string vazia.
    let urlImagem = '';

    // Declara uma variável pecas que será usada
            // para armazenar as peças do quebra-cabeça.
    // Inicialmente, esta variável é nula.
    let pecas = null;

    // Adiciona um ouvinte de eventos para o evento 'change' no
            // campo de entrada de arquivo (entradaImagem).
    // A função fornecida será executada sempre que o
            // usuário selecionar um novo arquivo.
    entradaImagem.addEventListener('change', function(e) {
        
        // Verifica se nenhum arquivo foi selecionado.
        // Se a lista de arquivos (e.target.files) estiver
                // vazia, o comprimento será 0.
        // Neste caso, a função retorna imediatamente,
                // impedindo o processamento adicional.
        // Impede processamento se nenhum arquivo for selecionado.
        if (e.target.files.length === 0) return; 

        // Obtém o primeiro arquivo selecionado pelo usuário.
        // A lista de arquivos selecionados é acessível
                // via e.target.files, onde e é o evento disparado.
        // O primeiro arquivo na lista (e.target.files[0]) é
                // armazenado na variável arquivo.
        const arquivo = e.target.files[0];

        // Cria uma nova instância de FileReader.
        // FileReader é um objeto que permite que aplicativos
                // leiam o conteúdo de arquivos (ou buffers de dados brutos)
        // armazenados no cliente de forma assíncrona.
        const leitor = new FileReader();

        // Define uma função para ser executada quando o
                // arquivo for lido com sucesso.
        // Esta função é atribuída ao evento 'onload' do FileReader.
        // Quando o arquivo for carregado, a função será executada.
        leitor.onload = function(e) {

            // Armazena a URL da imagem carregada na variável urlImagem.
            // e.target.result contém o resultado da
                    // leitura do arquivo, que é uma URL de dados.
            urlImagem = e.target.result;

            // Chama a função inicializarQuebraCabeca para
                    // configurar o quebra-cabeça com a nova imagem.
            inicializarQuebraCabeca();

        };

        // Lê o conteúdo do arquivo como uma URL de dados.
        // Isso converte o arquivo de imagem em uma URL que
                // pode ser usada como fonte de uma imagem no HTML.
        // O método readAsDataURL é assíncrono e, quando a
                // leitura é concluída, o evento 'onload' é disparado.
        leitor.readAsDataURL(arquivo);
        
    });


    // Define a função inicializarQuebraCabeca que
            // configura o quebra-cabeça com a imagem carregada.
    function inicializarQuebraCabeca() {
        
        // Limpa o conteúdo do containerQuebraCabeca,
                // removendo qualquer quebra-cabeça anterior.
        // Limpa o container para a nova imagem
        containerQuebraCabeca.innerHTML = ''; 

        // Obtém o valor selecionado no menu suspenso (selecaoTamanho),
                // converte-o para um número inteiro,
        // e o armazena na variável tamanho. Isso define o
                // número de peças do quebra-cabeça.
        const tamanho = parseInt(selecaoTamanho.value);

        // Calcula a dimensão do quebra-cabeça (por exemplo, 3 para
                // 9 peças, 4 para 16 peças) com base no tamanho.
        const dimensao = Math.sqrt(tamanho);

        // Define o tamanho da imagem como 450 pixels por 450 pixels.
        // Assume que a imagem tem um tamanho de 450px por 450px
        const tamanhoImagem = 450; 

        // Calcula o tamanho de cada peça do quebra-cabeça
                // dividindo o tamanho da imagem pela dimensão.
        const tamanhoPeca = tamanhoImagem / dimensao;

        // Define o número e o tamanho das colunas da
                // grade do containerQuebraCabeca.
        // A propriedade gridTemplateColumns define o
                // layout das colunas da grade.
        // `repeat(${dimensao}, ${tamanhoPeca}px)` cria um
                // número de colunas igual à dimensão (número de peças por linha),
                // e cada coluna terá a largura de uma peça
                // do quebra-cabeça (tamanhoPeca).
        containerQuebraCabeca.style.gridTemplateColumns = `repeat(${dimensao}, ${tamanhoPeca}px)`;

        // Define o número e o tamanho das linhas da grade do
                // containerQuebraCabeca.
        // A propriedade gridTemplateRows define o
                // layout das linhas da grade.
        // `repeat(${dimensao}, ${tamanhoPeca}px)` cria
                // um número de linhas igual à dimensão (número de peças por coluna),
        // e cada linha terá a altura de uma peça do
                // quebra-cabeça (tamanhoPeca).
        containerQuebraCabeca.style.gridTemplateRows = `repeat(${dimensao}, ${tamanhoPeca}px)`;

        // Cria um array de posições para as peças do
                // quebra-cabeça (por exemplo, [0, 1, 2, ...]).
        // Array.from({ length: tamanho }, (_, i) => i) cria um
                // array com 'tamanho' elementos,
        // onde cada elemento é seu próprio índice. Por exemplo, se o
                // tamanho for 9, o array será [0, 1, 2, 3, 4, 5, 6, 7, 8].
        let posicoes = Array.from({ length: tamanho }, (_, i) => i);

        // Embaralha as posições para misturar as peças do quebra-cabeça.
        // A função embaralhar (definida em outro lugar
                // do código) randomiza a ordem dos elementos
                // no array posicoes.
        posicoes = embaralhar(posicoes);

        // Para cada posição embaralhada, cria uma peça
                // do quebra-cabeça.
        posicoes.forEach((posicao, index) => {

            // Cria um novo elemento <div> que representará
                    // uma peça do quebra-cabeça.
            const peca = document.createElement('div');

            // Define a classe da peça do quebra-cabeça
                    // como 'peca-quebra-cabeca' para aplicar estilos CSS.
            peca.className = 'peca-quebra-cabeca';

            // Define a imagem de fundo da peça do quebra-cabeça
                    // usando a URL da imagem carregada.
            // Isso faz com que a peça exiba uma parte da
                    // imagem do quebra-cabeça.
            peca.style.backgroundImage = `url(${urlImagem})`;

            // Calcula a posição de fundo da peça do quebra-cabeça.
            // A posição horizontal (x) é calculada com base na
                    // coluna em que a peça deveria estar,
            // multiplicada pelo tamanho da peça e negativa para
                    // mover a imagem na direção correta.
            // Posição horizontal da peça na imagem de fundo
            const x = -(posicao % dimensao) * tamanhoPeca; 
            
            // A posição vertical (y) é calculada com base na
                    // linha em que a peça deveria estar,
            // multiplicada pelo tamanho da peça e negativa para
                    // mover a imagem na direção correta.
            // Posição vertical da peça na imagem de fundo
            const y = -Math.floor(posicao / dimensao) * tamanhoPeca; 
            peca.style.backgroundPosition = `${x}px ${y}px`;

            // Define a largura e a altura da peça do quebra-cabeça.
            // Isso garante que cada peça tenha o tamanho correto.
            peca.style.width = `${tamanhoPeca}px`;
            peca.style.height = `${tamanhoPeca}px`;

            // Define o tamanho de fundo da peça do quebra-cabeça
                    // para corresponder ao tamanho total da imagem.
            // Isso faz com que a imagem de fundo na peça se
                    // encaixe corretamente com outras peças.
            peca.style.backgroundSize = `${tamanhoImagem}px ${tamanhoImagem}px`;

            // Define atributos personalizados 'data-posicao' e
                    // 'data-indice' na peça do quebra-cabeça.
            // 'data-posicao' armazena a posição original da peça na imagem.
            // 'data-indice' armazena o índice atual da peça.
            peca.setAttribute('data-posicao', posicao);
            peca.setAttribute('data-indice', index);

            // Define a propriedade draggable como true para
                    // permitir que a peça seja arrastada.
            peca.draggable = true;

            // Adiciona a peça do quebra-cabeça ao containerQuebraCabeca.
            // Isso insere a peça na grade do quebra-cabeça exibida na tela.
            containerQuebraCabeca.appendChild(peca);

        });


        // Seleciona todas as peças do quebra-cabeça e
                // as armazena na variável pecas.
        pecas = document.querySelectorAll('.peca-quebra-cabeca');

        // Adiciona ouvintes de eventos de arrastar e
                // soltar às peças do quebra-cabeça.
        adicionarOuvintesArrastar();

        // Atualiza a pontuação sempre que o
                // quebra-cabeça é inicializado.
        // Atualiza a pontuação sempre que o quebra-cabeça é inicializado
        atualizarPontuacao(); 
    
    }


    // Define a função embaralhar que recebe um
            // array como argumento e retorna o array embaralhado.
    function embaralhar(array) {

        // Itera sobre os elementos do array de trás para frente.
        // 'i' começa no último índice do array (array.length - 1)
                // e decrementa até 1.
        for (let i = array.length - 1; i > 0; i--) {
            
            // Gera um índice aleatório 'j' entre 0 e 'i' (inclusive).
            // Math.random() gera um número decimal aleatório
                    // entre 0 (inclusive) e 1 (exclusive).
            // Multiplicar por (i + 1) ajusta o intervalo para [0, i].
            // Math.floor() arredonda o número decimal para baixo,
                    // convertendo-o em um número inteiro.
            const j = Math.floor(Math.random() * (i + 1));

            // Troca os elementos no índice 'i' e no índice 'j'.
            // Utiliza a desestruturação de array para fazer a troca.
            // [array[i], array[j]] = [array[j], array[i]]; faz a
                    // troca dos valores entre array[i] e array[j].
            [array[i], array[j]] = [array[j], array[i]];
        }
        
        // Retorna o array embaralhado.
        // Após a conclusão do loop, o array original foi
                // modificado e seus elementos estão em ordem aleatória.
        return array;
    }



    // Define a função adicionarOuvintesArrastar que
            // adiciona ouvintes de eventos de arrastar e
            // soltar às peças do quebra-cabeça.
    function adicionarOuvintesArrastar() {

        // Itera sobre cada elemento na lista de
                // peças do quebra-cabeça (pecas).
        pecas.forEach(peca => {

            // Adiciona um ouvinte de evento para o início
                    // do arrastar (dragstart) em cada peça.
            // Quando o arrastar começa, a função lidarInicioArrastar é chamada.
            peca.addEventListener('dragstart', lidarInicioArrastar);

            // Adiciona um ouvinte de evento para quando uma
                    // peça arrastada estiver sobre outra peça (dragover).
            // A função lidarSobreArrastar é chamada para
                    // permitir que o elemento seja um alvo válido para o drop.
            peca.addEventListener('dragover', lidarSobreArrastar);

            // Adiciona um ouvinte de evento para o momento em
                    // que uma peça arrastada é solta (drop) sobre outra peça.
            // A função lidarSolta é chamada para lidar com a troca das peças.
            peca.addEventListener('drop', lidarSolta);

            // Adiciona um ouvinte de evento para o fim do
                    // arrastar (dragend) em cada peça.
            // Quando o arrastar termina, a função lidarFimArrastar é chamada.
            peca.addEventListener('dragend', lidarFimArrastar);

        });
    }


    // Define a função lidarInicioArrastar que lida
            // com o início do arrastar de uma peça
            // do quebra-cabeça.
    function lidarInicioArrastar(e) {

        // Armazena a referência à peça que está sendo
                // arrastada na variável global pecaArrastada.
        // 'this' refere-se à peça que disparou o
                // evento de arrastar (dragstart).
        pecaArrastada = this;

        // Define um atraso de 0 milissegundos antes de
                // adicionar a classe 'esconder' à peça arrastada.
        // Isso faz com que a peça se torne invisível enquanto é arrastada.
        setTimeout(() => this.classList.add('esconder'), 0);

    }


    // Define a função lidarSobreArrastar que lida com o
            // evento de uma peça arrastada estar sobre outra peça.
    function lidarSobreArrastar(e) {

        // Previne o comportamento padrão do evento.
        // Isso permite que a peça arrastada seja
            // solta (drop) sobre o alvo válido.
        e.preventDefault();

    }

    function lidarSolta(e) {

        e.preventDefault();
        // Previne o comportamento padrão do evento de soltar (drop).
        // Isso é necessário para permitir que o drop aconteça.

        if (pecaArrastada) {
            // Verifica se existe uma peça que está sendo arrastada.
            
            const indiceArrastado = parseInt(pecaArrastada.getAttribute('data-indice'));
            // Obtém o índice da peça arrastada a partir
                    // do atributo 'data-indice'.
            // 'data-indice' é um atributo personalizado que
                    // armazena a posição atual da peça no quebra-cabeça.
            // parseInt converte o valor do atributo, que é
                    // uma string, para um número inteiro.
            
            const indiceAlvo = parseInt(this.getAttribute('data-indice'));
            // Obtém o índice da peça alvo (sobre a qual a peça
                    // arrastada é solta) a partir do atributo 'data-indice'.
            // 'this' refere-se ao elemento sobre o qual a
                    // peça arrastada foi solta.
            // parseInt converte o valor do atributo, que é uma
                    // string, para um número inteiro.
            
            trocarPecas(indiceArrastado, indiceAlvo);
            // Chama a função trocarPecas para trocar a peça arrastada com a peça alvo.
            // A função trocarPecas troca as posições e atributos das duas peças no DOM.

        }
    }


    function lidarFimArrastar() {

        this.classList.remove('esconder');
        // Remove a classe 'esconder' da peça, tornando-a
                // visível novamente após o arrastar.
        // 'this' refere-se à peça que foi arrastada.
        // A classe 'esconder' é adicionada no início do
                // arrastar para ocultar a peça arrastada
                // durante o movimento.
        
        verificarVitoria();
        // Chama a função verificarVitoria para verificar se o
                // quebra-cabeça foi resolvido após a troca.
        // A função verificarVitoria verifica se todas as
                // peças estão na posição correta.
        // Se todas as peças estiverem na posição correta, o
                // jogador ganha o jogo.

    }


    function verificarVitoria() {

        const estaResolvido = Array.from(pecas).every((peca, indice) => parseInt(peca.getAttribute('data-posicao')) === indice);
        // Verifica se todas as peças estão na posição correta.
        // Array.from(pecas) cria uma nova array a partir
                // da NodeList de peças.
        // every() verifica se todos os elementos no array
                // passam no teste implementado pela função fornecida.
        // A função verifica se o valor de 'data-posicao' de
                // cada peça é igual ao seu índice no array.
        
        if (estaResolvido) {
            // Se todas as peças estiverem na posição
                    // correta (estaResolvido for true), o
                    // jogador ganha o jogo.

            alert("Parabéns! Você resolveu o quebra-cabeça!");
            // Exibe um alerta parabenizando o jogador.
            
            incrementarPontuacao();
            // Chama a função incrementarPontuacao para
                    // aumentar a pontuação do jogador.

        }

    }
    

    function incrementarPontuacao() {

        let pontuacao = parseInt(localStorage.getItem('pontuacao') || '0');
        // Obtém a pontuação atual do jogador a partir do localStorage.
        // localStorage.getItem('pontuacao') retorna a
                // pontuação armazenada como string.
        // parseInt converte a pontuação para um número inteiro.
        // Se não houver pontuação armazenada, usa '0' como valor padrão.
        
        pontuacao++;
        // Incrementa a pontuação do jogador em 1.
        
        localStorage.setItem('pontuacao', pontuacao.toString());
        // Armazena a nova pontuação no localStorage.
        // localStorage.setItem('pontuacao', pontuacao.toString())
                // converte a pontuação para string e a armazena.
        
        atualizarPontuacao();
        // Chama a função atualizarPontuacao para atualizar a
                // exibição da pontuação na página.
    
    }

    function trocarPecas(indiceArrastado, indiceAlvo) {

        const pecaAlvo = pecas[indiceAlvo];
        // Obtém a peça alvo (a peça sobre a qual a peça
                // arrastada foi solta) a partir do índice.
        
        const posicaoArrastada = pecaArrastada.style.backgroundPosition;
        // Armazena a posição de fundo da peça arrastada em
                // uma variável temporária.
        
        pecaArrastada.style.backgroundPosition = pecaAlvo.style.backgroundPosition;
        // Define a posição de fundo da peça arrastada para a
                // posição de fundo da peça alvo.
        
        pecaAlvo.style.backgroundPosition = posicaoArrastada;
        // Define a posição de fundo da peça alvo para a
                // posição de fundo da peça arrastada
                // armazenada anteriormente.

        const tempPos = pecaArrastada.getAttribute('data-posicao');
        // Armazena a posição original da peça arrastada em
                // uma variável temporária.
        
        pecaArrastada.setAttribute('data-posicao', pecaAlvo.getAttribute('data-posicao'));
        // Define a posição original da peça arrastada para a
                // posição original da peça alvo.
        
        pecaAlvo.setAttribute('data-posicao', tempPos);
        // Define a posição original da peça alvo para a
                // posição original da peça arrastada
                // armazenada anteriormente.
    
    }

    function atualizarPontuacao() {

        let pontuacao = parseInt(localStorage.getItem('pontuacao') || '0');
        // Obtém a pontuação atual do jogador a partir do localStorage.
        // localStorage.getItem('pontuacao') retorna a
                // pontuação armazenada como string.
        // parseInt converte a pontuação para um número inteiro.
        // Se não houver pontuação armazenada, usa '0' como valor padrão.
        
        pontuacaoDisplay.textContent = `Pontuação: ${pontuacao}`;
        // Atualiza o conteúdo de texto do elemento pontuacaoDisplay
                // para exibir a pontuação atual.
        // `Pontuação: ${pontuacao}` é uma string template
                // que inclui a pontuação atual.
        
    }

});