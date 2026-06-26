// Adiciona um ouvinte de eventos ao documento para executar o 
// código quando todo o conteúdo HTML estiver completamente carregado.
document.addEventListener('DOMContentLoaded', function() {
    /* 'DOMContentLoaded' é um evento que é disparado quando o documento 
                HTML inicial foi completamente carregado e analisado,
                sem esperar pelo CSS, imagens e subframes para terminar de carregar. 
       Isso significa que é um bom momento para inicializar o 
                JavaScript que depende desses elementos do DOM. */

    // Busca o elemento com o ID 'botao-negrito' no documento e 
                // adiciona um ouvinte de evento 'click' a ele.
    document.getElementById('botao-negrito').addEventListener('click', () => aplicarEstilo('bold'));
    /* 'getElementById' é um método que retorna o elemento que possui o 
                ID atribuído no parâmetro.
       'addEventListener' é um método que adiciona uma função para ser 
                executada sempre que o evento especificado é disparado no elemento.
       Neste caso, quando o botão é clicado, a função anônima é chamada.
       A função anônima usa uma arrow function '() =>' para 
                chamar 'aplicarEstilo' com o argumento 'bold'.
       'aplicarEstilo' é uma função que você deve ter definido em 
                outro lugar no script, que executa a ação de
                 tornar o texto em negrito. */

    // Busca o elemento com o ID 'botao-italico' e adiciona um ouvinte de evento 'click'.
    document.getElementById('botao-italico').addEventListener('click', () => aplicarEstilo('italic'));
    /* Similar ao botão de negrito, mas desta vez para o itálico.
       Quando o botão 'botao-italico' é clicado, a função 
                'aplicarEstilo' é chamada com o argumento 'italic',
                que deverá aplicar o estilo itálico ao texto 
                selecionado no editor. */

        // Busca o elemento com o ID 'botao-sublinhado' e adiciona 
                // um ouvinte de evento 'click'.
        document.getElementById('botao-sublinhado').addEventListener('click', () => aplicarEstilo('underline'));
        /* Aqui, quando o botão 'botao-sublinhado' é clicado, a função 
                'aplicarEstilo' é chamada com o argumento 'underline'.
        Essa chamada irá aplicar o estilo de sublinhado ao texto 
                selecionado, dependendo de como a função 'aplicarEstilo' 
                é implementada. */

        // Adiciona um ouvinte de evento ao elemento com ID 'seletor-tamanho-fonte'.
        document.getElementById('seletor-tamanho-fonte').addEventListener('change', function() {
                /* O método 'getElementById' busca no documento HTML um elemento 
                        que possui o ID especificado, neste caso, 'seletor-tamanho-fonte'.
                'addEventListener' é usado para adicionar uma função que será 
                        executada sempre que o evento especificado ('change' neste 
                        caso) for disparado no elemento.
                O evento 'change' é geralmente usado em elementos de entrada para 
                        detectar quando o valor do elemento muda. */

                var tamanhoFonte = this.value;
                /* 'this' refere-se ao elemento HTML que disparou o evento, que 
                        neste caso é o 'seletor-tamanho-fonte'.
                'this.value' obtém o valor atual do elemento, que é o valor 
                        selecionado pelo usuário no seletor de tamanho de fonte. 
                Esse valor é armazenado na variável 'tamanhoFonte'. */

                aplicarTamanhoFonte(tamanhoFonte);
                /* Chama a função 'aplicarTamanhoFonte' e passa a variável 
                        'tamanhoFonte' como argumento.
                Esta função deve estar definida em outra parte do  
                        código JavaScript e é responsável por ajustar o tamanho 
                        da fonte do texto no editor com base no valor fornecido. */

        });

        // Adiciona um ouvinte de evento ao elemento com ID 'seletor-tipo-fonte'.
        document.getElementById('seletor-tipo-fonte').addEventListener('change', function() {
                /* Similar ao ouvinte de evento acima, este trecho de código 
                        adiciona um ouvinte ao 'seletor-tipo-fonte'.
                O ouvinte também reage a mudanças no valor do elemento, que 
                        ocorrem quando o usuário seleciona uma nova opção 
                        no menu dropdown. */

                aplicarEstilo('fontName', this.value);
                /* Chama a função 'aplicarEstilo' com dois argumentos:
                - 'fontName', que é o comando para a função saber que o estilo 
                        de nome de fonte deve ser alterado.
                - 'this.value', que fornece o valor atual do 'seletor-tipo-fonte' 
                        (ou seja, o tipo de fonte selecionado pelo usuário).
                A função 'aplicarEstilo' deve modificar o estilo de nome de 
                        fonte do texto no editor para refletir a escolha do usuário. */
        });


        // Adiciona um ouvinte de evento ao elemento 'seletor-cor'.
        document.getElementById('seletor-cor').addEventListener('input', function() {
                
            /* O método 'getElementById' busca no documento um elemento
                        pelo seu ID 'seletor-cor'.
                'addEventListener' é usado para registrar uma função que 
                        será chamada sempre que ocorrer o evento especificado 
                        no elemento.
                O evento 'input' é disparado sempre que o valor de um 
                        elemento <input> ou <textarea> é alterado pelo usuário. */

                aplicarEstilo('foreColor', this.value);
                /* Chama a função 'aplicarEstilo', passando 'foreColor' como 
                        argumento para especificar que a cor do texto deve ser alterada.
                'this.value' refere-se ao valor atual do elemento 'seletor-cor', ou 
                        seja, a cor selecionada pelo usuário.
                Assim, o texto selecionado no editor terá sua cor alterada 
                        para a cor escolhida. */

        });

        // Adiciona um ouvinte de evento para o botão de alinhar texto à esquerda.
        document.getElementById('botao-alinhar-esquerda').addEventListener('click', () => aplicarEstilo('justifyLeft'));
        /* Este ouvinte de evento está vinculado ao botão de alinhamento à 
                        esquerda. Quando o botão é clicado,
        a função 'aplicarEstilo' é chamada com o argumento 'justifyLeft', 
                        que ajusta o alinhamento do texto selecionado para a esquerda. */

        // Adiciona um ouvinte de evento para o botão de alinhar texto ao centro.
        document.getElementById('botao-alinhar-centro').addEventListener('click', () => aplicarEstilo('justifyCenter'));
        /* Similar ao botão de alinhamento à esquerda, este código vincula 
                        um ouvinte ao botão de alinhamento ao centro.
        Quando clicado, ele chama 'aplicarEstilo' com 'justifyCenter', 
                        alinhando o texto selecionado ao centro. */

        // Adiciona um ouvinte de evento para o botão de alinhar texto à direita.
        document.getElementById('botao-alinhar-direita').addEventListener('click', () => aplicarEstilo('justifyRight'));
        /* Este ouvinte de evento é para o botão de alinhamento à 
                        direita. Quando o botão é clicado,
        'aplicarEstilo' é chamado com 'justifyRight', alinhando o 
                        texto selecionado à direita. */

        
        // Adiciona um ouvinte de evento para o botão de inserir marcadores em listas.
        document.getElementById('botao-inserir-marcadores').addEventListener('click', () => {
                /* Este ouvinte de evento é para o botão que adiciona 
                        marcadores a uma lista no editor de texto.
                Quando o botão é clicado, executa o bloco de código 
                        dentro das chaves {}. */

                aplicarEstilo('insertUnorderedList');
                        /* 'aplicarEstilo' é chamado com 'insertUnorderedList', que 
                                insere uma lista com marcadores no texto selecionado.
                        Esta ação transforma o texto selecionado ou a posição atual do 
                                cursor em um item de lista com marcador. */

                ajustarTamanhoListas(this.value);
                        /* Chama 'ajustarTamanhoListas', uma função que deve ajustar o 
                                tamanho das listas com marcadores.
                         */

        });


        // Adiciona um ouvinte de evento ao botão para inserir numeração em listas.
        document.getElementById('botao-inserir-numeracao').addEventListener('click', () => {
                /* O método `getElementById` é utilizado para encontrar o 
                        botão de inserção de numeração no DOM usando seu ID.
                `addEventListener` vincula um evento de clique ao botão, 
                        ativando a função quando o botão é clicado. */

                aplicarEstilo('insertOrderedList');
                /* A função `aplicarEstilo` é chamada com o argumento 'insertOrderedList'.
                Isso instrui o navegador a aplicar o estilo de lista ordenada 
                        ao texto selecionado ou no ponto de inserção atual no editor. */

                ajustarTamanhoListas(this.value);
                /* `ajustarTamanhoListas` é chamada com `this.value`.
                 */

        });


        // Adiciona um ouvinte de evento ao botão para inserir imagem.
        document.getElementById('botao-inserir-imagem').addEventListener('click', function() {
                /* `getElementById` busca o botão de inserção de imagem pelo seu ID.
                Um evento de clique é vinculado ao botão, ativando a 
                        função anônima quando clicado. */

                document.getElementById('entrada-imagem').click();
                /* Encontra o input do tipo file com ID 'entrada-imagem' e 
                        simula um clique nele.
                Isso abre a janela de seleção de arquivo do sistema operacional, 
                        permitindo ao usuário escolher uma imagem para carregar.
                Esta é uma maneira de estilizar o input de arquivo de forma que o 
                        usuário interaja com um elemento que se ajuste melhor 
                        ao design do site. */

        });

        // Adiciona um ouvinte de evento ao campo de entrada de imagem.
        document.getElementById('entrada-imagem').addEventListener('change', inserirImagem);
        /* Ao detectar uma mudança no input de arquivo (após 
                        um arquivo ser selecionado),
                        a função `inserirImagem` é chamada. Essa função 
                        deverá lidar com a leitura do arquivo selecionado e 
                        a inserção da imagem no editor. */

        // Adiciona um ouvinte de evento ao botão de exportar conteúdo.
        document.getElementById('botao-exportar').addEventListener('click', exportarConteudo);
        /* Quando o botão de exportar é clicado, a função `exportarConteudo` é acionada.
        Esta função é responsável por compilar e salvar o conteúdo do 
                        editor, como um arquivo HTML ou outro formato desejado,
                        permitindo ao usuário baixar o conteúdo que 
                        criou ou editou no editor. */


});

