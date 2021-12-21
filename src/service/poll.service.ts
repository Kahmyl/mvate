import { DocumentDefinition, QueryOptions, FilterQuery, UpdateQuery } from "mongoose";
import Poll, { PollDocument } from "../model/poll.model";
import { UserDocument } from "../model/user.model";

export interface OptionsPayload{
    option: string;
    votes: number;
}

export interface PollPayload{
    user: UserDocument["_id"]; 
    title: string;
    description: number;
    options: OptionsPayload[];
    expires: Date;
}

export async function getPolls(){
    return Poll.find({}).populate('user', ['name', 'id']);
}

export async function findPoll(input: UserDocument["_id"]){
    return Poll.findById(input);
}

export async function createPoll(input: PollPayload){
    return Poll.create(input);
}

export async function updatePoll(
    query: FilterQuery<PollDocument> , 
    update: UpdateQuery<PollDocument> , 
    options: QueryOptions 
){
    return Poll.findOneAndUpdate(query, update, options);
}

export async function deletePoll(query: FilterQuery<PollDocument>){
    return Poll.deleteOne(query);
}


