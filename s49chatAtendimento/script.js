// Adiciona um ouvinte de evento de clique ao
        // botão 'iniciar-chat'. Quando o botão é
        // clicado, a função 'iniciarChat' é chamada.
document.getElementById('iniciar-chat').addEventListener('click', iniciarChat);


// Adiciona um ouvinte de evento de clique ao botão 'botao-enviar'.
        // Quando o botão é clicado, a função 'enviarMensagem' é chamada.
document.getElementById('botao-enviar').addEventListener('click', enviarMensagem);

// Adiciona um ouvinte de evento de clique ao botão 'minimize-button'.
        // Quando o botão é clicado, a função 'alternarJanelaChat' é
        // chamada para minimizar a janela do chat.
document.getElementById('minimize-button').addEventListener('click', alternarJanelaChat);

// Adiciona um ouvinte de evento de clique ao botão 'close-button'.
        // Quando o botão é clicado, a função 'fecharChat' é
        // chamada para fechar a janela do chat.
document.getElementById('close-button').addEventListener('click', fecharChat);


// Declara uma variável para armazenar o nome do usuário.
        // Inicialmente, é uma string vazia.
let nomeUsuario = '';

// Define um array de objetos que contém pares de perguntas e
        // respostas. Este array é utilizado para responder às
        // perguntas dos usuários de forma automática.
