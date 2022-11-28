import express from "express";
const router = express.Router();
import {CreateTour,getTours,getSingleTours,getToursById,deleteTour,UpdateTour, getToursBySearch, getToursByTags, getallTags, getToursByCategory, getReletedTours, likeTour} from '../controllers/tour.js'
import auth from '../middleware/auth.js'
router.get("/search", getToursBySearch);
router.get("/tag/:tag", getToursByTags);
router.post("/reletedtours",getReletedTours);
router.get("/category/:category", getToursByCategory);
router.get('/alltags',getallTags);
router.post("/",auth,CreateTour);
router.get("/",getTours);
router.get("/:id",getSingleTours);
router.get("/usertour/:id",auth,getToursById);
router.delete('/:id', auth,deleteTour);
router.patch("/:id",auth,UpdateTour);
router.patch("/like/:id",auth,likeTour)


export default router;