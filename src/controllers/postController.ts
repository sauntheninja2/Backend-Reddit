import { PrismaClient } from "@prisma/client";
import {Request , Response} from "express";

const prisma = new PrismaClient();

//Creating a new Post

export const createPost = async (req: Request , res: Response) => {
    try {
        const {title , description} = req.body;

        const post = await prisma.post.create({
            data : {
                title,
                description,
            },
        });

        res.status(201).json({post });
    }catch(error){
        console.error('Error creating a ticket' , error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

//Get all Posts

export const getAllPosts = async (req:Request , res: Response) => {
    try {
        const posts = await prisma.$queryRaw`SELECT * FROM Post`;
        res.json({  posts });
    } catch(error){
        console.log('Error getting all the posts:' , error);
        res.status(200).json({error: 'Internal Server Error'})
    }
}

export const getPost =async (req:Request , res:Response) => {
    try{

        const postId = Number(req.params.postId);
        const post = await prisma.post.findUnique({
            where: {
                postId:postId,
            },
        });

        if(!post) {
            return res.status(404).json({error: 'Post not found'});
        }

        res.json({post});
    }catch(error){
        console.log('Error getting post' , error);
        res.status(200).json({error: 'Internal Server Error'})
    }
    
};

export const updatePost =async (req:Request , res:Response) => {
    try{
    const {postId} = req.params;
    const {title,description} = req.body;

    const updatePost = await prisma.post.update({
        where: {
            postId: Number(postId),
        },
        data: {
            title,
            description,
        },
    });

    res.json({message: 'Post updated Succesfully' , title: updatePost});
}catch(error){
    console.log('Error finding the post' , error);
    res.status(200).json({error: 'Internal Server Error'})
}
    
};

export const deletePost =async (req:Request , res: Response) => {

    const {postId} = req.params;

    try {
        const deletePost = await prisma.post.delete({
            where: {
                postId: Number(postId),
            },
        });

        res.json({message: 'Post deleted succesfully' , post: deletePost});
    } catch(error) {
        console.error('Error deleting ticket',error);
        res.status(200).json({error: 'Internal Server Error'});
    }
};