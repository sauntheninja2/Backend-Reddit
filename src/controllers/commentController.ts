import { PrismaClient } from "@prisma/client";
import {Request , Response} from "express";


const prisma2 = new PrismaClient();

export const getAllComments = async (req:Request , res: Response) => {

    try {
        const {postId} = req.params;

        const comments = await prisma2.comments.findMany({
            where: {
                postId: Number(postId),
            }
        });

        if(!postId){
            res.status(404).json({message: 'Error the post does not exist'})
        }

        res.status(201).json({comments})

    } catch(error){
        res.status(500).json({error: 'Internal Server Error'})

    }
    
}

export const createComment = async (req: Request , res: Response) => {
    try {
        const {postId} = req.params;
        const {comment} = req.body;

        const createdComment = await prisma2.comments.create({
            data: {
                comment,
                post: {
                    connect: {
                        postId  : Number(postId)
                    }
                }
            }
        })

        res.status(201).json({comment });
    }catch(error){
        console.error('Error creating a comment' , error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

export const deleteComment = async (req:Request , res: Response) => {
    try{
    const {commentId} = req.params

    const deleteComment = await prisma2.comments.delete({
        where: {
            commentId: Number(commentId),
        }
    });
    res.json({message: 'Comment deleted Succesfully'})
    }catch(error){
        res.status(500).json({error: "Internal Server Error"});
    }
    
}

