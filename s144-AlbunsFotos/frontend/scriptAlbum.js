// Define a URL base da API onde os álbuns e fotos estão armazenados
// Essa URL será usada para fazer requisições HTTP ao servidor
const API_BASE = "http://localhost:3000/api/albuns";

// Obtém os parâmetros da URL (query string) da página
// O objeto "URLSearchParams" permite extrair informações passadas na URL
// Exemplo: se a URL for "album.html?id=123", o parâmetro "id" será extraído
const parametros = new URLSearchParams(window.location.search);

// Obtém o ID do álbum a partir da URL
// O método "get" busca o valor do parâmetro "id", que 
//      representa o álbum selecionado
const albumId = parametros.get("id");

// Seleciona o elemento do modal da página
// O modal é a janela que exibe a foto ampliada 
//      quando o usuário clica em uma imagem
const modal = document.getElementById("modal");

// Seleciona o botão que fecha o modal
// Esse botão contém um "X" e permite fechar a 
//      visualização da imagem ampliada
const fecharModal = document.getElementById("fecharModal");

// Seleciona o elemento da imagem dentro do modal
// Essa imagem será atualizada para exibir a 
//      foto que o usuário clicou
const imagemModal = document.getElementById("imagemModal");

// Seleciona o elemento onde será exibida a descrição 
//      sobreposta na imagem dentro do modal
// Essa descrição pode conter um texto explicativo sobre a foto
const descricaoSobreposta = document.getElementById("descricaoSobreposta");

// Seleciona o botão que permite visualizar a 
//      foto anterior no modal
// Quando o usuário clica nesse botão, ele volta 
//      para a foto anterior do álbum
const botaoAnterior = document.getElementById("anterior");

// Seleciona o botão que permite visualizar a 
//      próxima foto no modal
// Quando o usuário clica nesse botão, ele avança 
//      para a próxima foto do álbum
const botaoProximo = document.getElementById("proximo");

// Seleciona o botão que permite baixar a foto exibida no modal
// Quando o usuário clica nesse botão, a imagem é 
//      baixada para o dispositivo
const botaoBaixar = document.getElementById("baixar");

// Declara um array vazio onde serão armazenadas as fotos do álbum
// Esse array será preenchido com as imagens obtidas do servidor
let fotos = [];

// Declara uma variável que armazena o índice da 
//      foto atualmente exibida no modal
// O índice começa em 0 (primeira foto) e será atualizado 
//      conforme o usuário navega entre as imagens
let indiceAtual = 0;

// Adiciona um evento ao campo de upload de imagem ("imagemFoto")
// Esse evento será acionado sempre que o usuário selecionar um arquivo
document.getElementById("imagemFoto").addEventListener("change", function() {

  // Obtém a referência do elemento <span> que exibirá o 
  //      nome do arquivo selecionado
  // Esse elemento tem o id "nomeArquivo" e será atualizado 
  //      com o nome do arquivo escolhido
  const nomeArquivoSpan = document.getElementById("nomeArquivo");

  // Verifica se há arquivos selecionados no input
  // "this.files" é uma lista de arquivos escolhidos pelo usuário
  // "this.files.length > 0" garante que pelo menos um 
  //      arquivo foi selecionado
  if (this.files && this.files.length > 0) {

    // Se um arquivo foi escolhido, atualiza o texto 
    //      do <span> com o nome do arquivo selecionado
    // "this.files[0]" representa o primeiro arquivo da 
    //      lista (o arquivo escolhido)
    // ".name" contém o nome do arquivo, que será exibido na interface
    nomeArquivoSpan.textContent = this.files[0].name;

  } else {

    // Se nenhum arquivo for escolhido (por exemplo, se o 
    //      usuário cancelar a seleção)
    // O texto do <span> será redefinido para a mensagem 
    //      padrão "Nenhum arquivo escolhido"
    nomeArquivoSpan.textContent = "Nenhum arquivo escolhido";
  }

});


