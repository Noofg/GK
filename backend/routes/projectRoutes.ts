import express, { RequestHandler } from "express";
import {addProject,deleteProject,listProjects,updateProject}  from "../controllers/projectController";
import upload from "../middleware/upload"; 

const router = express.Router();

router.post("/add", addProject);
router.get("/", listProjects);
router.delete("/:id", deleteProject);
router.put("/:id", updateProject);


export default router;
