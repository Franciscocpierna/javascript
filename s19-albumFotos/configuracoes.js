document.getElementById('seletorArquivo').addEventListener('change', function(e) {
    /* Esta linha obtém o elemento do DOM com o ID 'seletorArquivo' e adiciona
             um 'event listener' para o evento 'change'.
       O evento 'change' é disparado quando o usuário seleciona um 
            arquivo através do input de arquivo.
       'e' é o objeto de evento que contém detalhes sobre o evento 'change'. */

    const arquivos = e.target.files;
    /* 'e.target' refere-se ao elemento HTML que disparou o evento, neste caso, o input de arquivo.
       'files' é uma propriedade de 'e.target' que contém os arquivos selecionados pelo usuário. */

    const galeria = document.getElementById('galeria');
    /* Obtém o elemento 'galeria' do DOM, onde as imagens carregadas serão exibidas. */

    Array.from(arquivos).forEach(arquivo => {
        /* Converte o objeto 'FileList' em um array para facilitar a 
                iteração com o método 'forEach'.
           'arquivo' é o elemento individual do array durante a iteração, 
                representando um único arquivo selecionado. */

        if (arquivo.type.startsWith('image/')) {
            /* Verifica se o tipo do arquivo começa com 'image/' para garantir que 
                apenas imagens sejam processadas. */

            const leitor = new FileReader();
            /* Cria uma instância de 'FileReader', uma ferramenta que permite ler o 
                conteúdo de arquivos armazenados no cliente. */

            leitor.onload = function(e) {
                /* Define o que fazer quando o FileReader completar a leitura do arquivo.
                   'e' aqui é o objeto de evento gerado pelo carregamento do FileReader. */

                const descricao = prompt("Insira uma descrição para a imagem '" + arquivo.name + "':");
                /* Exibe um prompt para o usuário inserir uma descrição para a imagem.
                   'arquivo.name' é o nome do arquivo e é exibido no prompt para informar o usuário. */

                   const div = document.createElement('div');
                    /* Esta linha cria um novo elemento <div> no Document Object Model (DOM). 
                        O método `createElement` é chamado no objeto `document`, 
                        especificando 'div' como o tipo de elemento a ser criado. 
                        Isso retorna um novo elemento <div> que ainda não está visível 
                            no documento, pois não foi adicionado ao DOM visível. */

                    div.classList.add('imagem');
                    /* Após criar o <div>, adicionamos a ele uma classe CSS chamada 'imagem'. 
                        O método `classList.add` é usado para adicionar novas classes ao 
                        elemento. Isso é importante para aplicar estilos específicos 
                        definidos no CSS que podem controlar a aparência e o layout 
                        deste <div>, como dimensões, bordas, alinhamento, etc. */

                    const img = new Image();
                    /* Aqui, um novo elemento de imagem é criado utilizando o 
                        construtor `Image()`. Isso é equivalente a `document.createElement('img')`. 
                        O novo elemento de imagem, assim como o <div>, ainda não 
                        está visível no documento. */

                    img.src = e.target.result;
                    /* O atributo `src` do elemento <img> é definido para `e.target.result`. 
                        Neste contexto, `e.target.result` contém os dados da imagem 
                        lida pelo `FileReader` como uma URL de dados base64. Isso 
                        efetivamente carrega a imagem no elemento <img> para que ela 
                        possa ser exibida na página. */

                    img.alt = arquivo.name;
                    /* O atributo `alt` é definido com o nome do arquivo original da 
                    imagem (arquivo.name). O texto alternativo é usado por leitores de 
                    tela e navegadores que não carregam imagens; ele descreve o que a 
                    imagem representa, melhorando a acessibilidade e a experiência do 
                    usuário em casos de falha no carregamento da imagem. */

                    img.onclick = function() { abrirModal(e.target.result, descricao); };
                    /* Um manipulador de eventos `onclick` é adicionado ao elemento <img>. 
                    Quando o usuário clica na imagem, a função anônima definida aqui é 
                    executada, chamando `abrirModal` com a URL da imagem e a descrição 
                    como argumentos. Esta função é responsável por abrir uma janela 
                    modal ou um visualizador de imagem onde a imagem pode ser vista em 
                    um formato maior, junto com a descrição fornecida pelo usuário. */

                    div.appendChild(img);
                    /* O elemento <img> é então adicionado como filho do elemento <div> que 
                    foi criado anteriormente. O método `appendChild` anexa o 
                    elemento <img> ao final do <div>, preparando todo o conjunto para 
                        ser inserido no DOM. */

                    galeria.appendChild(div);
                    /* Finalmente, o <div> que agora contém o elemento <img> é adicionado ao 
                        elemento com o id 'galeria' no DOM. O método `appendChild` faz com 
                        que o <div> seja visível na página, mostrando a imagem que o 
                        usuário carregou. Isso expande dinamicamente o conteúdo da galeria à 
                        medida que novas imagens são adicionadas. */

            };
            
            leitor.readAsDataURL(arquivo);
            /* Inicia a leitura do arquivo como uma URL de dados. Este método resulta 
            no disparo do evento 'load', que executará o código definido 
            em 'leitor.onload'. */
        }
    });
});


