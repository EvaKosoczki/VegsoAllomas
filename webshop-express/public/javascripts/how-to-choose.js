

const firstQuestion = document.getElementsByName('first');
const secondQuestion = document.getElementsByName('second');
const thirdQuestion = document.getElementsByName('third')

function firstValue(){
    let value1;
    for (let i = 0; i < firstQuestion.length; i++){
        if(firstQuestion[i].checked){
        value1 = firstQuestion[i].value;
        }
    }
}

function secondValue(){
    let value2;
    for (let i = 0; i < secondQuestion.length; i++){
        if(secondQuestion[i].checked){
        value2 = secondQuestion[i].value;
        }
    }
}

function thirdValue(){
    let value3;
    for (let i = 0; i < thirdQuestion.length; i++){
        if(thirdQuestion[i].checked){
        value3 = thirdQuestion[i].value;
        }
    }
}

function getValues(){
    firstValue();
    secondValue();
    thirdValue();
}