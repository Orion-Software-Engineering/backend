import {Request} from "express";

export interface UserRequest extends Request {
    userId: string;
    query: {
        tag: string
    }
}