// Função assíncrona responsável por carregar os 
//      dados de um álbum específico
// Ela busca as informações do álbum no servidor e 
//      exibe as fotos na página
async function carregarAlbum() {

  try {
    
    // Faz uma requisição HTTP GET para obter os dados do 
    //      álbum com o ID correspondente
    // `${API_BASE}/${albumId}` constrói a URL dinamicamente, 
    //      onde "albumId" foi extraído da URL da página
    // "await" é usado para esperar a resposta do servidor 
    //      antes de continuar
    const resposta = await fetch(`${API_BASE}/${albumId}`);

    // Converte a resposta da API de texto JSON para um 
    //      objeto JavaScript manipulável
    // Isso permite acessar os dados do álbum de forma 
    //      estruturada (exemplo: album.nome, album.fotos)
    const album = await resposta.json();

    // Verifica se a resposta do servidor foi bem-sucedida
    // "resposta.ok" retorna "true" se o código HTTP estiver na 
    //      faixa de 200-299, indicando sucesso
    if (!resposta.ok) {
      
      // Se houver um erro na resposta (exemplo: álbum não 
      //      encontrado), exibe um alerta ao usuário
      // A mensagem de erro pode vir da API (album.mensagem) ou 
      //      ser um texto padrão
      alert(album.mensagem || "Erro ao carregar álbum.");

      // Interrompe a execução da função, evitando a 
      //      continuação do código abaixo
      return;

    }

    // Atualiza o título da página para exibir o nome do álbum carregado
    // O elemento HTML <h1 id="tituloAlbum"> é modificado para 
    //      incluir o nome do álbum recebido da API
    document.getElementById("tituloAlbum").textContent = `Fotos do Álbum: ${album.nome}`;

    // Atualiza o array "fotos" com a lista de imagens recebidas da API
    // Se o álbum não tiver fotos, define "fotos" como um array 
    //      vazio para evitar erros ao exibir as imagens
    fotos = album.fotos || [];

    // Chama a função "exibirFotos()" para exibir as fotos na página
    // Essa função será responsável por criar os 
    //      elementos HTML para cada foto do álbum
    exibirFotos();

  } catch (erro) {
    
    // Se ocorrer um erro inesperado durante a requisição ou 
    //      manipulação dos dados, exibe um alerta ao usuário
    // Isso pode acontecer se o servidor estiver offline, se 
    //      houver um problema na internet ou um erro no código
    alert("Erro ao carregar álbum.");

  }
}


// Função responsável por exibir as fotos do álbum na página
// Ela cria dinamicamente os elementos HTML para cada 
//      foto armazenada no array "fotos"
function exibirFotos() {

  // Seleciona o elemento HTML com ID "containerFotos", que é 
  //      onde as fotos serão exibidas
  const container = document.getElementById("containerFotos");

  // Limpa o conteúdo existente no contêiner antes de adicionar novas fotos
  // Isso garante que as fotos não sejam duplicadas ao atualizar a página
  container.innerHTML = "";

  // Percorre o array "fotos", onde cada item representa uma foto do álbum
  // "forEach" itera sobre cada foto e executa a função 
  //      fornecida, recebendo dois parâmetros:
  // - "foto": objeto contendo os dados da foto (caminho da 
  //      imagem e descrição)
  // - "index": posição da foto dentro do array (usado 
  //      para referência no modal)
  fotos.forEach((foto, index) => {

    // Cria um elemento <div> que servirá como um "cartão" para cada foto
    const card = document.createElement("div");

    // Adiciona a classe "foto-card" ao <div>, aplicando 
    //      estilos predefinidos no CSS
    card.classList.add("foto-card");

    // Cria um elemento <img> que representará a miniatura da foto
    const img = document.createElement("img");

    // Define o caminho da imagem carregada, concatenando a URL 
    //      do servidor com o caminho do arquivo
    // "foto.caminho" contém o nome do arquivo da imagem no servidor
    img.src = `http://localhost:3000/uploads/${foto.caminho}`;

    // Adiciona um texto alternativo à imagem para acessibilidade
    // Caso a imagem não carregue, será exibido "Foto do Álbum"
    img.alt = "Foto do Álbum";

    // Adiciona a classe "foto-thumb" à imagem para aplicar os 
    //      estilos de miniatura definidos no CSS
    img.classList.add("foto-thumb");

    // Adiciona um evento de clique à imagem
    // Quando o usuário clica na miniatura, a 
    //      função "abrirModal(index)" é chamada
    // "index" representa a posição da foto no array "fotos", 
    //      permitindo navegar corretamente no modal
    img.addEventListener("click", () => abrirModal(index));

    // Adiciona a imagem como um elemento filho dentro do "card"
    card.appendChild(img);

    // Cria um elemento <p> que armazenará a descrição da foto
    const p = document.createElement("p");

    // Define o texto da descrição da foto
    // Se "foto.descricao" estiver vazio ou for "undefined", 
    //      exibe uma string vazia
    p.textContent = foto.descricao || "";

    // Adiciona o parágrafo contendo a descrição dentro do "card"
    card.appendChild(p);

    // Adiciona o "card" completo dentro do "container", 
    //      exibindo a foto na página
    container.appendChild(card);

  });

}


