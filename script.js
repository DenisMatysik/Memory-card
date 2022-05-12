const filmsCard = {
    1: {
        name: "americanPie",
        way: "./imgs/1.png"
    },
    2: {
        name: "batman",
        way: "./imgs/2.png"
    },
    3: {
        name: "dateMovie",
        way: "./imgs/3.png"
    },
    4: {
        name: "guardians",
        way: "./imgs/4.png"
    },
    5: {
        name: "thor",
        way: "./imgs/5.png"
    },
    6: {
        name: "potter",
        way: "./imgs/6.png"
    },
    7: {
        name: "pirates",
        way: "./imgs/7.png"
    },
    8: {
        name: "lordOfRings",
        way: "./imgs/8.png"
    },
}

const backSide = "./imgs/back.png"

const myGame = document.querySelector(".memory-game");

for( film in  filmsCard){
    const memoryCard = document.createElement("div");
    memoryCard.classList.add("memory-card");
    memoryCard.setAttribute("data-film", filmsCard[film].name)
    const img1 = document.createElement("img");
    const img2 = document.createElement("img");
    img1.classList.add("front-face");
    img2.classList.add("back-face");
    img1.setAttribute("src", filmsCard[film].way)
    img2.setAttribute("src", backSide)
    memoryCard.appendChild(img1);
    memoryCard.appendChild(img2);
    myGame.appendChild(memoryCard);
    const memoryCard2 = memoryCard.cloneNode(true);
    memoryCard.after(memoryCard2);
}

const cards = document.querySelectorAll(".memory-card");

let hasFlipped = false;
let firstCard,secondCard;
let lockBoard = false;

function flipCard(){
    if (lockBoard) return; // при быстром нажать на 3 карты, 1 карта остаётся открытой - это убирает эту проблему
    if (firstCard == this) return; // не даёт дважды нажать на одну карту
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
})() // сразу вызовет эту функцию

cards.forEach((card) => {card.addEventListener("click", flipCard)})