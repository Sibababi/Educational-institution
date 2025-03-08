const Students = require("../models/studentsModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const handlerFactory = require("../utils/handlerFactory");
const catchAsync = require("../utils/catchAsync");
exports.getstudents = handlerFactory.getOne(Students);
exports.updatestudents = handlerFactory.updateOne(Students);
exports.deletestudents = handlerFactory.deleteOne(Students);
exports.getAllstudents = handlerFactory.getAll(Students);
exports.createstudents = catchAsync(async (req, res, next) => {
  const doc = await Students.create({
    name: req.body.name,
    dateOfBirth  : req.body. dateOfBirth  ,
    certificate : req.body.certificate ,
    gender:req.body.gender,
    phone:req.body.phone

  });
  const newuser = await User.create({
    _id: doc._id,
    name: doc.name,
    email: req.body.email,
    password: "123454321",
    role: "student",
    phone: req.body.phone,
  });
  if (!newuser) {
    return next(new AppError("حصل خطء في انشاء حساب المعلم", 400));
  }
  res.status(201).json({
    status: "success",
    doc,
  });
});
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }
  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'level', 'certificate');
  if (req.file)
    filteredBody.photo = `${req.protocol}://${req.get('host')}/img/teachers/${
      req.file.filename
    }`;
  // 3) Update user document
  const updatedStudents = await Students.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
        student: updatedStudents,
    },
  });
  exports.updateStudents = factory.updateOne(Students);
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
