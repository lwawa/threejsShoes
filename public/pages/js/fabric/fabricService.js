

export function abrirTexto() {
    if (isTextOpen) {
        var listaTextoDiv = document.getElementById('listaTexto');
        listaTextoDiv.innerHTML = '';

    } else {

        var listaTextoDiv = document.getElementById('listaTexto');
        listaTextoDiv.innerHTML = '';
        // Criar a primeira imagem
        var imagem1 = document.createElement('img');
        imagem1.src = 'assets/images/app/buttons/passo/texto/novoTexto.png'; // Substitua pelo caminho da sua primeira imagem
        imagem1.className = 'passoBotao';
        imagem1.onclick = function () {
            adicionarTexto();
        }
        listaTextoDiv.appendChild(imagem1);

        // Criar a segunda imagem
        var imagem2 = document.createElement('img');
        imagem2.src = 'assets/images/app/buttons/passo/texto/modelo.png'; // Substitua pelo caminho da sua segunda imagem
        imagem2.className = 'passoBotao'; // Adicione a classe desejada
        listaTextoDiv.appendChild(imagem2);
    }
    abrirCorTexto();
}




var isTextOpen = false;
//selecao cor texto
function abrirCorTexto() {
    if (isTextOpen) {
        //close all other open menus
        isTextOpen = false;
        document.getElementsByClassName('coresDiv')[0].remove();
        return
    }

    isTextOpen = true;
    const acoesDiv = document.querySelector('.acoes');
    const coresDiv = document.createElement('div');
    coresDiv.className = 'coresDiv';
    const linhaDiv1 = document.createElement('div');
    linhaDiv1.classList.add('linha');
    const linhaDiv2 = document.createElement('div');
    linhaDiv2.classList.add('linha');
    const linhaDiv3 = document.createElement('div');
    linhaDiv3.classList.add('linha');
    const linhaDiv4 = document.createElement('div');
    linhaDiv4.classList.add('linha');

    const cores1 = ['#E42430', '#FFD600', '#01C702', '#00C1CA', '#0937E2', '#D742D2', '#CDBCC2', '#C3B3B3', '#BDB2B0', '#B5A9A8', '#AB9FA1', '#A29595', '#958989', '#8A7E80', '#7B7172', '#6C6263'];
    const cores2 = ['#D91D1E', '#D2B710', '#019847', '#0099C5', '#2E389A', '#DB3589', '#7D727A', '#6F686F', '#70666E', '#615C63', '#534D59', '#46404E', '#363441', '#2D2B38', '#272332', '#252132'];
    const cores3 = ['#D17661', '#D79272', '#DA9F7B', '#D2B976', '#A9B07D', '#89A87E', '#65A582', '#56A6A3', '#5888B9', '#6978AF', '#6777B2', '#786AA8', '#9469A1', '#AB6C99', '#D75A56', '#D24C4A'];
    const cores4 = ['#AA7352', '#DF622C', '#DD882E', '#D8BC12', '#7EA52C', '#16A438', '#009845', '#029791', '#0297CB', '#0464AE', '#0661AF', '#1346A1', '#2E308A', '#5C2C80', '#DD172E', '#DA191B'];

    function adicionarQuadrados(linhaDiv, cores) {
        cores.forEach(cor => {
            const quadrado = document.createElement('div');
            quadrado.classList.add('quadradoCor');
            quadrado.style.backgroundColor = cor;
            quadrado.addEventListener('click', () => alterarCorTexto(cor));
            linhaDiv.appendChild(quadrado);
        });
    }

    adicionarQuadrados(linhaDiv1, cores1);
    adicionarQuadrados(linhaDiv2, cores2);
    adicionarQuadrados(linhaDiv3, cores3);
    adicionarQuadrados(linhaDiv4, cores4);

    coresDiv.appendChild(linhaDiv1);
    coresDiv.appendChild(linhaDiv2);
    coresDiv.appendChild(linhaDiv3);
    coresDiv.appendChild(linhaDiv4);
    acoesDiv.appendChild(coresDiv);
}
