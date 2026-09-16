// Define a URL base da API onde os álbuns serão gerenciados
// Essa URL será usada para fazer requisições HTTP ao servidor
const API_BASE = "http://localhost:3000/api/albuns";

// Função assíncrona responsável por criar um novo álbum
// Essa função será acionada quando o usuário 
//      clicar no botão "Criar"
async function criarAlbum(evento) {

  // Impede o comportamento padrão do formulário (recarregar a página ao enviar)
  // Isso garante que a requisição seja processada via 
  //      JavaScript sem atualizar a página
  evento.preventDefault();

  // Obtém o nome do álbum digitado pelo usuário no campo 
  //      de entrada de texto
  // ".trim()" remove espaços extras no início e no final do 
  //      texto para evitar nomes inválidos
  const nomeAlbum = document.getElementById("nomeAlbum").value.trim();

  // Verifica se o usuário não digitou um nome para o 
  //      álbum antes de enviar os dados
  // Se "nomeAlbum" estiver vazio, exibe um alerta e 
  //      interrompe a função
  if (!nomeAlbum) {

    alert("O nome do álbum não pode ficar vazio.");

    // Interrompe a execução para evitar o envio de dados inválidos
    return; 

  }

  // Cria um objeto FormData, que permite enviar dados 
  //      como se fosse um formulário HTML
  // FormData é necessário para enviar arquivos (como 
  //      imagens) junto com outros dados
  const formData = new FormData();

  // Adiciona o nome do álbum ao FormData
  // "append()" insere um novo campo no FormData, onde "nome" é o 
  //      nome do campo e "nomeAlbum" é o valor digitado pelo usuário
  formData.append("nome", nomeAlbum);

  // Obtém o elemento de input de arquivo (campo onde o 
  //      usuário escolhe a capa do álbum)
  // O campo de arquivo possui o ID "capaAlbum" no HTML
  const capaInput = document.getElementById("capaAlbum");

  // Verifica se o usuário selecionou um arquivo de imagem 
  //      para ser a capa do álbum
  // "capaInput.files" contém a lista de arquivos selecionados 
  //      pelo usuário (pode estar vazia)
  // "capaInput.files.length > 0" garante que pelo menos um 
  //      arquivo foi escolhido antes de prosseguir
  if (capaInput.files && capaInput.files.length > 0) {

    // Adiciona a imagem da capa ao FormData para ser enviada ao servidor
    // "capa" é o nome do campo que a API espera receber
    // "capaInput.files[0]" representa o primeiro arquivo 
    //      selecionado (o arquivo de imagem escolhido pelo usuário)
    formData.append("capa", capaInput.files[0]);

  }

  try {
    
    // Faz uma requisição HTTP POST para a API, enviando os dados do novo álbum
    // "API_BASE" contém a URL do servidor onde os álbuns são armazenados
    // "method: POST" indica que estamos enviando novos dados ao servidor
    // "body: formData" contém as informações do álbum, incluindo 
    //      nome e a imagem de capa (se houver)
    const resposta = await fetch(API_BASE, {
      method: "POST",
      body: formData
    });

    // Converte a resposta do servidor de JSON para um objeto JavaScript
    // Isso permite acessar os dados retornados pela API, 
    //      como mensagens de erro ou sucesso
    const dados = await resposta.json();

    // Verifica se a resposta não foi bem-sucedida (exemplo: 
    //      erro na validação do servidor)
    // "resposta.ok" retorna "false" se a API responder com 
    //      erro (códigos HTTP como 400 ou 500)
    if (!resposta.ok) {
      
      // Exibe um alerta ao usuário com a mensagem de erro retornada pela API
      // Se a API não fornecer uma mensagem específica, 
      //      exibe "Erro ao criar álbum."
      alert(dados.mensagem || "Erro ao criar álbum.");

      // Interrompe a execução da função para evitar que o 
      //      código continue rodando
      return;
    }

    // Se a requisição foi bem-sucedida, limpa os campos do formulário
    // Isso permite que o usuário crie um novo álbum sem 
    //      precisar apagar os dados manualmente
    document.getElementById("formAlbum").reset();

    // Redefine o texto exibido no <span> que mostra o nome 
    //      do arquivo da capa selecionada
    // Após a criação do álbum, volta a exibir "Nenhum 
    //      arquivo escolhido" como valor padrão
    document.getElementById("nomeArquivoCapa").textContent = "Nenhum arquivo escolhido";

    // Chama a função "carregarAlbuns()" para atualizar a 
    //      lista de álbuns na tela
    // Isso garante que o novo álbum recém-criado apareça 
    //      imediatamente na interface do usuário
    carregarAlbuns();

  } catch (erro) {

    // Se houver um erro inesperado durante a requisição ou 
    //      processamento dos dados, exibe um alerta para o usuário
    // Isso cobre problemas como falha na conexão com o 
    //      servidor ou erro interno na API
    alert("Erro ao criar álbum.");
    
  }

}

