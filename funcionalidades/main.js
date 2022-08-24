const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const nuvens = document.querySelector('.nuvens')


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


const collisionCheck = setInterval(() => {
    const pipePosition = pipe.offsetLeft
    const nuvensPosition = nuvens.offsetLeft
    const marioJumpPosition = +window.getComputedStyle(mario).bottom.replace('px', ' ')

    if (pipePosition <= 90 && marioJumpPosition < 70 && pipePosition > 0) {
        pipe.style.animation = 'none'
        pipe.style.left = `${pipePosition}px`

        mario.style.animation = 'none'
        mario.style.bottom = `${marioJumpPosition}px`

        mario.src = 'assets/mario_game_over-removebg.png'
        mario.style.width = '50px'
        mario.style.left = '45px'

        nuvens.style.animation = 'none'
        nuvens.style.left = `${nuvensPosition}px`

        showMenu()
    }
}, 10);

document.addEventListener('keydown', (e) => {
    // console.log(e.key);
    
    if (e.key === 'ArrowUp') {
       jump();
    }
});


document.addEventListener('keydown', (e) => {
    console.log(e.key.space);
    
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
        case '2': console.log('restart')
            
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
    console.log('in building...')
}
 
function closeGame() {
    window.close()
}
 

