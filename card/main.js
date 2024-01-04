const $wrapper = document.querySelector('#wrapper');

const total = 12;
const colors = ['red', 'orange', 'yellow', 'green', 'white', 'pink'];
let colorCopy = colors.concat(colors);
let shuffled = [];
let clicked = [];

function shuffle() {
    for (let i =0; colorCopy.length > 0; i +=1) {
        const randomIndex = Math.floor(Math.random()*colorCopy.length)
        shuffled = shuffled.concat(colorCopy.splice(randomIndex, 1));
    }
}

function createCard(i) {
    const card = document.createElement('div')
    card.className = 'card';
    const cardInner = document.createElement('div');
    cardInner.className = 'card-inner';
    const cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    const cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    cardBack.style.backgroundColor = shuffled[i];
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    return card;
}

function onClickCard() {
    this.classList.toggle('flipped');
    clicked.push(this);
    if (clicked.length !== 2) return
}

function startGame() {
    shuffle();
    for (let i=0; i < total; i += 1) {
        const card = createCard(i);
        card.addEventListener('click', onClickCard)
        $wrapper.appendChild(card);
    }

    document.querySelectorAll('.card').forEach((card, index) => {
        setTimeout(()=> {
            card.classList.add('flipped');
        }, 1000 + 100*index);
    })
    
    setTimeout(()=> {
        document.querySelectorAll('.card').forEach((card, index)=> {
            card.classList.remove('flipped');
        })
    }, 5000);
}

startGame();