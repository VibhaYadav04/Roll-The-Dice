// Taking Names as input
let name0 ="";
let name1 = "";
const playerName0 = document.getElementById('name--0');
const playerName1 = document.getElementById('name--1');
const startGameBtn = document.querySelector('.btn--start');



playerName0.addEventListener("change", (e) =>{
    name0 += e.target.value;
    console.log(name0);
})

playerName1.addEventListener("change", (e) =>{
    name1 += e.target.value;
    console.log(name1);
    
})

// Start Game
startGameBtn.addEventListener('click', function() {
    name0 = name0 ? name0 : "Player 1";
    name1 = name1 ? name1 : "Player 2"
});

const player0Section = document.querySelector('.player--0');
const player1Section = document.querySelector('.player--1');

const totalScore0 = document.querySelector('#score--0');
const totalScore1 = document.querySelector('#score--1');

const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');

const dice = document.querySelector('.dice');

const newGameBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const saveBtn = document.querySelector('.btn--hold');

const winnerCard = document.querySelector('.winner-container');
const winnerPara = document.querySelector('.winner-para');

// INITIAL STATE
let scores, currentScore, activePlayer, playing;
const initialState = function(){
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    totalScore0.textContent = 0;
    totalScore1.textContent = 0;

    currentScore0.textContent = 0;
    currentScore1.textContent = 0;

    dice.classList.add('hidden');
    newGameBtn.classList.add('hidden');
    startGameBtn.classList.remove('hidden');
    player0Section.classList.remove('player--winner');
    player1Section.classList.remove('player--winner');

    player0Section.classList.add('player--active');
    player1Section.classList.remove('player--active');

    

    // Clear input fields
    document.getElementById('name--0').value = "";
    document.getElementById('name--1').value = "";

    winnerCard.classList.add('hidden');

};
initialState();

const switchPlayer = function (){
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;

    player0Section.classList.toggle('player--active');
    player1Section.classList.toggle('player--active');
};

// ROLL DICE
rollBtn.addEventListener('click', function(){
    if(playing){
        const diceNum = Math.trunc(Math.random() * 6)  + 1;
        dice.classList.remove('hidden');
        dice.src = `images/dice${diceNum}.png`
        startGameBtn.classList.add('hidden');
        newGameBtn.classList.remove('hidden');
        if (diceNum !== 1){
           currentScore += diceNum;
           document.getElementById(
            `current--${activePlayer}`
           ).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

// SAVE SCORE
saveBtn.addEventListener('click', function (){
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent= scores[activePlayer];

        if (scores[activePlayer] >= 100){
            playing = false;
            dice.classList.add('hidden');

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');   
            console.log(activePlayer);
            
            const winnerName = document.getElementById(`name--${activePlayer}`).value;
            console.log(winnerName);
            
            winnerCard.classList.remove('hidden');
            winnerPara.textContent = ` 🏆🎉🥳 ${winnerName} wins with the Score of ${scores[activePlayer]} 🏆🎉🥳`;
        } else {
            switchPlayer();
        }
    }
});

// RESET
newGameBtn.addEventListener('click', initialState);
