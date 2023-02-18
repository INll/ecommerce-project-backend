import mongoose from "mongoose";

const Schema = mongoose.Schema;

// user
const UserSchema = new Schema ({
  userName: { 
    type: String, 
    required: true 
  },
  passWord: { 
    type: String, 
    required: true 
  },
  clearance: { 
    type: Number, 
    min: 0, 
    max: 2 
  },
  favItems: { 
    type: [Number],  
    default: undefined 
  },
  creationTime:  { 
    type: Date, 
    default: Date.now 
  },
  orders: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Order'
  }]
});

const User = mongoose.model('User', UserSchema);
const userSchema = UserSchema;

export { User, userSchema };