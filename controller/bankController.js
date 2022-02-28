let Customer = require("../models/customer");
let Transaction = require("../models/transaction");

let getHome = function (req, res) {
  res.render("home");
};

let getCustomers = function (req, res) {
  Customer.find({}).exec(function (err, customer_list) {
    // Successful, so render.
    res.render("customer_list", {
      title: "Customer List",
      customer_list: customer_list,
    });
  });
};

let getCustomerById = function (req, res) {
  Customer.findById(req.params.id).exec(function (err, customer) {
    // Successful, so render.
    res.render("customer_detail", { customer: customer });
  });
};

let updateCustomers = async function (req, res) {
    Customer.find({ name: req.body.sname }).exec(async function (err, sender) {
      let x = sender[0].balance - parseInt(req.body.amount);
      await Customer.findOneAndUpdate(
        { name: req.body.sname },
        { $set: { balance: x } },
        { new: true }
      );
    });
    Customer.find({ name: req.body.rname }).exec(async function (
      err,
      receiver
    ) {
      let y = receiver[0].balance + parseInt(req.body.amount);
      await Customer.findOneAndUpdate(
        { name: req.body.rname },
        { $set: { balance: y } },
        { new: true }
      );
    });
    let newTransaction = new Transaction();
    newTransaction.sender = req.body.sname;
    newTransaction.receiver = req.body.rname;
    newTransaction.amount = req.body.amount;
    await newTransaction.save();

    res.redirect("/customers");
};

let transactionHistory = async function (req, res) {
  Transaction.find({}).exec(function (err, history_list) {
    res.render("transaction_history", {
      title: "Transaction History",
      history_list,
    });
  });
};

module.exports = {
  getHome,
  getCustomers,
  getCustomerById,
  updateCustomers,
  transactionHistory,
};
