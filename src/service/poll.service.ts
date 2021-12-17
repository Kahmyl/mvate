import { DocumentDefinition, QueryOptions, FilterQuery, UpdateQuery } from "mongoose";
import Poll, { PollDocument } from "../model/poll.model";
import { UserDocument } from "../model/user.model";

export async function getPolls(){
    return Poll.find({}).populate('user', ['name', 'id']);
}

export async function findPoll(input: DocumentDefinition<UserDocument["_id"]>){
    return Poll.findById(input);
}

export async function createPoll(
    input: DocumentDefinition<Omit<PollDocument, "createdAt" | "updatedAt">>
){
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
