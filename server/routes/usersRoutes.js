const router = require("express").Router();

const userController = require("../controllers/usersController");

router.get("/:userId", userController.getUserById);

router.put("/:userId", userController.putUserById);

router.patch("/:userId", userController.patchUserById);

router.delete("/:userId", userController.deleteUserById);

/**
 *  get all users
 * - filter
 * - sort
 * - pagination
 * - select properties
 * @route /api/users
 * @method GET
 * @visibility private
 */

router.get("/", userController.getUsers);

router.post("/", userController.postUser);

module.exports = router;
