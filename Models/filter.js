import mongoose from "mongoose";

const Schema = mongoose.Schema;

// item
const FilterSchema = new Schema ({
  filter: [
    {
    type: String,
    required: true
    }
  ]
});

export default mongoose.models.Filter || mongoose.model('Filter', FilterSchema);