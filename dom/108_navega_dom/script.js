function acessarParent() {
    // Esta função encontra o elemento pai do item com ID 'item2' e
        // exibe o nome da tag do pai na área de resultado.

    var item2 = document.getElementById('item2');
    // Primeiro, a função usa 'document.getElementById' para procurar e
            // selecionar o elemento que possui o ID 'item2'.
    // A referência a este elemento é armazenada na variável 'item2'.

    var parent = item2.parentNode;
    // Em seguida, a função usa 'parentNode' para encontrar o elemento pai de 'item2'.
    // 'parentNode' retorna o elemento HTML que contém 'item2'.
    // Esta referência ao elemento pai é armazenada na variável 'parent'.

    document.getElementById('resultado').textContent = 'O pai de "Item 2" é uma tag: ' + parent.tagName;
    // A função então usa 'document.getElementById' novamente para encontrar o
            // elemento com ID 'resultado'.
    // A propriedade 'textContent' deste elemento é definida para uma
            // string que inclui o nome da tag do elemento pai de 'item2'.
    // 'parent.tagName' retorna o nome da tag HTML (como 'UL' ou 'DIV') do
            // elemento pai.
    // Isso significa que a função exibe uma mensagem
            // como "O pai de 'Item 2' é uma tag: UL" no elemento 'resultado'.

}

function listarChildren() {
    // Esta função lista todos os filhos do elemento com ID 'divPrincipal'
    // e exibe os nomes das tags dos elementos filhos na área de resultado.

    var divPrincipal = document.getElementById('divPrincipal');
    // Primeiro, a função usa 'document.getElementById' para procurar e
    // selecionar o elemento que possui o ID 'divPrincipal'.
    // A referência a este elemento é armazenada na variável 'divPrincipal'.

    var children = divPrincipal.children;
    // A função então usa 'children' para obter todos os
    // elementos filhos de 'divPrincipal'.
    // 'children' retorna uma coleção de todos os elementos filhos,
    // e armazena essa coleção na variável 'children'.

    var listaFilhos = Array.from(children).map(child => child.tagName).join(', ');
    // A função converte a coleção de elementos filhos em um
    // array usando 'Array.from(children)'.
    // Em seguida, usa 'map' para criar um novo array contendo
    // os nomes das tags dos elementos filhos.
    // O método 'join(', ')' é usado para juntar todos os elementos
    // do array em uma única string, separada por vírgulas.
    // Esta string é armazenada na variável 'listaFilhos'.

    document.getElementById('resultado').textContent = 'Filhos de "divPrincipal": ' + listaFilhos;
    // A função então usa 'document.getElementById' novamente
    // para encontrar o elemento com ID 'resultado'.
    // A propriedade 'textContent' deste elemento é definida para
    // uma string que inclui a lista de filhos de 'divPrincipal'.
    // Isso significa que a função exibe uma mensagem como
    // "Filhos de 'divPrincipal': P, UL" no elemento 'resultado'.

}

function irProximo() {
    // Esta função encontra o próximo irmão do item
                // com ID 'item2' e exibe o texto do próximo
                // irmão na área de resultado.

    var item2 = document.getElementById('item2');
    // Primeiro, a função usa 'document.getElementById' para
                // procurar e selecionar o elemento que
                // possui o ID 'item2'.
    // A referência a este elemento é armazenada na
                // variável 'item2'.

    var proximoIrmao = item2.nextSibling;
    // A função então usa 'nextSibling' para obter o
                // próximo nó irmão de 'item2'.
    // 'nextSibling' retorna o próximo nó no mesmo nível do DOM,
                // que pode ser um elemento, um nó de texto, ou
                // outro tipo de nó.
    // Esta referência ao próximo nó irmão é armazenada
                // na variável 'proximoIrmao'.

    while (proximoIrmao && proximoIrmao.nodeType !== 1) {
        // O loop 'while' verifica se 'proximoIrmao' existe e
                // se o 'nodeType' de 'proximoIrmao' não é igual a 1.
        // 'nodeType' igual a 1 indica que o nó é um elemento.
        // Se 'proximoIrmao' não for um elemento, o loop
                // continua procurando o próximo nó irmão.

        proximoIrmao = proximoIrmao.nextSibling;
        // Atualiza 'proximoIrmao' para o próximo nó irmão usando 'nextSibling'
            // até encontrar um elemento ou não haver mais nós irmãos.

    }

    document.getElementById('resultado').textContent = proximoIrmao 
        ? 'Próximo irmão de "Item 2": ' + proximoIrmao.textContent 
        : 'Não há próximo irmão.';
    // A função então usa 'document.getElementById' novamente para
                // encontrar o elemento com ID 'resultado'.
    // A propriedade 'textContent' deste elemento é definida para
                // uma string que inclui o texto do próximo irmão
                // de 'item2', se houver.
    // Se 'proximoIrmao' for um elemento, exibe o texto do próximo
                // irmão. Caso contrário, exibe 'Não há próximo irmão.'

}


function irAnterior() {
    // Esta função encontra o irmão anterior do item com ID 'item2' e
                // exibe o texto do irmão anterior na área de resultado.

    var item2 = document.getElementById('item2');
    // Primeiro, a função usa 'document.getElementById' para procurar e
                // selecionar o elemento que possui o ID 'item2'.
    // A referência a este elemento é armazenada na variável 'item2'.

    var irmaoAnterior = item2.previousSibling;
    // A função então usa 'previousSibling' para obter o nó
                // irmão anterior de 'item2'.
    // 'previousSibling' retorna o nó anterior no mesmo nível do DOM,
                // que pode ser um elemento, um nó de texto, ou
                // outro tipo de nó.
    // Esta referência ao nó irmão anterior é armazenada na
                // variável 'irmaoAnterior'.

    while (irmaoAnterior && irmaoAnterior.nodeType !== 1) {
        // O loop 'while' verifica se 'irmaoAnterior' existe
                // e se o 'nodeType' de 'irmaoAnterior' não é igual a 1.
        // 'nodeType' igual a 1 indica que o nó é um elemento.
        // Se 'irmaoAnterior' não for um elemento, o loop continua
                // procurando o nó irmão anterior.

        irmaoAnterior = irmaoAnterior.previousSibling;
        // Atualiza 'irmaoAnterior' para o nó irmão anterior
                // usando 'previousSibling' até encontrar um
                // elemento ou não haver mais nós irmãos.
    }


    document.getElementById('resultado').textContent = irmaoAnterior 
        ? 'Irmão anterior de "Item 2": ' + irmaoAnterior.textContent 
        : 'Não há irmão anterior.';
    // A função então usa 'document.getElementById' novamente para
                // encontrar o elemento com ID 'resultado'.
    // A propriedade 'textContent' deste elemento é definida para
                // uma string que inclui o texto do irmão anterior
                // de 'item2', se houver.
    // Se 'irmaoAnterior' for um elemento, exibe o texto do irmão
                // anterior. Caso contrário, exibe 'Não há irmão anterior.'

}