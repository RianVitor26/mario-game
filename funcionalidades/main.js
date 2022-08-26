//ELEMENTS
const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const clouds = document.querySelector('.nuvens')
const gameOver = document.querySelector('.game-over')
const vidas_document = document.querySelector('.vidas');
const MedalBonus_document = document.querySelector('.medal-bonus');
const Score_document = document.querySelector('.score > p');
const game_ponts = document.querySelector('.game-ponts');



//SOUNDS CONFIG
const soundTrack = new Audio()
soundTrack.src = 'assets/efeitos_trilhasonora1.mp3'
const gameOverSound = new Audio()
gameOverSound.src = 'assets/efeitos_gameover.wav'
const collisionSound = new Audio()
collisionSound.src = 'assets/efeitos_hit.wav'
const jumpSound = new Audio()
jumpSound.src = 'assets/efeitos_pulo2.wav'
const transformSound = new Audio()
transformSound.src = 'assets/efeitos_transformation.mp3'

const soundEffects = [collisionSound, gameOverSound, jumpSound, soundTrack]
setVolume()
function setVolume() {
    soundEffects.map(effect => effect.volume = 0.3)
}




//VARIABLES
var MedalBonusPosicao = '';
var game=0;
var vidas_max = 3;
var score = 0;
var remove_vida_aux = 1;

//JUMP FUNCTION
const jump = () => {
    mario.classList.add('jump')
    jumpSound.play()
    setTimeout(() => {
        mario.classList.remove('jump')
    }, 600);
}




// ESPECIAL TRANSFORM

    const transformSonic = () =>{
        mario.classList.add('transform')  
        setTimeout(() => {
            mario.classList.remove('transform')
            mario.src = 'assets/sonic-walking-unscreen.gif';
            vidas_max += 1
            
        }, 300);
    
        setTimeout(() => {
            mario.src = 'assets/mario-walking-unscreen.gif';
            img = document.createElement('img');
            img.src = 'assets/coracao.png';
            vidas_document.appendChild(img);
            
        }, 5000);
    }




const Game = setInterval(() => {
    const collisionCheck = setInterval(() => {
        const pipePosition = pipe.offsetLeft
        // const cloudsPosition = clouds.offsetLeft
        var marioJumpPosition = +window.getComputedStyle(mario).bottom.replace('px', ' ')
        const MedalBonusPositionLeft = MedalBonus_document.offsetLeft
        const MedalBonusPositionTop = MedalBonus_document.offsetTop
   
        //MEDAL COLISION WITH MARIO VERIFY

        if (MedalBonusPositionLeft <= 90 && marioJumpPosition >= MedalBonusPosicao  && remove_vida_aux == 1) { 
            score += 1
            
            MedalBonus_document.style.display = 'none'
            setTimeout(() => {
                MedalBonus_document.style.display = 'block'
            }, 1000)

            remove_vida_aux = 0;

            // addScore()
            // const addScore = () => {
            //     Score_document.innerHTML = score
            // }
        }

            //COLLISION VERIFY
        if (pipePosition <= 90 && marioJumpPosition < 70 && pipePosition > 0 && remove_vida_aux == 1) {
            vidas_max-=1;
            vidas(vidas_max);
            remove_vida_aux = 0;
            collisionSound.play()
        }

    }, 1)



        // WHEN GAME OVER
        if (n_vidas() == 0){
            showMenu()
            gameOver.classList.add('over')
            game = 0
            gameOverSound.play()
            soundTrack.pause()
            setTimeout(() => {
                gameOverSound.pause()
            }, 3000)
        }
        remove_vida_aux=1;
}, 3000)



// ARROW_UP KEY FOR JUMP
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
       jump();
    }
});




//Z KEY FOR ESPECIAL TRANSFORM
if (!mario.classList.contains('transform')) {
    document.addEventListener('keydown', (e) => {    
        if (e.key === 'Z' || e.key === 'z') {
            transformSonic();
            transformSound.play()
        }
    })
}





