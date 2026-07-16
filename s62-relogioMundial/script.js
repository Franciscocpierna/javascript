const locais = [
    /* Define uma constante chamada 'locais' que é 
                um array de objetos.
       Cada objeto representa uma cidade com seu nome e 
                fuso horário em relação ao UTC (Tempo Universal Coordenado). */
    
    { nome: "Nova York", fusoHorario: -4 },
    // Objeto representando Nova York com fuso horário UTC-4
    
    { nome: "Londres", fusoHorario: 1 },
    // Objeto representando Londres com fuso horário UTC+1
    
    { nome: "Tóquio", fusoHorario: 9 },
    // Objeto representando Tóquio com fuso horário UTC+9
    
    { nome: "Sydney", fusoHorario: 10 },
    // Objeto representando Sydney com fuso horário UTC+10
    
    { nome: "Dubai", fusoHorario: 4 },
    // Objeto representando Dubai com fuso horário UTC+4
    
    { nome: "Moscou", fusoHorario: 3 },
    // Objeto representando Moscou com fuso horário UTC+3
    
    { nome: "São Paulo", fusoHorario: -3 },
    // Objeto representando São Paulo com fuso horário UTC-3
    
    { nome: "Pequim", fusoHorario: 8 },
    // Objeto representando Pequim com fuso horário UTC+8
    
    { nome: "Berlim", fusoHorario: 2 },
    // Objeto representando Berlim com fuso horário UTC+2
    
    { nome: "Paris", fusoHorario: 2 }
    // Objeto representando Paris com fuso horário UTC+2

];


function atualizarRelogios() {
    // Define a função 'atualizarRelogios' que atualizará os 
                // horários dos relógios exibidos na página

    const containerRelogios = document.getElementById("relogios");
    // Seleciona o elemento HTML com o ID 'relogios' e o armazena 
                // na constante 'containerRelogios'

    containerRelogios.innerHTML = "";
    // Limpa todo o conteúdo dentro do elemento 'containerRelogios',
                // removendo quaisquer relógios existentes

    locais.forEach(local => {
        // Itera sobre cada objeto no array 'locais'

        const agora = new Date();
        // Cria um novo objeto Date que representa a 
                    // data e hora atuais

        // Calcular a hora local considerando o fuso horário e o deslocamento do UTC
        const horaLocal = new Date(agora.getTime() + (local.fusoHorario * 60 + agora.getTimezoneOffset()) * 60000);

        /*
        Explicação da Correção:

        Cálculo do Tempo Local:
        agora.getTime() obtém o tempo atual em milissegundos desde a 
                    época (1970-01-01).

        (local.fusoHorario * 60 + agora.getTimezoneOffset()) * 60000 
                    calcula o deslocamento total em milissegundos considerando o 
                    fuso horário local e o deslocamento do UTC (horário de verão).
        
        new Date(agora.getTime() + (local.fusoHorario * 60 + agora.getTimezoneOffset()) * 60000) 
                    cria um novo objeto Date ajustado para o fuso horário específico.
        */

        // Ajusta a hora atual para o fuso horário específico do local. 
        // Obtém a hora UTC atual e adiciona o fuso horário do local

        const dataFormatada = horaLocal.toLocaleDateString('pt-BR');
        // Formata a data ajustada para o formato 'pt-BR' (dd/mm/aaaa)

        const horaFormatada = horaLocal.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        // Formata a hora ajustada para o formato 'pt-BR' (hh:mm:ss) 
                    // com duas casas para horas, minutos e segundos

        const divRelogio = document.createElement("div");
        // Cria um novo elemento 'div' para representar um relógio

        divRelogio.className = "relogio";
        // Define a classe CSS do novo elemento 'div' 
                    // como 'relogio' para estilização

        const divLocal = document.createElement("div");
        // Cria um novo elemento 'div' para o nome do local

        divLocal.className = "local";
        // Define a classe CSS do novo elemento 'div' 
                    // como 'local' para estilização

        divLocal.textContent = local.nome;
        // Define o texto do novo elemento 'div' como o nome do local

        const divDataHora = document.createElement("div");
        // Cria um novo elemento 'div' para a data e hora

        divDataHora.className = "data-hora";
        // Define a classe CSS do novo elemento 'div' 
                    // como 'data-hora' para estilização

        divDataHora.textContent = `${dataFormatada} - ${horaFormatada}`;
        // Define o texto do novo elemento 'div' como a 
                    // data e a hora formatadas

        divRelogio.appendChild(divLocal);
        // Adiciona o elemento 'divLocal' (nome do local) 
                    // como filho do elemento 'divRelogio'

        divRelogio.appendChild(divDataHora);
        // Adiciona o elemento 'divDataHora' (data e hora) 
                    // como filho do elemento 'divRelogio'

        containerRelogios.appendChild(divRelogio);
        // Adiciona o elemento 'divRelogio' completo (que 
                    // contém o nome do local e a data/hora) 
                    // como filho do 'containerRelogios' na página
        
    });
}

setInterval(atualizarRelogios, 1000);
// Define um intervalo de tempo para chamar a 
            // função 'atualizarRelogios' a cada 1000 
            // milissegundos (1 segundo)

atualizarRelogios();
// Chama a função 'atualizarRelogios' uma vez para garantir 
            // que os relógios sejam atualizados imediatamente 
            // ao carregar a página, antes de começar o intervalo de tempo