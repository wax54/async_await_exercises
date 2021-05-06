
/********************* */
//Deck Of cards Exercise
/********************* */


let newCardPromise = axios.get("https://deckofcardsapi.com/api/deck/new/draw/?count=1")
newCardPromise
    .then(res => {
        card = res.data.cards[0];

        console.log("TEST 1 RESULT");
        console.log(`${card.value} of ${card.suit}`);
    });


const cards = [];

let firstCardPromise = axios.get("https://deckofcardsapi.com/api/deck/new/draw/?count=1")
firstCardPromise
    .then(res =>{
        card = res.data.cards[0];
        deck = res.data.deck_id
        cards.push(`${card.value} of ${card.suit}`);

        return axios.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`)
    })
    .then( res => {
        card = res.data.cards[0];
        cards.push(`${card.value} of ${card.suit}`);
        console.log("TEST 2 RESULT");
        for(card of cards){
            console.log(card);
        }
    });






class DeckOfCards{
    constructor(){
        const resPromise = axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        resPromise.then( res => {this.deck_id = res.data.deck_id});
    }
    
    drawCard(){
        return new Promise((resolve, reject) => {
            axios.get(`https://deckofcardsapi.com/api/deck/${this.deck_id}/draw/?count=1`)
                .then( res => {
                    resolve(res.data.cards[0]);
                })
                .catch( err =>{
                    reject(err);
                });
            });
    }
    shuffle(){
        return new Promise((resolve, reject) => {
            axios.get(`https://deckofcardsapi.com/api/deck/${this.deck_id}/shuffle/`)
                .then(res => {
                    if(res.data.success){
                        resolve(res);
                    }
                    else{
                        reject(res);
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
}
}

/*********************** */
// Start of section 3
/*********************** */

const todaysDeck = new DeckOfCards();

function reshuffleCards(evt) {
    todaysDeck.shuffle()
        .then(card => {
            const htmlCards = document.querySelectorAll('.card');
            for(card of htmlCards){
                card.remove();
            }

            deckFullView();
        })
        .catch(err => {
            console.log(err);
        });
}


function drawCardButtonClicked(evt){
    todaysDeck.drawCard()
        .then( card=>{
            addCardToDOM(card);
        })
        .catch( err => {
            todaysDeck.drawCard()
                .then(card => { addCardToDOM(card)})
                .catch( err => console.log(err))
        });
}



function deckEmptyView() {
    const button = document.querySelector('#draw-card');
    button.removeEventListener('click', drawCardButtonClicked);
    button.innerText = "Reshuffle Cards!";
    button.addEventListener('click', reshuffleCards);
    alert("DECK EMPTY PLEASE RESHUFFLE!");
}

function deckFullView() {
    const button = document.querySelector('#draw-card');
    button.removeEventListener('click', reshuffleCards);
    button.innerText = "Draw Card";
    button.addEventListener('click', drawCardButtonClicked);
}

function addImageToDOM(imgURL) {
    let img = document.createElement('img');
    img.src = imgURL;
    img.className = 'card';
    document.body.append(img);
}

function addCardToDOM(card) {
    if (card) {
        addImageToDOM(card.image);
    }
    else {
        deckEmptyView();
    }
}


deckFullView();