function abrirModal(src, descricao) {
    /* Define a função `abrirModal` com dois parâmetros: `src` (fonte da imagem) e
             `descricao` (texto descrevendo a imagem).
       Esta função é chamada quando uma imagem na galeria é clicada, e seu 
            objetivo é exibir a imagem em uma janela modal com sua descrição. */

    const modal = document.getElementById('modal');
    /* Obtém o elemento modal do DOM usando seu ID 'modal'. O modal é um 
            contêiner pré-definido na página HTML que é usado para exibir 
            conteúdo em uma janela pop-up que foca a atenção do usuário no 
            conteúdo que ele exibe. */

    modal.style.display = 'flex';
    /* Altera a propriedade CSS `display` do modal para 'flex'. Isso faz com 
            que o modal se torne visível (anteriormente está definido como 'none' 
            para ficar oculto). Utilizar 'flex' aqui também ativa o modelo de 
            layout flexível para o conteúdo do modal, permitindo que itens internos 
            sejam alinhados e justificados convenientemente. */

    modal.querySelector('img').src = src;
    /* Busca o primeiro elemento <img> dentro do modal e define seu atributo `src` 
            para o valor do parâmetro `src`, que é a URL da imagem clicada. Isso 
            carrega a imagem selecionada dentro do elemento <img> no modal. */

    modal.querySelector('.descricao').textContent = descricao || "Sem descrição";
    /* Busca o primeiro elemento com a classe 'descricao' dentro do modal e 
            define seu `textContent` para o valor do parâmetro `descricao`.
       Se `descricao` estiver vazio, "Sem descrição" será usado como um texto padrão.
       Isso garante que haja sempre um texto descritivo acompanhando a imagem, 
            melhorando a acessibilidade e fornecendo contexto ao usuário. */

    window.imagemAtual = src; 
    /* Armazena a URL da imagem atualmente exibida no modal na 
            variável global `window.imagemAtual`.
       Isso é útil para referência em outras funções, por exemplo, se houver 
            funcionalidades para excluir a imagem ou navegar entre várias 
            imagens carregadas no modal. */

}


function fecharModal() {
    /* Define a função `fecharModal`, que é responsável por ocultar o 
        modal de visualização de imagens. */

    const modal = document.getElementById('modal');
    /* Obtém o elemento modal do DOM usando seu ID 'modal'. Este é o 
        contêiner usado para exibir imagens em destaque ao usuário. */

    modal.style.display = 'none';
    /* Altera a propriedade CSS `display` do modal para 'none'. Isso oculta o 
        modal, fazendo com que ele não seja mais visível ou ocupe espaço na página. 
        Essa ação reverte a visibilidade que foi definida para 'flex' quando o 
        modal foi aberto. */

}

function removerImagem(event) {
    /* Define a função `removerImagem`, que é chamada quando o usuário clica no 
            botão para remover uma imagem específica dentro do modal. */

    event.stopPropagation();
    /* Chama o método `stopPropagation` no objeto de evento `event`. Isso previne 
            que o evento de clique no botão se propague para outros elementos. 
       Por exemplo, sem essa chamada, clicar no botão também poderia disparar o 
            evento de clique do modal, que está configurado para fechar o modal 
            se clicado (configurado em outro lugar no código). */

    const imagens = document.querySelectorAll('#galeria .imagem img');
    /* Seleciona todos os elementos <img> dentro dos elementos com a 
            classe 'imagem' que estão contidos no elemento com ID 'galeria'. 
       Este seletor é usado para identificar todas as imagens que 
            foram adicionadas à galeria. */

    imagens.forEach(img => {
        /* Itera sobre cada imagem na lista de imagens encontradas. `img` 
            representa uma única imagem na iteração atual. */

        if (img.src === window.imagemAtual) {
            /* Verifica se a propriedade `src` da imagem corrente é igual à URL 
                da imagem atualmente exibida no modal, que é armazenada em `window.imagemAtual`.
            Essa condição garante que apenas a imagem que está atualmente 
                sendo exibida no modal seja considerada para remoção. */

            img.parentElement.remove();
            /* Acessa o elemento pai do <img> (que é o <div> com 
                classe 'imagem') e o remove do DOM.
            Isso efetivamente remove a imagem e seu contêiner do layout da 
                página, fazendo com que a imagem desapareça da galeria. */
        }
    });

    fecharModal();
    /* Chama a função `fecharModal` após a remoção da imagem. Isso 
            garante que o modal seja fechado após a imagem ser removida, 
            voltando a interface para o estado onde nenhuma imagem está 
            sendo destacada. */

}