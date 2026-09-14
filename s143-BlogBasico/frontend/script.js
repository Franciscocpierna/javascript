// Define uma constante para a URL da API, que é usada 
//      para enviar pedidos ao servidor. 
// Neste caso, a API está sendo executada localmente na porta 3000.
const API_URL = "http://localhost:3000/api/posts";

// Declaração de uma função assíncrona chamada 'createPost', que é 
//      chamada durante o evento de submissão de um formulário.
// A palavra-chave 'async' indica que a função pode realizar 
//      operações assíncronas, permitindo o uso do 'await'.
async function createPost(event) {

  // 'event.preventDefault()' impede o comportamento padrão do 
  //    evento, que no caso de um formulário é recarregar a página.
  event.preventDefault();

  // Obtém o valor do elemento de entrada de texto do 
  //      documento HTML pelo seu ID 'postText'. 
  // Este valor é o que o usuário digitou no campo de texto do formulário.
  const postText = document.getElementById("postText").value;

  // Obtém o primeiro arquivo selecionado pelo usuário no campo de 
  //      entrada do tipo 'file', que é identificado por 'postImage'.
  // 'document.getElementById("postImage").files' retorna uma lista de 
  //      arquivos, onde '[0]' acessa o primeiro arquivo.
  const postImage = document.getElementById("postImage").files[0];

  // Verifica se o campo de texto foi deixado vazio após remover 
  //      espaços extras (com a função 'trim()').
  // Se estiver vazio, mostra um alerta para o usuário e retorna 
  //      prematuramente da função para evitar o envio do formulário.
  if (!postText.trim()) {
    alert("O campo de texto não pode estar vazio.");
    return;
  }

  // Cria um novo objeto FormData. FormData é uma maneira de construir um 
  //      conjunto de pares chave/valor representando campos de 
  //      formulário e seus valores, que podem ser enviados através 
  //      de uma requisição HTTP. 
  // É especialmente útil para enviar arquivos via AJAX.
  const formData = new FormData();

  // Adiciona o texto do post ao objeto formData. 'text' é 
  //      a chave e 'postText' é o valor.
  // 'postText' contém o texto que o usuário digitou no campo 
  //      de texto do formulário.
  formData.append("text", postText);

  // Verifica se um arquivo de imagem foi realmente selecionado 
  //      antes de tentar adicioná-lo ao objeto formData.
  // Isso é importante porque tentar adicionar um arquivo não 
  //      existente ao formData pode causar erros.
  if (postImage) {

    // Adiciona o arquivo de imagem ao objeto formData. 'image' é 
    //     a chave e 'postImage' é o valor.
    // 'postImage' é o arquivo selecionado pelo usuário no 
    //     campo de entrada do tipo 'file'.
    formData.append("image", postImage);

  }


// Inicia um bloco de tentativa para capturar erros que 
//      podem ocorrer ao fazer uma requisição HTTP.
try {

    // Aguarda uma resposta do servidor após enviar uma 
    //      requisição POST com o objeto 'formData' que contém os 
    //      dados do formulário.
    const response = await fetch(API_URL, {

      // Define o método HTTP como POST, indicando que os 
      //      dados serão enviados ao servidor.
      method: "POST", 

      // Anexa os dados do formulário que incluem texto e uma imagem.
      body: formData, 

    });

    // Verifica se a resposta do servidor não foi bem-sucedida (i.e., o 
    //      status não está no intervalo de 200-299).
    if (!response.ok) {

      // Lança um erro com uma mensagem específica se a 
      //      resposta não for bem-sucedida.
      throw new Error("Erro ao criar post.");

    }

    // Aguarda a conversão da resposta do servidor de JSON 
    //      para um objeto JavaScript.
    const data = await response.json();

    // Exibe um alerta com a mensagem recebida do servidor, 
    //      indicando sucesso ou falha na operação.
    alert(data.message);
    
    // Reseta o formulário para limpar os campos após o envio bem-sucedido.
    document.getElementById("createPostForm").reset();

    // Redefine o texto do elemento que mostra o nome do arquivo 
    //      para "Nenhum arquivo escolhido".
    document.getElementById("nomeArquivo").textContent = "Nenhum arquivo escolhido";

    // Chama a função 'loadPosts' para atualizar a lista de posts 
    //      exibida na página, refletindo a nova postagem adicionada.
    loadPosts();

  // Captura qualquer erro que ocorra durante a 
  //      execução do bloco 'try'.
  } catch (error) { 

    // Registra o erro no console do navegador, útil para 
    //      diagnóstico de erros por desenvolvedores.
    console.error("Erro ao criar post:", error);

    // Exibe um alerta informando que um erro ocorreu e sugere 
    //      verificar o console para mais detalhes.
    alert("Erro ao criar post. Veja o console.");

  }

}

