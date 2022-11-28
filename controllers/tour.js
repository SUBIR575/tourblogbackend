import express from "express";
import TourModal from "../models/tour.js";
import moment from "moment";
import mongoose from "mongoose";

export const CreateTour = async (req, res) => {
  const tour = req.body;
  const newTour = new TourModal({
    ...tour,
    creator: req.userId,
    createdate: moment().format(),
  });
  try {
    await newTour.save();
    res.status(201).json(newTour);
  } catch (err) {
    res.status(404).json({ message: "Something Will be Wrong" });
  }
};

export const getTours = async (req, res) => {
  try {
    const tours = await TourModal.find();
    res.status(201).json(tours);
  } catch (err) {
    res.status(404).json({ message: "Something Will be Wrong" });
  }
};
export const getSingleTours = async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await TourModal.findById(id);
    res.status(201).json(tour);
  } catch (err) {
    res.status(404).json({ message: "Something Will be Wrong" });
  }
};
export const getToursById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Something Will be Wrong" });
  }
  const UserTour = await TourModal.find({ creator: id });

  return res.status(201).json(UserTour);
};
export const deleteTour = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Something Will be Wrong" });
    }
    await TourModal.findByIdAndRemove(id);
    return res.status(201).json(`${id} will Removed Successfully`);
  } catch (error) {
    res.status(404).json({ message: "Something Will be Wrong" });
  }
};
export const UpdateTour = async (req, res) => {
  const { id } = req.params;
  const {title,description,imagefile,tags,creator,category} = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Something Will be Wrong" });
    }
    const UpdatedTour = {
      creator,
      title,
      description,
      category,
      tags,
      imagefile,
      _id:id
    }
    await TourModal.findByIdAndUpdate(id,UpdatedTour,{new:true});
    return res.status(201).json({UpdatedTour});
  } catch (error) {
    res.status(404).json({ message: "Something Will be Wrong" });
  }
};

export const getToursBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  console.log("=====>",searchQuery);
  try {
    const title = new RegExp(searchQuery,"i");
    console.log("title",title);
    const tours = await TourModal.find({title});
    res.json(tours)
    }
   catch (error) {
    res.status(404).json({ message: "Something Will be Wrong" });
  }
};
export const getToursByTags = async (req, res) => {
  const { tag } = req.params;
  try {
    const tours = await TourModal.find({tags:{$in:tag}})
    res.json(tours)
    }
   catch (error) {
    res.status(404).json({ message: "Something Will be Wrong" });
  }
};
export const getallTags = async (req, res) => {
  try {
    const tours = await TourModal.distinct("tags")
    res.json(tours)
    }
   catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something Will be Wrong" });
  }
};
export const getToursByCategory = async (req, res) => {
  const { category } = req.params;
 console.log(category);
  try {
    const tours = await TourModal.find({category:category})
    res.json(tours)
    }
   catch (error) {
    res.status(404).json({ message: "Something Will be Wrong" });
  }
};
export const getReletedTours = async (req, res) => {
  const tags  = req.body;
  console.log("tags",tags)
  try {
    const tours = await TourModal.find({tags:{$in:tags}})
    res.json(tours)
    }
   catch (error) {
    res.status(404).json({ message: "Something Will be Wrong" });
  }
};
export const likeTour = async (req, res) => {
  const {id} = req.params;
  console.log("req==========>",req.userId);
  try{
  if(!req.userId){
    return res.json({ message: "user not logged in" });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Something Will be Wrong" });
  }
  const tour = await TourModal.findById(id);
  const index = tour.likes.findIndex((id) =>id === String(req.userId));
  if(index === -1){
    tour.likes.push(req.userId);
  }else{
    tour.likes = tour.likes.filter((id)=> id !== String(req.userId))
  }
  const updatedTour = await TourModal.findByIdAndUpdate(id,tour,{new : true});
  res.status(200).json(updatedTour);
  } catch (err){
    res.status(404).json({ message: "Something Will be Wrong" });
  }
}