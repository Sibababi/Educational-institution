const mongoose = require("mongoose");
const teacherSchema = new mongoose.Schema({
  name : {
      required : [true , 'must enter name'],
type : String,
    },
    level : {
      required : [true , 'must enter level'],
type : String,
    },
    certificate :  {subject : {
      type : String,
    }},
    
},{
      timestamps: true,
      versionKey: false
    });
    const Teacher = mongoose.model("Teacher", teacherSchema);
    module.exports = Teacher;
    