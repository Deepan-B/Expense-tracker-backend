import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../Controllers/userController.js";
import { verifyAdmin } from "../auth/verifyAdmin.js"
const router = express.Router();

router.get("/users", verifyAdmin, getAllUsers);
router.get("/users/:id", verifyAdmin, getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
