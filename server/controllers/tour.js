import TourModel from "../models/tour.js";
import mongoose from "mongoose";

export const createTour = async (req, res) => {
  const tour = req.body;
  console.log("ctler" + req.userId);
  const newTour = new TourModel({
    ...tour,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newTour.save();
    res.status(201).json(newTour);
  } catch (error) {
    res.status(404).json({ message: "something went wrong1" });
  }
};

export const getTours = async (req, res) => {
  try {
    const tours = await TourModel.find();
    res.status(201).json(tours);
  } catch (error) {
    res.status(404).json({ message: "something went wrong11" });
  }
};

export const tourDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await TourModel.findById(id);
    res.status(201).json(tour);
  } catch (error) {
    res.status(404).json({ message: "something went wrong111" });
  }
};
export const getUserTour = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {       
      return res.status(404).json("User doesnt exists");
    }
    const userTours = await TourModel.find({ creator: id });
    res.status(201).json(userTours);
  } catch (error) {
    res.status(404).json({ message: "something went wrong1111" });
  }
};

export const deleteTour = async (req, res) => {
  const { id } = req.params;
  try {
      if (!mongoose.Types.ObjectId.isValid(id)) {      
      return res.status(404).json(`No tour exist withid ${id} `);
    }
    await TourModel.findByIdAndRemove(id);
    res.status(201).json({ message: "Tour Deleted Successfully" });
  } catch (error) {
    res.status(404).json({ message: "something went wrong5" });
  }
};

export const updateTour = async (req, res) => {
  const { id } = req.params;
  const { title, description, creator, imageFile, tags } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json(`No tour exist withid ${id} `);
    }
    const updatedTour = {
      creator,
      title,
      description,
      imageFile,
      tags,
      _id: id,
    };
    await TourModel.findByIdAndUpdate(id, updatedTour, { new: true });
    res.status(201).json(updatedTour);
  } catch (error) {
    res.status(404).json({ message: "something went wrong6" });
  }

};

export const getToursBySearch=async(req,res)=>{

  const {searchString}=req.query;
  console.log("serachstring"+searchString)
  try {
    const title=new RegExp(searchString,"i");
    const tours=await TourModel.find({title});
    res.json(tours);
  } catch (error) {
    res.status(404).json({ message: "something went wrong7" });
  }
}

export const getToursBytag=async(req,res)=>{

  const {tag}=req.params;
  try {
    const tours=await TourModel.find({tags:{$in: tag}});
    res.json(tours);
  } catch (error) {
    res.status(404).json({ message: "something went wrong8" });
  }
}