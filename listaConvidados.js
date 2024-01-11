


// elementos
 let nomeConvidado = document.querySelector('.nomeConvidado');
 let nomeColaborador = document.querySelector('.nomeColaborador');
 let botao = document.querySelector('.botao');
 let div = document.querySelector('div');
 let input = document.querySelector('input');
 let  h4 = document.querySelector('h4');
 let span = document.querySelector('span');


 let convidado, colaborador;


 let convidadoNaLista  = false;
 let convidadoJaConfirmado = false;

let  listaVIP = [
    {funcionario :'ANA', convidados : ['MARCOS','BEATRIZ','THIAGO'] },
    {funcionario :'CLAUDIO', convidados : ['CAMILA','GUSTAVO','LARISSA'] },
    {funcionario :'RODRIGO', convidados : ['LUCAS','JULIANA','ANDRÉ'] },
    {funcionario :'SARA', convidados : ['ANA','PEDRO','FERNANDA'] },
    {funcionario :'PAULO', convidados : ['JOÃO','MARIA','CARLOS']}
 ];

 let  listaVipConferidos = [
    {funcionario :'ANA', convidados : [] },
    {funcionario :'CLAUDIO', convidados :[] },
    {funcionario :'RODRIGO', convidados :[]},
    {funcionario :'SARA', convidados :[]},
    {funcionario :'PAULO', convidados : []}
 ];



//       #### FUNCOES ####

// remove o texto dos inputs e reinicia os valores iniciais
function reiniciarConsulta(){
    let h = document.querySelector('h4');
    h.remove();
    convidadoNaLista  = false;
    convidadoJaConfirmado = false;
    span.textContent="";
}

// exibe o resultado da busca
function exibirResultado(){ 
    

    
    if(convidadoJaConfirmado){   // colaborador ja confirmou presenca
        span.style.color = 'orange';
        span.textContent = 'convidado já confirmado'; 

        // Adiciona <span> a <h4>, e depois <h4> a <div>
        h4.appendChild(span);
        div.appendChild(h4);

    }else if(convidadoNaLista){  // convidado na lista

        span.style.color = 'blue';
        span.textContent = 'permissao concedida';
        
        h4.appendChild(span);
        div.appendChild(h4);

    }else{                   // convidado nao esta presente na lista vip do colaborador
       
        span.style.color = 'red';
        span.style.textDecoration = 'underline';
        span.textContent = 'permissao negada';

        h4.appendChild(span);
        div.appendChild(h4);
    }
     
}


//verifica se o convidado ja entrou
function verificarConvidado(){
    for( let objeto of listaVipConferidos ){
        if( colaborador == objeto.funcionario){
            return objeto.convidados.includes(convidado);
        }
    }
    return false;    
}

// adiciona confirmacao do convidado
function adicionarConfirmacao(){
    for( let objeto of listaVipConferidos )
    if( colaborador == objeto.funcionario){
            objeto.convidados.unshift(convidado);
    }
}

// confere os dados de entrada
function conferirDados(){
    
    if(colaborador == "" || convidado == ""){
        alert('dados vazios ou incompletos');
    }
    if(!(listaVIP.some(objeto => objeto.funcionario === colaborador))){ // checa se o funcionario existe 
        alert('colaborador nao existente');
        funcionarioExiste = false;
    }else{
         for( let objeto of listaVIP){
              if(colaborador == objeto.funcionario){
                 if (objeto.convidados.includes(convidado)) {
                        var indiceRemovivel = objeto.convidados.indexOf(convidado);
                        objeto.convidados.splice(indiceRemovivel, 1);
                        convidadoNaLista= true;
                        adicionarConfirmacao();             //adiciona a lista de confirmados 

                }else if((verificarConvidado())){           // verifica se ja confirmou presenca
                        
                    convidadoJaConfirmado = true;
          
                        }else{                            // nunca foi convidado
                         
                        }
                    }
                }
        exibirResultado();
       }
}

// converte os valores para garantir a comparacao sem distincao de maiusculas e minusculas
function capturarDados(){
   convidado = nomeConvidado.value.toUpperCase();
   colaborador = nomeColaborador.value.toUpperCase();
   nomeColaborador.value = "";
   nomeConvidado.value = "";
   conferirDados();
}

// eventos
botao.addEventListener("click",capturarDados);
input.addEventListener("click", reiniciarConsulta);

