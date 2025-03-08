const subjectController = require("../controllers/subjectController");
  const authMiddlewers = require('./../middlewares/authMiddlewers');
  const express = require("express");
  const router = express.Router();
 
  router.route("/").get(subjectController.getAllsubject)
  
  .post(authMiddlewers.protect,
    authMiddlewers.restrictTo("admin"),
    subjectController.createsubject);

  router
    .route("/:id")
    .get(subjectController.getsubject)
    .patch(authMiddlewers.protect,
      authMiddlewers.restrictTo("admin"),
      subjectController.updatesubject)
    .delete(authMiddlewers.protect,
      authMiddlewers.restrictTo("admin"),
      subjectController.deletesubject);
  module.exports = router;
  