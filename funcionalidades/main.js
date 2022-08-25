const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const nuvens = document.querySelector('.nuvens')
const gameOver = document.querySelector('.game-over')
const vidas_document = document.querySelector('.vidas')


var vidas_max = 3;
var remove_vida_aux = 1;


const jump = () => {
    mario.classList.add('jump')
    setTimeout(() => {
        mario.classList.remove('jump')
    }, 600);
}

const transformSonic = () =>{
    mario.classList.add('transform');

    setTimeout(() => {
        mario.classList.remove('transform')
        mario.src = 'assets/sonic-walking-unscreen.gif';

    }, 300);

    setTimeout(() => {
        mario.src = 'assets/mario-walking-unscreen.gif';
    }, 5000);
}


const Game = setInterval(() => {
    const collisionCheck = setInterval(() => {
        const pipePosition = pipe.offsetLeft
        const nuvensPosition = nuvens.offsetLeft
        const marioJumpPosition = +window.getComputedStyle(mario).bottom.replace('px', ' ')

        if (pipePosition <= 90 && marioJumpPosition < 70 && pipePosition > 0 && remove_vida_aux == 1) {
            vidas_max-=1;
            vidas(vidas_max);
            remove_vida_aux = 0;
        }

    }, 10);
        if(n_vidas()==0){

            showMenu()
            gameOver.classList.add('over')
        }
        remove_vida_aux=1;
}, 3000)

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
       jump();
    }
});


document.addEventListener('keydown', (e) => {    
    if (e.key === 'Z' || e.key === 'z') {
       transformSonic();
    }
})

// ============================================ MENU GAME ===========================================================
const menu = document.querySelector('.menu')
const input = document.querySelector('.input')
const button = document.querySelector('.button')

// Functions for stop and init animation
function stopAnimation() {
    pipe.style.display = 'none'
    mario.style.display = 'none'
    nuvens.style.display = 'none'
}

function initAnimation() {
    pipe.style.display = 'block'
    mario.style.display = 'block'
    nuvens.style.display = 'block'

    /* Vidas */
    vidas(vidas_max)

}

// Open menu when window loaded
function showMenu() {
    menu.classList.add('open')
    stopAnimation()

}


window.addEventListener('load', showMenu)

// Select option and active one function
button.addEventListener('click', () => {
    let option = input.value
    switch (option) {
        case '1': startGame()
            
            break;
        case '2': restart()
            
            break;
        case '3': closeGame()
            
            break;
    
        default: alert('Insira uma opção válida')
            break;
    }
})


// Menu functions
function startGame() {
    menu.classList.remove('open')
    initAnimation()
}
 
function restart() {
    vidas_max=3;
    gameOver.classList.remove('over')
    menu.classList.remove('open')
    initAnimation()

}
 
function closeGame() {
    window.close()
}
 

// Vidas
function vidas(vidas_max){
    // Limpar vidas
    document.querySelectorAll('.vidas > img').forEach(img => {
        img.remove('img');
    })

    // Criar Vidas
    for(i = 1; i <= vidas_max; i++){
        img = document.createElement('img');
        img.src = 'assets/coracao.png';
        img.classList.add(i+'');
        vidas_document.appendChild(img);
    }
    
    /* Exibir todas as vidas */
    document.querySelectorAll('.vidas > img').forEach(vidas => {
        vidas.style.display = 'block';
    });
}


function n_vidas(){
    return document.querySelectorAll('.vidas > img').length;
}