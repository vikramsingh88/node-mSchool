const mongoose = require("mongoose")

const Schema = mongoose.Schema

const feeSchema = new Schema({
    studentId : { type: Schema.Types.ObjectId, required: true },
    feeType : { type: String, required: true },
    amount : { type: String, required: true },
    month : { type: String, required: true },
    remainingFee : { type: String, required: true },
    advanceFee : { type: String, required: true },
    date: { type: Date, default: Date.now  }
})
  
const Fee = mongoose.model("Fee", feeSchema)

module.exports = Fee;