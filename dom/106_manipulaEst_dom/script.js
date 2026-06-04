// Configura um ouvinte de evento no botão com o
        // ID 'alterarEstilo' para reagir a cliques do usuário.
document.getElementById('alterarEstilo').addEventListener('click', function() {
        // Esta linha de código é responsável por selecionar o
                // botão com o ID 'alterarEstilo'.
        // A função `getElementById` é uma função do DOM que
                // retorna o elemento HTML correspondente ao ID fornecido.
        // Após selecionar o botão, `addEventListener` é chamado
                // para adicionar uma função que será executada
                // quando o botão for clicado.
        // 'click' é o tipo de evento que estamos ouvindo, e a
                // função anônima (`function() {...}`) é o manipulador de
                // evento que será invocado quando o evento ocorrer.
    
        // Busca e armazena em uma variável o elemento de parágrafo
                // com o ID 'paragrafo'.
        var paragrafo = document.getElementById('paragrafo');
        // Esta linha seleciona o elemento parágrafo usando `getElementById`,
                // que procura no documento HTML um elemento com o ID 'paragrafo'.
        // O elemento encontrado é então armazenado na variável `paragrafo`,
                // permitindo que seja manipulado no JavaScript.
        // `paragrafo` agora é uma referência direta ao elemento
                // parágrafo na página.
    
        // Define a propriedade de cor de texto do parágrafo para azul.
        // Isso muda a cor do texto contido no parágrafo.
        paragrafo.style.color = 'blue';
        // A propriedade `style.color` do elemento `paragrafo` é
                // modificada para 'blue'.
        // `style` é um objeto que permite acesso e manipulação do
                // estilo CSS do elemento. A propriedade `color`
                // define a cor do texto.
        // Alterando esta propriedade, a cor do texto no parágrafo
                // muda para azul.
    
        // Define o tamanho da fonte do texto dentro do parágrafo
                // para 20 pixels. Isso faz o texto aparecer maior.
        paragrafo.style.fontSize = '20px';
        // Similarmente, a propriedade `style.fontSize` é usada para
                // definir o tamanho da fonte do texto dentro do
                // elemento `paragrafo`.
        // Definir `fontSize` para '20px' aumenta o tamanho da fonte
                // para 20 pixels, fazendo com que o texto dentro do
                // parágrafo pareça maior visualmente.

});


// Adiciona um ouvinte de evento de clique ao botão com o
        // ID 'adicionarClasse'.
// Este ouvinte aguarda ações de clique sobre o botão.
document.getElementById('adicionarClasse').addEventListener('click', function() {
    // Esta linha seleciona o botão com o ID 'adicionarClasse' no
                // documento HTML usando o método document.getElementById.
    // 'document.getElementById' é um método que retorna o
                // elemento DOM correspondente ao ID fornecido.
    // Após selecionar o botão, adicionamos um ouvinte de evento a
                // ele usando 'addEventListener', que registra uma
                // função para ser chamada sempre que o evento
                // especificado (neste caso, 'click') ocorrer.

    // Acessa e armazena em uma variável o elemento parágrafo
                // identificado pelo ID 'paragrafo' no documento HTML.
    var paragrafo = document.getElementById('paragrafo');
    // Esta linha obtém o elemento parágrafo que possui o ID 'paragrafo'.
    // Assim como com o botão, usamos 'document.getElementById' para
                // localizar este elemento na página.
    // O resultado, que é o elemento parágrafo em si, é armazenado
                // na variável 'paragrafo'. Essa variável agora serve
                // como uma referência direta ao parágrafo, permitindo
                // manipulá-lo com JavaScript.

    // Utiliza o método 'add' do objeto 'classList' para adicionar a
                // classe 'destaque' ao parágrafo.
    // A classe 'destaque' está definida no CSS para aplicar certas
                // características de estilo, como cor vermelha e
                // texto em negrito.
    paragrafo.classList.add('destaque');
    // 'classList' é uma propriedade dos elementos DOM que retorna uma
                // coleção ativa das classes CSS do elemento.
        // O método 'add' dessa propriedade é usado para adicionar
                // uma nova classe ao elemento.
    // Aqui, adicionamos a classe 'destaque' ao parágrafo. Essa classe
                // foi definida nas regras de estilo CSS no cabeçalho do
                // documento e especifica que elementos com essa classe
                // terão texto em negrito e cor vermelha.
    // Ao adicionar 'destaque' ao parágrafo, alteramos imediatamente sua
                // aparência conforme definido pelas regras CSS
                // associadas a essa classe.

});


// Configura um ouvinte de evento de clique no botão com o
                // ID 'removerClasse', que irá reagir quando o
                // usuário clicar no botão.
