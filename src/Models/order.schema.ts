import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    products: {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products'
        }
    }
})