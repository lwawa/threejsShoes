const canvas = document.getElementById('threeCanvas');
var scene = new THREE.Scene(); //cria a cena

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // Cria a câmera
var renderer = new THREE.WebGLRenderer({ canvas }); // Cria o renderizador

// Função para atualizar o tamanho da câmera e do renderizador quando a tela for redimensionada
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Configura o tamanho inicial do renderizador
renderer.setSize(window.innerWidth, window.innerHeight);

// Adiciona um ouvinte de evento para redimensionamento de janela
window.addEventListener('resize', onWindowResize, false);

// Define a cor de fundo do renderizador e da cena
renderer.setClearColor(0xC4C4C4);
scene.background = new THREE.Color(0xC4C4C4);

// Oculta o elemento 'back' inicialmente
document.getElementById('back').style.display = "none";


//document.body.appendChild(renderer.domElement);//adiciona o render ao html

var cssRenderer = new THREE.CSS2DRenderer();//cria interface
// cssRenderer.setSize(753, 1205);//determina o tamanho da interface
// cssRenderer.domElement.style.position = 'relative';//determina a posição da interface
// cssRenderer.domElement.style.top = '0';
// document.body.appendChild(cssRenderer.domElement);//adiciona a interface ao render

//lista de partes e lista de grupos
var listaPartes = [];
var barraTenis = [];
var sola = [];
var suporteCadarco = [];
var cadarco = [];
var lateral = [];
var centro = [];
var boca = [];
var atrasSup = [];
var atrasInf = [];

//cria lista de cores
var colors = [
    0xFFFFFF,
    0xCEC8BC,
    0x696969,
    0x000000,
    0x1C334E,
    0x0D3875,
    0x007D69,
    0x97693B,
    0xF7B718,
    0x9B1C1C,
    0xFF6BA3,
    0xFEC7C4,
    0xE9C2BB
];

// Seletor de botões pela classe
var buttons = document.querySelectorAll('.colorButton');

// Itera sobre os botões e aplica a cor correspondente
buttons.forEach(function (button, index) {
    button.style.backgroundColor = '#' + colors[index].toString(16);
    button.style.color = 'white'; // Garante que o texto seja visível
});

// Posição inicial da câmera (fixa)
camera.position.set(0, 0, 50);

const loader = new THREE.OBJLoader();//cria o loader de .OBJ

