const mongoose = require("mongoose");
const subjectSchema = new mongoose.Schema({
  name : {
      required : [true , 'must enter name'],
type : String,
    },
    description : {
      required : [true , 'must enter description'],
type : String,
    },
    maxCapacity : {
      required : [true , 'must enter description'],
type : Number,
    },
    duration: {
      required : [true , 'must enter duration'],
type : Number,
    },
},{
      timestamps: true,
      versionKey: false
    });
    const Subject = mongoose.model("Subject", subjectSchema);
    module.exports = Subject;
    