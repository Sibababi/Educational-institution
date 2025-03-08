const sesstionController = require("../controllers/sesstionController");
const dynamicMiddleware = require("../middlewares/dynamicMiddleware");  
const authMiddlewers = require('../middlewares/authMiddlewers');
  const express = require("express");
  const router = express.Router();
  router.use(authMiddlewers.protect);
  router.route("/").get( 
      authMiddlewers.restrictTo("admin"),
      sesstionController.getAllsesstion)

      router.route("/work_teacher").get( 
        authMiddlewers.restrictTo("teach"),
        dynamicMiddleware.addQuery("teach", "userId"),
        sesstionController.getAllsesstion)

        router.route("/student").get( 
          authMiddlewers.restrictTo("student"),
          dynamicMiddleware.addQuery("stu", "userId"),
          sesstionController.getAllsesstion)
      
      
          router.route("/").post(authMiddlewers.restrictTo("admin"),sesstionController.createsesstion);
          router.route("/completion").post(authMiddlewers.restrictTo("admin"),sesstionController.createcompletion);
  router
    .route("/:id")
    .get(sesstionController.getsesstion);
    router
    .route("/:id").patch(authMiddlewers.restrictTo("admin"),sesstionController.updatesesstion);
    router
    .route("/:id").delete(authMiddlewers.restrictTo("admin"),sesstionController.deletesesstion);
  module.exports = router;
  
  