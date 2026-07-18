// Este evento 'DOMContentLoaded' é utilizado para garantir que o 
        // script só execute após o carregamento completo do HTML.
document.addEventListener('DOMContentLoaded', function() {

    // A função 'querySelectorAll' busca todos os elementos com a 
            // classe 'botao-comprar' e os coloca na constante 'botoesComprar'.
    const botoesComprar = document.querySelectorAll('.botao-comprar');

    // O método 'forEach' é usado para iterar sobre cada 
            // botão em 'botoesComprar'.
    botoesComprar.forEach(botao => {

        // Aqui, adiciona-se um evento de 'click' a cada botão para 
                // definir o que acontece quando são clicados.
        botao.addEventListener('click', function() {

            // A propriedade 'parentElement.id' é usada para obter o ID 
                    // do elemento pai do botão clicado, assumindo 
                    // que é o contêiner do plano.
            const planoId = this.parentElement.id;

            // O 'window.location.href' é utilizado para redirecionar o 
                    // usuário para 'assinatura.html', incluindo o ID do 
                    // plano como parâmetro na URL.
            window.location.href = `assinatura.html?plano=${planoId}`;

        });
    });
});