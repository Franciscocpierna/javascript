document.getElementById('openModal').addEventListener('click', function() {
    // Seleciona o botão com ID 'openModal' e adiciona um
            // ouvinte de evento de clique a ele.
    // Quando o botão for clicado, a função anônima será executada.

    document.getElementById('modal').style.display = 'block';
    // Seleciona o elemento com ID 'modal' (o contêiner do modal).
    // Define a propriedade 'display' do modal como 'block',
            // fazendo com que ele seja exibido na tela.

});


document.getElementById('closeModal').addEventListener('click', function() {
    // Seleciona o elemento com ID 'closeModal' (o "X" para fechar o
            // modal) e adiciona um ouvinte de evento de clique a ele.
    // Quando o "X" for clicado, a função anônima será executada.

    document.getElementById('modal').style.display = 'none';
    // Seleciona o elemento com ID 'modal' (o contêiner do modal).
    // Define a propriedade 'display' do modal como 'none',
            // fazendo com que ele seja ocultado da tela.

});


// Fechar modal clicando fora do conteúdo
window.onclick = function(event) {

    // Adiciona um ouvinte de evento de clique à janela inteira.
    // A função anônima será executada sempre que
            // qualquer lugar na janela for clicado.

    if (event.target === document.getElementById('modal')) {
        // Verifica se o elemento que foi clicado ('event.target') é
                // exatamente o elemento com o ID 'modal'.
        // Isso garante que o modal será fechado apenas se o usuário
                // clicar fora do conteúdo do modal, na área de fundo escura.

        document.getElementById('modal').style.display = 'none';
        // Seleciona o elemento com ID 'modal' (o contêiner do modal).
        // Define a propriedade 'display' do modal como 'none', fazendo
                // com que ele seja ocultado da tela.
                
    }
}