// Adiciona um ouvinte de evento 'submit' ao formulário 
//      identificado por 'createPostForm'.
// Quando o formulário é submetido, a função 'createPost' é chamada.
document.getElementById("createPostForm").addEventListener("submit", createPost);


// Declara uma função assíncrona chamada 'loadPosts', que é 
//      responsável por carregar as postagens do servidor.
async function loadPosts() {

  // Inicia um bloco 'try' para capturar qualquer erro que 
  //      possa ocorrer durante a execução da função.
  try {

    // Envia uma requisição GET para o 'API_URL' e aguarda a 
    //      resposta do servidor.
    // A função 'fetch' é usada para realizar requisições HTTP.
    const response = await fetch(API_URL);

    // Uma vez que a resposta é recebida, converte o conteúdo da 
    //      resposta de JSON para um objeto JavaScript.
    // O método '.json()' é uma promessa que quando 
    //      resolvida retorna um objeto JavaScript.
    const posts = await response.json();

    // Obtém o elemento do DOM com o id 'postsContainer', 
    //      onde as postagens serão exibidas.
    const postsContainer = document.getElementById("postsContainer");

    // Limpa todo o conteúdo HTML dentro de 'postsContainer' 
    //      definindo seu 'innerHTML' para uma string vazia.
    // Isso é necessário para remover quaisquer postagens 
    //      antigas antes de carregar as novas.
    postsContainer.innerHTML = "";

    // Itera sobre o array 'posts', onde cada 'post' representa uma 
    //      postagem individual obtida do servidor.
    // O método 'forEach' é utilizado para executar uma função 
    //      em cada item do array.
    posts.forEach((post) => {

      // Cria um novo elemento 'div' no documento. Este 'div' será 
      //      usado para conter os detalhes de uma postagem individual.
      const postElement = document.createElement("div");

      // Adiciona a classe 'post' ao elemento 'div' criado. Classes são 
      //      frequentemente usadas para aplicar estilos CSS específicos.
      // Isso facilita a estilização de todos os elementos de 
      //      postagem de forma consistente.
      postElement.classList.add("post");

      // Cria um novo elemento 'p' (parágrafo), que será 
      //      utilizado para mostrar o texto da postagem.
      const textParagraph = document.createElement("p");

      // Define o conteúdo de texto do parágrafo com o texto da postagem atual. 
      // 'post.text' é a propriedade que contém o texto da postagem, 
      //      conforme estruturado no objeto 'post'.
      textParagraph.textContent = post.text;

      // Anexa o parágrafo criado como um filho do elemento 'div' de postagem. 
      // Isso insere o parágrafo dentro do 'div', fazendo com que o texto da 
      //      postagem seja exibido dentro desse contêiner.
      postElement.appendChild(textParagraph);

      // Verifica se a postagem atual possui uma propriedade 'image'.
      // A propriedade 'image' contém o nome do arquivo de imagem 
      //      associado a uma postagem, se existir.
      if (post.image) {

        // Cria um novo elemento de imagem (<img>) no documento HTML.
        // Este elemento será usado para exibir a imagem da postagem.
        const imageElement = document.createElement("img");

        // Define o atributo 'src' do elemento de imagem.
        // 'src' especifica o caminho para a imagem que será carregada e 
        //      exibida no navegador.
        // Aqui, o caminho é construído concatenando o endereço do servidor, a 
        //      pasta de uploads e o nome da imagem da postagem.
        imageElement.src = `http://localhost:3000/uploads/${post.image}`;

        // Define o atributo 'alt' do elemento de imagem, que fornece um 
        //      texto alternativo para a imagem.
        // O texto alternativo é útil para acessibilidade e é exibido se a 
        //      imagem não puder ser carregada.
        // Aqui, o 'alt' é definido como "Imagem do post", que descreve o 
        //      conteúdo da imagem para usuários que usam leitores de tela ou 
        //      em casos onde a imagem não carrega.
        imageElement.alt = "Imagem do post";

        // Adiciona o elemento de imagem como um filho do elemento 'div' de postagem.
        // Isso coloca a imagem na página, dentro do contêiner da postagem 
        //      específica, abaixo do texto ou de qualquer outro 
        //      conteúdo já adicionado.
        postElement.appendChild(imageElement);

      }

      
      // Cria um novo elemento do tipo botão (<button>) no documento HTML.
      const deleteButton = document.createElement("button");

      // Define o texto que será exibido dentro do botão. 
      // Neste caso, o texto é "Deletar".
      // Isso informa claramente ao usuário que clicar neste botão 
      //      resultará na ação de deletar algo, neste contexto, uma postagem.
      deleteButton.textContent = "Deletar";

      // Adiciona um ouvinte de evento ao botão que escutará 
      //      por cliques ('click').
      // Quando o botão é clicado, a função 'deletePost' é 
      //      chamada com o ID da postagem como argumento.
      // Esta função é responsável por enviar uma requisição 
      //      para deletar a postagem no servidor.
      deleteButton.addEventListener("click", () => deletePost(post._id));

      // Adiciona o botão recém-criado ao elemento 'postElement', 
      //      que é o contêiner para a postagem individual.
      // Isso coloca o botão "Deletar" diretamente dentro do 
      //      contêiner da postagem, permitindo que cada postagem 
      //      tenha seu próprio botão de deletar.
      postElement.appendChild(deleteButton);

      // Adiciona o 'postElement', que agora inclui o texto da 
      //      postagem, uma imagem, e o botão de deletar,
      // ao 'postsContainer'. Este é o elemento principal que 
      //      contém todas as postagens na página.
      // Adicionar 'postElement' ao 'postsContainer' faz com 
      //      que a postagem apareça na página web.
      postsContainer.appendChild(postElement);

    });

  // O bloco 'catch' é usado para capturar e tratar erros 
  //       que ocorrem dentro do bloco 'try'.
  // Ele é executado apenas se um erro é lançado em algum 
  //      lugar dentro do bloco 'try'.
  } catch (error) {

    // Utiliza o método 'console.error' para registrar o 
    //      erro no console do navegador.
    // Este método não só mostra a mensagem de erro como 
    //      também inclui um stack trace, que pode ajudar 
    //      desenvolvedores a localizar a origem do erro no código.
    console.error("Erro ao carregar posts:", error);

    
  }

}

