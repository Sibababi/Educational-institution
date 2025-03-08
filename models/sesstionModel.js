const mongoose = require("mongoose");
const Classroom = require("./classroomModel");
const { setSeconds } = require("date-fns");
const sesstionSchema = new mongoose.Schema({
  stu : [{
    type : mongoose.Schema.ObjectId,
ref : 'Students'
}],
session : [{
  type : mongoose.Schema.ObjectId,
ref : 'Sesstions',
}],
  teach : {
    required : [true , 'must enter teach'],
type : mongoose.Schema.ObjectId,
ref : 'Teacher'
  },
  classroom : {
    type : mongoose.Schema.ObjectId,
ref : 'Classroom'
  },
  sub : {
    type : mongoose.Schema.ObjectId,
ref : 'Subject'
  },

  
  period : {
    required : [true , 'must enter period'],
type : Number,
  },
  date: {
    required : [true , 'must enter time'],
    type : Date,
  },
 
  sessionNum : {
type : Number,
defult:1,
  },  
},{
      timestamps: true,
      versionKey: false
    });
   
    sesstionSchema.post("save", async (doc) => {
      let ss=doc.date
      let thisclassroom = await Classroom.findById(doc.classroom);
      thisclassroom.RecDate.push({date:ss.setHours(ss.getHours())})
      let loop=Math.ceil(doc.period/60);
      for(let i=0;i<loop;++i)
      thisclassroom.RecDate.push({date:ss.setHours(ss.getHours()+1)})
      thisclassroom .save();
    });
    sesstionSchema.post("findOneAndUpdate", async (doc) => {
      let ss=doc.date
      let thisclassroom = await Classroom.findById(doc.classroom);
      thisclassroom.RecDate.push({date:ss.setHours(ss.getHours())})
      let loop=Math.ceil(doc.period/60);
      for(let i=0;i<loop;++i)
      thisclassroom.RecDate.push({date:ss.setHours(ss.getHours()+1)})
      thisclassroom .save();
    });
      sesstionSchema.pre("findOneAndUpdate", async function (next) {
          const sessionData = await this.model.findOne(this.getQuery());
          const ss = sessionData.date;
          const thisClassroom = await Classroom.findById(sessionData.classroom);
          let loop = Math.ceil(sessionData.period / 60);
         for (let j = thisClassroom.RecDate.length - 1; j >= 0; --j) {
             if (thisClassroom.RecDate[j].date.getFullYear() == ss.getFullYear() &&
                  thisClassroom.RecDate[j].date.getMonth() == ss.getMonth() &&
                  thisClassroom.RecDate[j].date.getDate() == ss.getDate() &&
                  thisClassroom.RecDate[j].date.getHours() == ss.getHours()) {
                  thisClassroom.RecDate.splice(j, loop+1);
      }
        }
       await thisClassroom.save();
       next();
      });

      sesstionSchema.pre("findOneAndDelete", async function (next) {
        const sessionData = await this.model.findOne(this.getQuery());
        const ss = sessionData.date;
        const thisClassroom = await Classroom.findById(sessionData.classroom);
        let loop = Math.ceil(sessionData.period / 60);
       for (let j = thisClassroom.RecDate.length - 1; j >= 0; --j) {
           if (thisClassroom.RecDate[j].date.getFullYear() == ss.getFullYear() &&
                thisClassroom.RecDate[j].date.getMonth() == ss.getMonth() &&
                thisClassroom.RecDate[j].date.getDate() == ss.getDate() &&
                thisClassroom.RecDate[j].date.getHours() == ss.getHours()) {
                thisClassroom.RecDate.splice(j, loop+1);
    }
      }
     await thisClassroom.save();
     next();
    });
    
      
    const Sesstion = mongoose.model("Sesstion", sesstionSchema);
    module.exports = Sesstion;
     