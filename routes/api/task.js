const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  Profile = require("../../models/Profile"),
  User = require("../../models/User"),
  Task = require("../../models/Task");

const validatieTaskInput = require("../../validations/task");

//@route   POST api/profile/task
//@desc    Add task to profile
//@access  private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatieTaskInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const taskFields = {};
    taskFields.uid = req.user.id;
    taskFields.pid = req.body.pid;
    taskFields.taskName = req.body.taskName;
    taskFields.project = req.body.project;
    taskFields.app = req.body.app;
    taskFields.details = req.body.details;
    taskFields.from = req.body.from;
    taskFields.to = req.body.to;
    taskFields.dependencies = req.body.dependencies;

    new Task(taskFields)
      .save()
      .then(task => res.json(task))
      .catch(err =>
        res.status(404).json({ task: "Something wrong with the task creation" })
      );
  }
);

//@route   Delete api/profile/task/:task_id
//@desc    Delete the task
//@access  private
router.delete(
  "/:task_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const removeIndex = profile.task
          .map(item => item.id)
          .indexOf(req.params.task_id);

        profile.task.splice(removeIndex, 1);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err =>
        res.status(404).json({ task: "Something wrong while deleting task" })
      );
  }
);

//@route   Delete api/profile
//@desc    Delete user and profile
//@access  private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
      .then(() => {
        User.findOneAndRemove({ _id: req.user.id }).then(() =>
          res.json({ success: true })
        );
      })
      .catch(err =>
        res.status(404).json({ task: "Something wrong while deleting Profile" })
      );
  }
);

module.exports = router;