// Declara uma função assíncrona chamada 'deletePost' 
//        que aceita 'postId' como parâmetro.
// 'postId' é o identificador único da postagem que se deseja deletar.
async function deletePost(postId) {

  // Tenta executar o código dentro do bloco 'try', que é 
  //      susceptível a falhas, como a chamada de rede.
  try {

    // Realiza uma chamada de rede assíncrona usando 'fetch'. 
    // A URL é construída anexando o 'postId' à URL base da API.
    // O método HTTP 'DELETE' é especificado, indicando que o 
    //      objetivo é deletar o recurso no servidor.
    const response = await fetch(`${API_URL}/${postId}`, {
      method: "DELETE",
    });

    // Verifica se a resposta do servidor não foi bem-sucedida. 
    // O status 'ok' é falso se o status HTTP não estiver no intervalo 200-299.
    if (!response.ok) {

      // Lança um erro com uma mensagem específica se a 
      //      resposta não for bem-sucedida.
      // Isso interrompe a execução do código subsequente no bloco 'try'.
      throw new Error("Erro ao deletar post.");

    }

    // Converte a resposta do servidor de JSON para um objeto JavaScript.
    // Este passo é necessário porque a resposta vem como um stream JSON.
    const data = await response.json();

    // Exibe uma mensagem de alerta ao usuário com a resposta do 
    //      servidor, geralmente confirmando a ação de deletar ou 
    //      reportando algum erro ocorrido.
    alert(data.message);

    // Chama a função 'loadPosts' para atualizar a lista de 
    //      postagens exibida na página.
    // Isso é necessário para refletir a mudança no servidor, 
    //      removendo a postagem deletada da visão do usuário.
    loadPosts();

  // O bloco 'catch' é utilizado para capturar e tratar qualquer 
  //       erro que ocorra durante a execução do bloco 'try'.
  // Isso é crucial em operações que envolvem chamadas de rede, pois 
  //      muitos problemas podem surgir, como falhas de conexão ou 
  //      erros de servidor.
  } catch (error) {

    // Registra o erro no console do navegador usando 'console.error'.
    // Este método é mais apropriado para registrar erros do 
    //      que 'console.log', pois também registra um stack trace, 
    //      ajudando no diagnóstico do problema.
    console.error("Erro ao deletar post:", error);

    // Exibe um alerta para o usuário, informando que ocorreu um erro 
    //      durante a tentativa de deletar a postagem.
    // A mensagem sugere ao usuário verificar o console para mais 
    //      detalhes, o que pode ser útil para usuários técnicos ou 
    //      durante o desenvolvimento.
    alert("Erro ao deletar post. Veja o console.");

  }

}


