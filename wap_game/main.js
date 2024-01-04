const number = Number(prompt('참가 인원'))
const $button = document.querySelector('button')
const $input = document.querySelector('input')
const $word = document.querySelector('#word')
const $order = document.querySelector('#order')
let word;
let newWord;

const onClickButton = () => {
    if(newWord.length === 3 && (!word || word[word.length -1] === newWord[0])) {
        word = newWord;
        $word.textContent = word;

        const order = Number($order.textContent)
        if (order + 1 > number) {
            $order.textContent = 1;
        } else {
            $order.textContent = order + 1;
        }
    } else {
        alert('다시 입력해주세요.')
    }

    $input.value = ''
    $input.focus()
}

const onInput = (event) => {
    newWord = event.target.value
}

$button.addEventListener('click', onClickButton)
$input.addEventListener('input', onInput)

