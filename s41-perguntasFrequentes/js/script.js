function alternarResposta(elemento) {
    /* Declaração da função chamada 'alternarResposta'. Esta 
            função é definida para aceitar um parâmetro chamado 'elemento',
            que será um elemento HTML passado quando a função for invocada. 
            No contexto de seu uso, este elemento será um <div> 
            que contém uma pergunta de FAQ. */

    const resposta = elemento.querySelector('.resposta');
    /* Dentro da função, a primeira linha cria uma 
            constante chamada 'resposta'.
       Usa o método 'querySelector' no 'elemento' passado como 
            argumento para encontrar o primeiro elemento filho que 
            corresponda ao seletor CSS '.resposta'.
       Este método retorna o primeiro elemento dentro do 'elemento' 
            especificado que tem a classe 'resposta'.
       Esta linha efetivamente localiza o elemento que contém o 
            texto da resposta para a pergunta do FAQ específica. */

    resposta.classList.toggle('mostrar');
    /* A próxima linha manipula a lista de classes do 
            elemento 'resposta' obtido na linha anterior.
       O método 'toggle' é chamado no 'classList' do elemento 'resposta'. 
            Este método adiciona a classe 'mostrar' ao elemento se 
            ela não estiver presente,
            ou remove a classe se ela já estiver aplicada.
       A classe 'mostrar' é usada para controlar a visibilidade da 
            resposta, geralmente definindo 'display: block' para 
            torná-la visível na página. */

    resposta.classList.toggle('escondido');
    /* Esta linha também utiliza o método 'toggle', mas agora 
            para a classe 'escondido'.
       Funciona da mesma forma que a manipulação anterior da 
            classe 'mostrar', mas neste caso, alterna a classe 'escondido'.
       Se 'escondido' estiver presente, ele será removido (tornando o 
            elemento visível), e se não estiver, será 
            adicionado (ocultando o elemento).
       Normalmente, a classe 'escondido' define 'display: none' 
            para esconder o elemento da visualização do usuário. */
            
}