// Atualiza o nome do arquivo selecionado
// Adiciona um ouvinte de evento 'change' ao elemento de entrada de 
//      arquivo identificado por 'postImage'.
// Este evento é disparado sempre que o usuário seleciona um 
//      arquivo no campo de entrada, permitindo que o código 
//      responda imediatamente à mudança.
document.getElementById("postImage").addEventListener("change", function() {
  
    // Obtém o elemento do DOM com o id 'nomeArquivo', que é usado 
    //      para exibir o nome do arquivo selecionado.
    const nomeArquivoSpan = document.getElementById("nomeArquivo");
  
    // Verifica se algum arquivo foi selecionado no campo de entrada.
    // 'this.files' contém a lista de arquivos selecionados, e 
    //      'this.files.length > 0' confirma que pelo menos um 
    //      arquivo está presente.
    if (this.files && this.files.length > 0) {
  
      // Define o conteúdo de texto do elemento 'nomeArquivoSpan' 
      //       para o nome do primeiro arquivo selecionado.
      // 'this.files[0].name' acessa o nome do primeiro arquivo na 
      //       lista de arquivos selecionados.
      nomeArquivoSpan.textContent = this.files[0].name;
  
    } else {
  
      // Caso nenhum arquivo seja selecionado (por exemplo, se o 
      //      usuário cancelar a seleção), define o conteúdo de 
      //      texto para "Nenhum arquivo escolhido".
      nomeArquivoSpan.textContent = "Nenhum arquivo escolhido";
  
    }
    
  });
  
  // Adiciona um ouvinte de evento 'load' à janela global. 
  // Este evento é disparado quando a página completa o carregamento.
  // O objetivo é carregar e exibir as postagens assim que a página 
  //      estiver totalmente carregada, garantindo que o 
  //      conteúdo esteja atualizado.
  window.addEventListener("load", loadPosts);