const Subject = require("../models/subjectModel");
const AppError = require("../utils/appError");
const handlerFactory = require("../utils/handlerFactory");
const catchAsync = require("../utils/catchAsync");
exports.getsubject = handlerFactory.getOne(Subject);
exports.createsubject = handlerFactory.createOne(Subject);
exports.updatesubject = handlerFactory.updateOne(Subject);
exports.deletesubject = handlerFactory.deleteOne(Subject);
exports.getAllsubject = handlerFactory.getAll(Subject);
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
