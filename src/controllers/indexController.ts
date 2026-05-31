import express from "express";
import { IndexService } from "../services/indexService.js";
class IndexController {
  static healthCheck(
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
        const response = IndexService.healthCheck();
    res.status(200).json({
      success: true,
      data: response,
    });
    } catch (error) {
        next(error)
    }
    
  }
}

export default IndexController;