function aplicarEstilo(comando, valor = null) {
    document.execCommand(comando, false, valor);
}

/*

function aplicarEstilo(comando, valor = null) {

        const selection = document.getSelection();
        if (!selection.rangeCount) return false; // Não faz nada se não houver seleção.
    
        const range = selection.getRangeAt(0);
        const selectedContent = range.extractContents(); // Extrai o conteúdo selecionado do documento.
    
        // Cria um elemento span ou div dependendo do comando.
        const elem = document.createElement(comando === 'justifyLeft' || comando === 'justifyCenter' || comando === 'justifyRight' ? 'div' : 'span');
    
        switch (comando) {
            case 'bold':
                elem.style.fontWeight = 'bold';
                break;
            case 'italic':
                elem.style.fontStyle = 'italic';
                break;
            case 'underline':
                elem.style.textDecoration = 'underline';
                break;
            case 'foreColor':
                if (valor) elem.style.color = valor;
                break;
            case 'justifyLeft':
                elem.style.textAlign = 'left';
                break;
            case 'justifyCenter':
                elem.style.textAlign = 'center';
                break;
            case 'justifyRight':
                elem.style.textAlign = 'right';
                break;
        }
    
        // Insere o conteúdo extraído de volta dentro do novo elemento criado.
        elem.appendChild(selectedContent);
        range.insertNode(elem); // Insere o novo elemento com o conteúdo no local original do conteúdo extraído.
    
        // Restaura a seleção.
        selection.removeAllRanges();
        const newRange = document.createRange();
        newRange.selectNodeContents(elem);
        selection.addRange(newRange);
    
        return true;
    }

*/
    



