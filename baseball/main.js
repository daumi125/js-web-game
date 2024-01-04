const $input = document.querySelector('#input');
const $form = document.querySelector('form');
const $logs = document.querySelector('#logs');

//숫자를 뽑기(1-9까지)
// const numbers = [];
// for(let n = 1; n < 10; n++) {
//     numbers.push(n)
// }


//map사용해보기
const numbers = Array(9).fill().map((element,index) => {
    return index + 1;
})


const answer = [];
for(let n = 0; n <= 3; n++){
    const index = Math.floor(Math.random() * numbers.length);
    answer.push(numbers[index]);
    numbers.splice(index, 1);
}
console.log(answer)

const tries = [];
function checkInput(input) {
    if(input.length !== 4) {
        return alert('4자리 숫자를 입력해 주세요.') //결과의 값이 undefined가 나오기 위해서 => false 값 사용
    }
    if(new Set(input).size !== 4) {
        return alert('중복되지 않게 입력해주세요.')
    }
    if(tries.includes(input)) {
        return alert('이미 시도한 값입니다.')
    }
    return true;
}

let out = 0;
$form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = $input.value;
    $input.value = ''
    const valid = checkInput(value);
    if(!valid) return;
    if(answer.join('') === value) {
        $logs.textContent = '홈런!';
        return;
    }
    if(tries.length >= 9) {
        const message = document.createTextNode(`패배! 정답은 ${answer.join('')}`);
        $logs.appendChild(message);
        return;
    }

    let strike = 0;
    let ball = 0;
    // for (let i = 0; i < answer.length; i++) {
    //     const index = value.indexOf(answer[i]);
    //     if (index > -1) {
    //         if (index === i) {
    //             strike += 1;
    //         }else {
    //             ball += 1;
    //         }
    //     }
    // }

    //forEach 사용하기
    answer.forEach((number, aIndex) => {
        const index = value.indexOf(String(number));
        if (index > -1) {
            if (index === aIndex) {
                strike += 1;
            }else {
                ball += 1;
            }
        }
    })

    if (strike === 0 && ball === 0) {
        out++;
        $logs.append(`${value}:아웃`, document.createElement('br'));
    }else {
        $logs.append(`${value}:${strike} 스트라이크 ${ball} 볼`, document.createElement('br'))
    }
    if(out === 3) {
        const message = document.createTextNode(`패배! 정답은 ${answer.join('')}`);
        $logs.appendChild(message);
        return;
    }
    tries.push(value);
})
