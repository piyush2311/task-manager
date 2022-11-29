const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const _ = require("lodash");
const Task = mongoose.model("Task");
const validate = require("../validation/validate");
const jwtHelper = require("../config/jwtHelper");
/**
 * @api {post} /api/login
 * @apiName login
 * @apiPermission
 * @apiGroup Task
 *
 * @apiSuccess (200) {Object} mixed `room` object
 */
module.exports.login = async (req, res, next) => {
  const body = req.body;
  const { name, apiKey } = body;
  let response = await validate.validateLogin(body);
  if (response.errorStatus) {
    return res.status(403).send({
      validation: response,
      status: false,
      message: "Validation error",
    });
  }
  if (name != config.name || apiKey != config.apiKey) {
    return res
      .status(401)
      .send("Authorization information is missing or invalid.");
  }
  if (name == config.name && apiKey == config.apiKey) {
    return res.status(200).json({
      token: {
        name: name,
        token: jwtHelper.generateJwt(apiKey),
      },
      image: "/images/profile.jpg",
    });
  }
};

/**
 * @api {post} /api/dashboard
 * @apiName dashboard
 * @apiPermission
 * @apiGroup Task
 *
 * @apiSuccess (200) {Object} mixed `room` object
 */
module.exports.dashboard = async (req, res, next) => {
  try {
    let dashboardData = await Task.aggregate([
      { $sort: { created: -1 } },
      {
        $group: {
          _id: null,
          totalTask: { $sum: 1 },
          tasksCompleted: {
            $sum: {
              $cond: ["$completed", 1, 0],
            },
          },
          data: { $push: { name: "$name", completed: "$completed" } },
        },
      },
      {
        $project: {
          _id: 0,
          totalTask: "$totalTask",
          tasksCompleted: "$tasksCompleted",
          latestTasks: {$slice: ['$data', 0, 3]}
        },
      }
    ]);
    if (dashboardData) {
      if(dashboardData && dashboardData.length) {
        return res.status(200).json(dashboardData[0]);
      } else return res.status(200).json([]);
      
    }
  } catch (e) {
    return res.send(e.message);
  }
};

/**
 * @api {get} /api/tasks
 * @apiName get task
 * @apiPermission
 * @apiGroup Task
 *
 * @apiSuccess (200) {Object} mixed `room` object
 */
module.exports.getTask = async (req, res, next) => {
  try {
    const taskData = await Task.find().select("name completed").sort({created: -1});
    if (taskData) return res.status(200).json(taskData);
  } catch (e) {
    res.send(e.message);
  }
};

/**
 * @api {post} /api/tasks
 * @apiName add task
 * @apiPermission
 * @apiGroup Task
 *
 * @apiSuccess (200) {Object} mixed `room` object
 */
module.exports.addTask = async (req, res, next) => {
  try {
    const body = req.body;

    let response = await validate.validateTask(body);

    if (response.errorStatus) {
      return res.status(403).send({
        validation: response,
        status: false,
        message: "Validation error",
      });
    }

    let saveObj = new Task(req.body);
    await saveObj.save((err, savedData) => {
      if (err) return res.status(422).send(err);
      return res.status(200).json(_.pick(savedData, ["name", "completed"]));
    });
  } catch (e) {
    return res.send(e.message);
  }
};

/**
 * @api {put} /api/tasks/{id}
 * @apiName update task
 * @apiPermission
 * @apiGroup Task
 *
 * @apiSuccess (200) {Object} mixed `room` object
 */
module.exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(403).send({
        status: false,
        updateId: updateId,
        message: "Not a valid update id",
      });
    }
    const updateObjectId = ObjectId(id);
    const body = req.body;

    let response = await validate.validateTask(body);

    if (response.errorStatus) {
      return res.status(403).send({
        validation: response,
        status: false,
        message: "Validation error",
      });
    }
    const updatedData = await Task.findOneAndUpdate(
      { _id: updateObjectId },
      {
        $set: req.body,
      },
      { new: true }
    );
    if (updatedData)
      return res.status(200).json(_.pick(updatedData, ["name", "completed"]));
  } catch (e) {
    return res.send(e.message);
  }
};

/**
 * @api {delete} /api/tasks/{id}
 * @apiName delete task
 * @apiPermission
 * @apiGroup Task
 *
 * @apiSuccess (200) {Object} mixed `room` object
 */
module.exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(403).send({
        status: false,
        updateId: updateId,
        message: "Not a valid update id",
      });
    }
    const deleteId = ObjectId(id);

    const deleted = await Task.findOneAndDelete({ _id: deleteId });
    if (deleted)
      return res.status(200).send(_.pick(deleted, ["name", "completed"]));
  } catch (e) {
    return res.send(e.message);
  }
};
