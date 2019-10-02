const firstQuestion = document.getElementsByName('first');
const secondQuestion = document.getElementsByName('second');
const thirdQuestion = document.getElementsByName('third')
const quizButton = document.querySelector('.quiz-button');
const quizButtonRetake = document.querySelector('.quiz-button-retake');
const inputFields = document.getElementsByTagName('input');
const beginnerOffer = document.querySelector('.beginner');


function firstValue(){
    let value1;
    for (let i = 0; i < firstQuestion.length; i++){
        if(firstQuestion[i].checked){
        value1 = firstQuestion[i].value;
        return value1;
        }
    }
}

function secondValue(){
    let value2;
    for (let i = 0; i < secondQuestion.length; i++){
        if(secondQuestion[i].checked){
        value2 = secondQuestion[i].value;
        return value2;
        }
    }
}

function thirdValue(){
    let value3;
    for (let i = 0; i < thirdQuestion.length; i++){
        if(thirdQuestion[i].checked){
        value3 = thirdQuestion[i].value;
        return value3;
        }
    }
}

function sizeResult(){
    let value3=thirdValue();
    if (value3 == 7){
        document.querySelector('.short').style.display = "block";
    }
    else if (value3 == 8){
        document.querySelector('.average').style.display = "block";
    }
    else if(value3 == 9){
        document.querySelector('.tall').style.display = "block";
    }
}

function getValues(){
    let value1 = firstValue();
    let value2 = secondValue();
    let value3 = thirdValue();
    let noAnswer = document.querySelector('.missing-answer')
    let beginner1 = document.querySelector('.beginner-mountain');
    let beginner2 = document.querySelector('.beginner-trick');
    let beginner3 = document.querySelector('.beginner-snow');
    let intermediate1 = document.querySelector('.inter-freestyle');
    let intermediate2 = document.querySelector('.inter-snow');
    let advanced1 = document.querySelector('.adv-freestyle');
    let advanced2 = document.querySelector('.adv-snow');

    if(value1 === undefined || value2 === undefined || value3 === undefined){
        noAnswer.style.display = "block";
        noAnswer.scrollIntoView()
    }
    else if(value2 == 4){
        beginner1.style.display = "block";
        beginnerOffer.style.display = "block";
        beginner1.scrollIntoView();
    }
    else if(value1 == 1 && value2 == 5){
        beginner2.style.display = "block";
        beginnerOffer.style.display = "block";
        beginner2.scrollIntoView();
    }
    else if(value1 == 1 && value2 == 6){
        beginner3.style.display = "block";
        beginnerOffer.style.display = "block";
        beginner3.scrollIntoView();
    }
    else if(value1 == 2 && value2 == 5) {
        intermediate1.style.display = "block";
        document.querySelector('.intermediate-1').style.display = "block";
        intermediate1.scrollIntoView();
    }
    else if(value1 == 2 && value2 == 6){
        intermediate2.style.display = "block";
        document.querySelector('.intermediate-2').style.display = "block";
        intermediate2.scrollIntoView();
    }
    else if(value1 == 3 && value2 == 5){
        advanced1.style.display = "block";
        document.querySelector('.advanced-1').style.display = "block";
        advanced1.scrollIntoView();

    }
    else if(value1 == 3 && value2 ==6){
        advanced2.style.display = "block";
        document.querySelector('.advanced-2').style.display = "block";
        advanced2.scrollIntoView();
    }
    
    sizeResult();
    quizButton.style.display = "none";
    quizButtonRetake.style.display = "inline-block";
}

function resetDisplay(){
    var displays = document.getElementsByClassName('result-display')

    for(let i = 0; i < displays.length; i++){
        displays[i].style.display = "none";
    }
}

function resetQuiz(){
    for(let i = 0; i < inputFields.length; i++){
        inputFields[i].checked = false;
    }
    quizButtonRetake.style.display = "none";
    quizButton.style.display = "inline-block";
    resetDisplay();
    document.querySelector('.quiz-header').scrollIntoView();
}