const $input = document.querySelector('#input')
const $form = document.querySelector('#form')
const $logs = document.querySelector('#logs')

//숫자를 뽑기 => 1~9까지 숫자를 배열로 두기
// const numbers = []
// for (i = 0; i < 9; i++) {
//     numbers.push(i + 1);
// }
// console.log(numbers)

//숫자 뽑기 => map 사용하기
const numbers = Array(9).fill().map((e,i) => {
    return i + 1;
})

//4가지 숫자 뽑기 -> 답안
const answer = [];
for (let n = 0; n < 4; n ++) {
    const index = Math.floor(Math.random() * numbers.length);
    answer.push(numbers[index]);
    numbers.splice(index, 1);
}
console.log(answer)

//입력값 검증하기
const tries = [];
function checkInput(input){
    if(input.length !== 4) {
        return alert('4자리 숫자를 입력하세요')
    }
    if(new Set(input).size !== 4) {
        return alert('중복되지 않게 입력해주세요.')
    }
    if (tries.includes(input)) {
        return alert('이미 시도한 값입니다.')
    }
    return true;
}
let count = 0;
$form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = $input.value;
    $input.value= '';
    const valid = checkInput(value);
    if(!valid) return;
    if(answer.join('') === value) {
        $logs.textContent = '홈런!'
        return
    };
    if(tries.length >= 9) {
        const message = document.createTextNode(`패배! 정답은 ${answer.join('')}입니다.`)
        $logs.appendChild(message)
        return;
    } else {
        count ++;
    }

    let strike = 0;
    let ball = 0;

    // for (let i = 0; i < answer.length; i++) {
    //     const index = value.indexOf(answer[i]);
    //     if(index > -1) {
    //         if (index === i) {
    //             strike += 1;
    //         } else {
    //             ball += 1;
    //         }
    //     }
    // }

    //forEach로 반복문 돌리기
    answer.forEach((number, aIndex) => {
        const index = value.indexOf(number);
        if (index > -1 ) {
            if (index === aIndex) {
                strike += 1;
            } else{
                ball += 1;
            }
        }
    })

    $logs.append(`${count}번째 시도 '${value}' => ${strike} 스트라이크 , ${ball} 볼`, document.createElement('br'))
    tries.push(value)
});

