const mongoose = require("mongoose");
const studentsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  dateOfBirth : {
      required : [true , 'must enter dateOfBirth'],
type : Date,
    },
    gender : {
      required : [true , 'must enter gender'],
type : String,
enum: ["ذكر", "انثى"],
    },
    certificate : {
      required : [true , 'must enter grade'],
type : String,
    },
    phone: {
      type: String,
      required: [true, "يجب ادخال رقم هاتف"],
      validate: {
        validator: (el) => {
          /(\+963\d{9}|09\d{8})/.test(el);
        },
        message: "الرقم غير صيحيح",
      },
    },

    
},{
      timestamps: true,
      versionKey: false
    });
    const Students = mongoose.model("Students", studentsSchema);
    module.exports = Students;
    