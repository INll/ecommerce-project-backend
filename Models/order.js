import mongoose from "mongoose";

const Schema = mongoose.Schema;

// order
const OrderSchema = new Schema ({
  itemID: [
    {
      type: Schema.Types.ObjectId, 
      ref: 'Item', required: true
    }
  ],
  timeOfSale: { 
    type: Date, 
    default: Date.now() 
  },
  userName: { 
    type: Schema.Types.ObjectId, 
    ref: 'User'
  }
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);