const qa = [

    // Cada objeto contém uma 'pergunta' e a 'resposta'
            // correspondente do chatbot.
    { pergunta: "olá", resposta: "Olá! Como posso ajudar você hoje?" },
    { pergunta: "oi", resposta: "Oi! Como posso ajudar você hoje?" },
    { pergunta: "qual é o seu nome?", resposta: "Eu sou o Chatbot de Atendimento." },
    { pergunta: "como posso acessar minha conta?", resposta: "Para acessar sua conta, clique em 'Login' no canto superior direito." },
    { pergunta: "quais são os cursos oferecidos?", resposta: "Oferecemos cursos de HTML, CSS e JavaScript." },
    { pergunta: "quanto custa o curso de HTML?", resposta: "O curso de HTML custa R$ 100,00." },
    { pergunta: "quanto custa o curso de CSS?", resposta: "O curso de CSS custa R$ 120,00." },
    { pergunta: "quanto custa o curso de JavaScript?", resposta: "O curso de JavaScript custa R$ 150,00." },
    { pergunta: "como faço para me inscrever no curso de HTML?", resposta: "Para se inscrever no curso de HTML, acesse a página do curso e clique em 'Inscrever-se'." },
    { pergunta: "como faço para me inscrever no curso de CSS?", resposta: "Para se inscrever no curso de CSS, acesse a página do curso e clique em 'Inscrever-se'." },
    { pergunta: "como faço para me inscrever no curso de JavaScript?", resposta: "Para se inscrever no curso de JavaScript, acesse a página do curso e clique em 'Inscrever-se'." },
    { pergunta: "qual é a duração do curso de HTML?", resposta: "O curso de HTML tem duração de 4 semanas." },
    { pergunta: "qual é a duração do curso de CSS?", resposta: "O curso de CSS tem duração de 6 semanas." },
    { pergunta: "qual é a duração do curso de JavaScript?", resposta: "O curso de JavaScript tem duração de 8 semanas." },
    { pergunta: "os cursos possuem certificado?", resposta: "Sim, todos os cursos oferecem certificado de conclusão." },
    { pergunta: "como recebo o certificado?", resposta: "O certificado é enviado por e-mail após a conclusão do curso." },
    { pergunta: "quais são as formas de pagamento?", resposta: "Aceitamos pagamentos via cartão de crédito, boleto bancário e PayPal." },
    { pergunta: "posso pagar parcelado?", resposta: "Sim, é possível parcelar o pagamento em até 12 vezes no cartão de crédito." },
    { pergunta: "qual é a carga horária do curso de HTML?", resposta: "O curso de HTML tem uma carga horária de 40 horas." },
    { pergunta: "qual é a carga horária do curso de CSS?", resposta: "O curso de CSS tem uma carga horária de 60 horas." },
    { pergunta: "qual é a carga horária do curso de JavaScript?", resposta: "O curso de JavaScript tem uma carga horária de 80 horas." },
    { pergunta: "os cursos são online?", resposta: "Sim, todos os nossos cursos são 100% online." },
    { pergunta: "como funcionam as aulas?", resposta: "As aulas são em formato de vídeo e você pode assistir no seu próprio ritmo." },
    { pergunta: "posso baixar os materiais?", resposta: "Sim, você pode baixar os materiais complementares dos cursos." },
    { pergunta: "qual é a metodologia de ensino?", resposta: "Nossa metodologia é prática, com muitos exercícios e projetos reais." },
    { pergunta: "há suporte para dúvidas?", resposta: "Sim, você pode tirar suas dúvidas com nossos instrutores via fórum." },
    { pergunta: "qual é o público-alvo dos cursos?", resposta: "Nossos cursos são voltados para iniciantes e desenvolvedores que desejam se atualizar." },
    { pergunta: "preciso de conhecimento prévio?", resposta: "Não, nossos cursos são feitos para quem não tem conhecimento prévio." },
    { pergunta: "qual é o diferencial dos seus cursos?", resposta: "Nosso diferencial é a abordagem prática e a qualidade dos instrutores." },
    { pergunta: "há algum desconto disponível?", resposta: "Sim, oferecemos descontos para pagamentos à vista e promoções sazonais." },
    { pergunta: "como posso acompanhar meu progresso?", resposta: "Você pode acompanhar seu progresso na plataforma, em seu perfil." },
    { pergunta: "há certificado de participação?", resposta: "Sim, ao completar o curso você recebe um certificado de participação." },
    { pergunta: "como acesso os cursos?", resposta: "Você pode acessar os cursos através do nosso site, na área do aluno." },
    { pergunta: "há prazo para concluir o curso?", resposta: "Não, você pode concluir o curso no seu próprio ritmo, sem prazos." },
    { pergunta: "qual é a média salarial de um desenvolvedor web?", resposta: "A média salarial varia, mas um desenvolvedor web júnior pode ganhar entre R$ 3.000,00 e R$ 5.000,00." },
    { pergunta: "os cursos são atualizados?", resposta: "Sim, nossos cursos são constantemente atualizados com as novas tecnologias." },
    { pergunta: "como posso cancelar minha inscrição?", resposta: "Você pode cancelar sua inscrição entrando em contato com nosso suporte." },
    { pergunta: "posso obter reembolso?", resposta: "Sim, oferecemos reembolso total se você cancelar dentro de 7 dias após a compra." },
    { pergunta: "há alguma garantia de aprendizado?", resposta: "Sim, garantimos que você vai aprender se seguir todas as aulas e exercícios." },
    { pergunta: "qual é a diferença entre HTML e CSS?", resposta: "HTML é usado para estruturar o conteúdo da web, enquanto CSS é usado para estilizar a aparência do conteúdo." },
    { pergunta: "o que é JavaScript?", resposta: "JavaScript é uma linguagem de programação usada para criar interatividade em sites." },
    { pergunta: "quais são os pré-requisitos para aprender JavaScript?", resposta: "Não há pré-requisitos, mas é recomendável ter conhecimento básico de HTML e CSS." },
    { pergunta: "posso usar os cursos em mais de um dispositivo?", resposta: "Sim, você pode acessar os cursos em qualquer dispositivo com internet." },
    { pergunta: "os cursos têm exercícios práticos?", resposta: "Sim, todos os nossos cursos incluem muitos exercícios práticos." },
    { pergunta: "há suporte técnico?", resposta: "Sim, oferecemos suporte técnico para ajudar com qualquer problema na plataforma." },
    { pergunta: "posso acessar os cursos a qualquer hora?", resposta: "Sim, nossos cursos estão disponíveis 24 horas por dia, 7 dias por semana." },
    { pergunta: "os cursos têm prazo de validade?", resposta: "Não, uma vez comprado, você tem acesso vitalício ao curso." },
    { pergunta: "posso compartilhar meu acesso?", resposta: "Não, o acesso é individual e intransferível." },
    { pergunta: "há aulas ao vivo?", resposta: "Não, todas as aulas são gravadas para que você possa assistir no seu próprio ritmo." },
    { pergunta: "qual é o conteúdo do curso de HTML?", resposta: "O curso de HTML abrange desde o básico até tópicos mais avançados, incluindo semântica e acessibilidade." },
    { pergunta: "qual é o conteúdo do curso de CSS?", resposta: "O curso de CSS inclui desde conceitos básicos até técnicas avançadas, como Flexbox e Grid Layout." },
    { pergunta: "qual é o conteúdo do curso de JavaScript?", resposta: "O curso de JavaScript cobre desde a sintaxe básica até conceitos avançados, como ES6, DOM e AJAX." },
    { pergunta: "há algum material extra?", resposta: "Sim, todos os cursos incluem materiais extras, como ebooks e links úteis." },
    { pergunta: "posso falar com os instrutores?", resposta: "Sim, você pode enviar mensagens aos instrutores através da plataforma." },
    { pergunta: "os cursos têm avaliação?", resposta: "Sim, ao final de cada módulo você encontra avaliações para testar seus conhecimentos." },
    { pergunta: "há algum pré-requisito para os cursos?", resposta: "Não, qualquer pessoa pode se inscrever em nossos cursos." },
    { pergunta: "quais são os benefícios de aprender HTML, CSS e JavaScript?", resposta: "Aprender essas tecnologias permite criar sites e aplicações web interativas, além de abrir portas para carreiras em desenvolvimento web." },
    { pergunta: "quanto tempo devo dedicar aos cursos?", resposta: "Recomendamos dedicar pelo menos 1 hora por dia para um bom aproveitamento." },
    { pergunta: "há algum suporte após o curso?", resposta: "Sim, você continua tendo acesso aos materiais e suporte mesmo após concluir o curso." },
    { pergunta: "como posso me preparar para o curso?", resposta: "Recomendamos um ambiente tranquilo, um computador com internet e um caderno para anotações." },
    { pergunta: "os cursos são indicados para crianças?", resposta: "Sim, nossos cursos são acessíveis para todas as idades, incluindo crianças." },
    { pergunta: "quais são os métodos de pagamento aceitos?", resposta: "Aceitamos pagamentos via cartão de crédito, boleto bancário e PayPal." },
    { pergunta: "posso acessar os cursos offline?", resposta: "Não, os cursos precisam de uma conexão com a internet para serem acessados." },
    { pergunta: "os cursos são em português?", resposta: "Sim, todos os nossos cursos são em português." },
    { pergunta: "como posso resetar minha senha?", resposta: "Você pode resetar sua senha clicando em 'Esqueci minha senha' na página de login." },
    { pergunta: "há limite de vagas?", resposta: "Não, nossos cursos não têm limite de vagas." },
    { pergunta: "como posso me inscrever no curso?", resposta: "Você pode se inscrever no curso acessando a página do curso e clicando em 'Inscrever-se'." },
    { pergunta: "qual é a duração média dos cursos?", resposta: "A duração média dos cursos varia de 4 a 8 semanas, dependendo do curso." },
    { pergunta: "posso ver uma prévia dos cursos?", resposta: "Sim, oferecemos prévias gratuitas de alguns cursos para você conhecer o conteúdo." },
    { pergunta: "os cursos são recomendados para quem?", resposta: "Nossos cursos são recomendados para qualquer pessoa interessada em desenvolvimento web, seja iniciante ou profissional." },
    { pergunta: "posso cancelar minha inscrição a qualquer momento?", resposta: "Sim, você pode cancelar sua inscrição a qualquer momento entrando em contato com nosso suporte." },
    { pergunta: "qual é o nível de dificuldade dos cursos?", resposta: "Os cursos são projetados para serem acessíveis a todos os níveis, do iniciante ao avançado." },
    { pergunta: "há exercícios de código?", resposta: "Sim, nossos cursos incluem muitos exercícios de código para praticar." },
    { pergunta: "posso interagir com outros alunos?", resposta: "Sim, você pode interagir com outros alunos através do fórum da plataforma." },
    { pergunta: "quais são os tópicos abordados no curso de HTML?", resposta: "O curso de HTML abrange tópicos como estrutura de páginas, tags, atributos e semântica." },
    { pergunta: "quais são os tópicos abordados no curso de CSS?", resposta: "O curso de CSS inclui tópicos como seletores, propriedades, layouts, Flexbox, Grid e animações." },
    { pergunta: "quais são os tópicos abordados no curso de JavaScript?", resposta: "O curso de JavaScript cobre variáveis, funções, loops, eventos, DOM, AJAX e ES6." },
    { pergunta: "há suporte para dúvidas técnicas?", resposta: "Sim, você pode tirar suas dúvidas técnicas com nossos instrutores." },
    { pergunta: "posso assistir as aulas em qualquer ordem?", resposta: "Sim, você pode assistir as aulas na ordem que preferir." },
    { pergunta: "há um fórum para discussão?", resposta: "Sim, nossa plataforma possui um fórum para discussão e troca de conhecimentos." },
    { pergunta: "qual é a validade do certificado?", resposta: "O certificado não tem validade específica, mas comprova que você concluiu o curso." },
    { pergunta: "posso imprimir o certificado?", resposta: "Sim, você pode imprimir o certificado enviado por e-mail." },
    { pergunta: "os cursos são compatíveis com dispositivos móveis?", resposta: "Sim, você pode acessar os cursos em dispositivos móveis e tablets." },
    { pergunta: "há suporte para acessibilidade?", resposta: "Sim, nossa plataforma é acessível para pessoas com deficiência." },
    { pergunta: "posso fazer download dos vídeos?", resposta: "Não, os vídeos não estão disponíveis para download, apenas streaming." },
    { pergunta: "há limite de acessos aos cursos?", resposta: "Não, você pode acessar os cursos quantas vezes quiser." },
    { pergunta: "os cursos são em vídeo?", resposta: "Sim, nossos cursos são compostos por vídeo-aulas gravadas." },
    { pergunta: "há algum material complementar?", resposta: "Sim, todos os cursos incluem materiais complementares, como artigos e ebooks." },
    { pergunta: "os cursos têm exercícios práticos?", resposta: "Sim, todos os cursos incluem muitos exercícios práticos para fixar o conteúdo." },
    { pergunta: "há algum suporte para iniciantes?", resposta: "Sim, nossos cursos são projetados para ajudar iniciantes a aprenderem do zero." },
    { pergunta: "os cursos têm algum pré-requisito?", resposta: "Não, qualquer pessoa pode se inscrever e acompanhar nossos cursos." },
    { pergunta: "posso assistir os vídeos em alta definição?", resposta: "Sim, todos os vídeos estão disponíveis em alta definição." },
    { pergunta: "há algum material de leitura?", resposta: "Sim, nossos cursos incluem materiais de leitura, como ebooks e artigos." },
    { pergunta: "posso pausar e continuar o curso?", resposta: "Sim, você pode pausar e continuar o curso quando quiser." },
    { pergunta: "há algum tipo de prova ou exame?", resposta: "Sim, ao final de cada módulo há avaliações para testar seus conhecimentos." },
    { pergunta: "posso ver a grade curricular?", resposta: "Sim, a grade curricular está disponível na página de cada curso." },
    { pergunta: "os cursos têm legendas?", resposta: "Sim, todos os vídeos possuem legendas em português." },
    { pergunta: "há algum certificado de conclusão?", resposta: "Sim, você recebe um certificado de conclusão ao finalizar o curso." },
    { pergunta: "posso assistir os vídeos em velocidade acelerada?", resposta: "Sim, você pode ajustar a velocidade de reprodução dos vídeos." },
    { pergunta: "há suporte para dúvidas gerais?", resposta: "Sim, você pode tirar suas dúvidas gerais através do suporte ao aluno." },
    { pergunta: "qual é o horário de atendimento do suporte?", resposta: "Nosso suporte está disponível de segunda a sexta, das 9h às 18h." },
    { pergunta: "os cursos são acessíveis para estrangeiros?", resposta: "Sim, qualquer pessoa com acesso à internet pode se inscrever em nossos cursos." },
    { pergunta: "há algum tipo de desconto para estudantes?", resposta: "Sim, oferecemos descontos especiais para estudantes." },
    { pergunta: "posso pagar em dólar?", resposta: "Sim, aceitamos pagamentos em dólar e outras moedas estrangeiras." },
    { pergunta: "há suporte para empresas?", resposta: "Sim, oferecemos pacotes especiais e suporte para empresas." },
    { pergunta: "posso usar os cursos para treinar minha equipe?", resposta: "Sim, nossos cursos são ideais para treinamento de equipes." },
    { pergunta: "há algum tipo de assinatura mensal?", resposta: "Não, nossos cursos são adquiridos individualmente, sem assinatura mensal." },
    { pergunta: "qual é a diferença entre os cursos de HTML, CSS e JavaScript?", resposta: "HTML é usado para estruturar páginas, CSS para estilizar e JavaScript para adicionar interatividade." },
    { pergunta: "posso aplicar o que aprendi em projetos reais?", resposta: "Sim, nossos cursos são focados em prática e você poderá aplicar os conhecimentos em projetos reais." },
    { pergunta: "os cursos são recomendados para quem quer mudar de carreira?", resposta: "Sim, nossos cursos são ideais para quem deseja iniciar uma nova carreira em desenvolvimento web." },
    { pergunta: "há algum suporte após concluir o curso?", resposta: "Sim, você continuará tendo acesso ao suporte e materiais mesmo após concluir o curso." },
    { pergunta: "posso acessar os cursos fora do Brasil?", resposta: "Sim, nossos cursos estão disponíveis para acesso de qualquer lugar do mundo." },
    { pergunta: "há algum tipo de mentoria?", resposta: "Sim, oferecemos mentoria com nossos instrutores para ajudar no seu aprendizado." },
    { pergunta: "posso fazer perguntas aos instrutores?", resposta: "Sim, você pode enviar suas perguntas aos instrutores através da plataforma." },
    { pergunta: "os cursos são focados em prática?", resposta: "Sim, nossa metodologia é voltada para a prática com muitos exercícios e projetos." },
    { pergunta: "há algum suporte para instalação de software?", resposta: "Sim, nossos instrutores podem ajudar com a instalação dos softwares necessários." },
    { pergunta: "qual é a carga horária total dos cursos?", resposta: "A carga horária total varia de acordo com o curso, mas geralmente é de 40 a 80 horas." },
    { pergunta: "os cursos têm projetos finais?", resposta: "Sim, ao final de cada curso você realizará um projeto para aplicar o que aprendeu." },
    { pergunta: "posso obter um certificado em inglês?", resposta: "Sim, oferecemos a opção de certificado em inglês mediante solicitação." },
    { pergunta: "os cursos têm validade?", resposta: "Não, uma vez comprado, você tem acesso vitalício aos cursos." },
    { pergunta: "posso assistir os vídeos no meu celular?", resposta: "Sim, nossa plataforma é responsiva e você pode assistir aos vídeos no seu celular." },
    { pergunta: "há algum tipo de comunidade para alunos?", resposta: "Sim, temos uma comunidade ativa onde alunos podem interagir e trocar conhecimentos." },
    { pergunta: "os cursos são indicados para freelancers?", resposta: "Sim, nossos cursos são ideais para freelancers que desejam se especializar." },
    { pergunta: "posso acessar os cursos de qualquer lugar?", resposta: "Sim, você pode acessar os cursos de qualquer lugar com internet." },
    { pergunta: "há algum suporte para configuração do ambiente de desenvolvimento?", resposta: "Sim, nossos instrutores podem ajudar com a configuração do ambiente de desenvolvimento." },
    { pergunta: "os cursos são recomendados para quem quer criar sites?", resposta: "Sim, nossos cursos são perfeitos para quem deseja aprender a criar sites profissionais." },
    { pergunta: "posso usar os cursos para melhorar meu portfólio?", resposta: "Sim, os projetos realizados nos cursos podem ser incluídos em seu portfólio." },
    { pergunta: "há algum tipo de acompanhamento?", resposta: "Sim, nossos instrutores acompanham seu progresso e podem oferecer feedback." },
    { pergunta: "os cursos têm exercícios de revisão?", resposta: "Sim, ao final de cada módulo há exercícios de revisão para fixar o conteúdo." },
    { pergunta: "há suporte para dúvidas de carreira?", resposta: "Sim, oferecemos orientação de carreira para ajudar você a entrar no mercado de trabalho." },
    { pergunta: "os cursos são recomendados para iniciantes?", resposta: "Sim, nossos cursos são projetados para serem acessíveis a iniciantes." },
    { pergunta: "posso ver as avaliações de outros alunos?", resposta: "Sim, na página de cada curso você encontra avaliações de outros alunos." },
    { pergunta: "há algum suporte para certificação?", resposta: "Sim, nossos instrutores podem ajudar com a preparação para certificações." },
    { pergunta: "os cursos são indicados para quem quer se especializar?", resposta: "Sim, nossos cursos são ideais para quem deseja se especializar em desenvolvimento web." },
    { pergunta: "há algum suporte para desenvolvimento de projetos?", resposta: "Sim, você pode tirar suas dúvidas sobre projetos com nossos instrutores." },
    { pergunta: "os cursos têm exercícios práticos?", resposta: "Sim, todos os cursos incluem muitos exercícios práticos para fixar o conteúdo." },
    { pergunta: "posso acessar os cursos mesmo após concluir?", resposta: "Sim, você terá acesso vitalício aos cursos mesmo após concluir." },
    { pergunta: "há algum tipo de suporte técnico?", resposta: "Sim, oferecemos suporte técnico para ajudar com qualquer problema na plataforma." },
    { pergunta: "posso acessar os cursos em qualquer dispositivo?", resposta: "Sim, você pode acessar os cursos em qualquer dispositivo com internet." },
    { pergunta: "os cursos têm avaliações?", resposta: "Sim, ao final de cada módulo você encontra avaliações para testar seus conhecimentos." },
    { pergunta: "há suporte para instalação de software?", resposta: "Sim, nossos instrutores podem ajudar com a instalação dos softwares necessários." },
    { pergunta: "qual é a carga horária total dos cursos?", resposta: "A carga horária total varia de acordo com o curso, mas geralmente é de 40 a 80 horas." },
    { pergunta: "os cursos têm projetos finais?", resposta: "Sim, ao final de cada curso você realizará um projeto para aplicar o que aprendeu." },
    { pergunta: "posso obter um certificado em inglês?", resposta: "Sim, oferecemos a opção de certificado em inglês mediante solicitação." },
    { pergunta: "os cursos têm validade?", resposta: "Não, uma vez comprado, você tem acesso vitalício aos cursos." },
    { pergunta: "posso assistir os vídeos no meu celular?", resposta: "Sim, nossa plataforma é responsiva e você pode assistir aos vídeos no seu celular." },
    { pergunta: "há algum tipo de comunidade para alunos?", resposta: "Sim, temos uma comunidade ativa onde alunos podem interagir e trocar conhecimentos." },
    { pergunta: "os cursos são indicados para freelancers?", resposta: "Sim, nossos cursos são ideais para freelancers que desejam se especializar." },
    { pergunta: "posso acessar os cursos de qualquer lugar?", resposta: "Sim, você pode acessar os cursos de qualquer lugar com internet." },
    { pergunta: "há algum suporte para configuração do ambiente de desenvolvimento?", resposta: "Sim, nossos instrutores podem ajudar com a configuração do ambiente de desenvolvimento." },
    { pergunta: "os cursos são recomendados para quem quer criar sites?", resposta: "Sim, nossos cursos são perfeitos para quem deseja aprender a criar sites profissionais." },
    { pergunta: "posso usar os cursos para melhorar meu portfólio?", resposta: "Sim, os projetos realizados nos cursos podem ser incluídos em seu portfólio." },
    { pergunta: "há algum tipo de acompanhamento?", resposta: "Sim, nossos instrutores acompanham seu progresso e podem oferecer feedback." },
    { pergunta: "os cursos têm exercícios de revisão?", resposta: "Sim, ao final de cada módulo há exercícios de revisão para fixar o conteúdo." },
    { pergunta: "há suporte para dúvidas de carreira?", resposta: "Sim, oferecemos orientação de carreira para ajudar você a entrar no mercado de trabalho." },
    { pergunta: "os cursos são recomendados para iniciantes?", resposta: "Sim, nossos cursos são projetados para serem acessíveis a iniciantes." },
    { pergunta: "posso ver as avaliações de outros alunos?", resposta: "Sim, na página de cada curso você encontra avaliações de outros alunos." },
    // Adicione mais perguntas e respostas aqui

];