// Define uma função chamada 'aplicarTamanhoFonte' que aceita um parâmetro 'tamanhoFonte',
// que é um número representando o tamanho da fonte em pixels.
function aplicarTamanhoFonte(tamanhoFonte) {

    // Obtém a seleção atual do documento através do objeto 'window'.
    // 'window.getSelection()' retorna um objeto de seleção que
    // representa o texto selecionado pelo usuário ou a posição atual do cursor.
    const selecao = window.getSelection();

    // Verifica se há algum texto selecionado.
    // 'selecao.rangeCount' retorna o número de intervalos na
    // seleção. Se for 0, não há seleção e a função termina prematuramente.
    if (!selecao.rangeCount) return; // Retorna undefined se não houver seleção
                                     // para evitar erros nos próximos passos.

    // 'getRangeAt(0)' obtém o primeiro intervalo da seleção atual.
    // Um intervalo é um objeto que representa uma parte do documento
    // que foi selecionada ou onde o cursor está posicionado.
    let range = selecao.getRangeAt(0);

    // Cria um novo elemento HTML <span>, que será usado para
    // aplicar o estilo de tamanho de fonte ao texto selecionado.
    const span = document.createElement('span');

    // Define o estilo de tamanho da fonte do elemento <span> criado.
    // Usa template strings (texto dentro de ` `)
    // para incorporar o valor da variável 'tamanhoFonte' diretamente
    // na string, seguido de 'px' para especificar que a unidade é pixels.
    span.style.fontSize = `${tamanhoFonte}px`;

    // O método 'surroundContents' do objeto de intervalo (range) é
    // usado para envolver o conteúdo selecionado dentro do elemento <span>.
    // Isso insere o elemento <span> ao redor do conteúdo do intervalo,
    // aplicando efetivamente o tamanho de fonte especificado ao texto selecionado.
    range.surroundContents(span);

    // Nota: Esta função não lida com o cenário em que a seleção cruza
    // diferentes elementos, o que pode causar a quebra de elementos HTML.
    // Para uma implementação mais robusta, seria necessário adicionar
    // lógica para lidar com tais situações.
    
}

