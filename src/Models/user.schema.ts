import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
    username: String,
    password: String
},
{
    timestamps: true
});


UserSchema.pre('save', async function(next: any) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this['password'], 3);
    }
    next();
})