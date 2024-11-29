import { Router } from "express";
import EventosController from "../controller/EventosController";

const router = Router();

router.post("/eventos", EventosController.create);

router.get("/eventos", EventosController.find);

router.get("/eventos/:id", EventosController.findById);

router.put("/eventos/:id", EventosController.update);

router.delete("/eventos/:id", EventosController.delete);

export default router;