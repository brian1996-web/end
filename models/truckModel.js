const mongoose  = require('mongoose');

const passportLocalMongoose = require('passport-local-mongoose');

const TruckSchema = new mongoose.Schema({
 
  firstname: {
    type:String,
    trim:true, 

  },
  lastname: {
    type:String,
    true:true,
  },
  username:{
    type: String,
    trim: true,
    unique:true,
  },
  email: {
    type:String,
    unique:true 

  },
  role: {
    type:String,
    trim: true,
  },
  phone: {
    type:String,
    trim:true,
  },
  date: {
    type: String,
    trim: true,
  },
  arrivalTime:{
    type:String,
    unique:true 
  },
  receiptnumber:{
    type:String,
    unique:true 
  },
  exitTime:{
    type:String,
    unique:true 
  },
  amount: {
    type: String,
    trim: true,
  },
  gender:{
    type: String,
    trim: true,

  },
   password:{
    type: String,
    trim: true,
  },
});
  TruckSchema.plugin(passportLocalMongoose,{usernameField:"email"}); //
  module.exports = mongoose.model('Truck',TruckSchema);