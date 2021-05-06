/********************* */
//Numbers Exercise
/********************* */
console.log("***********************************");
console.log("NUMBERS EXERCISE");
console.log("***********************************");

let favNumberPromise = axios.get('http://numbersapi.com/8/trivia?json');
favNumberPromise.then((res)=>{
    //Print My fav number
    console.log(res.data);
})

let multiNumberPromise = axios.get('http://numbersapi.com/1,3..5/trivia?json');
multiNumberPromise.then((res) => {

    //Print multiple num, data
    for (let number in res.data){
        console.log(`number ${number} has the fact ${res.data[number]}`);
    }
})




const favNumber = 8;

promises = [];
for(let i = 0; i < 4; i++){
    promises.push(axios.get('http://numbersapi.com/8/trivia?json'));
}

Promise.all(promises)
    .then( allResps => {
        const div = createAndAppend('div', `My Favorite Number is ${favNumber}`);
        const ul = createAndAppend('ul', `Facts`, div);
        for(res of allResps){
            const li = createAndAppend('div', res.data.text, ul);
        }

    })
    .catch( err => {
        console.log(err)
    });


function createAndAppend(elString, text, parent=document.body){
    let el = document.createElement(elString);
    el.innerHTML = text;
    parent.append(el);
    return el;
}