// Define a função 'ajustarTamanhoListas' que aceita um 
// parâmetro 'tamanhoFonteSelecionado'.
// Esse parâmetro é o tamanho da fonte que você deseja aplicar às listas.
function ajustarTamanhoListas(tamanhoFonteSelecionado) {

    // Obtém o elemento com o ID 'editor' do documento.
    // Este elemento é o contêiner no qual as listas estão localizadas.
    const editor = document.getElementById('editor');

    // Determina o tamanho da fonte a ser usado.
    // Se 'tamanhoFonteSelecionado' for fornecido, usa esse
    // valor; caso contrário, usa o tamanho de fonte atual do editor.
    const tamanhoFonte = tamanhoFonteSelecionado || editor.style.fontSize;

    // Busca todos os elementos <ul> e <ol> dentro do 'editor'.
    // 'querySelectorAll' retorna uma NodeList contendo todos os
    // elementos que correspondem aos seletores especificados.
    const listas = editor.querySelectorAll('ul, ol');

    // Usa 'forEach' para iterar sobre cada elemento da lista encontrada.
    listas.forEach(lista => {

        // Define o tamanho da fonte de cada lista para o valor de 'tamanhoFonte'.
        // Isso é feito modificando a propriedade 'fontSize' do estilo do elemento.
        lista.style.fontSize = tamanhoFonte;

    });

    // A função não retorna nada. Seu objetivo é apenas aplicar o
    // estilo diretamente aos elementos.

}

