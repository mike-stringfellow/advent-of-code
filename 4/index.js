const fs = require('fs');

const countFullyContainedPairs = (input) => {
    let fullyContainedCount = 0;
    for (let section of input.split('\n')) {
        let [elf1, elf2] = section.split(',');
        if (parseInt(elf1.split('-')[0]) <= parseInt(elf2.split('-')[0]) && parseInt(elf1.split('-')[1]) >= parseInt(elf2.split('-')[1])) {
            fullyContainedCount += 1;
            continue;
        }
        if (parseInt(elf2.split('-')[0]) <= parseInt(elf1.split('-')[0]) && parseInt(elf2.split('-')[1]) >= parseInt(elf1.split('-')[1])) {
            fullyContainedCount += 1;
            continue;
        }
    }
    return fullyContainedCount;
}

const countPartiallyContainedPairs = (input) => {
    let count = 0;
    for (let section of input.split('\n')) {
        let [elf1, elf2] = section.split(',');
        if (
            (parseInt(elf1.split('-')[0]) <= parseInt(elf2.split('-')[0]) && parseInt(elf1.split('-')[1]) >= parseInt(elf2.split('-')[0])) ||
            (parseInt(elf1.split('-')[0]) <= parseInt(elf2.split('-')[1]) && parseInt(elf1.split('-')[1]) >= parseInt(elf2.split('-')[1]))
        ) {
            count += 1;
            continue;
        }
        if (
            (parseInt(elf2.split('-')[0]) <= parseInt(elf1.split('-')[0]) && parseInt(elf2.split('-')[1]) >= parseInt(elf1.split('-')[0])) ||
            (parseInt(elf2.split('-')[0]) <= parseInt(elf1.split('-')[1]) && parseInt(elf2.split('-')[1]) >= parseInt(elf1.split('-')[1]))
        ) {
            count += 1
            continue;
        }
    }
    return count;
}

console.log(
    countFullyContainedPairs(
        fs.readFileSync('./testCases/example.txt').toString()
    )
);

console.log(
    countFullyContainedPairs(
        fs.readFileSync('./testCases/1.test.txt').toString()
    )
);

console.log(
    countPartiallyContainedPairs(
        fs.readFileSync('./testCases/example.txt').toString()
    )
);

console.log(
    countPartiallyContainedPairs(
        fs.readFileSync('./testCases/1.test.txt').toString()
    )
);