var rotatingObject; // Variável para armazenar o objeto
var parentObject = new THREE.Object3D();
var originalRotation;
var vertical = false;
//nesse loader eu carrego o obj pela api (so no vercel funciona)
loader.load('https://firebasestorage.googleapis.com/v0/b/crashlytics-ccb9c.appspot.com/o/tenis.obj?alt=media&token=c6c87d94-db73-4cf2-810c-b27be94c2965', function (object) {
//nesse loader eu carrego o obj pelos arquivos(so no local funciona)
//loader.load('/assets/3d/tenis.obj', function (object) {
    // Criando um objeto pai para o objeto carregado

    parentObject.add(object);
    rotatingObject = object;

    //preencher a barra do tenis
    barraTenis.push(rotatingObject.children[0]);
    barraTenis.push(rotatingObject.children[12]);
    //preencher a sola
    sola.push(rotatingObject.children[1]);
    //preencher o suporte cadarco
    suporteCadarco.push(rotatingObject.children[2]);
    suporteCadarco.push(rotatingObject.children[10]);
    suporteCadarco.push(rotatingObject.children[7]);
    suporteCadarco.push(rotatingObject.children[8]);
    suporteCadarco.push(rotatingObject.children[9]);
    //prencher cadarco
    cadarco.push(rotatingObject.children[11]);
    //preencher lateral
    lateral.push(rotatingObject.children[5]);
    //preencher centro
    centro.push(rotatingObject.children[6]);
    //preencher boca
    boca.push(rotatingObject.children[14]);
    //prencher atrassup
    atrasSup.push(rotatingObject.children[17]);
    atrasSup.push(rotatingObject.children[18]);
    //prencher atrasInf
    atrasInf.push(rotatingObject.children[15]);
    atrasInf.push(rotatingObject.children[16]);
    //adicionar a lista
    listaPartes.push(barraTenis);
    listaPartes.push(sola);
    listaPartes.push(suporteCadarco);
    listaPartes.push(cadarco);
    listaPartes.push(lateral);
    listaPartes.push(centro);
    listaPartes.push(boca);
    listaPartes.push(atrasSup);
    listaPartes.push(atrasInf);

    // Centralizando o objeto filho no pai
    var boundingBox = new THREE.Box3().setFromObject(rotatingObject);
    var center = boundingBox.getCenter(new THREE.Vector3());
    rotatingObject.position.sub(center);

    // Adicionando o objeto pai à cena
    scene.add(parentObject);



    //ativa os controles da camera, permitindo girar o objeto
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Adiciona amortecimento ao movimento
    controls.dampingFactor = 0.25; // Define o fator de amortecimento
    controls.enableZoom = true; // Permite zoom
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI / 2; // Define o ângulo polar mínimo (vertical)
    controls.maxPolarAngle = Math.PI / 2;
    controls.enabled = false;

    parentObject.rotation.y = -(Math.PI / 2);

    originalRotation = parentObject.rotation.clone();
    function animate() {
        requestAnimationFrame(animate);

        // Atualiza os controles desativar para não ter acesso a rotação
        controls.update();

        // Rotaciona o objeto pai para girar em torno de seu próprio eixo
        //parentObject.rotation.x += 0.01;
        //parentObject.rotation.y += 0.01;

        renderer.render(scene, camera);
        cssRenderer.render(scene, camera);
    }

    animate();

    var buttonDiv = document.createElement('div');
    buttonDiv.className = 'buttonWrapper';

    /*var rotateButton = document.createElement('button');
    rotateButton.textContent = 'Girar Horizontalmente';
    rotateButton.addEventListener('click', function () {
        rotateParentObject();
    });
    buttonDiv.appendChild(rotateButton);
    var cssObject = new THREE.CSS2DObject(buttonDiv);
    cssObject.position.set(0, 10, 0); // Posição relativa ao objeto
    scene.add(cssObject);

    function rotateParentObject() {
        var targetRotation = parentObject.rotation.y + Math.PI / 2; // Adiciona 90 graus (Math.PI / 2 radianos)
        var step = 0.02; // Ajuste a velocidade da rotação

        function animate() {
            parentObject.rotation.y += step;

            if (parentObject.rotation.y < targetRotation) {
                requestAnimationFrame(animate);
            } else {
                parentObject.rotation.y = targetRotation; // Garante que a rotação final seja exata
            }
        }

        animate(); // Inicia a animação
    }*/

    function imprimirInformacoesAngulos() {
        // Use console.table para uma saída mais estruturada

        console.clear();
        console.table({
            'teste': parentObject.rotation.z,
            'objetivo': parentObject.rotation.x - (Math.PI / 2)
        });
    }

    //setInterval(imprimirInformacoesAngulos, 1000);

    function resetParentObject() {
        var targetRotation = controls.getAzimuthalAngle() - (Math.PI / 2);
        var step = 0.08;

        //Determina a direção da rotação (positiva ou negativa)
        var direction = targetRotation > parentObject.rotation.y ? 1 : -1;

        function animate() {
            parentObject.rotation.y += direction * step;

            // Verifica se a rotação atingiu ou ultrapassou o ângulo alvo
            if ((direction === 1 && parentObject.rotation.y < targetRotation) ||
                (direction === -1 && parentObject.rotation.y > targetRotation)) {
                requestAnimationFrame(animate);
            } else {
                parentObject.rotation.y = targetRotation; // Garante que a rotação final seja exata
                controls.enabled = false;
            }

        }

        animate(); // Inicia a animação
    }



    function rotateObjectVertically(callReset) {
        var targetRotationX = -(Math.PI / 2);
        var stepX = 0.08;
        var contador = 0;

        function animate() {
            if (vertical) {
                parentObject.rotateX(stepX);
            } else {
                parentObject.rotateX(-stepX);
            }
            contador -= stepX;

            if (contador > targetRotationX) {
                requestAnimationFrame(animate);
            } else {
                vertical = !vertical;
                if (callReset) {
                    resetParentObject();
                }
            }
        }

        if (callReset && vertical) {
            resetParentObject()
        } else {
            animate(); // Inicia a animação
        }
    }


    preVisualizar = document.getElementById('PreVisualizar');
    preVisualizar.addEventListener('click', function () {
        document.getElementById('button-container').style.display = "none";
        document.getElementById('color-div').style.display = "none";
        document.getElementById('tool').style.display = "none";
        document.getElementById('listaProd').style.display = "none";
        document.getElementById('back').style.display = "block";
        controls.enabled = true;
        cssRenderer.domElement.style.display = "none";
    })

    back = document.getElementById('backButton')
    back.addEventListener('click', function () {
        document.getElementById('button-container').style.display = "flex";
        document.getElementById('tool').style.display = "block";
        document.getElementById('listaProd').style.display = "block";
        document.getElementById('back').style.display = "none";
        rotateObjectVertically(true);
        cssRenderer.domElement.style.display = "block";
    })

    vertical = document.getElementById('vertical')
    vertical.addEventListener('click', function () {
        rotateObjectVertically(false);
    })

    embaralhar = document.getElementById('Embaralhar');
    embaralhar.addEventListener('click', function () {
        for (var i = 0; i < listaPartes.length; i++) {
            var randomIndex = Math.floor(Math.random() * colors.length);
            cor = colors[randomIndex]
            changePartColor(i, cor)
        } // Chama a função de mudança de cor quando o botão é clicado
    });

    limpar = document.getElementById('Limpar');
    limpar.addEventListener('click', function () {
        for (var i = 0; i < listaPartes.length; i++) {
            cor = colors[0]
            changePartColor(i, cor)
        } // Chama a função de mudança de cor quando o botão é clicado
    });

    button1 = document.getElementById('button1');
    button1.addEventListener('click', function () {
        selectPartColor(0); // Chama a função de mudança de cor quando o botão é clicado
    });

    button2 = document.getElementById('button2');
    button2.addEventListener('click', function () {
        selectPartColor(1); // Chama a função de mudança de cor quando o botão é clicado
    });

    button3 = document.getElementById('button3');
    button3.addEventListener('click', function () {
        selectPartColor(2); // Chama a função de mudança de cor quando o botão é clicado
    });

    button4 = document.getElementById('button4');
    button4.addEventListener('click', function () {
        selectPartColor(3); // Chama a função de mudança de cor quando o botão é clicado
    });

    button5 = document.getElementById('button5');
    button5.addEventListener('click', function () {
        selectPartColor(4); // Chama a função de mudança de cor quando o botão é clicado
    });

    button6 = document.getElementById('button6');
    button6.addEventListener('click', function () {
        selectPartColor(5); // Chama a função de mudança de cor quando o botão é clicado
    });

    button7 = document.getElementById('button7');
    button7.addEventListener('click', function () {
        selectPartColor(6); // Chama a função de mudança de cor quando o botão é clicado
    });

    button8 = document.getElementById('button8');
    button8.addEventListener('click', function () {
        selectPartColor(7); // Chama a função de mudança de cor quando o botão é clicado
    });

    button9 = document.getElementById('button9');
    button9.addEventListener('click', function () {
        selectPartColor(8); // Chama a função de mudança de cor quando o botão é clicado
    });

    //listaProdutos
    abrirLista = document.getElementById('abrirLista');
    abrirLista.addEventListener('click', function () {
        alterarPosicao();
    });

    tenisBranco = document.getElementById('tenisBranco');
    tenisBranco.addEventListener('click', function () {
        for (var i = 0; i < listaPartes.length; i++) {
            cor = colors[1]
            if (i == 1) {
                cor = colors[0]
            }
            if (i == 0) {
                cor = colors[0]
            }
            changePartColor(i, cor)
        }
    });

    tenisVermelho = document.getElementById('tenisVermelho');
    tenisVermelho.addEventListener('click', function () {
        for (var i = 0; i < listaPartes.length; i++) {
            cor = colors[9]
            changePartColor(i, cor)
        }
    });

    tenisPreto = document.getElementById('tenisPreto');
    tenisPreto.addEventListener('click', function () {
        for (var i = 0; i < listaPartes.length; i++) {
            cor = colors[2]
            changePartColor(i, cor)
        }
    });

    tenisMarrom = document.getElementById('tenisMarrom');
    tenisMarrom.addEventListener('click', function () {
        for (var i = 0; i < listaPartes.length; i++) {
            cor = colors[7]
            
            if (i == 1) {
                cor = colors[0]
            }
            if (i == 0) {
                cor = colors[0]
            }
            changePartColor(i, cor)
        }
    });

    tenisPretoBranco = document.getElementById('tenisPretoBranco');
    tenisPretoBranco.addEventListener('click', function () {
        for (var i = 0; i < listaPartes.length; i++) {
            cor = colors[2]
            
            if (i == 1) {
                cor = colors[0]
            }
            if (i == 0) {
                cor = colors[0]
            }
            changePartColor(i, cor)
        }
    });

    tenisVermelhoBranco = document.getElementById('tenisVermelhoBranco');
    tenisVermelhoBranco.addEventListener('click', function () {
        for (var i = 0; i < listaPartes.length; i++) {
            cor = colors[9]
            
            if (i == 1) {
                cor = colors[0]
            }
            if (i == 0) {
                cor = colors[0]
            }
            if (i == 6) {
                cor = colors[0]
            }
            changePartColor(i, cor)
        }
    });
    
    tenisBrancoPreto = document.getElementById('tenisBrancoPreto');
    tenisBrancoPreto.addEventListener('click', function () {
        for (var i = 0; i < listaPartes.length; i++) {
            cor = colors[2]
            
            if (i == 1) { 
                cor = colors[0]
            }
            if (i == 0) {
                cor = colors[0]
            }
            if (i == 6) {
                cor = colors[9]
            }
            if (i == 7) {
                cor = colors[0]
            }
            changePartColor(i, cor)
        }
    });

    tenisBrancoPreto2 = document.getElementById('tenisBrancoPreto2');
    tenisBrancoPreto2.addEventListener('click', function () {
        for (var i = 0; i < listaPartes.length; i++) {
            cor = colors[2]
            if (i == 0) {
                cor = colors[0]
            }
            if (i == 7) {
                cor = colors[9]
            }
            changePartColor(i, cor)
        }
    });

    tenisBrancoCinza = document.getElementById('tenisBrancoCinza');
    tenisBrancoCinza.addEventListener('click', function () {
        for (var i = 0; i < listaPartes.length; i++) {
            cor = colors[1]
            if (i == 0) {
                cor = colors[0]
            }
            if (i == 1) {
                cor = colors[0]
            }
            if (i == 7) {
                cor = colors[2]
            }
            if (i == 6) {
                cor = colors[2]
            }
            changePartColor(i, cor)
        }
    });
});

var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Adicionando luz direcional
var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

function selectPartColor(intParameter) {
    buttons.forEach(function (button, index) {
        button.removeEventListener('click', previousClickHandlers[index]);
        var clickHandler = function () {
            changePartColor(intParameter, colors[index]);
        };
        button.addEventListener('click', clickHandler);
        previousClickHandlers[index] = clickHandler;
    });

    var colorDiv = document.getElementById("color-div");
    colorDiv.style.display = "block";
}

// Antes de chamar selectPartColor pela primeira vez, você deve inicializar previousClickHandlers
var previousClickHandlers = [];


function changePartColor(intParameter, colorparam) {
    for (var i = 0; i < listaPartes[intParameter].length; i++) {
        var newColor = new THREE.Color(colorparam);
        listaPartes[intParameter][i].material.color = newColor;
        document.getElementById('color-div').style.display = "none";
    }
}

function alterarPosicao() {
    var listaProd = document.querySelector('.listaProd');

    if (listaProd.style.top === '40%') {
        listaProd.style.top = '95%';
    } else {
        listaProd.style.top = '40%';
    }

}
