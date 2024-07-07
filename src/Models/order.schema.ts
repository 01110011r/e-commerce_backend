import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products'
            },
            quantity: Number
        }
    ],
    totalPrice: Number
},
{
    timestamps: true
});