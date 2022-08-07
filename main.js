const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')

const jump = () => {
    mario.classList.add('jump')
    setTimeout(() => {
        mario.classList.remove('jump')
    }, 600);
}

const collisionCheck = setInterval(() => {
    const pipePosition = pipe.offsetLeft
    const marioJumpPosition = +window.getComputedStyle(mario).bottom.replace('px', ' ')

    if (pipePosition <= 90 && marioJumpPosition < 70 && pipePosition > 0) {
        pipe.style.animation = 'none'
        pipe.style.left = `${pipePosition}px`

        mario.style.animation = 'none'
        mario.style.bottom = `${marioJumpPosition}px`
    }
}, 10);
document.addEventListener("keydown", jump)