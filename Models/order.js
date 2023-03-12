import mongoose from "mongoose";
import { Order } from ".";

const Schema = mongoose.Schema;

// order
const OrderSchema = new Schema ({
  itemID: [
    {
      itemid: {
        type: Schema.Types.ObjectId, 
        ref: 'Item', required: true  
      },
      amount: {
        type: Number,
        required: true
      }
    }
  ],
  timeOfSale: { 
    type: Date, 
    default: Date.now() 
  },
  userName: { 
    type: Schema.Types.ObjectId, 
    ref: 'User'
  },
  orderID: {
    type: Number,
    required: true,
    unique: true
  }
});

const orderSchema = OrderSchema;

export { orderSchema };