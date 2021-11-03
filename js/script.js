//Controle de interface
let seuVotoPara = document.querySelector('.voto span');
let cargo = document.querySelector('.voto-candidato span');
let votoInfo = document.querySelector('.voto-info');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let digito = document.querySelector('.voto-digitos');

//Controle de ambiente
let etapaAtual = 0;
let numero = '';

function startEtapa(){
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    for(let i=0; i<etapa.numeros; i++){
        if(i === 0){
            numeroHtml += `<div class="digito pisca"></div>`;
        }else{
            numeroHtml += '<span class="digito"></span>';
        }
        
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    votoInfo.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    digito.innerHTML = numeroHtml;
}

function attInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true;
        }else{
            return false;
        }
    });

    if(candidato.length > 0){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        votoInfo.innerHTML = `Nome: ${candidato.nome}<br>Partido: ${candidato.partido}`;
        
        let fotosHtml = '';
        for(let i in candidato.fotos){
            fotosHtml += `<div class="image-voto"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</img></div>`;
        }

        lateral.innerHTML = fotosHtml;
    }else{
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        votoInfo.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>'
    }

    console.log("Candidato", candidato);
}

function clicou(n){
    let elNumero = document.querySelector('.digito.pisca');
    if(elNumero !== null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;
        elNumero.classList.remove('pisca');

        if(elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('pisca');
        }else{
            attInterface();
        }
    }
}

function branco(){
    alert('Voto em branco!');
}

function corrige(){
    alert('Corrige')
}

function confirma(){
    alert('Voto confirmado!');    
}

startEtapa();