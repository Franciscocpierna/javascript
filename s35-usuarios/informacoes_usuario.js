function obterInformacoesUsuario() {
    // Esta função é chamada quando o usuário clica 
    // no botão para obter informações.

    // Utiliza a função confirm() para mostrar uma caixa de
    // diálogo com uma mensagem perguntando se o usuário permite a coleta de informações.
    if (confirm("Deseja permitir que o site colete informações sobre você?")) {
        // Caso o usuário clique em "OK", o código dentro deste bloco será executado.

        // Acessa o elemento HTML com o id 'informacoes' e limpa
        // qualquer texto que ele possa ter.
        document.getElementById('informacoes').innerText = '';

        // Realiza uma requisição para a API ipify para obter o
        // endereço IP público do usuário.
        fetch('https://api.ipify.org?format=json')
            .then(resposta => {
                // A função fetch() retorna uma promessa que, quando
                // concluída, passa a resposta da API para a próxima função.
                
                return resposta.json(); // Converte a resposta da API de
                                        // formato JSON para um objeto JavaScript.
            })
            .then(dados => {
                // Dados da resposta da API são processados nesta função.

                // Cria uma string contendo o endereço IP retornado pela API.
                const infoIP = `IP: ${dados.ip}\n`; 
                
                // Chama a função obterLocalizacao passando o IP
                // obtido e a string formatada.
                obterLocalizacao(dados.ip, infoIP); 

            })
            .catch(erro => {
                // Se houver algum erro na requisição da API, este bloco será executado.

                // Exibe uma mensagem de erro no console do navegador.
                console.error('Erro ao obter o IP:', erro); 

                // Exibe uma mensagem de erro no elemento HTML 'informacoes'.
                document.getElementById('informacoes').innerText = 'Erro ao obter o IP.'; 

            });
    } else {

        // Caso o usuário clique em "Cancelar" na caixa de diálogo
        // confirm(), este bloco de código será executado.

        // Acessa o elemento HTML com o id 'informacoes' e define
        // seu texto para a mensagem abaixo.
        document.getElementById('informacoes').innerText = 'Autorização negada pelo usuário.';

    }
}

function obterLocalizacao(ip, infoIP) {
    // Esta função é chamada para obter informações adicionais de
    // localização com base no IP do usuário.

    // Realiza uma requisição para a API 'ipapi.co' para obter
    // informações de localização do endereço IP fornecido.
    fetch(`https://ipapi.co/${ip}/json/`)
        .then(resposta => {
            // A função fetch() retorna uma promessa que, quando
            // resolvida, passa a resposta da API para a próxima função.
            // Este bloco de código é executado quando a resposta
            // da API é recebida com sucesso.

            // Converte a resposta, que vem no formato JSON,
            // para um objeto JavaScript utilizável.
            return resposta.json(); 
            
        })
        .then(dadosLocal => {
            // Este bloco é executado após a conversão da resposta
            // da API em um objeto JavaScript.

            // Constrói uma string formatada contendo o país, cidade e
            // região obtidos da resposta da API.
            const localizacao = `País: ${dadosLocal.country_name}\nCidade: ${dadosLocal.city}\nRegião: ${dadosLocal.region}\n`;

            // Chama a função coletarInfoNavegador para obter
            // informações do navegador do usuário.
            const infoUsuario = coletarInfoNavegador();

            // Atualiza o elemento HTML com id 'informacoes', adicionando as
            // informações de IP, localização e navegador.
            document.getElementById('informacoes').innerText = infoIP + localizacao + infoUsuario;

        })
        .catch(erro => {
            // Este bloco é executado se ocorrer algum erro durante a
            // requisição à API ou na conversão da resposta.

            // Exibe uma mensagem de erro no console do navegador.
            console.error('Erro ao obter localização:', erro); 
            
            // Atualiza o elemento HTML com id 'informacoes' para mostrar o IP e
            // uma mensagem de erro de localização, seguida pelas informações do navegador.
            document.getElementById('informacoes').innerText = infoIP + 'Erro ao obter localização.\n' + coletarInfoNavegador();

        });

}

function coletarInfoNavegador() {
    // Esta função coleta informações detalhadas sobre o
    // navegador e o dispositivo do usuário.

    // Chama a função 'identificarTipoDispositivo' para
    // determinar se o dispositivo é móvel, tablet ou desktop.
    const tipoDispositivo = identificarTipoDispositivo();

    // Cria um objeto com várias propriedades que descrevem o
    // navegador e o dispositivo do usuário.
    const informacoesUsuario = {

        // Adiciona o tipo de dispositivo identificado anteriormente.
        'Tipo de Dispositivo': tipoDispositivo,
        
        // Captura a string do agente do usuário, que contém
        // informações sobre o navegador e o sistema operacional.
        'Navegador': navigator.userAgent, 

        // Fornece uma string que indica em qual plataforma o
        // navegador está executando (como Windows, Mac, Linux).
        'Plataforma': navigator.platform,
        
        // Retorna o idioma preferido do usuário, geralmente configurado no navegador.
        'Língua': navigator.language, 

        // Verifica se o navegador suporta a API de Conexão de Rede. Se sim,
        // retorna o tipo efetivo de conexão (como '4g'); se não, retorna 'Não disponível'.
        'Conexão': navigator.connection ? navigator.connection.effectiveType : 'Não disponível' 

    };

    // Converte o objeto 'informacoesUsuario' para uma string JSON
    // formatada para exibição. O segundo argumento 'null' é usado para
    // não modificar as chaves durante a conversão, e o número 2 indica que
    // cada nível no JSON resultante deve ter um recuo de dois espaços.
    return JSON.stringify(informacoesUsuario, null, 2);

}


function identificarTipoDispositivo() {
    // Esta função avalia o tipo de dispositivo com base nas
    // informações do agente do usuário do navegador.

    // Converte a string do agente do usuário para minúsculas para
    // garantir que a comparação de texto seja insensível a maiúsculas e minúsculas.
    const userAgent = navigator.userAgent.toLowerCase();

    // Verifica se a string do agente do usuário contém palavras-chave
    // que indicam um dispositivo móvel.
    if (/mobile|android|kindle|silk|midp|pocket/i.test(userAgent)) {

        // Se encontrar alguma das palavras-chave indicativas de
        // dispositivos móveis, retorna 'Móvel'.
        return 'Móvel';

    } else if (/tablet|ipad/i.test(userAgent)) {

        // Se encontrar palavras-chave que geralmente
        // indicam um tablet, retorna 'Tablet'.
        return 'Tablet';

    } else {

        // Se não encontrar nenhuma das palavras-chave
        // acima, assume que é um Desktop.
        return 'Desktop';
        
    }
}

