import mongoose from "mongoose";

const Schema = mongoose.Schema;

// item
const CategorySchema = new Schema ({
  category: [
    {
    type: String,
    required: true
    }
  ]
});

export default mongoose.models.Cat || mongoose.model('Cat', CategorySchema);