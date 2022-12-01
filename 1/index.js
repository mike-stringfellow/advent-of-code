const fs = require('fs');

const getElfTotals = (calories) => {
    return calories
        .split('\n\n')
        .map(
            e => parseInt(
                e.split('\n').reduce((a, b) => parseInt(a) + parseInt(b))
            )
        )
        .sort((a, b) => b - a);
}

const mostCalories = (calories) => {
    const elves = getElfTotals(calories);
    return Math.max(...elves);
};

const topThreeCalories = (calories) => {
    const elves = getElfTotals(calories);
    let sum = elves.slice(0, 3).reduce((a, b) => a + b);
    return sum;
}

console.log(
    mostCalories(
        fs.readFileSync('testCases/example.txt').toString()
    )
);

console.log(
    mostCalories(
        fs.readFileSync('testCases/1.test.txt').toString()
    )
);

console.log(
    topThreeCalories(
        fs.readFileSync('testCases/example.txt').toString()
    )
);

console.log(
    topThreeCalories(
        fs.readFileSync('testCases/2.test.txt').toString()
    )
);