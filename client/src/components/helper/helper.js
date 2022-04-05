import _ from "lodash"

export let percent
export const getSum = (transaction, type) => {
    const sum = _(transaction)
        .groupBy(type)
        .map((obj, key) => {
            if (!type) return "missing 2nd argument"
            return {
                type: key,
                color: obj[0].color,
                total: _.sumBy(obj, (v) => {
                    let amount = parseInt(v.amount)
                    return amount
                })
            }
        }).value()
    return sum
}

export const getLabels = (transaction) => {
    let amountSum = getSum(transaction, "type")
    let total = amountSum.reduce((pre, curr) => pre + curr.total, 0)
    percent = _(amountSum)
        .map(obj => _.assign(obj, { percent: Math.round(100 * obj.total / total) })).value()

    return percent;

}







/*
// Accepts the array and key
const groupBy = (array, key) => {
    // Return the end result
    return array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
            currentValue
        );
        // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
        return result;
    }, {}); // empty object is the initial value for result object
};
//sumBy field
const SumBy = (arr, key) => {
    return arr.reduce((pre, curr) => {
        const number = parseInt(curr[key])
        return pre + number
    }, 0)
}

export const getSum = (transaction, type) => {
    const categories = groupBy(transaction, type ?? "type")
    const Savings = SumBy(categories["Savings"], "amount")
    const Expenses = SumBy(categories["Expense"], "amount")
    const Investments = SumBy(categories["Investment"], "amount")
    const total = Savings + Expenses + Investments
    const SavingsPercent = Savings / total * 100+"%"
    const ExpensesPercent = Expenses / total * 100+"%"
    const InvestmentsPercent = Investments / total * 100+"%"
   return [
       {type:"Savings",total:total,percent:SavingsPercent}, 
       {type:"Expenses",total:total,percent:ExpensesPercent}, 
       {type:"Investments",total:total,percent:InvestmentsPercent}
    ]
}
*/


