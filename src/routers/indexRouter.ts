import { Router } from "express";
import IndexController from "../controllers/indexController.js";

const indexRouter= Router()

indexRouter.get('/', IndexController.healthCheck)
export default indexRouter