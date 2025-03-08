const Sesstion = require("../models/sesstionModel");
const Students = require("../models/studentsModel");
const Teacher = require("../models/teacherModel");
const Classroom = require("../models/classroomModel");
const Subject = require("../models/subjectModel");
const AppError = require("../utils/appError");
const handlerFactory = require("../utils/handlerFactory");
const catchAsync = require("../utils/catchAsync");




exports.getsesstion = handlerFactory.getOne(Sesstion,
  {path:"stu",select:"name certificate -_id"},
{path:"teach",select:"name certificate -_id"},
{path:"classroom",select:"name capacity -_id"},
{path:"sub",select:"name duration -_id"});


exports.deletesesstion = handlerFactory.deleteOne(Sesstion);
exports.getAllsesstion = handlerFactory.getAllpop1(Sesstion,
  {path:"stu",select:"name certificate -_id"},
{path:"teach",select:"name certificate -_id"},
{path:"classroom",select:"name capacity -_id"},
{path:"sub",select:"name duration -_id"});

exports.createsesstion = catchAsync(async (req, res, next) => {
  const thisClassroom = await Classroom.findById(req.body.classroom); 
  if (!thisClassroom) return next(new AppError("classroom is not defind", 400));
  for(let i=0;i <  thisClassroom.RecDate.length;i++){
  var mm=new Date (req.body.date)
  if(thisClassroom.RecDate[i].date.getFullYear()==mm.getFullYear()
    &&thisClassroom.RecDate[i].date.getMonth()==mm.getMonth()
  &&thisClassroom.RecDate[i].date.getDate()==mm.getDate()
  &&thisClassroom.RecDate[i].date.getHours()==mm.getHours()){
    return next(new AppError("classroom is saved", 400));
  }
  
}

 const thisSubject= await Subject.findById(req.body.sub); 
 if(thisSubject.maxCapacity <req.body.sub.length ){
  return next(new AppError("the number of students exceeds the maxCapacity for the subject ", 400));
 }

 if(thisClassroom.capacity <thisSubject.maxCapacity ){
  return next(new AppError("the MaxCapacity of subject exceeds the Capacity for the classroom  ", 400));
 }
  
 if(thisSubject.duration <=req.body.sessionNum ){
  return next(new AppError("the subject has ended  ", 400));
 }

  const doc = await Sesstion.create(req.body
  );
  if(!doc){
    return next(new AppError("Message Error",400))
    }
  res.status(200).json({
    status: "success",
    doc,
  });
});

exports.updatesesstion = catchAsync(async (req, res, next) => {
  const thisClassroom = await Classroom.findById(req.body.classroom ); 
  if (!thisClassroom) return next(new AppError("classroom is not defind", 400));
  for(let i=0;i <  thisClassroom.RecDate.length;i++){
   console.log(thisClassroom.RecDate[i].date)
  var mm=new Date (req.body.date)
  if(thisClassroom.RecDate[i].date.getFullYear()==mm.getFullYear()
    &&thisClassroom.RecDate[i].date.getMonth()==mm.getMonth()
  &&thisClassroom.RecDate[i].date.getDate()==mm.getDate()
  &&thisClassroom.RecDate[i].date.getHours()==mm.getHours()){
    return next(new AppError("classroom is saved", 400));
  }
  
}
  const thisSubject= await Subject.findById(req.body.sub); 
 if(thisSubject.maxCapacity <req.body.sub.length ){
  return next(new AppError("the number of students exceeds the maxCapacity for the subject ", 400));
 }

 if(thisClassroom.capacity <thisSubject.maxCapacity ){
  return next(new AppError("the MaxCapacity of subject exceeds the Capacity for the classroom  ", 400));
 }
  
 if(thisSubject.duration <=req.body.sessionNum ){
  return next(new AppError("the subject has ended  ", 400));
 }
  const doc = await Sesstion.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if(!doc){
    return (new AppError("Message Error",400))
    }
  res.status(200).json({
    status: "success",
    doc,
  });
});


exports.createcompletion = catchAsync(async (req, res, next) => {
  const thisSession = await Sesstion.findById(req.body.session);

  const doc = await Sesstion.create({
    stu :thisSession.stu,
  teach :thisSession.teach,
  classroom : thisSession.classroom,
  sub : thisSession.sub,
  period :req.body.period,  
  date:req.body.date,
  sessionNum :thisSession.sessionNum+1
  });
 
  if (!doc) {
    return next(new AppError("حصل خطء في انشاء حساب المعلم", 400));
  }
  res.status(201).json({
    status: "success",
    doc,
  });
});




exports.defult = catchAsync(async (req, res, next) => {
  //write your code here
  const doc = []
  if(!doc){
    return (new AppError("Message Error",400))
    }
  res.status(200).json({
    status: "success",
    doc,
  });
});


