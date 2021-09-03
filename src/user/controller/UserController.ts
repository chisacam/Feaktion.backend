import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import { IUser } from "../interfaces/Iuser" 
import { UserService } from "../services";

const signup = async(req: Request, res: Response, next: NextFunction) => {
    check("id", "id is required").not().isEmpty(),
    check("password", "password len 6").isLength({min: 8, max: 15})
    check("nickname", "nickname is required").not().isEmpty(),
    check("profile", "profile is required").not().isEmpty(),
    check("sex", "sex is required").not().isEmpty(),
    check("intro", "intro is required").not().isEmpty(),
    check('agree_info', "agree_info is required").not().isEmpty(),
    check('agree_service', "agree_service is required").not().isEmpty(),
    check('interest', "interest is required").not().isEmpty()

    const { 
        id, 
        password, 
        nickname, 
        profile, 
        sex, 
        intro, 
        agree_info,
        agree_service,
        interest
    }: IUser = req.body;
    
    try {
        const errors = validationResult(req.body)
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()})
        }

        const foundUser = await UserService.findId(id);
        if(foundUser) {
            return res.status(400).json({ errors: "해당 id가 이미 존재합니다."})
        }

        const encryptedPassword = bcrypt.hashSync(password, 10)
        const data = {
            user_id: 1,
            id: id,
            password: password,
            nickname: nickname,
            profile: profile,
            sex: sex,
            intro: intro,
            agree_info: agree_info,
            agree_service: agree_service,
            interest: interest
        }
        const user = await UserService.createUser(data)
        
    } catch(err) {
        next(err)
    }
}

export default {
    signup
}