function iniciarChat() {

    // Acessa o valor do elemento de entrada (input) com
            // ID 'nome-usuario' e o armazena na variável 'nomeUsuarioInput'.
    const nomeUsuarioInput = document.getElementById('nome-usuario').value;

    // Verifica se o valor capturado, após remover os espaços
            // em branco com o método 'trim()', não é uma string vazia.
    if (nomeUsuarioInput.trim() !== '') {


        // Se o valor for válido (não vazio), armazena-o na
                // variável global 'nomeUsuario', que guarda o
                // nome do usuário durante a sessão do chat.
        nomeUsuario = nomeUsuarioInput;

        // Altera o estilo de visualização do elemento
                // com ID 'chat-intro' para 'none', efetivamente
                // escondendo a interface de introdução
                // onde o nome é inserido.
        document.getElementById('chat-intro').style.display = 'none';

        // Altera o estilo de visualização do elemento
                // com ID 'chat-window' para 'flex', tornando
                // visível a janela de chat principal onde as
                // mensagens serão exibidas.
        document.getElementById('chat-window').style.display = 'flex';

        // Chama a função 'adicionarMensagem', passando uma
                // mensagem de saudação que inclui o nome do
                // usuário. A função 'adicionarMensagem' é responsável
                // por exibir esta mensagem na tela.
        // O segundo argumento 'bot-message' é uma classe CSS que
                // define o estilo das mensagens do bot.
        adicionarMensagem(`Olá ${nomeUsuario}! Como posso ajudar você hoje?`, 'bot-texto');

    }
}


