import { Request, Response } from 'express';

export interface RequestBody<T> extends Request {
    body: T;
}

export interface ResponseBody<T> extends Response {
    body: T;
}

export interface IToken {
    id: string;
    email: string;
    iat: number;
    exp: number;
}