// Define a função 'inserirImagem' que é chamada quando um
// evento de mudança é disparado pelo input de arquivo.
function inserirImagem(event) {

    // Acessa o primeiro arquivo selecionado pelo usuário.
    // 'event.target.files' contém uma lista de arquivos escolhidos.
    const arquivo = event.target.files[0];

    // Verifica se um arquivo foi realmente selecionado. Se
    // não, a função termina prematuramente.
    if (!arquivo) return; // Se não houver arquivo, não faz nada.

    // Cria uma instância de FileReader, que permite ler o
    // conteúdo dos arquivos do sistema de arquivos local.
    const leitor = new FileReader();

    // Define o que deve acontecer quando o FileReader
    // terminar de ler o arquivo.
    leitor.onload = function(e) {

        // 'e.target.result' contém o conteúdo do arquivo
        // lido, neste caso, como uma URL de dados base64 da imagem.
        const src = e.target.result;

        // Obtém o elemento editor do DOM pelo seu ID 'editor'.
        // Este é o local onde a imagem será inserida.
        const editor = document.getElementById('editor');
        
        // Verifica se a imagem já existe no editor antes de
        // adicionar. Essa função deve ser definida em outro lugar.
        if (!imagemJaAdicionada(src, editor)) {

            // Cria um novo elemento de imagem <img>.
            const img = document.createElement('img');

            // Define o atributo 'src' da imagem para a URL de dados base64.
            img.src = src;

            // Define o estilo 'maxWidth' para 100%, fazendo com
            // que a imagem não exceda a largura do editor.
            img.style.maxWidth = '100%';

            // Adiciona o elemento de imagem ao final do elemento editor.
            editor.appendChild(img);

        }
    };

    // Inicia a leitura do arquivo como uma URL de dados base64.
    leitor.readAsDataURL(arquivo);

    // Limpa o valor do input de arquivo para permitir que o
    // mesmo arquivo seja selecionado novamente se necessário.
    event.target.value = '';

}


// Define a função 'imagemJaAdicionada' que recebe dois parâmetros: 'src' e 'editor'.
// 'src' é a URL da imagem que pode ser uma string representando a localização da imagem, 
// e 'editor' é o elemento DOM onde as imagens estão sendo inseridas.
function imagemJaAdicionada(src, editor) {

        // Acessa todos os elementos <img> dentro do 'editor' usando 'getElementsByTagName',
        // que retorna uma coleção ao vivo de todos os elementos com a tag especificada.
        const imagens = editor.getElementsByTagName('img');

        // Inicia um loop para iterar sobre cada imagem no editor.
        for (let i = 0; i < imagens.length; i++) {

                // Compara o atributo 'src' de cada imagem com a 'src' fornecida.
                // O atributo 'src' de uma imagem contém a URL da imagem
                // que a imagem está exibindo.
                if (imagens[i].src === src) {

                        // Se alguma imagem no editor já tem a mesma URL 'src',
                        // retorna verdadeiro.
                        return true; // Imagem já adicionada.

                }
        }

        // Se o loop termina e nenhuma imagem correspondente é
        // encontrada, retorna falso.
        return false; // Imagem não encontrada, pode adicionar.

}

// Define a função 'exportarConteudo' que não recebe parâmetros.
function exportarConteudo() {

        // Acessa o conteúdo HTML do elemento com o ID 'editor'.
        // 'document.getElementById' é usado para encontrar o
        // elemento 'editor' e '.innerHTML' obtém todo o HTML dentro desse elemento.
        const conteudo = document.getElementById('editor').innerHTML;
    
        // Cria um novo Blob (Binary Large Object) que é um tipo de
        // objeto para lidar com dados binários (neste caso, texto também).
        // O conteúdo do editor é passado como um array para o
        // construtor do Blob, junto com um objeto especificando o
        // tipo de conteúdo como 'text/html'.
        const blob = new Blob([conteudo], {type: "text/html"});
    
        // Cria uma URL única para o Blob criado, que
        // representa o arquivo a ser baixado.
        // 'URL.createObjectURL' gera uma URL que pode ser
        // usada para representar o Blob no navegador.
        const url = URL.createObjectURL(blob);
    
        // Cria um novo elemento <a> (link), que será
        // usado para iniciar o download.
        const link = document.createElement('a');
    
        // Define o atributo 'href' do link para a URL do Blob,
        // apontando para o arquivo a ser baixado.
        link.href = url;
    
        // Define o atributo 'download' do link, especificando o
        // nome do arquivo que será salvo no computador do usuário.
        // Quando o usuário clicar no link, o arquivo será baixado com este nome.
        link.download = 'conteudoEditor.html';
    
        // Simula um clique no link criado. Como o link tem os
        // atributos 'href' (apontando para o Blob) e 'download',
        // o navegador iniciará o download automaticamente.
        link.click();
    
        // Remove o link do documento após o clique. Isso é
        // feito para limpar e evitar deixar elementos inutilizados no DOM.
        document.body.removeChild(link);

}
    
