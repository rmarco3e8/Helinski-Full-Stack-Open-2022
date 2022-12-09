let orders = [
    {amount: 100},
    {amount: 150},
    {amount: 400},
    {amount: 150},
    {amount: 375}
];

// sum the order values
let total = orders.reduce((runningTotal, order) => {
    return runningTotal + order.amount;
}, 0);
console.log("Here's your total sir. ", total);

// shorten it!
let shorter_total = orders.reduce((runningTotal, order) => runningTotal + order.amount, 0);
console.log("Didn't hear me? Here it is again! ", total);

// return an array of the amounts, using reduce instead of map
let amounts = orders.reduce((new_array, order) => new_array.concat(order.amount), []);
console.log("You know what? Here, add it up yourself... ", amounts);