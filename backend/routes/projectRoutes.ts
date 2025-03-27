import express, { RequestHandler } from "express";
import {addProject,deleteProject,listProjects,updateProject, searchProject}  from "../controllers/projectController";


const router = express.Router();

router.post("/add", addProject);
router.get("/", listProjects);
router.delete("/:id", deleteProject);
router.put("/:id", updateProject);
router.get("/searchProject",searchProject);


export default router;
