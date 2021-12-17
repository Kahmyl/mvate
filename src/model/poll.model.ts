import mongoose from 'mongoose'
import { UserDocument } from './user.model'

export interface OptionsDocument extends mongoose.Document {
    option: string;
    votes: number;
}

export interface PollDocument extends mongoose.Document {
    user: UserDocument["_id"]; 
    title: string;
    description: number;
    options: OptionsDocument[];
    voted: [UserDocument["_id"]]
    expires: Date;
    createdAT?: Date;
    updatedAT?: Date;
}

const Schema = mongoose.Schema

const OptionsSchema = new Schema({
    option: String,
    votes: { type: Number, default: 0}
})

const PollSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref:"User"},
    title: {type: String, required: true},
    description: {type: String},
    options: [OptionsSchema],
    voted:[{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    expires: {type: Date, required: true}
}, {timestamps: true})

const Poll = mongoose.model<PollDocument>("Poll", PollSchema)

export default Poll
