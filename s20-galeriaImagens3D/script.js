let caixa = document.querySelector('.caixa');
/* Declaração de uma variável chamada 'caixa'. Utiliza-se o 
         método `document.querySelector` para selecionar o 
         primeiro elemento no documento HTML que corresponde ao 
         seletor CSS especificado ('.caixa'). 
  O resultado é armazenado na variável 'caixa', permitindo 
         que esse elemento seja manipulado ou acessado mais 
         tarde no script.
  O seletor '.caixa' indica que estamos procurando um 
         elemento com a classe 'caixa'. */


function abrirImagem(numero) {
    /* Definição de uma função chamada 'abrirImagem'. Essa 
               função é projetada para ser chamada com um 
               argumento 'numero', que indica um número 
               específico associado a uma imagem.
       O parâmetro 'numero' é usado para construir 
               dinamicamente o URL da imagem e sua descrição. */

    let url = `imagem.html?imagem=Imagem${numero}.jpg&descricao=${numero}`;
    /* Declaração de uma variável chamada 'url'. A string é 
               construída usando template literals (indicado pelos 
               acentos graves `), o que permite a interpolação de 
               expressões dentro da string.
       A URL construída aponta para 'imagem.html' e 
               inclui dois parâmetros de consulta:
       1. 'imagem' - O caminho do arquivo da imagem, 
               construído dinamicamente com base no parâmetro 'numero'. 
               Exemplo: se 'numero' é 5, o caminho da imagem 
               será 'Imagem5.jpg'.
       2. 'descricao' - Uma descrição que, neste caso, é 
               simplesmente o número da imagem, usado de forma 
               redundante com o nome da imagem. Esta parte poderia 
               ser expandida para incluir descrições mais significativas. */

    window.open(url, '_blank');
    /* Utiliza o método `window.open` para abrir uma nova janela ou 
               aba do navegador com a URL especificada.
       - O primeiro argumento, 'url', é a URL que acabamos de 
               construir, que direciona para a página da imagem com os 
               parâmetros apropriados.
       - O segundo argumento, '_blank', instrui o navegador a 
               abrir a URL em uma nova aba ou janela, permitindo que o 
               usuário veja a imagem sem perder o conteúdo 
               atualmente exibido. */
               
}