function enviarMensagem() {

    // Obtém o valor atual do campo de entrada onde os
            // usuários digitam suas mensagens.
    const entradaUsuario = document.getElementById('entrada-usuario').value;

    // Verifica se o texto inserido não consiste apenas
            // de espaços em branco.
    if (entradaUsuario.trim() !== '') {

        // Se houver texto real, adiciona esse texto à janela
                // de chat como uma mensagem do usuário.
        adicionarMensagem(entradaUsuario, 'user-message');

        // Limpa o campo de entrada para que esteja
                // pronto para a próxima mensagem.
        document.getElementById('entrada-usuario').value = '';

        // Chama a função 'respostaBot' passando o texto
                // do usuário, que processará e responderá à mensagem.
        respostaBot(entradaUsuario);

    }
}

function respostaBot(entradaUsuario) {

    // Converte a mensagem do usuário para letras
            // minúsculas para uniformizar a comparação,
            // independente de como o usuário digite.
    const entradaUsuarioLower = entradaUsuario.toLowerCase();

    // Tenta encontrar uma resposta correspondente baseando-se
            // na mensagem do usuário. Se não encontrar, retorna
            // uma mensagem padrão solicitando esclarecimento.
    const resposta = encontrarResposta(entradaUsuarioLower) || 'Desculpe, não entendi sua pergunta. Poderia reformular?';

    // Agenda a função adicionarMensagem para ser executada
            // após 500 milissegundos, exibindo a resposta
            // na interface do chat.
    setTimeout(() => adicionarMensagem(resposta, 'bot-message'), 500);

    // Verifica se a mensagem do usuário inclui a frase
            // específica 'quais são os cursos oferecidos'.
    if (entradaUsuarioLower.includes('quais são os cursos oferecidos')) {

        // Se a mensagem contém a frase, agenda a função
                // exibirBotoesCursos para ser executada
                // após 600 milissegundos.
        setTimeout(() => exibirBotoesCursos(), 600);

    }
}