// Função assíncrona responsável por adicionar uma nova foto ao álbum
// Ela envia a foto e a descrição para o servidor via requisição HTTP
async function adicionarFoto(evento) {
  
  // Impede o comportamento padrão do formulário (recarregar a 
  //      página ao enviar)
  // Isso garante que a requisição seja processada via 
  //      JavaScript sem atualizar a página
  evento.preventDefault();

  // Obtém o valor do campo de entrada de texto onde o 
  //      usuário insere a descrição da foto
  const descricao = document.getElementById("descricaoFoto").value;

  // Obtém o primeiro arquivo selecionado pelo 
  //      usuário no campo de upload de imagem
  const arquivo = document.getElementById("imagemFoto").files[0];

  // Verifica se o usuário selecionou um arquivo 
  //      antes de continuar
  // Se "arquivo" for "undefined" ou "null", exibe um 
  //      alerta e interrompe a função
  if (!arquivo) {
    alert("Selecione uma imagem.");
    return;
  }

  // Cria um objeto FormData para enviar os dados do 
  //      formulário ao servidor
  // FormData permite o envio de arquivos e outros campos 
  //      como se fosse um formulário HTML normal
  const formData = new FormData();

  // Adiciona a descrição ao objeto FormData 
  //      com a chave "descricao"
  // Isso garante que a API possa receber e armazenar o 
  //      texto junto com a imagem
  formData.append("descricao", descricao);

  // Adiciona o arquivo de imagem ao FormData com a chave "imagem"
  // Isso permite que a API processe e salve o arquivo enviado
  formData.append("imagem", arquivo);

  try {

    // Envia os dados para a API usando uma requisição HTTP POST
    // `${API_BASE}/${albumId}/fotos` constrói a URL 
    //      correta para adicionar a foto ao álbum correspondente
    // "method: POST" indica que estamos enviando dados 
    //      para serem armazenados no servidor
    // "body: formData" envia o objeto FormData contendo a imagem e a descrição
    const resposta = await fetch(`${API_BASE}/${albumId}/fotos`, {
      method: "POST",
      body: formData
    });

    // Converte a resposta da API para um objeto JavaScript manipulável
    // Isso permite acessar os dados retornados pelo servidor
    const dados = await resposta.json();

    // Verifica se a resposta não foi bem-sucedida
    // "resposta.ok" retorna "false" se a API responder 
    //      com erro (exemplo: 400, 404 ou 500)
    if (!resposta.ok) {
      
      // Exibe um alerta com a mensagem de erro retornada pela API
      // Se a API não retornar uma mensagem específica, 
      //      exibe "Erro ao adicionar foto."
      alert(dados.mensagem || "Erro ao adicionar foto.");

      // Interrompe a execução da função para evitar a 
      //    continuação do código abaixo
      return;

    }

    // Limpa os campos do formulário após o envio bem-sucedido
    // Isso garante que o formulário fique pronto 
    //      para uma nova adição de foto
    document.getElementById("formFoto").reset();

    // Redefine o texto do elemento que exibe o nome 
    //      do arquivo selecionado
    // Isso volta a exibir "Nenhum arquivo escolhido", 
    //      informando que nenhum arquivo está carregado no momento
    document.getElementById("nomeArquivo").textContent = "Nenhum arquivo escolhido";

    // Atualiza a lista de fotos do álbum com as novas 
    //      informações retornadas pela API
    // "dados.album.fotos" contém a lista 
    //      atualizada de fotos do álbum
    fotos = dados.album.fotos;

    // Chama a função "exibirFotos()" para atualizar a 
    //      exibição das imagens na página
    exibirFotos();

  } catch (erro) {
    
    // Se ocorrer um erro inesperado durante a requisição, 
    //      exibe um alerta para o usuário
    // Isso cobre problemas como falha na conexão com o 
    //      servidor ou erro interno na API
    alert("Erro ao adicionar foto.");

  }

}

