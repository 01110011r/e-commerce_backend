import * as mongoose from 'mongoose';
import { UserSchema } from './user.schema';


export const ProductSchema = new mongoose.Schema({
    name: String, 
    description: String, 
    quantity:Number,
    measurement:['kg', 'dona'],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
});