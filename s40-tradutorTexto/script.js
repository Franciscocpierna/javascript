// Adiciona um ouvinte de eventos (event listener) ao botão com o id 'btnTraduzir'.
// Quando o botão é clicado, a função fornecida é executada.
document.getElementById('btnTraduzir').addEventListener('click', function() {

    // Obtém o valor do textarea com o id 'textoOrigem'.
    // Este é o texto que o usuário inseriu para ser traduzido.
    const textoOrigem = document.getElementById('textoOrigem').value;

    // Obtém o valor do menu suspenso (select) com o id 'idiomaOrigem'.
    // Este é o idioma do texto original inserido pelo usuário.
    const idiomaOrigem = document.getElementById('idiomaOrigem').value;

    // Obtém o valor do menu suspenso (select) com o id 'idiomaDestino'.
    // Este é o idioma para o qual o texto será traduzido.
    const idiomaDestino = document.getElementById('idiomaDestino').value;
    
    // Faz uma solicitação HTTP GET à API de tradução do Google.
    // A URL contém parâmetros que especificam o cliente ('client=gtx'), 
            // o idioma de origem ('sl=' + idiomaOrigem),
    // o idioma de destino ('tl=' + idiomaDestino), o tipo de
            // dados ('dt=t') e o texto a ser traduzido ('q=' + textoOrigem).
    fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${idiomaOrigem}&tl=${idiomaDestino}&dt=t&q=${textoOrigem}`)
        
        // Quando a resposta da API é recebida, ela é convertida
                // para formato JSON.
        .then(response => response.json())

        // Quando a conversão para JSON é concluída, a função
                // fornecida é executada com os dados da resposta.
        .then(data => {

            // A tradução do texto é extraída da estrutura de
                    // dados retornada pela API.
            // 'data[0][0][0]' é onde a tradução está localizada
                    // na resposta JSON.
            const traducao = data[0][0][0];

            // O texto traduzido é inserido na div com o id 'resultado'.
            // Isso exibe a tradução na página.
            document.getElementById('resultado').innerText = traducao;

        })

        // Se ocorrer um erro durante a solicitação de tradução, ele é
                // capturado e uma mensagem de erro é exibida no console.
        .catch(error => console.error('Erro ao traduzir texto:', error));

        // 'console.error' exibe a mensagem de erro no console do
                // navegador, facilitando a depuração.

});