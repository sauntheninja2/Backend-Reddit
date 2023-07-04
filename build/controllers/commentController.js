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
exports.deleteComment = exports.createComment = exports.getAllComments = void 0;
const client_1 = require("@prisma/client");
const prisma2 = new client_1.PrismaClient();
const getAllComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const comments = yield prisma2.comments.findMany({
            where: {
                postId: Number(postId),
            }
        });
        if (!postId) {
            res.status(404).json({ message: 'Error the post does not exist' });
        }
        res.status(201).json({ comments });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getAllComments = getAllComments;
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const { comment } = req.body;
        const createdComment = yield prisma2.comments.create({
            data: {
                comment,
                post: {
                    connect: {
                        postId: Number(postId)
                    }
                }
            }
        });
        res.status(201).json({ comment });
    }
    catch (error) {
        console.error('Error creating a comment', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.createComment = createComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId } = req.params;
        const deleteComment = yield prisma2.comments.delete({
            where: {
                commentId: Number(commentId),
            }
        });
        res.json({ message: 'Comment deleted Succesfully' });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.deleteComment = deleteComment;
