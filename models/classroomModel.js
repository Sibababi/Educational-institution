const mongoose = require("mongoose");
const classroomSchema = new mongoose.Schema({

  name : {
      required : [true , 'must enter name'],
      type : String,
    },
    capacity : {
      required : [true , 'must enter capacity'],
      type : Number,
    },
    
    photo: {
      type: String,
    },
    RecDate :[{date:{  required : [true , 'must enter time'],type : Date,
    }}],
    
},{
      timestamps: true,
      versionKey: false
    });
    const Classroom = mongoose.model("Classroom", classroomSchema);
    module.exports = Classroom;
    