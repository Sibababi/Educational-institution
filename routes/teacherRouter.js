const teacherController = require("../controllers/teacherController");
  const authMiddlewers = require('./../middlewares/authMiddlewers');
  const express = require("express");
  const router = express.Router();
  
  router.route("/")
  .get(
    teacherController.getAllteacher)

    .post(authMiddlewers.protect,
      authMiddlewers.restrictTo("admin"),
      teacherController.createteacher);
  router
    .route("/:id")
    .get(
    teacherController.getteacher)

    .patch(authMiddlewers.protect,
    authMiddlewers.restrictTo("teach"),
    teacherController.getMe,
    teacherController.updateteacher)

    .delete(authMiddlewers.protect,
    authMiddlewers.restrictTo("admin"),
    teacherController.deleteteacher);

    router.patch('/updateMe', authMiddlewers.protect, teacherController.updateMe);

  module.exports = router;
  