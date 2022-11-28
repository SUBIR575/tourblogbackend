import mongoose from "mongoose";

const tourSchema = mongoose.Schema({
    title: String,
    description: String,
    name: String,
    creator:String,
    category:String,
    tags:[String],
    imagefile:String,
    createdate:{
        type: Date,
        default: new Date(),
    },
    likes:{
        type: [String],
        default:[],
    }
});

const TourModal = mongoose.model("tour",tourSchema);
export default TourModal;