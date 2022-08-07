const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const nuvens = document.querySelector('.nuvens')


const jump = () => {
    mario.classList.add('jump')
    setTimeout(() => {
        mario.classList.remove('jump')
    }, 600);
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
    }
}, 10);
document.addEventListener("keydown", jump)