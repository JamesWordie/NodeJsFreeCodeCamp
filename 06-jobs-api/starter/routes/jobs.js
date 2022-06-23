const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  getAJob,
  createAJob,
  updateAJob,
  deleteAJob,
} = require("../controllers/jobs");

router.route("/").get(getAllJobs).post(createAJob);
router.route("/:id").get(getAJob).patch(updateAJob).delete(deleteAJob);

module.exports = router;