function encontrarResposta(entrada) {

    // Inicializa 'melhorCorrespondencia' como uma string
            // vazia para armazenar a resposta mais
            // adequada encontrada.
    let melhorCorrespondencia = '';

    // Inicializa 'menorDistancia' com valor Infinity, usado
            // para comparação inicial na busca pela
            // menor distância de Levenshtein.
    let menorDistancia = Infinity;

    // Itera sobre cada objeto no array 'qa', que
            // contém as perguntas e respostas pré-definidas.
    qa.forEach(item => {

        // Calcula a distância de Levenshtein entre a
                // entrada do usuário e a pergunta atual da lista.
        // A função 'toLowerCase' garante que a comparação
                // seja feita de forma insensível a
                // maiúsculas/minúsculas.
        const distancia = calcularDistanciaLevenshtein(entrada, item.pergunta.toLowerCase());

        // Verifica se a distância calculada para esta
                // iteração é menor que a menor distância
                // encontrada nas iterações anteriores.
        if (distancia < menorDistancia) {

            // Atualiza 'menorDistancia' com o novo
                    // valor mínimo encontrado.
            menorDistancia = distancia;

            // Atualiza 'melhorCorrespondencia' com a
                    // resposta associada à menor distância encontrada.
            melhorCorrespondencia = item.resposta;

        }
    });

    // Verifica se a menor distância encontrada é menor
                // ou igual à metade do comprimento da
                // string de entrada.
    // Este critério ajuda a garantir que as respostas
                // escolhidas tenham uma relevância
                // aceitável em relação ao que foi perguntado.
    return menorDistancia <= (entrada.length / 2) ? melhorCorrespondencia : null;

}

