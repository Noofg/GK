import mongoose from "mongoose";
const ProjectSchema = new mongoose.Schema({
    name : {type : String, required: true},
    type:{type:String,required:true}, 
    price :{type:Number,required:true},
    image :{type:String,required:true},
   
});
const Project = mongoose.model<Document>("Project",ProjectSchema,"projects")
export default Project;