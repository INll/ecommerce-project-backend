import mongoose from "mongoose";

const Schema = mongoose.Schema;

// item
const ItemSchema = new Schema ({
  itemType: { 
    type: String, 
    required: true, 
    default: undefined 
  },
  price: { 
    type: Number, 
    min: 0, 
    required: true 
  },
  images: {
    type: Object
  },
  title: {
    type: String,
    required: true
  },
  description: { 
    type: String, 
    required: true
  },
  stock: { 
    type: Number 
  },
});

ItemSchema.virtual('url').get(function () {
  return `/item/${this._id}`;
})

const Item = mongoose.model('Item', ItemSchema);

export { ItemSchema, Item };