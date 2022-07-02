const input = document.querySelector('input');
const button = document.querySelector('button');
const log = document.querySelector('log');
const logDetail = document.querySelector('.log-detail');

let isPlaying = true;
let count = 0;

let threeNums = '';
const randomNumberGenerator = () => {
    while (threeNums.length !== 3) {
        let randomNum = String(Math.floor((Math.random() * 9) + 1));
        if (threeNums.indexOf(randomNum) === -1) {
            threeNums += randomNum;
        } ;
    };
    console.log(threeNums);
};

const logGenerator = (msg) => {
    const p = document.createElement('p');
    p.textContent = msg;
    logDetail.append(p);
};

const play = (value) => {

    count ++;

    let strike = 0;
    let ball = 0;

    for (let i = 0; i < value.length; i++) {
        if (threeNums[i] === value[i]) {
            strike++;
        } else {
            ball++;
        };
    };
   
    if (strike === 0 && ball === 3) {
        logGenerator(`${count}번째 시도: nothing!`);
    } else if (strike === 3 && ball === 0) {
        input.placeholder="새로 시작 1, 종료 2"
        logGenerator(`${count}번째 시도: ${strike}strike(s), ${ball}ball(s)`);
        logGenerator(`3개의 숫자를 모두 맞히셨습니다! 게임 종료!`);
        logGenerator(`게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.`);
        isPlaying = false;
    } else {
        logGenerator(`${count}번째 시도: ${strike}strike(s), ${ball}ball(s)`);
    };

    if (count === 10) {
        isPlaying = false;
        input.placeholder="새로 시작 1, 종료 2";
        logGenerator(`10번의 기회를 모두 소진하여 게임이 종료됩니다.`);
        logGenerator(`게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.`);
        alert("10번의 기회를 모두 소진하여 게임이 종료됩니다.\n게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.");
    }
};

const validationCheck = (value) => {
    if ((Number.isNaN(Number(value)) === true) || 
    (value.length !== 3) ||
    (value.indexOf('0') !== -1) ||
    (new Set(value).size !== 3)) {
        alert('0을 제외한 1~9까지 중복되지 않은 숫자 3개를 입력해주세요.');
    } else {
        randomNumberGenerator();
        play(value);
    };
};

const restartValidation = (value) => {
    if (value === '1' || value === '2') {
        return true;
    } else {
        return false;
    }
}

button.addEventListener('click', (e) => {
    e.preventDefault();
    input.placeholder="숫자 3개를 입력해주세요.";

    if (isPlaying && count <= 10) {
    logGenerator(`숫자를 입력해주세요: ${input.value}`);
    validationCheck(input.value);
    input.value='';
    } else {
        count = 0;

        while(logDetail.hasChildNodes()) {
            logDetail.removeChild(logDetail.firstChild);
        };

        if (restartValidation(input.value)) {
            if (input.value === '1') {
                isPlaying = true;
                input.value =  '';
                threeNums = '';
            } else if (input.value === '2') {
                input.disabled = true;
                logGenerator(`게임을 종료합니다.`);
            };
        } else {
            alert("숫자 1 또는 2를 입력해주세요.");
        }
    } 
});