import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    title: String, 
    description: String,
    price: Number, 
    quantity:Number,
    img: String,
    measurement: ['countable', 'kg', 'm'],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
},
{
    timestamps: true
});