// Função assíncrona responsável por carregar e exibir os 
//      álbuns salvos no servidor
async function carregarAlbuns() {

  try {

    // Faz uma requisição HTTP GET para a API para obter a 
    //      lista de álbuns disponíveis
    // "fetch(API_BASE)" solicita ao servidor todos os 
    //      álbuns armazenados
    // "await" é usado para esperar a resposta da API 
    //      antes de continuar a execução
    const resposta = await fetch(API_BASE);

    // Converte a resposta da API de JSON para um array 
    //      de objetos JavaScript
    // Isso permite que possamos manipular os dados 
    //      dos álbuns no código
    const albuns = await resposta.json();

    // Seleciona o elemento <div> que será usado para 
    //      exibir os álbuns na página
    // O ID "containerAlbuns" corresponde à área onde os 
    //      álbuns serão inseridos dinamicamente
    const container = document.getElementById("containerAlbuns");

    // Limpa qualquer conteúdo existente dentro do contêiner 
    //      antes de adicionar os novos álbuns
    // Isso evita duplicação de elementos ao recarregar os álbuns
    container.innerHTML = "";

    // Percorre cada álbum dentro do array retornado pela API
    // "forEach" itera sobre cada álbum e executa a função fornecida
    albuns.forEach((album) => {

      // Cria um novo elemento <div> que representará 
      //    visualmente um álbum na tela
      const card = document.createElement("div");

      // Adiciona a classe "album-card" ao elemento <div>
      // Essa classe é definida no CSS para estilizar o 
      //     álbum de forma adequada
      card.classList.add("album-card");

      // Verifica se o álbum possui uma imagem de capa associada
      // "album.capa" armazena o nome do arquivo da imagem no servidor
      if (album.capa) {

        // Cria um novo elemento <img> para exibir a 
        //      imagem de capa do álbum
        const imgCapa = document.createElement("img");

        // Define o atributo "src" da imagem com o caminho 
        //      completo da foto no servidor
        // A URL é construída dinamicamente para acessar a 
        //      pasta "uploads" onde as imagens estão armazenadas
        imgCapa.src = `http://localhost:3000/uploads/${album.capa}`;

        // Adiciona um texto alternativo à imagem para acessibilidade
        // Se a imagem não carregar, será exibido o texto "Foto de Capa"
        imgCapa.alt = "Foto de Capa";

        // Adiciona a classe "album-capa" à imagem para aplicar os 
        //      estilos de exibição definidos no CSS
        imgCapa.classList.add("album-capa");

        // Adiciona a imagem de capa ao elemento "card", 
        //      tornando-a parte da exibição do álbum
        card.appendChild(imgCapa);

      // Caso o álbum não tenha uma imagem de capa, cria um 
      //       espaço reservado com texto
      } else { 

        // Cria um elemento <div> que servirá como 
        //      um "placeholder" (espaço reservado)
        const placeholder = document.createElement("div");

        // Adiciona a classe "album-capa" para manter o 
        //      mesmo estilo das capas de álbuns
        placeholder.classList.add("album-capa");

        // Define o texto dentro do <div> para indicar que o 
        //      álbum não possui uma imagem de capa
        placeholder.textContent = "Sem Capa";

        // Adiciona o espaço reservado ao elemento "card", 
        //      garantindo que o layout do álbum fique uniforme
        card.appendChild(placeholder);

      }

      // Cria um novo elemento <h3> que servirá como o título do álbum
      const titulo = document.createElement("h3");

      // Define o texto do título como o nome do álbum, obtido da API
      // Cada álbum possui um atributo "nome" armazenado no servidor
      titulo.textContent = album.nome;

      // Adiciona o título dentro do "card", garantindo que o 
      //      nome do álbum seja exibido
      card.appendChild(titulo);

      // Cria um elemento <a> (âncora) que funcionará como um 
      //      link para acessar as fotos do álbum
      const link = document.createElement("a");

      // Define o texto do link como "Ver Fotos", indicando a 
      //      ação que o usuário pode realizar
      link.textContent = "Ver Fotos";

      // Define o atributo "href" do link com o caminho 
      //      para a página "album.html"
      // O ID do álbum é passado como um parâmetro na 
      //      URL (exemplo: "album.html?id=123")
      // Isso permite que a página do álbum carregue as 
      //      fotos corretas com base no ID
      link.href = `album.html?id=${album._id}`;

      // Adiciona o link dentro do "card", permitindo que o 
      //      usuário clique para visualizar o álbum completo
      card.appendChild(link);

      // Adiciona o "card" ao contêiner principal onde 
      //      todos os álbuns são exibidos
      // Isso garante que o álbum recém-criado apareça na 
      //      interface do usuário
      container.appendChild(card);

    });

  // Captura e trata possíveis erros que podem ocorrer 
  //      durante a execução da função
  } catch (erro) { 

    // Exibe um alerta informando que houve um erro ao 
    //      tentar carregar os álbuns
    // Isso pode acontecer por diversos motivos, como 
    //      falha na conexão com o servidor,
    //      erro na API ou resposta inválida do servidor
    alert("Erro ao carregar álbuns.");

  }

}

