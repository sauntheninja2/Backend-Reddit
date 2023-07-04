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
exports.deleteReply = exports.createReplieToComment = exports.getAllRepliesForThatComment = void 0;
const client_1 = require("@prisma/client");
const prisma3 = new client_1.PrismaClient();
const getAllRepliesForThatComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId } = req.params;
        const replies = yield prisma3.replies.findMany({
            where: {
                commentId: Number(commentId),
            }
        });
        if (!commentId) {
            res.status(404).json({ message: 'Error the reply comment does not exist' });
        }
        res.status(201).json({ replies });
    }
    catch (error) {
        res.status(500).json({ error: 'Interal Server Error' });
    }
});
exports.getAllRepliesForThatComment = getAllRepliesForThatComment;
const createReplieToComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId } = req.params;
        const { reply } = req.body;
        const createdComment = yield prisma3.replies.create({
            data: {
                reply,
                comments: {
                    connect: {
                        commentId: Number(commentId)
                    }
                }
            }
        });
        res.status(201).json({ reply });
    }
    catch (error) {
        console.error('Error creating a reply', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.createReplieToComment = createReplieToComment;
const deleteReply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { replyId } = req.params;
        const deleteComment = yield prisma3.replies.delete({
            where: {
                replyId: Number(replyId)
            }
        });
        res.status(201).json({ message: 'Deleted Reply' });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.deleteReply = deleteReply;
