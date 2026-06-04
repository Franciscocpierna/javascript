// Seleciona o botão com ID 'mudarCor' e
        // adiciona um ouvinte de evento de clique
document.getElementById('mudarCor').addEventListener('click', function() {
    // Quando o botão for clicado, executa a função anônima

    // Seleciona o elemento com ID 'colorBox' e
            // armazena a referência na variável 'box'
    var box = document.getElementById('colorBox');
    
    // Altera a propriedade 'backgroundColor' do
            // elemento 'box' para 'salmon'
    // Isso muda a cor de fundo do elemento para salmão
    box.style.backgroundColor = 'salmon';

});


// Seleciona o botão com ID 'redefenirColor' e adiciona
        // um ouvinte de evento de clique
document.getElementById('redefenirColor').addEventListener('click', function() {
    // Quando o botão for clicado, executa a função anônima

    // Seleciona o elemento com ID 'colorBox' e
            // armazena a referência na variável 'box'
    var box = document.getElementById('colorBox');
    
    // Altera a propriedade 'backgroundColor' do elemento 'box' para 'lightblue'
    // Isso redefine a cor de fundo do elemento para azul claro
    box.style.backgroundColor = 'lightblue';

});


/*
Explicação

    Estrutura HTML: A página contém um div com um estilo que o faz 
                aparecer como um quadrado azul claro. Há também dois 
                botões: um para mudar a cor do quadrado e outro 
                para redefinir a cor.

    CSS: O CSS define o estilo visual básico do quadrado e inclui uma 
                transição para tornar a mudança de cor suave, ajudando 
                visualmente a perceber a mudança.

    JavaScript:
        Mudar Cor: O primeiro botão ativa um evento que muda a cor de 
                fundo do quadrado para salmão. Isso demonstra como o 
                JavaScript pode manipular o estilo de um elemento 
                através do DOM.
        Redefinir Cor: O segundo botão reverte a cor de fundo para 
                azul claro. Isso ilustra como as mudanças no DOM podem ser 
                desfeitas ou alteradas dinamicamente.

Este exemplo oferece uma visualização clara do início e fim de uma 
            interação com o DOM, mostrando como o JavaScript pode ser usado 
            para modificar dinamicamente os elementos de uma página. É uma 
            introdução fundamental para entender como a web é interativa e 
            como as páginas podem ser programadas para responder às 
            ações dos usuários.
*/