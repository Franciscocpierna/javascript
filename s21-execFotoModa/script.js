// Adiciona um ouvinte de evento ao documento para 
         // executar a função quando todo o conteúdo
         // DOM (Document Object Model) for carregado.
document.addEventListener('DOMContentLoaded', () => {
    /* Este ouvinte de evento garante que o script só seráF
            executado depois que todo o HTML da página for 
            completamente carregado, evitando erros que ocorrem 
            quando o JavaScript tenta acessar elementos que 
            ainda não foram renderizados no DOM. */

    // Seleciona todos os elementos de imagem dentro 
            // dos slides da galeria.
    const slides = document.querySelectorAll('.galeria-slide img');
    /* `document.querySelectorAll` retorna todos os 
               elementos que correspondem ao seletor CSS especificado.
       Aqui, ele está buscando por qualquer tag <img> 
               dentro de elementos com a classe 'galeria-slide',
               assumindo que cada slide da galeria contém uma imagem. */

    // Obtém a imagem onde será exibida a foto selecionada.
    const imagemSelecionada = document.getElementById('imagem-selecionada');
    /* `document.getElementById` busca um elemento pelo seu ID único.
       'imagem-selecionada' é o ID do elemento <img> onde a 
               imagem clicada será mostrada em tamanho maior. */

    // Obtém o elemento que mostrará a descrição da imagem.
    const descricaoImagem = document.getElementById('descricao-imagem');
    /* Semelhante ao acima, esta linha seleciona o 
               elemento <p> pelo ID 'descricao-imagem',
               que é usado para mostrar a descrição textual 
               da imagem que está sendo exibida. */

    // Adiciona um ouvinte de evento a cada imagem dentro da 
               // galeria para responder ao clique.
    slides.forEach(slide => {
        /* `forEach` é usado para iterar sobre cada item no 
                  NodeList retornado por `querySelectorAll`.
           'slide' é uma referência para cada elemento <img> 
                  encontrado dentro dos slides da galeria. */

        slide.addEventListener('click', () => {
            /* Adiciona um ouvinte de evento de clique a 
                     cada imagem. Quando uma imagem é clicada,
                     a função anônima dentro de `addEventListener` é 
                     chamada. */

            imagemSelecionada.src = slide.src;
            /* Define a propriedade 'src' da imagem selecionada 
                     para ser a mesma do slide clicado.
               Isso faz com que a imagem selecionada mude para a 
                     imagem onde o usuário clicou. */

            descricaoImagem.textContent = slide.dataset.descricao;
            /* Atualiza o texto do elemento de descrição para 
                     refletir a descrição armazenada no 
                     atributo 'data-descricao' da imagem clicada.
               'dataset.descricao' acessa o valor do atributo 
                     de dados 'data-descricao' do slide clicado,
                     que é usado para armazenar informações 
                     adicionais que podem ser acessadas via JavaScript. */

        });
    });


   // Função para atualizar a imagem selecionada e a
         // descrição
   function atualizarImagem(slide) {

      // Define o 'src' da imagem selecionada para ser o
            // mesmo 'src' da imagem do slide clicado.
      // Isso atualiza a imagem principal com a imagem do
            // slide que foi clicado.
      imagemSelecionada.src = slide.src;

      // Define o texto do elemento de descrição da imagem
            // para ser igual ao valor do atributo 'data-descricao'
            // da imagem do slide clicado.
      // Isso atualiza o texto descritivo exibido com a
            // descrição correspondente à imagem selecionada.
      descricaoImagem.textContent = slide.dataset.descricao;

   }

   // Adiciona um ouvinte de evento a cada imagem dentro da
            // galeria para responder ao clique.
   slides.forEach(slide => {

      // Para cada imagem ('slide') na galeria, adiciona um
            // ouvinte de evento de clique.
      slide.addEventListener('click', () => {

         // Quando a imagem do slide é clicada, chama a
               // função 'atualizarImagem' passando a
               // imagem do slide clicado.
         // Isso atualiza a imagem principal e a
               // descrição para refletir a imagem clicada.
         atualizarImagem(slide);

      });
   });

   // Verifica se há pelo menos uma imagem na galeria.
   if (slides.length > 0) {

      // Se houver uma ou mais imagens na galeria, chama a
               // função 'atualizarImagem' com a primeira
               // imagem da galeria (slides[0]).
      // Isso simula um clique na primeira imagem ao carregar a
               // página, atualizando a imagem principal e a
               // descrição com a primeira imagem da galeria.
      atualizarImagem(slides[0]);

   }


});