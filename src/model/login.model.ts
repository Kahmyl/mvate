import mongoose from 'mongoose'
import { UserDocument } from './user.model'

export interface LoginDocument extends mongoose.Document{
    user: UserDocument["_id"];
    valid: boolean;
    userAgent: string;
    createdAT: Date;
    updatedAT: Date;
}

const LoginSchema = new mongoose.Schema(
    {
        user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        valid: {type: Boolean, default: true },
        userAgent: {type: String},
    },
    { timestamps: true}
);

const Login = mongoose.model<LoginDocument>("Login", LoginSchema)

export default Login;