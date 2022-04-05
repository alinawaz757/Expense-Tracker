const Routes = require("express").Router()
const { create_categories, get_categories, create_Transaction, get_transactions, delete_transaction, get_labels } = require("../controllers");

Routes.route("/api/categories")
    .post(create_categories)
    .get(get_categories)

Routes.route("/api/transactions")
    .post(create_Transaction)
    .get(get_transactions)
    .delete(delete_transaction)

Routes.route("/api/labels")
    .get(get_labels)
module.exports = Routes;