// Adiciona um evento de "submit" ao formulário de criação de álbum
// Quando o usuário clica no botão de envio do formulário, a 
//      função "criarAlbum()" é chamada
// Isso permite que o novo álbum seja enviado ao 
//      servidor sem recarregar a página
document.getElementById("formAlbum").addEventListener("submit", criarAlbum);

// Adiciona um evento de "load" (carregamento da 
//      página) à janela do navegador
// Assim que a página é carregada, a função "carregarAlbuns()" é 
//      chamada automaticamente
// Isso garante que todos os álbuns existentes sejam exibidos 
//      assim que o usuário acessa a página
window.addEventListener("load", carregarAlbuns);

// Adiciona um evento de "change" (mudança de valor) ao 
//      campo de upload de imagem "capaAlbum"
// Esse evento é acionado sempre que o usuário seleciona ou 
//      altera um arquivo de imagem
document.getElementById("capaAlbum").addEventListener("change", function () {

  // Obtém a referência do elemento <span> que exibe o 
  //      nome do arquivo escolhido
  // Esse elemento tem o ID "nomeArquivoCapa" e será 
  //      atualizado com o nome do arquivo selecionado
  const nomeArquivoSpan = document.getElementById("nomeArquivoCapa");

  // Verifica se há arquivos selecionados no input de upload
  // "this.files" contém a lista de arquivos escolhidos pelo usuário
  // "this.files.length > 0" garante que pelo menos um 
  //      arquivo foi escolhido antes de continuar
  if (this.files && this.files.length > 0) {

    // Atualiza o texto do <span> exibindo o nome do arquivo selecionado
    // "this.files[0].name" pega o nome do primeiro 
    //      arquivo escolhido pelo usuário
    nomeArquivoSpan.textContent = this.files[0].name;

  } else {

    // Se nenhum arquivo for escolhido (por exemplo, se o 
    //      usuário cancelar a seleção), o texto do <span> 
    //      será redefinido para "Nenhum arquivo escolhido"
    nomeArquivoSpan.textContent = "Nenhum arquivo escolhido";
    
  }

});