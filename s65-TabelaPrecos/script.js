// Adiciona um ouvinte de evento que aguarda até que todo o 
        // conteúdo da DOM (Document Object Model) esteja 
        // completamente carregado.
document.addEventListener('DOMContentLoaded', function() {

    // Seleciona todos os elementos com a classe 'botao-assinar' e 
            // os armazena na constante 'botoesAssinar'.
    const botoesAssinar = document.querySelectorAll('.botao-assinar');

    // Itera sobre cada botão encontrado com a classe 'botao-assinar'.
    botoesAssinar.forEach(botao => {

        // Adiciona um ouvinte de evento de clique a cada 
                // botão individual.
        botao.addEventListener('click', function() {

            // Captura o ID do elemento pai do botão, que 
                    // representa o ID do plano associado.
            const planoId = this.parentElement.id;
            
            // Redireciona o navegador para a página 'assinatura.html', 
                    // passando o ID do plano como um parâmetro na URL.
            window.location.href = `assinatura.html?plano=${planoId}`;
            
        });
    });
});