//Object literal: words (Word Lists and Operations)
const words = {
    threeLettersWords : ['tak','nie','cos','dać','ćma','fuj','jad','kac','lab','dym'],
    fourLettersWords : ['abak','abyś','afta','alba','apel','baba','bajt','baty','pies','biel'],
    fiveLettersWords : ['wagon','hamak','zamek','zupka','ważny','wędka','widmo','mafia','major','małpa'],
    sixLettersWords : ['iglica','imadło','abażur','kaczor','kanapa','karzeł','małpki','malina','cekiny','tablet'],
    sevenLettersWords : ['bandyta','tchórze','inercja','maczuga','majster','ścianka','damulka','rabusie','radocha','tablet','uchichło'],
    eightLettersWords : ['uaktywni','ćmiącego','fabrykom','obalenie','falowała','obcykały','badylkom','raciczką','żabeczki','bagienną','racuchem'],
    chooseWordList : function(level) {
        let wordsList = 0;
        const list = document.querySelector('.word-list');
        switch (level) {
            case 1: 
            wordsList = this.threeLettersWords;
            for(let i=2; i<=11; i++) {
                list.children[i].textContent = wordsList[i-2];
            }
            return wordsList;
            break;
            case 2:
            wordsList = this.fourLettersWords;
            for(let i=2; i<=11; i++) {
                list.children[i].textContent = wordsList[i-2];
            }
            return wordsList;
            break;
            case 3:
            wordsList = this.fiveLettersWords;
            for(let i=2; i<=11; i++) {
                list.children[i].textContent = wordsList[i-2];
            }
            return wordsList;
            break;
            case 4:
            wordsList = this.sixLettersWords;
            for(let i=2; i<=11; i++) {
                list.children[i].textContent = wordsList[i-2];
            }
            return wordsList;
            break;
            case 5:
            wordsList = this.sevenLettersWords;
            for(let i=2; i<=11; i++) {
                list.children[i].textContent = wordsList[i-2];
            }
            return wordsList;
            break;
            case 6:
            wordsList = this.eightLettersWords;
            for(let i=2; i<=11; i++) {
                list.children[i].textContent = wordsList[i-2];
            }
            return wordsList;
            break;
        } 
    }
}

//UI Class: Handle UI Tasks
class UI {
    static updateInfo(level,total,record) {
        const lev = document.querySelector('#level p');
        const score = document.querySelector('.score p');
        const rec = document.querySelector('.record p');
        lev.textContent = level;
        score.textContent = total;
        rec.textContent = record;
    }

    static changeCircleStyle(circleState) {
        const circle = document.getElementById('circle');
        if(circleState == 'true') {
            circle.style.backgroundColor = 'rgb(175, 255, 202)';
            circle.style.transition = 'background-color 0.1s';
        }else if(circleState == 'false') {
            circle.style.backgroundColor = 'rgb(255, 175, 202)';
            circle.style.transition = 'background-color 0.5s';
        }else {
            circle.style.backgroundColor = 'white';
            circle.style.transition = 'background-color 0.1s';
        }
    }

    static moveWordsOnNav(currentWordIndex, wordsMovementDirection) {
        const liEl = document.querySelectorAll('.liEl');

        if(wordsMovementDirection == "true"){
            for(let i=0; i<=14; i++){
                liEl[i].style.transform = `translateX(${-currentWordIndex*100}%)`;
            }
        }else if(wordsMovementDirection == "false"){
            console.log('works');
            for(let i=14; i>=0; i--){
                liEl[i].style.transform = `translateX(0)`;
                liEl[i].style.transition = `transform 0.1s`;
            }
        }
    }

    static changeHandPosition() {
        const hand = document.querySelector('.circle .hand');
        let clockInterval = setInterval(() => {
            hand.style.setProperty('--rotation', (iterations/6) * 360);
            if(iterations==6){
                location.reload();
            }
            iterations++;
        } , 500);
    }

    static resetHandPosition() {
        hand.style.setProperty('--rotation', 0);
        iterations = 0;
    }

}

class Operations {
    static countPoins(total, iterations) {
        const maxNumOfPoints = 60;
        total = (maxNumOfPoints - iterations*10);
        return total;
    }
}

class Storage {
    static getCurrentRecord(record) {
        if(localStorage.getItem('record') == null) {
            record=0;
        } else {
            record = JSON.parse(localStorage.getItem('record'));
        }
        return record;
    }

    static addRecord(record, currentRecord) {
        if(record < currentRecord) {
            record = currentRecord;
            localStorage.setItem('record',record);
        }
    }
}

//Main Code
let level = 1;
let pointsInTotal = 0;
let iterations = 0;
let record = Storage.getCurrentRecord();
let currentWordIndex = 0;

words.chooseWordList(level);
UI.updateInfo(level, pointsInTotal,record);
//Events
let wordsList = words.chooseWordList(level);
const textField = document.getElementById('text-field');
textField.addEventListener('click',UI.changeHandPosition);
textField.addEventListener('keyup', () => {
    if(textField.value == wordsList[currentWordIndex] && currentWordIndex < 10){
        pointsInTotal += Operations.countPoins(pointsInTotal,iterations); //points counter
        Storage.addRecord(record, pointsInTotal);
        UI.updateInfo(level, pointsInTotal, record); //updating info about score
        textField.value = ""; //clear text field
        currentWordIndex++; //next word index
        UI.resetHandPosition();
        UI.moveWordsOnNav(currentWordIndex,'true');
        UI.changeCircleStyle('true');
        if(currentWordIndex == 10) {
            UI.changeCircleStyle('');
            level++;
            currentWordIndex = 0;
            UI.updateInfo(level, pointsInTotal, record);
            words.chooseWordList(level); //update on UI
            wordsList = words.chooseWordList(level); //update wordsList
            UI.moveWordsOnNav(currentWordIndex,'false');

        }
    }else{
        UI.changeCircleStyle('false');
    }
});


