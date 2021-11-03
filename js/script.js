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
let branco = false;
let votos = [];

function startEtapa(){
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    branco = false;

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
            if(candidato.fotos[i].small){
                fotosHtml += `<div class="image-voto vice"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</img></div>`;
            }else{
                fotosHtml += `<div class="image-voto"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</img></div>`;
            }
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

function votoBranco(){
    numero = '';
    branco = true;

    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    digito.innerHTML = '';
    lateral.innerHTML = '';
    votoInfo.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO</div>'
}

function corrige(){
    startEtapa();
}

function confirma(){
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;
    const audio = document.querySelector('audio');


    if(branco === true){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    }else if(numero.length === etapa.numeros){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if(votoConfirmado){
        etapaAtual++;
        if(etapaAtual < etapas.length){
            startEtapa();
        }else{
            audio.play();
            document.querySelector('.tela').innerHTML = '<div class="aviso-fim pisca">FIM</div>';
            console.log(votos);
        }
    }
}

startEtapa();