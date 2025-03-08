const studentsController = require("../controllers/studentsController");
  const authMiddlewers = require('./../middlewares/authMiddlewers');
  const express = require("express");
  const router = express.Router();

  router.route("/")
  .get(authMiddlewers.protect,
    authMiddlewers.restrictTo("admin"),
    studentsController.getAllstudents)

    .post(authMiddlewers.protect,
      authMiddlewers.restrictTo("admin"),
      studentsController.createstudents);
  router
    .route("/:id")
    .get(authMiddlewers.protect,
    authMiddlewers.restrictTo("admin"),
    studentsController.getstudents)

    .patch(authMiddlewers.protect,
    authMiddlewers.restrictTo("student"),
    studentsController.getMe,
    studentsController.updatestudents)

    .delete(authMiddlewers.protect,
    authMiddlewers.restrictTo("admin"),
    studentsController.deletestudents);
  module.exports = router;
  