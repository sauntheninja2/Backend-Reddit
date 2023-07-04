import { PrismaClient } from "@prisma/client";
import {Request , Response} from "express";

const prisma3 = new PrismaClient();

export const getAllRepliesForThatComment =async (req: Request , res: Response) => {
    try {
    const {commentId} = req.params;

    const replies = await prisma3.replies.findMany({
        where: {
            commentId: Number(commentId),
        }
    });

    if(!commentId){
        res.status(404).json({message: 'Error the reply comment does not exist'})
    }

    res.status(201).json({replies})
}catch(error){
    res.status(500).json({error: 'Interal Server Error'})
}
}

export const createReplieToComment =async (req:Request , res: Response) => {

    try {
        const {commentId} = req.params;
        const {reply} = req.body;

        const createdComment = await prisma3.replies.create({
            data: {
                reply,
                comments: {
                    connect: {
                        commentId  : Number(commentId)
                    }
                }
            }
        });
        
        res.status(201).json({reply})
        
    }catch(error){
        console.error('Error creating a reply' , error);
        res.status(500).json({error: 'Internal Server Error'});
    
}
}

export const deleteReply =async (req:Request , res: Response) => {
    try {
    const {replyId} = req.params;

    const deleteComment = await prisma3.replies.delete({
        where: {
            replyId: Number(replyId)
        }
    });
    res.status(201).json({message: 'Deleted Reply'});
}catch(error){
    res.status(500).json({error: 'Internal Server Error'});
}
    
}