//MENU GAME
const menu = document.querySelector('.menu')
const button = document.querySelector('.button')




//ANIMATION CONTROL
function stopAnimation() {
    pipe.style.display = 'none'
    mario.style.display = 'none'
    clouds.style.display = 'none'
    MedalBonus_document.style.display = 'none'
    game_ponts.style.visibility = 'hidden'
}

function initAnimation() {
    game = 1;
    pipe.style.display = 'block'
    mario.style.display = 'block'
    clouds.style.display = 'block'
    game_ponts.style.visibility = 'visible'
    MedalBonus_document.style.display = 'block'

    vidas(vidas_max)
}



// OPEN MENU WHEN WINDOW LOADED
function showMenu() {
    menu.classList.add('open')
    stopAnimation()
}
window.addEventListener('load', showMenu)




// OPTIONS FOR MENU WITH KEYS
document.addEventListener('keydown', (e) => {
    if ( e.key == 'Enter'){
        let option = document.querySelectorAll('.options-container > p')[posicao].classList[0]
        console.log(document.querySelectorAll('.options-container > p')[posicao].classList[0])
        switch (option) {
            case '0': startGame()
                
                break;
            case '1': restart()
                
                break;
            case '2': closeGame()
                break;
            default: alert('Insira uma opção válida')
                break;
        }
    }
})



// MENU NAVIGATION WITH KEYS 
var posicao = 0;
document.addEventListener('keydown', (e) => {
    
    posicao_permission = [0,1,2];

    if(e.key == 'ArrowDown' && game == 0){
        // Check if a future "Position" is allowed
        if(posicao_permission.indexOf(posicao+1)>-1){
            posicao += 1;
        }

            document.querySelectorAll('.options-container > p')[posicao].classList.add('select')
        
    }
    else if (e.key == 'ArrowUp' && game == 0){
        // Check if a future "Position" is allowed
        if(posicao_permission.indexOf(posicao-1)>-1){
            posicao -= 1;
        }
            document.querySelectorAll('.options-container > p')[posicao].classList.add('select')
    }

    //CLEAR OPTIONS
    const CleanOption = setInterval(()=>{
        for(i = 0; i < 3; i++){
            if(i != posicao){
                document.querySelectorAll('.options-container > p')[i].classList.remove('select');
            }
        }
    }, 10);
})




// MENU FUNCTIONS
function startGame() {
    vidas_max=3;
    score=0;
    gameOver.classList.remove('over')
    menu.classList.remove('open')
    initAnimation()
    soundTrack.play()
}
 
function restart() {
    score=0;
    vidas_max=3;
    gameOver.classList.remove('over')
    menu.classList.remove('open')
    initAnimation()
    soundTrack.play()
}
 
function closeGame() {
    window.close()
}




 

// LIFE
function vidas(vidas_max){
    // CLEAR LIFE
    document.querySelectorAll('.vidas > img').forEach(img => {
        img.remove('img');
    })

    // CREATE LIFE
    for(i = 1; i <= vidas_max; i++){
        img = document.createElement('img');
        img.src = 'assets/coracao.png';
        img.classList.add(i+'');
        vidas_document.appendChild(img);
    }
    
    //SHOW LIFE ALL
    document.querySelectorAll('.vidas > img').forEach(vidas => {
        vidas.style.display = 'block';
    });
}


function n_vidas(){
    return document.querySelectorAll('.vidas > img').length;
}



// MEDAL BONUS POSITION
const MedalBonus = setInterval(() => {
    var bottom = Math.floor(Math.random() * 200);
    MedalBonus_document.style.bottom = bottom+'px';
    MedalBonusPosicao = bottom;
}, 3000);





// UPDATES

    // UPDATE SCORE
    const updateScore = setInterval(() => {
        if(game == 1){
        Score_document.innerHTML = score;
        }
    }, 100);


    //UPDATE LIFES
    const updateLifes = setInterval(() =>{
            //SHOW LIFE ALL
        if(game == 1){
            vidas(vidas_max);
        }
    }, 100);
