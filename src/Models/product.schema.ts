import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    name: String, 
    description: String, 
    quantity:Number,
    img: String,
    measurement:['kg', 'dona'],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
},
{
    timestamps: true
});