// Função responsável por abrir o modal e exibir a foto ampliada
// "indice" representa a posição da foto dentro do array "fotos"
function abrirModal(indice) {

  // Atualiza a variável "indiceAtual" para armazenar o 
  //      índice da foto que está sendo exibida
  // Isso permite a navegação entre as fotos dentro do modal
  indiceAtual = indice;

  // Torna o modal visível na tela ao alterar o 
  //      estilo "display" para "block"
  // O modal estava oculto por padrão e só é exibido 
  //      quando esta função é chamada
  modal.style.display = "block";

  // Desativa o scroll do corpo da página ao abrir o modal
  // Isso impede que o usuário role a página enquanto 
  //      visualiza a foto ampliada
  document.body.style.overflow = "hidden";

  // Atualiza a imagem dentro do modal com a foto 
  //      correspondente ao índice fornecido
  // "fotos[indice].caminho" contém o caminho da 
  //      imagem salva no servidor
  // A URL é construída para buscar a imagem no 
  //      diretório "uploads" do servidor
  imagemModal.src = `http://localhost:3000/uploads/${fotos[indice].caminho}`;

  // Atualiza a descrição da foto dentro do modal
  // "fotos[indice].descricao" contém a descrição fornecida 
  //      pelo usuário ao adicionar a foto
  // Se a descrição estiver vazia ou for "undefined", 
  //      exibe uma string vazia ("")
  descricaoSobreposta.textContent = fotos[indice].descricao || "";

}


// Função responsável por fechar o modal e restaurar a 
//      página ao estado original
function fecharModalFunc() {

    // Oculta o modal alterando o estilo "display" para "none"
    // Isso faz com que a janela modal desapareça da tela
    modal.style.display = "none";

    // Restaura o scroll do corpo da página ao fechar o modal
    // "overflow: auto" permite que o usuário role a 
    //      página normalmente novamente
    document.body.style.overflow = "auto";

}

// Função responsável por exibir a foto anterior dentro do modal
function fotoAnterior() {

  // Verifica se a foto exibida atualmente é a 
  //      primeira do álbum (índice 0)
  if (indiceAtual <= 0) {

    // Se for a primeira foto, volta para a última foto do álbum
    // Isso cria um efeito de "loop", permitindo 
    //      navegação contínua entre as fotos
    indiceAtual = fotos.length - 1;

  } else {

    // Caso contrário, apenas decrementa o índice 
    //      para exibir a foto anterior
    indiceAtual--;

  }

  // Chama a função "abrirModal()" para atualizar o 
  //      modal com a nova foto selecionada
  abrirModal(indiceAtual);

}

// Função responsável por exibir a próxima 
//      foto dentro do modal
function fotoProxima() {

  // Verifica se a foto exibida atualmente é a última do álbum
  // "fotos.length - 1" representa o índice da 
  //      última foto no array "fotos"
  if (indiceAtual >= fotos.length - 1) {

    // Se a foto exibida for a última, volta para a 
    //      primeira foto do álbum (índice 0)
    // Isso cria um efeito de navegação circular, permitindo 
    //      que o usuário continue visualizando as fotos em loop
    indiceAtual = 0;

  } else {

    // Caso ainda existam fotos seguintes, incrementa o índice 
    //      para exibir a próxima foto
    // Isso move a visualização para a próxima imagem no álbum
    indiceAtual++;
  }

  // Chama a função "abrirModal()" para atualizar a 
  //      imagem exibida no modal
  // O modal será atualizado com a nova foto correspondente ao 
  //      índice "indiceAtual"
  abrirModal(indiceAtual);

}

