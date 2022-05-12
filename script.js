const cards = document.querySelectorAll(".memory-card");

let hasFlipped = false;
let firstCard,secondCard;
let lockBoard = false;

function flipCard(){
    if (lockBoard) return;
    if (firstCard == this) return;
    this.classList.add("flip");
    if(!hasFlipped){
        // first clicl
        hasFlipped = true;
        firstCard = this;
    } else{
        // second card
        secondCard = this;
        checkForMatch()
    }
}

function checkForMatch(){
    let isMatch = firstCard.dataset.film === secondCard.dataset.film;
    isMatch ? disableCards() : unflipCard();
    // if (firstCard.dataset.film === secondCard.dataset.film){
    //     disableCards();
        
    // } else {
    //     unflipCard()
    // }
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCard(){
    lockBoard = true;
    setTimeout(()=>{
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
    },700)
}

function resetBoard(){
    [hasFlipped, lockBoard] = [false,false];
    [firstCard,secondCard]=[null,null];
}

(function shuffle(){
    cards.forEach(card =>{
        let randomPos = Math.floor(Math.random()*12);
        card.style.order = randomPos;
    })
})();

cards.forEach((card) => {card.addEventListener("click", flipCard)})