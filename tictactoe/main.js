const {body} = document;
const $table = document.createElement('table');
const $result = document.createElement('div');
const rows = [];
turn = 'O'

const checkWinner = (target) => {
    const rowIndex = target.parentNode.rowIndex;
    const cellIndex = target.cellIndex;
    
    let hasWinner = false;

    if (
        rows[rowIndex][0].textContent === turn &&
        rows[rowIndex][1].textContent === turn &&
        rows[rowIndex][2].textContent === turn
    ) {
        hasWinner = true;
    }

    if (
        rows[0][cellIndex].textContent === turn &&
        rows[1][cellIndex].textContent === turn &&
        rows[2][cellIndex].textContent === turn
    ) {
        hasWinner = true;
    }

    if (
        rows[0][0].textContent === turn &&
        rows[1][1].textContent === turn &&
        rows[2][2].textContent === turn
    ) {
        hasWinner = true;
    }

    if (
        rows[2][0].textContent === turn &&
        rows[1][1].textContent === turn &&
        rows[0][2].textContent === turn
    ) {
        hasWinner = true;
    }

    return hasWinner;
}

const checkWinnerAndDraw = (target) => {
    const hasWinner = checkWinner(target);

    if (hasWinner) {
        $result.textContent = `${turn}님의 승리`
        $table.removeEventListener('click', callback)
        return;
    }
    //하나라도 아니면 아님 모두다 트루면 트루
    const draw = rows.flat().every((cell)=> cell.textContent);
    if(draw){
        $result.textContent = '무승부'
        return;
    }
    turn = turn === 'O'? 'X':'O'
}

let clickable = true;

const callback = (event) => {
    if(!clickable) return;
    if(event.target.textContent !== '') return
    event.target.textContent = turn;
    checkWinnerAndDraw(event.target)
    
    if(turn === 'X') {
        const emptyCells = rows.flat().filter((e)=> !e.textContent);
        const randomCell = emptyCells[Math.floor(Math.random()*emptyCells.length)]
        clickable = false;
        setTimeout(() => {
            randomCell.textContent = 'X';
            checkWinnerAndDraw(randomCell); //event.target 도 됨.
            clickable = true;
        }, 1000)
        
    }
}


for(let i=1; i<=3; i++){
    const $tr = document.createElement('tr');
    const cells = [];
    for(let j=1; j<=3; j++){
        const $td = document.createElement('td')
        $tr.append($td)
        cells.push($td)
    }
    rows.push(cells)
    $table.append($tr)
}
$table.addEventListener('click', callback)

console.log(rows)
body.appendChild($table);
body.appendChild($result);