function calcularDistanciaLevenshtein(a, b) {

    // Cria uma matriz para armazenar os resultados
                // dos subproblemas.
    const matrix = [];

    // O loop itera desde 0 até o comprimento da string 'b'.
                // Cada iteração representa um passo no processo
                // de deletar caracteres da string 'b' até que
                // ela se torne uma string vazia.
    for (let i = 0; i <= b.length; i++) {

        // Inicializa a primeira coluna da matriz com
                // valores crescentes começando de 0.
        // Esses valores representam o custo cumulativo de
                // remover caracteres de 'b' para alcançar
                // uma string vazia.
        // Por exemplo, matrix[1][0] = 1 significa que
                // custa 1 operação para deletar o primeiro
                // caractere de 'b' e assim por diante.
        matrix[i] = [i];  // Preenche a primeira coluna com os valores de 0 até b.length.

    }


    // O loop itera desde 0 até o comprimento da string 'a'. Cada
                // valor de j representa o custo incremental de
                // inserir caracteres em 'a' vazia até
                // formar a string 'b'.
    for (let j = 0; j <= a.length; j++) {

        // Define o valor de cada posição da primeira linha da
                // matriz. Cada valor j na linha 0, matrix[0][j],
                // representa o custo de inserir j caracteres
                // em 'a' vazia.
        // Por exemplo, matrix[0][1] = 1 significa que
                // inserir um caractere em 'a' vazia
                // custa 1 operação.
        matrix[0][j] = j;  // Preenche a primeira linha com os valores de 0 até a.length.
    }


    // Itera sobre cada linha da matriz, começando do
                // índice 1 porque a linha 0 já foi inicializada.
    for (let i = 1; i <= b.length; i++) {

        // Itera sobre cada coluna da matriz, começando do
                // índice 1 porque a coluna 0 já foi inicializada.
        for (let j = 1; j <= a.length; j++) {

            // Verifica se os caracteres actuais nas duas
                    // strings (a e b) são iguais.
            if (b.charAt(i - 1) === a.charAt(j - 1)) {

                // Se os caracteres são iguais, herda o custo
                        // da posição diagonal anterior (superior esquerda),
                // pois não há necessidade de operação de edição
                        // se os caracteres já são iguais.
                matrix[i][j] = matrix[i - 1][j - 1];

            } else {

                // Se os caracteres são diferentes, calcula o
                        // custo de todas as três operações possíveis:
                // 1. Substituição: Substituir um caractere de 'a'
                        // por um caractere de 'b'.
                //    Isso é feito pegando o valor da célula
                        // diagonal anterior (superior esquerda) e
                        // adicionando 1 ao custo.
                matrix[i][j] = matrix[i - 1][j - 1] + 1;

                // 2. Inserção: Inserir um caractere em 'a' para
                        // que fique mais parecida com 'b'.
                //    Isso é tratado pegando o custo da célula à
                        // esquerda (mesma linha, coluna anterior) e
                        // adicionando 1.
                //    Isso simula o custo de adicionar um
                        // caractere adicional em 'a'.
                matrix[i][j] = Math.min(matrix[i][j], matrix[i][j - 1] + 1);

                // 3. Deleção: Deletar um caractere de 'a'.
                //    Isso é tratado pegando o custo da célula
                        // acima (linha anterior, mesma coluna) e adicionando 1.
                //    Isso simula o custo de remover um caractere
                        // de 'a' para torná-la mais parecida com 'b'.
                matrix[i][j] = Math.min(matrix[i][j], matrix[i - 1][j] + 1);

            }
        }
    }


    // Retorna o custo de transformar completamente 'a' em 'b',
                // localizado no canto inferior direito da matriz.
    return matrix[b.length][a.length];

}

