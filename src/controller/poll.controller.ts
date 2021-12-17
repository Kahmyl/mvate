import { Request, Response } from 'express';
import { createPoll, getPolls, findPoll } from '../service/poll.service';
import log from '../log';
import { PollDocument} from '../model/poll.model';
import { UserDocument } from '../model/user.model';


export async function PollsHandler(req: Request, res: Response) {

    const Polls = await getPolls()

    return res.send(Polls)
}

export async function createPollHandler(req: Request, res: Response) {
    try{
        const userId = res.locals.user._id
        const {title, description, options, voted, expires}: PollDocument = req.body;
        const poll = await createPoll({
            user: userId,
            title,
            description,
            options: options.map(option => {
                option.option, option.votes:0
            }),
            voted,
            expires,
        });
        return res.send(poll);
    }catch(e: any){
        log.error(e);
        return res.status(400).send(e.message)
    }
}

export async function voteHandler(req: Request, res: Response) {
    try {
        const userId = res.locals.user._id
        const  _id : UserDocument["_id"] = req.body.id
        const {answer}: UserDocument["_id"] = req.body
        if (answer){
            const poll = await findPoll({_id})
    
            if (!poll){
                res.send("Poll no found")
                throw new Error("No poll found")
            }
            
            const vote =  poll.options.map(option =>{
                if(option._id == answer){
                    return{
                        option: option.option,
                        _id: option._id,
                        votes: option.votes + 1
                    };
                } else{
                    return option;
                }
            });
    
            if (poll.voted.filter(user => user.toString() === userId).length <= 0){
                poll.voted.push(userId);
                poll.options = vote;
                await poll.save()

                res.status(202).json(poll);
            }else {
                res.send('User already voted')
                throw new Error('User already voted')
            }
        }else{
            res.send('Provide an answer')
            throw new Error('Provide an answer')
        }
    
    }catch(e: any){
         console.log(e.message)
    }
}
