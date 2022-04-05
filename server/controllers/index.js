const model = require("../models/model")

// Create Categories
const create_categories = async (req, res) => {
    const create = await new model.Categories({
        type: "Investment",
        color: "blue"
    })
    await create.save(err => {
        if (err) return res.status(400).json(`message: error while creating categories: ${err}`)
        return res.status(200).json(create)
    })
}

// Get Categories
const get_categories = async (req, res) => {
    const data = await model.Categories.find();
    // const filter = data.map(item=>Object.assign({},{type:item.type, color:item.color}))

    return res.send(data)
}

//Create Transaction
const create_Transaction = async (req, res) => {
    if (!req.body) {
        return res.status(400).json("bad request")
    }
    const { name, type, amount } = req.body;
    const Transaction = new model.Transactions({
        name: name,
        type: type,
        amount: amount

    })
    Transaction.save(err => {
        if (err) return console.log("err", err)
        return res.json(Transaction)
    })
}
const get_transactions = async (req, res) => {
    const data = await model.Transactions.find();
    // const filter = data.map(item=>Object.assign({},{type:item.type, color:item.color}))

    return res.json(data)
}

//delete transactions
const delete_transaction = async (req, res) => {
    if (!req.body) return res.status(400).json("message: Bad request")
    await model.Transactions.deleteOne(req.body, (err) => {
        if (!err) return res.status(200).json("Record deleted Successfully")
    }).clone().catch(err => {
        if (err) return res.status(500).json(`message: Error while deleting the record ${err}`)
    })
}

//aggregate 
const get_labels = async (req, res) => {
    await model.Transactions.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: "type",
                foreignField: "type",
                as: "cat_info"
            }
        },
        {
            $unwind: "$cat_info"
        }
    ]).then(async (result) => {
        if (result.length < 1) return res.status(200).json([])
        const data = await result.map(({_id,name,amount,type,cat_info}) => {
            return Object.assign({}, { _id, name, type, amount, color: cat_info.color })
        })
        if (data) return res.send(data)
        return res.json("failed to filter")
    }).catch(err => {
        if (err) return res.status(500).json("error while aggregate")
    })
}

module.exports = {
    create_categories,
    get_categories,
    create_Transaction,
    get_transactions,
    delete_transaction,
    get_labels
}