var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');


var connection = mongoose.createConnection("mongodb://localhost/employees");

autoIncrement.initialize(connection);


const EmployeeSchema = mongoose.Schema({
    name : {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 255
    },
    dateofbirth: {
      type: Date,
      required: true,
      min: '1970-01-01', // max age of employee 50
      max: '2002-01-01'  // min age of employee 17
    },
    salary: {
      type: Number,
      required: true
    },
    skills: {
      type: Number,
      required: true,
      min: 1,
      max: 10
    },
    imageurl:{
      type:String,
      required: 'URL can\'t be empty',
      unique: true
    }
});

EmployeeSchema.path('downloadURL').imageurl((val) => {
    urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return urlRegex.test(val);
}, 'Invalid URL.');


EmployeeSchema.plugin(autoIncrement.plugin, 'Employee');
module.exports = mongoose.model('Employee', EmployeeSchema);
