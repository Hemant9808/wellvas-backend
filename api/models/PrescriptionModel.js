const mongoose = require('mongoose');

const {Schema} = mongoose;
const prescriptionSchema = new Schema({
  userId:{
     type:mongoose.Schema.Types.ObjectId,
     ref:'User'

  },
  url:{
    type:String,
    required:true
  },
  
},
{
    timestamps:true
  }
)
const Prescription = mongoose.model("Prescription",prescriptionSchema)
module.exports=Prescription;