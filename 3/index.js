const fs = require('fs');

const getPriority = item => {
    if (item === item.toLowerCase()) {
        return item.charCodeAt(0) - 96;
    }
    else if (item === item.toUpperCase()) {
        return item.charCodeAt(0) - 38;
    }
    else {
        return -1;
    }
}

// const getSharedItem = (compartment1, compartment2) => {
//     for (let item of compartment1.split('')) {
//         if (compartment2.split('').indexOf(item) > -1) {
//             return item;
//         }
//     }
// }

const getSharedItem = (compartments) => {
    for (let item of compartments[0].split('')) {
        for ([i, compartment] of compartments.slice(1).entries()) {
            if (compartment.split('').indexOf(item) == -1) {
                break;
            }
            if (i === compartments.length - 2) {
                return item;
            }
        }
    }
}

const getCompartmentContents = (rucksack) => [rucksack.slice(0, rucksack.length / 2), rucksack.slice(rucksack.length / 2)];

const getMisplacedItemPriorities = (rucksacks) => {
    let prioritySum = 0;
    for (let rucksack of rucksacks.split('\n')) {
        prioritySum += getPriority(getSharedItem(getCompartmentContents(rucksack)));
    }
    return prioritySum;
}

const getBadgePriorities = (input) => {
    let prioritySum = 0;
    const rucksacks = input.split('\n')
    for (let i = 0; i < rucksacks.length; i += 3) {
        prioritySum += getPriority(getSharedItem(rucksacks.slice(i, i + 3)));
    }
    return prioritySum;
}

console.log(
    getMisplacedItemPriorities(
        fs.readFileSync('./testCases/example.txt').toString()
    )
);

console.log(
    getMisplacedItemPriorities(
        fs.readFileSync('./testCases/1.test.txt').toString()
    )
);

console.log(
    getBadgePriorities(
        fs.readFileSync('./testCases/example.txt').toString()
    )
);

console.log(
    getBadgePriorities(
        fs.readFileSync('./testCases/1.test.txt').toString()
    )
);