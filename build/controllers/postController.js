"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getPost = exports.getAllPosts = exports.createPost = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
//Creating a new Post
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const post = yield prisma.post.create({
            data: {
                title,
                description,
            },
        });
        res.status(201).json({ post });
    }
    catch (error) {
        console.error('Error creating a ticket', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.createPost = createPost;
//Get all Posts
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield prisma.$queryRaw `SELECT * FROM Post`;
        res.json({ posts });
    }
    catch (error) {
        console.log('Error getting all the posts:', error);
        res.status(200).json({ error: 'Internal Server Error' });
    }
});
exports.getAllPosts = getAllPosts;
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = Number(req.params.postId);
        const post = yield prisma.post.findUnique({
            where: {
                postId: postId,
            },
        });
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json({ post });
    }
    catch (error) {
        console.log('Error getting post', error);
        res.status(200).json({ error: 'Internal Server Error' });
    }
});
exports.getPost = getPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const { title, description } = req.body;
        const updatePost = yield prisma.post.update({
            where: {
                postId: Number(postId),
            },
            data: {
                title,
                description,
            },
        });
        res.json({ message: 'Post updated Succesfully', title: updatePost });
    }
    catch (error) {
        console.log('Error finding the post', error);
        res.status(200).json({ error: 'Internal Server Error' });
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    try {
        const deletePost = yield prisma.post.delete({
            where: {
                postId: Number(postId),
            },
        });
        res.json({ message: 'Post deleted succesfully', post: deletePost });
    }
    catch (error) {
        console.error('Error deleting ticket', error);
        res.status(200).json({ error: 'Internal Server Error' });
    }
});
exports.deletePost = deletePost;
