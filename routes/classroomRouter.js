const classroomController = require("../controllers/classroomController");
const dynamicMiddleware = require("../middlewares/dynamicMiddleware"); 
const authMiddlewers = require('./../middlewares/authMiddlewers');
const imgclassroomMiddlewar = require("../middlewares/imgclassroomMiddlewar");
  const express = require("express");
  const router = express.Router();

  router
  .route("/uplode")
  .post(authMiddlewers.protect,
    authMiddlewers.restrictTo("admin"),
    imgclassroomMiddlewar.uploadClassroomPhoto,
  dynamicMiddleware.filteredBody("photo"),
  dynamicMiddleware.setPathImginBody("classrooms", "photo"),
    classroomController.updateclassroom)

  router.route("/").get(classroomController.getAllclassroom)
  .post(authMiddlewers.protect,
    authMiddlewers.restrictTo("admin"),
    classroomController.createclassroom);
  router
    .route("/:id")
    .get(classroomController.getclassroom)

    .patch(authMiddlewers.protect,
      authMiddlewers.restrictTo("admin"),
      classroomController.updateclassroom)

    .delete(authMiddlewers.protect,
    authMiddlewers.restrictTo("admin"),
    classroomController.deleteclassroom);

    
      router
    .route("/:id/uplode")
    .patch(authMiddlewers.protect,
      authMiddlewers.restrictTo("admin"),
      imgclassroomMiddlewar.uploadClassroomPhoto,
    dynamicMiddleware.filteredBody("photo"),
    dynamicMiddleware.setPathImginBody("classrooms", "photo"),
      classroomController.updateclassroom)


  module.exports = router;
  