// Adiciona um ouvinte de evento 'change' ao elemento de
            // entrada de arquivo com o ID 'selecionarArquivo'.
document.getElementById('selecionarArquivo').addEventListener('change', function(evento) {
    // Esta linha de código seleciona o elemento DOM com o
            // ID 'selecionarArquivo', que é um campo de entrada
            // para arquivos. Em seguida, um ouvinte de evento é
            // adicionado a este elemento. O tipo de evento que
            // estamos ouvindo é 'change', que é disparado quando o
            // valor do campo de entrada (neste caso, o arquivo
            // selecionado pelo usuário) muda. A função passada como
            // segundo argumento será chamada sempre que esse evento ocorrer.

    // Armazena o primeiro arquivo selecionado pelo usuário na variável 'arquivo'.
    // Aqui, 'evento.target' se refere ao elemento DOM que
            // disparou o evento, ou seja, nosso campo de
            // entrada de arquivo. 'files' é uma propriedade desse
            // elemento que contém uma lista dos arquivos selecionados. 
    // '[0]' acessa o primeiro arquivo dessa lista. 
    // A variável 'arquivo' agora contém uma referência ao arquivo
            // selecionado pelo usuário, permitindo que seu conteúdo
            // seja acessado e manipulado pelo script.
    const arquivo = evento.target.files[0];
    
    // Se não houver arquivo selecionado, encerra a função prematuramente.
    // Esta linha verifica se a variável 'arquivo' é falsa, o que
            // seria o caso se nenhum arquivo estivesse selecionado.
            // Se for verdadeiro que 'arquivo' não existe (ou seja, é falsa),
            // a palavra-chave 'return' encerra a execução da função
            // imediatamente. Isso é uma medida de segurança para evitar
            // erros ao tentar ler um arquivo inexistente.
    if (!arquivo) return;
    
    // Cria um novo objeto FileReader, que permite a leitura do
            // conteúdo de arquivos armazenados no dispositivo do usuário.
    // 'FileReader' é uma classe JavaScript que fornece
            // funcionalidades para ler o conteúdo de arquivos Blob e
            // File (como os arquivos selecionados num campo de
            // entrada de arquivo). Ao instanciar 'FileReader', criamos um
            // novo objeto 'leitor' que pode ser usado para iniciar a
            // leitura do arquivo e definir funções de callback que
            // reagem aos resultados dessa leitura (por exemplo,
            // quando a leitura é concluída ou ocorre um erro).
    const leitor = new FileReader();
    

    // Define uma função que será chamada quando o
            // FileReader concluir a leitura do arquivo.
    leitor.onload = function(evento) {

        // Cria um novo objeto Image, que será usado para
                // carregar e renderizar a imagem.
        const img = new Image();

        // Define uma função que será chamada quando a
                // imagem for carregada com sucesso.
        // Esta linha estabelece uma função de callback para o
                // evento 'load' do objeto 'img'. Esse evento é
                // disparado quando a imagem termina de carregar
                // completamente. Isso é crucial porque a imagem precisa
                // ser completamente carregada antes de qualquer processamento.
        img.onload = function() {
            
            // Obtém o elemento <canvas> pelo seu ID 'canvas'.
            // Acessa o elemento <canvas> do DOM usando seu ID.
            // O canvas é usado para manipulação gráfica, como
                    // desenhar e processar imagens.
            const canvas = document.getElementById('canvas');
            
            // Obtém o contexto 2D do canvas, que permite
                    // realizar operações de desenho.
            // 'getContext('2d')' é um método do elemento <canvas> que
                    // retorna um contexto de desenho no canvas, ou
                    // seja, um objeto que fornece funções e propriedades
                    // para desenhar e manipular gráficos no canvas.
            // Aqui, estamos trabalhando com gráficos 2D.
            const contexto = canvas.getContext('2d');
            
            // Define a largura e altura do canvas com base nas dimensões da imagem carregada.
            // Estas linhas ajustam a largura e a altura do canvas para
                    // serem iguais às da imagem carregada. Isso garante que a
                    // imagem seja desenhada no canvas sem distorção de escala.
            canvas.width = img.width;
            canvas.height = img.height;
            
            // Desenha a imagem no canvas, ocupando todo o espaço disponível.
            // O método 'drawImage' do contexto 2D desenha a imagem 'img' no
                    // canvas. Os parâmetros '0, 0' definem a posição inicial no
                    // canvas onde a imagem começará a ser desenhada,
                    // e 'img.width, img.height' são as dimensões da imagem,
                    // garantindo que ela ocupe todo o canvas.
            contexto.drawImage(img, 0, 0, img.width, img.height);
            
            // Obtém os dados da imagem desenhada no canvas.
            // 'getImageData' é um método que retorna um objeto
                    // ImageData representando os dados de pixels para a área
                    // definida do canvas. Aqui, capturamos os dados de toda a área do canvas.
            const dadosImagem = contexto.getImageData(0, 0, canvas.width, canvas.height);
            
            // Usa a função jsQR para tentar decodificar um QR Code a partir dos dados da imagem.
            // 'jsQR' é uma função de uma biblioteca externa que tenta
                    // decodificar um QR Code dado um conjunto de dados de
                    // imagem (pixels). Se um QR Code válido for encontrado,
                    // retorna seus dados; caso contrário, retorna null.
            const codigo = jsQR(dadosImagem.data, canvas.width, canvas.height);
            
            // Verifica se um QR Code foi decodificado com sucesso.
            if (codigo) {

                // Atualiza o texto do elemento com ID 'resultado' com
                        // os dados do QR Code lido.
                // Se um código QR foi decodificado com sucesso, o
                        // elemento com ID 'resultado' é atualizado para
                        // mostrar os dados do QR Code.
                document.getElementById('resultado').innerText = `Código QR lido: ${codigo.data}`;
                
            } else {

                // Atualiza o texto do elemento com ID 'resultado' para
                        // informar que a leitura falhou.
                // Se nenhum QR Code válido foi decodificado, uma
                        // mensagem de erro é exibida ao usuário.
                document.getElementById('resultado').innerText = 'Não foi possível ler o QR Code. Tente novamente.';
                
            }
        };

        // Define a fonte da imagem como o resultado da leitura do
                // arquivo, que é uma URL representando os dados da imagem.
        // Aqui, a fonte da imagem 'img' é definida como o resultado do
                // FileReader, que é uma URL de dados base64 representando o
                // arquivo de imagem carregado. Esta linha efetivamente inicia o
                // carregamento da imagem, que, quando concluído, dispara o
                // evento 'load' e, consequentemente, a função de callback 'onload'.
        img.src = evento.target.result;
        


    };

    // Inicia a leitura do arquivo como uma URL de dados (base64).
    leitor.readAsDataURL(arquivo);

});