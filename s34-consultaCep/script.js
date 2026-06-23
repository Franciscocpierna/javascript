// Acessa o elemento da página HTML com o ID 'botao-buscar' e 
// adiciona um ouvinte de evento que responde a cliques neste botão.
document.getElementById('botao-buscar').addEventListener('click', function() {

    // Inicia acessando o elemento do HTML pelo seu ID 'campo-cep'. 
    // O ID é um identificador único usado para localizar e retornar o elemento para o script.
    var cep = document.getElementById('campo-cep').value.trim(); 

    // ↑ Declaração da variável 'cep'. Aqui, várias ações estão sendo realizadas:
    // 1. `document.getElementById('campo-cep')`: Acessa o elemento de
                // entrada onde os usuários digitam o CEP.
    //    - 'document' é o objeto que representa todo o documento HTML.
    //    - `.getElementById()` é um método que retorna o elemento que
                // possui o ID especificado no documento.
    //    - 'campo-cep' é o ID do elemento de entrada HTML que estamos acessando.
    // 2. `.value`: Esta propriedade retorna o valor atual do campo de
                // entrada (o que o usuário digitou).
    // 3. `.trim()`: Este método é chamado no valor retornado. `trim()` é
                // um método de String em JavaScript que remove espaços em 
                // branco do início e do fim da string.
    //    - Espaços em branco incluem espaços, tabs, saltos de linha e outros 
                // caracteres de espaço invisíveis.
    //    - A utilização de `.trim()` é importante para assegurar que 
                // espaços extras não afetem a consulta ao CEP, como por 
                // exemplo, um usuário acidentalmente digitando espaços 
                // antes ou depois dos números.

    // O valor processado (CEP sem espaços extras) é armazenado na 
    // variável 'cep', que agora contém a string limpa para ser 
    // usada na solicitação à API.

  
    // A estrutura condicional 'if' verifica se a variável 'cep' contém algum valor.
    if(cep) {

        // Se 'cep' não está vazio, faz uma solicitação à API do ViaCEP
        //  usando 'fetch', que é uma função que permite fazer solicitações
        // de rede, como acessar uma URL.
        fetch(`https://viacep.com.br/ws/${cep}/json/`)

            // Após receber a resposta, converte os dados de JSON 
            // para um objeto JavaScript.
            .then(resposta => resposta.json()) 

            // Com os dados convertidos, esse bloco de código é executado.
            .then(dados => { 

                // Verifica se os dados recebidos contêm a propriedade 'erro'. 
                // Isso acontece se o CEP não for encontrado.
                if(dados.erro) {

                    // A condição 'if' checa se a propriedade 'erro' existe no objeto 'dados'.
                    // Se 'dados.erro' é verdadeiro, significa que a API retornou
                    // um erro, indicando que o CEP fornecido não foi encontrado.

                    // Se o CEP não for encontrado, atualiza o conteúdo do elemento
                    //  com ID 'resultado' para mostrar uma mensagem de erro.
                    document.getElementById('resultado').innerHTML = '<p>CEP não encontrado.</p>';

                    // ↑ Utiliza o método 'getElementById' para selecionar o elemento HTML
                    //  cujo ID é 'resultado'.
                    // A propriedade 'innerHTML' desse elemento é então definida para
                    // incluir um parágrafo com o texto "CEP não encontrado."
                    // 'innerHTML' é uma forma de manipular o conteúdo HTML de um
                    // elemento diretamente, permitindo inserir novos elementos HTML ou
                    // alterar o conteúdo existente.
                    // A mensagem de erro serve para informar ao usuário que o CEP
                    // digitado não retornou resultados válidos.

                } else {
                    
                    // Se não houver erro, o conteúdo do elemento 'resultado' é
                    // atualizado com detalhes do endereço.
                    document.getElementById('resultado').innerHTML = `
                        <p><strong>Endereço:</strong> ${dados.logradouro}</p>
                        <p><strong>Bairro:</strong> ${dados.bairro}</p>
                        <p><strong>Cidade:</strong> ${dados.localidade}</p>
                        <p><strong>Estado:</strong> ${dados.uf}</p>
                        <p><strong>CEP:</strong> ${dados.cep}</p>
                    `;

                    // Se a propriedade 'erro' não estiver presente no objeto
                    // 'dados', significa que um endereço válido foi retornado.
                    // A propriedade 'innerHTML' do mesmo elemento 'resultado' é
                    // usada novamente, desta vez para apresentar os detalhes do endereço.
                    // Os detalhes incluem logradouro, bairro, cidade, estado e o CEP consultado.
                    // Cada um desses detalhes é acessado diretamente do objeto 'dados'
                    // que foi convertido de JSON e inserido em elementos HTML para melhor apresentação.
                    // Esta parte do código é crucial para exibir ao usuário as
                    // informações retornadas pela API de forma clara e estruturada.

                }
            })

            // Em caso de qualquer erro na solicitação de rede, este bloco será executado.
            .catch(() => { 

                // Atualiza o elemento 'resultado' para mostrar uma mensagem
                // indicando que ocorreu um erro ao buscar o CEP.
                document.getElementById('resultado').innerHTML = '<p>Erro ao buscar o CEP.</p>';

            });
        }
  });
  
