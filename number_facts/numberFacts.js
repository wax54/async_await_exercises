/********************* */
//Numbers Exercise
/********************* */
console.log("***********************************");
console.log("NUMBERS EXERCISE --- ASYNC AWAIT");
console.log("run runSolutions(num) to see the solution run for any number!");
console.log("***********************************");

runSolutions();

async function runSolutions(favNum=8){
    const multiNums = [2,5,6,8,109,23];

    //Getting the Facts
    const favNumFactPromise = getFact(favNum);
    const multiNumFactPromise = getFacts(...multiNums);
    const favNumFactsPromises = [];

    for (let i = 0; i < 4; i++) {
        favNumFactsPromises.push(getFact(favNum));
    }
    
    //waiting to make sure the neccssarry promise is done 
    const favNumFact = await favNumFactPromise;

    console.log('Q1.');
    console.log('My fav num is '+favNum);
    console.log(`A Fact about my fav num, ${favNum}, is ${favNumFact}`);
    
    const factGlob = await multiNumFactPromise;

    console.log('Q2.');
    //Print multiple num, data
    for (let number in factGlob) {
        console.log(`number ${number} has the fact ${factGlob[number]}`);
    }
    //wait for all the facts to come in
    const arrayOfFacts = await Promise.all(favNumFactsPromises); 
    addListToDOM(arrayOfFacts, `My Favorite Number is ${favNum}`);

}


async function getFact(number){
    const {data: {text: fact} } = await axios.get(`http://numbersapi.com/${number}/trivia?json`);
    return fact;
}
async function getFacts(...numbers) {
    const numbersString = numbers.join(',');
    const { data: result } = await axios.get(`http://numbersapi.com/${numbersString}/trivia?json`);
    if (result.text){
        return {[result.number] : result.text};
    }else{
        return result;
    }
}


function addListToDOM(arrOfStrings, title) {
    const div = createAndAppend('div', title);
    const ul = createAndAppend('ul', `Facts`, div);
    for (text of arrOfStrings) {
        const li = createAndAppend('div', text, ul);
    }
}
function createAndAppend(elString, text, parent=document.body){
    let el = document.createElement(elString);
    el.innerHTML = text;
    parent.append(el);
    return el;
}