function exibirBotoesCursos() {

    // Acessa o elemento HTML que será usado para exibir a
                // saída do chat, para onde os botões
                // serão adicionados.
    const chatOutput = document.getElementById('chat-output');

    // Cria um novo elemento 'div' que irá conter
                // todos os botões de cursos.
    const cursosBotoes = document.createElement('div');

    // Define um ID para essa 'div' para possível
                // estilização ou referência futura.
    cursosBotoes.id = 'cursos-botoes'; 

    // Lista de cursos disponíveis com nomes e URLs para acesso.
    const cursos = [
        { nome: 'Excel', link: 'https://www.udemy.com/course/excel-basico-ao-avancado-aprenda-a-automatizar-12-planilhas/?referralCode=477073AE57D910FB2391' },
        { nome: 'Python', link: 'https://www.udemy.com/course/python-rpa-e-excel-aprenda-automatizar-processos-e-planilhas/?referralCode=75F06FB2C5443C0A1FBF' },
        { nome: 'Lógica', link: 'https://www.udemy.com/course/algoritmos-e-logica-de-programacao-visualg-c-e-qt-creator/?referralCode=3D37392361EEA1BFB488' }
    ];

    // Inicia um loop sobre cada objeto dentro do array 'cursos'.
                // Cada objeto contém informações sobre
                // um curso específico.
    cursos.forEach(curso => {

        // Cria um elemento âncora ('a'), comumente usado para
                // criar links. Aqui, será usado para atuar
                // como um botão devido à classe CSS.
        const botaoCurso = document.createElement('a');

        // Atribui a classe 'botao-curso' ao elemento âncora.
                // Essa classe é responsável por aplicar estilos que
                // fazem o elemento parecer e funcionar como um botão.
        // Os estilos podem incluir padding, bordas arredondadas,
                // cores de fundo, efeitos de hover, entre
                // outros, definidos no CSS.
        botaoCurso.className = 'botao-curso';

        // Define o atributo 'href' do elemento âncora com o URL
                // fornecido no objeto do curso.
        // Este URL é o destino que o usuário alcançará ao clicar
                // no botão, levando-o diretamente ao curso escolhido.
        botaoCurso.href = curso.link;

        // Adiciona o atributo 'target' com o valor '_blank'
                // ao elemento âncora.
        // Este atributo faz com que o link seja aberto em
                // uma nova aba do navegador, preservando a
                // página atual do usuário no chatbot.
        // É uma prática comum para melhorar a experiência do
                // usuário ao mantê-los no mesmo contexto, ao
                // mesmo tempo em que explora recursos externos.
        botaoCurso.target = '_blank';

        // Configura o texto visível dentro do botão para
                // ser o nome do curso.
        // Este texto é obtido diretamente do objeto do curso,
                // tornando os botões dinamicamente gerados
                // com base nos dados fornecidos.
        botaoCurso.textContent = curso.nome;

        // Finalmente, o novo botão é adicionado ao contêiner 'cursosBotoes'.
        // Isso é feito usando o método 'appendChild', que
                // insere o botão como um filho do elemento 'div'
                // que agrupa todos os botões de cursos,
        // inserindo-o na posição correta dentro do fluxo
                // do documento HTML.
        cursosBotoes.appendChild(botaoCurso);

    });


    // Adiciona a 'div' de botões de cursos ao
                // elemento de saída do chat.
    chatOutput.appendChild(cursosBotoes);

    // Garante que os novos botões sejam visualizados
                // ao rolar a janela de chat até eles.
    cursosBotoes.scrollIntoView();

}



