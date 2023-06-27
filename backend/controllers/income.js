const IncomeSchema = require('../models/incomeModel');

exports.addIncome = async (req, res) => {
    console.log("Add income111q1",req.body);
    const {title,amount,category,description,date} = req.body;
    const income = IncomeSchema({
        title,
        amount,
        category,
        description,
        date
    });
    try {
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await income.save()
        res.status(200).json({message: 'Income Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.getIncome = async (req, res) => {
    try {
      const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
      res.status(200).json(incomes);
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  };
  

exports.deleteIncome = async (req,res)=>{
    let id = req.params.id;
        IncomeSchema.findByIdAndDelete(id)
        .then((income)=>{
            res.status(200).json(income)
        })
        .catch((err)=>{
            res.status(500).json(err)
        });
}