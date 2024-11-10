import { time } from "console";
import mongoose from "mongoose";
import { type } from "os";
const { Schema } = mongoose;

const calenderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  type: { type: String, required: true },
  time:{type:String,required:true},
  createdAt: { type: Date, default: Date.now },
});

const Calender=mongoose.model('Calender',calenderSchema);

export default Calender;
