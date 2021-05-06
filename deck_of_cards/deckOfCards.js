
/********************* */
//Deck Of cards Exercise
/********************* */
const baseUrl = 'https://deckofcardsapi.com/api/deck';

runSolution1()
runSolution2()

async function runSolution1(){
    const { card } = await drawCard();
    console.log("TEST 1 RESULT");
    console.log(`${card.value} of ${card.suit}`);
}


async function runSolution2() {
    const cards =[];

    const { card: card1, deckId} = await drawCard();
    const { card: card2} = await drawCard(deckId);

    console.log("TEST 2 RESULT");
    console.log(`${card1.value} of ${card1.suit}`);
    console.log(`${card2.value} of ${card2.suit}`);
}

async function drawCard(deckToUse='new'){
    const res = await axios.get(`${baseUrl}/${deckToUse}/draw/?count=1`);
    let { data: { deck_id:deckId, cards } } = res;
    return { deckId, 'card':cards[0]};
}





/*********************** */
// Start of solution 3
/*********************** */



class DeckOfCards{
    constructor(){
        this.baseUrl = 'https://deckofcardsapi.com/api/deck';
    }
    
    async init(){
        const { data:{ deck_id:deckId } } = await axios.get(`${this.baseUrl}/new/shuffle/?deck_count=1`);
        this.deckId = deckId;
    }

    async drawCard() {
        try{
            if (!this.deckId){
                await self.init();
            }
            const res = await axios.get(`${this.baseUrl}/${this.deckId}/draw/?count=1`);
            const { data: { cards } } = res;
            return  cards[0];
        }
        catch (e){
            return e;

        }
    }
    
    async shuffle(){
        try {
            if (!this.deckId) {
                await self.init();
            }
            const res = await axios.get(`${this.baseUrl}/${this.deckId}/shuffle/`);
            if (res.data.success){
                return res;
            }else{
                throw res;
            }
        }
        catch (e) {
            return e;

        }
    }
}

const deck = new DeckOfCards();
deck.init();

async function drawCardButtonClicked(evt) {
    try{
        const card = await deck.drawCard()
        addCardToDOM(card);
    }catch(err){
        //if at first you don't succeed...
        try {
            //you try again!
            const card = await deck.drawCard();
            addCardToDOM(card);
        } catch (err) {
            //but if you fail again, you just log it... I guess
            console.log(err);
        }
    }
}

async function reshuffleCards(evt) {
    try {
        await deck.shuffle();
        const htmlCards = document.querySelectorAll('.card');
        for(card of htmlCards){
            card.remove();
        }
            deckFullView();
    } catch (err){
        console.log(err);
    }
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