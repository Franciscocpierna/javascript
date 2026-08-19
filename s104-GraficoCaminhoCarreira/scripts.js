document.addEventListener('DOMContentLoaded', function() {
    // Esta linha configura um ouvinte de eventos que dispara 
            // quando todo o documento HTML foi completamente carregado e analisado.
    // O evento 'DOMContentLoaded' é crucial para executar JavaScript 
            // que modifica elementos DOM, garantindo que todos os 
            // elementos estejam acessíveis.

    const etapasCarreira = [
        // 'etapasCarreira' é um array de objetos, cada um representando um 
                // nível ou estágio diferente em uma carreira.
        // Cada objeto tem três propriedades: 'titulo', 'min' e 'max', 
                // representando o título do nível,
                // e os limiares mínimos e máximos para aquele nível.
        { titulo: 'Nível 0', min: 0, max: 9 },
        { titulo: 'Nível 1', min: 10, max: 19 },
        { titulo: 'Nível 2', min: 20, max: 29 },
        { titulo: 'Nível 3', min: 30, max: 39 },
        { titulo: 'Nível 4', min: 40, max: 49 },
        { titulo: 'Nível 5', min: 50, max: 59 },
        { titulo: 'Nível 6', min: 60, max: 69 },
        { titulo: 'Nível 7', min: 70, max: 79 },
        { titulo: 'Nível 8', min: 80, max: 89 },
        { titulo: 'Nível 9', min: 90, max: 99 },
        { titulo: 'Nível 10', min: 100, max: 110 }
    ];

    // As seguintes linhas recuperam e armazenam referências a 
            // importantes elementos DOM que serão manipulados com 
            // base nas interações do usuário e nos dados.
    const graficoBarras = document.getElementById('graficoBarras');
    // 'graficoBarras' é o contêiner para o gráfico de barras. É onde a 
            // representação visual de cada estágio da carreira será 
            // criada dinamicamente.

    const seletorVendedor = document.getElementById('seletorVendedor');
    // 'seletorVendedor' é um elemento de seleção dropdown que permitirá 
            // aos usuários escolher diferentes vendedores ou pessoal de 
            // vendas para ver sua progressão na carreira.

    const detalhesVendedor = document.getElementById('detalhesVendedor');
    // 'detalhesVendedor' é um elemento destinado a exibir informações 
            // detalhadas sobre o vendedor selecionado, como nome, vendas 
            // totais ou conquistas específicas.

    // Carregar dados do arquivo Excel
    fetch('dados.xlsx')
    
        // A função 'fetch' é usada para carregar o arquivo 'dados.xlsx'. 
                // Esta função realiza uma requisição HTTP GET para obter o arquivo.
        .then(response => response.arrayBuffer())
        // O método '.then' é utilizado para lidar com a resposta da 
                // requisição. 'response.arrayBuffer()' converte o conteúdo da resposta,
                // que é o arquivo Excel, em um ArrayBuffer. Um ArrayBuffer é 
                // uma forma de armazenar dados binários na memória, sendo útil 
                // para manipulação de arquivos.

        .then(data => {

            // Neste ponto, 'data' contém o arquivo Excel em forma de ArrayBuffer.
            var workbook = XLSX.read(data, { type: 'array' });
            // Utiliza a biblioteca XLSX para ler o ArrayBuffer. O parâmetro { type: 'array' } 
                    // indica que os dados estão em um ArrayBuffer.

            var nomeDaPlanilha = workbook.SheetNames[0]; // Obtém o nome da primeira planilha
            // 'SheetNames' é uma propriedade que armazena um array com os 
                    // nomes de todas as planilhas no arquivo Excel. O índice [0] 
                    // acessa o nome da primeira.

            var planilha = workbook.Sheets[nomeDaPlanilha];
            // 'Sheets' é um objeto que contém as planilhas propriamente ditas, 
                    // acessíveis pelo nome. 'nomeDaPlanilha' é usado para 
                    // obter a primeira planilha.

            var dadosJson = XLSX.utils.sheet_to_json(planilha);
            // 'sheet_to_json' é um método que converte a planilha especificada 
                    // em um array de objetos JSON, onde cada objeto representa 
                    // uma linha da planilha.


            // Preencher as opções do seletor de vendedores
            dadosJson.forEach(function(linha) {

                // Itera sobre cada linha dos dados convertidos em JSON.
                var opcao = document.createElement('option');
                // Cria um novo elemento <option> para o <select>. Cada <option> 
                        // representa uma opção no dropdown.

                opcao.value = linha['Vendedor'];
                // Define o atributo 'value' do <option>, que é o valor que 
                        // será enviado quando o formulário for submetido. Neste 
                        // caso, é o nome do vendedor.

                opcao.textContent = linha['Vendedor'];
                // Define o texto que será exibido no <option>, que é também o 
                        // nome do vendedor.

                seletorVendedor.appendChild(opcao);
                // Adiciona a opção criada ao <select> com o ID 'seletorVendedor'. 
                        // Isso atualiza a interface do usuário, mostrando as opções disponíveis.

            });


            // Adiciona um ouvinte de eventos ao seletor de vendedores que 
                    // reage a mudanças na seleção.
            seletorVendedor.addEventListener('change', function() {
                // A função é chamada sempre que o usuário altera a opção 
                        // selecionada no dropdown.

                var vendedorSelecionado = this.value;
                // 'this.value' refere-se ao valor atual selecionado no 
                        // dropdown, que é o nome do vendedor selecionado.

                var dadosVendedor = dadosJson.find(item => item['Vendedor'] === vendedorSelecionado);
                // Utiliza o método 'find' para procurar no array 'dadosJson' o 
                        // objeto que corresponde ao vendedor selecionado.
                // Isso retorna o objeto completo associado ao vendedor, que 
                        // contém todas as suas informações de vendas.

                if (dadosVendedor) {
                    // Verifica se um objeto foi encontrado. Se sim, significa 
                            // que há dados para o vendedor selecionado.

                    atualizarGrafico(dadosVendedor);
                    // Chama a função 'atualizarGrafico', passando como argumento os 
                            // dados do vendedor selecionado.
                    // Esta função é responsável por renderizar ou atualizar o 
                            // gráfico com os dados específicos do vendedor.

                }
            });

            // Verifica se há dados disponíveis após o carregamento do arquivo.
            if (dadosJson.length > 0) {

                // Se houver dados no array, procede com a inicialização do gráfico.
                seletorVendedor.value = dadosJson[0]['Vendedor'];
                // Define o valor do dropdown para o nome do primeiro vendedor na lista,
                // fazendo com que este seja o vendedor selecionado 
                        // quando a página é carregada.

                atualizarGrafico(dadosJson[0]);
                // Chama a função 'atualizarGrafico' para o primeiro 
                        // objeto de dados no array 'dadosJson',
                        // garantindo que o gráfico seja inicializado com os 
                        // dados do primeiro vendedor listado.

            }

        })
        .catch(error => console.error('Erro ao carregar o arquivo Excel:', error));
        // Este bloco 'catch' é executado se houver algum erro durante o 
                // processo de carregamento e processamento do arquivo Excel.
        // Ele registra o erro no console, facilitando a detecção e a 
                // correção de problemas no carregamento ou na leitura dos dados.


        function atualizarGrafico(dadosVendedor) {
            // A função recebe um objeto 'dadosVendedor' que contém 
                    // informações sobre as vendas de um vendedor específico.
        
            let vendas = dadosVendedor['Vendas'];
            // Extrai o valor das vendas do objeto de dados do vendedor. 
                    // Este valor é usado para determinar a altura das barras no gráfico.
        
            // Limpar gráfico existente
            graficoBarras.innerHTML = '';
            // Limpa todo o conteúdo interno do contêiner 'graficoBarras'. 
                    // Isso é necessário para remover qualquer visualização anterior
                    // e garantir que o gráfico será reconstruído com base nos 
                    // novos dados sem sobrepor aos antigos.
        
            etapasCarreira.forEach(etapa => {
                // Itera sobre cada etapa na carreira (definidas no array 
                        // 'etapasCarreira'). Cada etapa tem um título e um 
                                // intervalo de valores de vendas.

                const divBarra = document.createElement('div');
                // Cria um novo elemento div para cada barra do gráfico.

                divBarra.className = 'barra';
                // Atribui a classe 'barra' à div criada, o que permite 
                        // estilizar a barra utilizando CSS.
        
                divBarra.style.height = `${etapa.max}%`;
                // Define a altura da barra como um percentual máximo da etapa,
                        // permitindo visualizar graficamente até onde cada etapa 
                        // alcança em termos de valor de vendas.
        
                const label = document.createElement('div');
                // Cria uma nova div para o rótulo que descreverá a etapa.

                label.className = 'label';
                // Atribui a classe 'label' à div do rótulo, para estilização via CSS.
        
                label.innerHTML = `${etapa.titulo}`;
                // Define o conteúdo HTML da div do rótulo para o título da etapa, 
                        // que é exibido diretamente abaixo ou dentro da barra correspondente.
        
                divBarra.appendChild(label);
                // Adiciona a div do rótulo como um filho da div da barra, 
                        // posicionando o rótulo dentro ou abaixo da barra no gráfico.
        
                if (vendas >= 100) {

                    vendas = 100;
                    // Limita o valor de vendas a 100 para evitar que o 
                            // gráfico exceda o valor máximo definido, mantendo a 
                            // escala do gráfico consistente.

                }
        

                // Ajustar o valor de vendas para 100 se for maior ou igual a 100
                if (vendas >= etapa.min && vendas <= etapa.max) {

                    // Este bloco de condição verifica se o valor de vendas do 
                            // vendedor está dentro do intervalo definido para a etapa atual.
                    // Isso determina se uma barra deve ser destacada como 
                            // representante do vendedor atual.

                    divBarra.classList.add('vendedor');
                    // Adiciona a classe 'vendedor' à div da barra. Esta classe 
                            // pode ser usada para aplicar estilos específicos, 
                            // como uma cor de fundo diferente, que destaca a 
                            // barra no gráfico como pertencente ao vendedor selecionado.

                    const img = document.createElement('img');
                    // Cria um novo elemento de imagem que será adicionado à 
                            // barra para fornecer um indicativo visual, como 
                            // um ícone ou uma foto.

                    img.src = 'vendedor.png'; // Imagem genérica do vendedor
                    // Define o caminho para a imagem que representa o vendedor. 
                            // Esta imagem é usada como um marcador visual na 
                            // barra correspondente.

                    img.alt = dadosVendedor['Vendedor'];
                    // Define o texto alternativo da imagem, que é o nome do 
                            // vendedor. Isso melhora a acessibilidade e é exibido 
                            // se a imagem não puder ser carregada.

                    img.style.position = 'absolute';
                    // Configura a posição da imagem como absoluta. Isso permite 
                            // que a imagem seja posicionada em relação à barra, 
                            // que tem posição relativa.

                    img.style.bottom = '100%'; // Ajustar a posição para o topo da barra
                    // Posiciona a imagem no topo da barra. '100%' empurra a imagem 
                            // para cima da borda superior da barra, colocando-a acima da barra.

                    img.style.left = '50%'; // Centralizar a imagem horizontalmente
                    // Posiciona a imagem no centro horizontal da barra.

                    img.style.transform = 'translateX(-50%)'; // Centralizar a imagem horizontalmente
                    // O transform 'translateX(-50%)' é usado para ajustar a 
                            // centralização da imagem, movendo-a metade de 
                            // sua largura para a esquerda, o que ajuda a garantir 
                            // que a imagem esteja perfeitamente centralizada sobre a barra.

                    // Define a posição da barra como relativa para permitir a 
                            // posição absoluta da imagem
                    divBarra.style.position = 'relative'; 
                    // Assegura que a barra possa servir como contêiner de 
                            // posicionamento para a imagem, que usa posicionamento absoluto.

                    divBarra.appendChild(img);
                    // Adiciona a imagem à barra, efetivando todas as configurações 
                            // de estilo e posicionamento descritas.

                }

                graficoBarras.appendChild(divBarra);
                // Adiciona a barra configurada ao contêiner do gráfico de barras. 
                        // Esta ação finaliza a criação de uma barra individual no gráfico,
                        // com todos os seus elementos e estilos configurados conforme necessário.

            });
        
            // Atualizar detalhes do vendedor
            // Esta linha de código é responsável por atualizar o conteúdo do 
                    // elemento HTML identificado por 'detalhesVendedor'.
            // Utiliza 'innerHTML' para substituir todo o conteúdo existente 
                    // dentro do elemento com novos dados formatados.
            detalhesVendedor.innerHTML = `<span>Vendedor: ${dadosVendedor['Vendedor']}</span><span>Total de Vendas: ${dadosVendedor['Vendas']}</span>`;
            // Utiliza literais de template (template literals) marcados por 
                    // backticks (` `) para permitir a inserção de expressões embutidas.
            // ${dadosVendedor['Vendedor']} - Insere dinamicamente o nome do 
                    // vendedor no primeiro <span>. Este valor é extraído do 
                    // objeto 'dadosVendedor'.
            // ${dadosVendedor['Vendas']} - Insere dinamicamente o total de 
                    // vendas do vendedor no segundo <span>. Este valor também é 
                    // retirado de 'dadosVendedor'.
            // Cada valor é encapsulado em um elemento <span> para permitir 
                    // estilização individual, como destacar o nome do vendedor 
                    // ou o total de vendas separadamente.
            // Isso atualiza a interface do usuário com informações relevantes e 
                    // atualizadas sobre o vendedor selecionado, melhorando a 
                    // interatividade e fornecendo dados úteis ao usuário.

        }
        
        
});