function adicionarMensagem(mensagem, classe) {

    // Cria um novo elemento 'div' no documento HTML.
    const elementoMensagem = document.createElement('div');

    // Configura a classe CSS do novo elemento 'div'.
            // Utiliza template strings para incorporar a
            // classe recebida como argumento, permitindo
            // estilização específica.
    elementoMensagem.className = `message ${classe}`;

    // Define o texto do elemento 'div' para ser igual ao
            // argumento 'mensagem', que contém o texto da
            // mensagem a ser adicionada ao chat.
    elementoMensagem.textContent = mensagem;

    // Localiza o elemento com ID 'chat-output' e adiciona o
            // novo elemento 'div' como um filho, fazendo com
            // que a mensagem apareça visualmente no chat.
    document.getElementById('chat-output').appendChild(elementoMensagem);

    // Faz com que o elemento 'div' recém-criado seja rolado
            // para a visualização, garantindo que a última
            // mensagem sempre apareça na parte visível
            // da janela de chat.
    elementoMensagem.scrollIntoView();

}

function alternarJanelaChat() {
    
    // Obtém o elemento da janela de chat usando seu ID.
                // Este elemento é o container principal da
                // janela de chat na página HTML.
    const janelaChat = document.getElementById('chat-window');

    // Checa o estado atual do CSS 'display' do elemento janela de chat.
    // Se o valor for 'none', significa que a janela de
                // chat está atualmente oculta.
    janelaChat.style.display = janelaChat.style.display === 'none' 

        // Se a janela está oculta, esta condição muda o
                    // valor de 'display' para 'flex'.
        // O 'flex' é um valor de display que habilita o uso
                    // de Flexbox, um método de layout que
                    // facilita o design responsivo.
        ? 'flex' 

        // Se a janela não está oculta, ou seja, já está
                    // visível, esta parte do operador ternário
                    // define o 'display' para 'none'.
        // Configurar 'display' para 'none' efetivamente esconde o
                    // elemento na página, tornando-o não
                    // renderizado e não visível.
        : 'none';

}

function fecharChat() {

    // Acessa o elemento DOM que representa o chatbot
                // inteiro. Isso é feito usando o
                // método 'getElementById',
    // que busca no documento HTML um elemento com o ID
                // especificado, neste caso, 'chatbot'.
    const elementoChatbot = document.getElementById('chatbot');

    // Define a propriedade CSS 'display' do elemento
                // para 'none'. Esta linha efetivamente
                // esconde o elemento chatbot da página.
    // Quando 'display' é definido como 'none', o elemento
                // não é renderizado e não ocupa espaço no layout da página,
    // tornando-o completamente invisível e inacessível
                // na interface do usuário.
    elementoChatbot.style.display = 'none';

}