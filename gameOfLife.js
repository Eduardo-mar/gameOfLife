const matus_1 = [
    [0, 0, 0, 0, 0, 0, 1, 0],
    [1, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 1, 1, 1],
];
const matus_2 = [
    [0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [1, 1, 0, 0, 1, 1, 1],
];
const matus_3 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const matus = [matus_1, matus_2, matus_3];
let initialCells = [];
let time;

const itsAlive = (event) => {
    const str = event.target.id;
    let pos = str.split('-');
    if (document.getElementById(event.target.id).className == 'alive') {
        document.getElementById(event.target.id).setAttribute('class', '');
    } else {
        document.getElementById(event.target.id).setAttribute('class', 'alive');
    }
    initialCells[pos[0]][pos[1]] = !initialCells[pos[0]][pos[1]];
}
const nextTurn = (cells) => {
    console.count('nextTurn');
    const newCells = [];
    for (let i = 0; i < 60; i++) {
        newCells.push([]);
        for (let j = 0; j < 151; j++) {
            let n = 0;
            for (let k = i - 1; k <= i + 1; k++) {
                for (let l = j - 1; l <= j + 1; l++) {
                    if (k !== -1 && l !== -1 && k !== 60 && l !== 150 && cells[k][l] && !(k === i && l === j)) {
                        n++
                    }
                }
            }
            if ((n === 3 && !cells[i][j]) || ((n === 3 || n === 2) && cells[i][j])) {
                newCells[i].push(true);
                document.getElementById(`${i}-${j}`).setAttribute('class', 'alive');
            } else {
                newCells[i].push(false);
                document.getElementById(`${i}-${j}`).setAttribute('class', '');
            }
        }
    }
    initialCells = newCells;
    // console.log(evento)
    time = setTimeout(() => nextTurn(newCells), 100);
}
const stopTurn = () => {
    clearTimeout(time);
}
const clean = () => {
    for (let i = 0; i < initialCells.length; i++) {
        for (let j = 0; j < initialCells[0].length; j++) {
            initialCells[i][j]=false;
            document.getElementById(`${i}-${j}`).setAttribute('class', '');
        }     
    }
}
const matusalen = (event) => {
    const elect = event.target.value;
    for (let i = 0; i < initialCells.length; i++) {
        for (let j = 0; j < initialCells[0].length; j++) {
            initialCells[i][j]=false;
            document.getElementById(`${i}-${j}`).setAttribute('class', '');
        }     
    }
    const xc = Math.round(matus[elect][0].length / 2);
    const yf = Math.round(matus[elect].length / 2);
    let a = 0;
    let b = 0;
    for (let i = 29 - yf; i <= 29 + yf; i++) {
        for (let j = 75 - xc; j <= 75 + xc; j++) {
            if (b === matus[elect][0].length) {
                break;
            }
            initialCells[i][j] = matus[elect][a][b];
            if (matus[elect][a][b]) {
                document.getElementById(`${i}-${j}`).setAttribute('class', 'alive');
            }
            b++;
        }
        if (a === matus[elect].length - 1) {
            break;
        }
        a++;
        b = 0;
    }
}

for (let i = 0; i < matus.length; i++) {
    let option = document.createElement('option');
    document.getElementById('list').appendChild(option);
    option.setAttribute('value', i);
    option.innerHTML = `Matusalén ${i + 1}`;
}
for (let i = 0; i < 60 * 151; i++) {
    let newDiv = document.createElement('div');
    let column = i;
    const iTrunc = Math.trunc(i / 151);
    let row = iTrunc;
    if (iTrunc !== 0) {
        column = i - iTrunc * 151;
    }
    if (i % 151 === 0 && i !== (60 * 151 - 1)) {
        initialCells.push([]);
    }
    newDiv.setAttribute('Id', `${row}-${column}`);
    document.getElementById('main').appendChild(newDiv);

    initialCells[iTrunc].push(false);
    newDiv.addEventListener('click', itsAlive);
}

document.getElementsByTagName('button')[0].addEventListener('click', evento => nextTurn(initialCells));
document.getElementsByTagName('button')[1].addEventListener('click', stopTurn);
document.getElementsByTagName('button')[2].addEventListener('click', clean);
document.getElementById('list').addEventListener('change', matusalen);