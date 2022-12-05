const fs = require('fs');

let crates = [];

const initialiseCrates = (startMatrix) => {
    crates = [];
    const stacks = startMatrix.split('\n').reverse();
    const stackCount = stacks[0].length / 4;
    for (let i = 0; i < stackCount; i++) {
        crates.push([]);
    }
    stacks.splice(0, 1);
    for (let stackLevel of stacks) {
        for (let i = 0; i < stackCount; i++) {
            const crate = stackLevel.slice((i * 4) + 1, (i * 4) + 2);
            if (crate !== ' ') {
                crates[i].push(crate);
            }
        }
    }
}

const moveCrates = (input) => {
    const [startMatrix, moves] = input.split('\n\n');
    initialiseCrates(startMatrix);
    for (let move of moves.split('\n')) {
        const moveCount = parseInt(move.slice(5, 6 + (move.length - 18))),
              from = parseInt(move.slice(12 + (move.length - 18), 13 + (move.length - 18))),
              to = parseInt(move.slice(17 + (move.length - 18), 18 + (move.length - 18)));
        for (let i = 0; i < moveCount; i++) {
            crates[to - 1].push(crates[from - 1].pop());
        }
    }
    return crates.map(c => c.pop()).reduce((a, b) => a + b);
}

const moveMultipleCrates = (input) => {
    const [startMatrix, moves] = input.split('\n\n');
    initialiseCrates(startMatrix);
    for (let move of moves.split('\n')) {
        const moveCount = parseInt(move.slice(5, 6 + (move.length - 18))),
              from = parseInt(move.slice(12 + (move.length - 18), 13 + (move.length - 18))),
              to = parseInt(move.slice(17 + (move.length - 18), 18 + (move.length - 18)));
        const toMove = crates[from - 1].splice(crates[from - 1].length - moveCount);
        crates[to - 1].push(...toMove);
    }
    return crates.map(c => c.pop()).reduce((a, b) => a + b);
}

console.log(
    moveCrates(
        fs.readFileSync('./testCases/example.txt').toString()
    )
);

console.log(
    moveCrates(
        fs.readFileSync('./testCases/1.test.txt').toString()
    )
);

console.log(
    moveMultipleCrates(
        fs.readFileSync('./testCases/example.txt').toString()
    )
);

console.log(
    moveMultipleCrates(
        fs.readFileSync('./testCases/1.test.txt').toString()
    )
);