// Função responsável por baixar a imagem exibida no modal
function baixarImagem() {

    // Cria dinamicamente um elemento <a> (âncora) que será 
    //      usado para o download da imagem
    const link = document.createElement('a');
  
    // Define o atributo "href" da âncora como o caminho da 
    //      imagem atualmente exibida no modal
    // Isso permite que o usuário baixe a mesma imagem 
    //      que está visualizando
    link.href = imagemModal.src;
  
    // Extrai o nome do arquivo da URL da imagem para usá-lo 
    //      como nome do arquivo ao baixar
    // "imagemModal.src" contém o caminho completo da imagem no 
    //      servidor (exemplo: "http://localhost:3000/uploads/foto1.jpg")
    // "split('/')" divide essa string em um array com base nas barras "/"
    // "partes[partes.length - 1]" pega o último elemento do array, 
    //      que é o nome do arquivo (exemplo: "foto1.jpg")
    const partes = imagemModal.src.split('/');
    const nomeArquivo = partes[partes.length - 1];
  
    // Define o nome do arquivo para o download usando a 
    //      propriedade "download" do elemento <a>
    // Isso garante que a imagem seja baixada com o nome correto, 
    //      em vez de um nome genérico
    link.download = nomeArquivo;
  
    // Adiciona o elemento <a> temporariamente ao corpo do documento
    // Isso é necessário para que o link funcione 
    //      corretamente para o download
    document.body.appendChild(link);
  
    // Simula um clique no link para iniciar 
    //      automaticamente o download da imagem
    link.click();
  
    // Remove o elemento <a> do documento após o download ser iniciado
    // Isso evita a criação de links desnecessários no 
    //      DOM e mantém a estrutura da página limpa
    document.body.removeChild(link);
  
}
  
// Adiciona um evento de clique ao botão de fechar o modal
// Quando o usuário clica no botão "X" (fecharModal), a 
//      função "fecharModalFunc()" é chamada
// Isso faz com que o modal desapareça da tela e o 
//      scroll da página seja restaurado
fecharModal.addEventListener("click", fecharModalFunc);


// Adiciona um evento de clique ao botão de visualizar a foto anterior
// Quando o usuário clica no botão "Anterior" (botaoAnterior), a
//      função "fotoAnterior()" é chamada
botaoAnterior.addEventListener("click", (e) => {

  // Impede que o clique no botão propague para elementos 
  //      superiores (como o próprio modal)
  // Isso evita que o modal seja fechado caso o usuário 
  //      clique no botão "Anterior"
  e.stopPropagation();

  // Chama a função "fotoAnterior()" para exibir a 
  //      imagem anterior no modal
  fotoAnterior();

});

// Adiciona um evento de clique ao botão de avançar para a próxima foto
// Quando o usuário clica no botão "Próxima" (botaoProximo), a 
//      função "fotoProxima()" é chamada
botaoProximo.addEventListener("click", (e) => {

  // Impede que o clique se propague para elementos 
  //      superiores (como o modal)
  // Isso evita que o modal seja fechado caso o usuário 
  //      clique no botão "Próxima"
  e.stopPropagation();

  // Chama a função "fotoProxima()" para exibir a 
  //      próxima imagem no modal
  fotoProxima();
  
});


// Adiciona um evento de clique ao botão de baixar a imagem
// Quando o usuário clica no botão "Baixar" (botaoBaixar), a 
//      função "baixarImagem()" é chamada
botaoBaixar.addEventListener("click", (e) => {

  // Impede que o clique se propague para elementos 
  //      superiores (como o modal)
  // Isso evita que o modal seja fechado caso o 
  //      usuário clique no botão "Baixar"
  e.stopPropagation();

  // Chama a função "baixarImagem()" para permitir o 
  //      download da imagem exibida no modal
  baixarImagem();

});


// Adiciona um evento global de clique à janela (window)
// Esse evento é acionado sempre que o usuário clica 
//      em qualquer parte da página
window.addEventListener("click", (e) => {

  // Verifica se o elemento clicado (e.target) é exatamente o modal
  // Se o usuário clicar fora da imagem e dos botões 
  //      dentro do modal, ele será fechado
  if (e.target === modal) {

    // Chama a função "fecharModalFunc()" para fechar o 
    //      modal e restaurar o scroll da página
    fecharModalFunc();
  }

});

// Adiciona um evento de submissão ao formulário de envio de fotos
// Quando o usuário clica no botão "Enviar Foto", a 
//      função "adicionarFoto()" é chamada
document.getElementById("formFoto").addEventListener("submit", adicionarFoto);

// Adiciona um evento de carregamento da página
// Quando a página termina de carregar, a 
//      função "carregarAlbum()" é chamada automaticamente
// Isso garante que as fotos do álbum sejam carregadas 
//      assim que o usuário acessa a página
window.addEventListener("load", carregarAlbum);