document.getElementById('removerClasse').addEventListener('click', function() {
    // Esta linha usa o método document.getElementById para encontrar e
                // selecionar o botão com o ID 'removerClasse' no documento HTML.
    // Em seguida, adiciona um ouvinte de eventos para este botão usando
                // addEventListener. Este ouvinte é configurado para
                // responder a eventos de clique.
    // Quando o botão é clicado, a função anônima (ou seja, uma função
                // sem nome, definida aqui diretamente) é executada.

    // Busca no documento HTML e armazena em uma variável o elemento de
                // parágrafo identificado pelo ID 'paragrafo'.
    var paragrafo = document.getElementById('paragrafo');
    // Esta linha obtém o elemento parágrafo usando novamente o método
                // document.getElementById, desta vez para selecionar o
                // parágrafo com o ID 'paragrafo'.
    // O resultado, que é o próprio elemento parágrafo, é armazenado na
                // variável 'paragrafo', permitindo que seja diretamente
                // manipulado com JavaScript.

    // Utiliza o método 'remove' do objeto 'classList' do parágrafo para
                // remover a classe 'destaque'.
    // A classe 'destaque' adiciona estilização específica ao texto, e
                // removê-la desfaz essas alterações estilísticas.
    paragrafo.classList.remove('destaque');
    // A propriedade 'classList' do elemento 'paragrafo' fornece acesso à
                // lista de classes CSS do elemento. O método 'remove' é
                // usado aqui para remover a classe 'destaque' do parágrafo.
    // A classe 'destaque' está definida nas regras de estilo CSS para
                // aplicar características específicas de estilo, como cor
                // vermelha e fonte em negrito ao texto. Remover esta classe
                // do parágrafo reverte essas alterações, fazendo com que o
                // parágrafo retorne ao seu estilo original antes de
                // 'destaque' ter sido aplicado.

});


// Configura um ouvinte de evento de clique no botão com o ID 'alternarClasse'.
// Este ouvinte reage a cliques do usuário no botão especificado.
document.getElementById('alternarClasse').addEventListener('click', function() {
    // Esta linha seleciona o botão com o ID 'alternarClasse'
                // usando document.getElementById.
    // Este método retorna o elemento botão, e então um ouvinte de
                // evento é adicionado.
    // 'addEventListener' é um método que associa um evento específico,
                // neste caso, 'click', a uma função que será chamada
                // sempre que o evento ocorrer.
    
    // Acessa e armazena o elemento parágrafo identificado
                // pelo ID 'paragrafo' no documento HTML.
    var paragrafo = document.getElementById('paragrafo');
    // Esta linha usa document.getElementById para localizar o
                // parágrafo com o ID 'paragrafo'.
    // Após encontrar o elemento, ele é armazenado na variável 'paragrafo', o
                // que permite que ele seja manipulado pelo JavaScript.
    // 'paragrafo' agora é uma referência direta ao elemento
                // parágrafo na página.

    // Utiliza o método 'toggle' do objeto 'classList' para
                // alternar a classe 'fundo-azul' no elemento parágrafo.
    // Se o parágrafo já possui a classe 'fundo-azul', ela será
                // removida; se não possui, ela será adicionada.
    // Esta ação adiciona ou remove a classe 'fundo-azul', alterando a
                // cor de fundo do parágrafo entre o padrão e azul claro.
    paragrafo.classList.toggle('fundo-azul');
    // 'classList' é uma propriedade que fornece acesso à lista de
                // classes de um elemento. 
    // O método 'toggle' é utilizado aqui para adicionar a
                // classe 'fundo-azul' se ela não estiver presente no
                // elemento ou removê-la se estiver.
    // Isso resulta numa alternância visual que muda a cor de fundo do
                // parágrafo cada vez que o botão é clicado, alternando
                // entre sua cor de fundo padrão e azul claro.

});


/*
Explicação:

1. Manipulação Direta de Estilo:
- `paragrafo.style.color = 'blue';` e `paragrafo.style.fontSize = '20px';`: 
                Usamos a propriedade `style` de um elemento para alterar 
                diretamente seu CSS. Isso é útil para mudanças que dependem 
                de condições específicas em JavaScript.

2. Adicionar Classes:
- `paragrafo.classList.add('destaque');`: Usamos o método `classList.add` 
                para adicionar uma classe CSS ao elemento. Classes permitem 
                aplicar estilos pré-definidos no CSS.

3. Remover Classes:
- `paragrafo.classList.remove('destaque');`: Usamos o método `classList.remove` 
                para remover uma classe CSS do elemento. Isso remove os 
                estilos aplicados pela classe.

4. Alternar Classes:
- `paragrafo.classList.toggle('fundo-azul');`: Usamos o método `classList.toggle` 
                para alternar uma classe CSS no elemento. Isso adiciona a 
                classe se ela não estiver presente e a remove se estiver.

Esses métodos permitem manipular dinamicamente os estilos e classes 
                dos elementos HTML, criando interfaces interativas e responsivas.
*/