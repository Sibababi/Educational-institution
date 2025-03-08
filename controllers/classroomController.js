const Classroom = require("../models/classroomModel");
const AppError = require("../utils/appError");
const handlerFactory = require("../utils/handlerFactory");
const catchAsync = require("../utils/catchAsync");
exports.getclassroom = handlerFactory.getOne(Classroom);
exports.createclassroom = handlerFactory.createOne(Classroom);
exports.updateclassroom = handlerFactory.updateOne(Classroom);
exports.deleteclassroom = handlerFactory.deleteOne(Classroom);
exports.getAllclassroom = handlerFactory.getAll(Classroom);


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
