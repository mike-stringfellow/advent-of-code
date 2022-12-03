const fs = require('fs');

const calls = {
    A: 'rock',
    B: 'paper',
    C: 'scissors'
};

const responses = {
    X: 'rock',
    Y: 'paper',
    Z: 'scissors'
};

const outcomes = {
    X: 'lose',
    Y: 'draw',
    Z: 'win'
};

const scores = {
    rock: 1,
    paper: 2,
    scissors: 3
};

const modifiers = {
    lose: 0,
    win: 6,
    draw: 3 
};

const calculateResult = (opponent, player) => {
    switch (`${calls[opponent]}|${responses[player]}`) {
        case 'rock|rock':
            return 'draw';
        case 'rock|paper':
            return 'win';
        case 'rock|scissors':
            return 'lose';
        case 'paper|rock':
            return 'lose';
        case 'paper|paper':
            return 'draw';
        case 'paper|scissors':
            return 'win';
        case 'scissors|rock':
            return 'win';
        case 'scissors|paper':
            return 'lose';
        case 'scissors|scissors':
            return 'draw';
    }
}

const calculateNewResult = (opponent, outcome) => {
    switch (outcomes[outcome]) {
        case 'draw':
            return calls[opponent];
        case 'win':
            switch (calls[opponent]) {
                case 'rock':
                    return 'paper';
                case 'paper':
                    return 'scissors';
                case 'scissors':
                    return 'rock';
            }
            break;
        case 'lose':
            switch (calls[opponent]) {
                case 'rock':
                    return 'scissors';
                case 'paper':
                    return 'rock';
                case 'scissors':
                    return 'paper';
            }
            break;
    }
}

const calculateScore = (guide) => {
    let score = 0;
    for (let round of guide.split('\n')) {
        const [opponent, player] = round.split(' ');
        score += (scores[responses[player]] + modifiers[calculateResult(opponent, player)]);
    }
    return score;
}

const calculateNewScore = (guide) => {
    let score = 0;
    for (let round of guide.split('\n')) {
        const [opponent, outcome] = round.split(' ');
        const player = calculateNewResult(opponent, outcome);
        score += (scores[player] + modifiers[outcomes[outcome]]);
    }
    return score;
}

console.log(
    calculateScore(
        fs.readFileSync('./testCases/example.txt').toString()
    )
);

console.log(
    calculateScore(
        fs.readFileSync('./testCases/1.test.txt').toString()
    )
);

console.log(
    calculateNewScore(
        fs.readFileSync('./testCases/example.txt').toString()
    )
);

console.log(
    calculateNewScore(
        fs.readFileSync('./testCases/1.test.txt').toString()
    )
);