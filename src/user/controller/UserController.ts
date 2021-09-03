import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { IUser } from "../interfaces/Iuser" 
import { UserService } from "../services";

// 회원가입
const signup = async(req: Request, res: Response, next: NextFunction) => {
    console.log(11111)
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
        const foundUser = await UserService.findId(id);
        if(foundUser) {
            return res.status(400).json({ errors: "해당 id가 이미 존재합니다."})
        }

        const encryptedPassword = bcrypt.hashSync(password, 10)
        const data = {
            user_id: 7,
            id: id,
            password: encryptedPassword,
            nickname: nickname,
            profile: profile,
            sex: sex,
            intro: intro,
            agree_info: agree_info,
            agree_service: agree_service,
            interest: interest
        }
        const user = await UserService.createUser(data)
        res.status(201).send({status: "success"})
    } catch(err) {
        console.log(err)
        next(err)
    }
}

// 로그인
const signin = async (req: Request, res: Response, next: NextFunction) => {
    const { id, password } = req.body;
    try {
        const check_user = await UserService.findId(id)
        console.log(check_user?.password)
        if (! check_user) {
            res.status(401).send({
                errorMessage: "아이디 또는 패스워드가 잘못됐습니다."
            })
        }

        const encoded_password = check_user?.password
        const same = bcrypt.compareSync(password, encoded_password)

        if (!same) {
            res.status(401).send({
                errorMessage: "아이디 또는 패스워드가 잘못됐습니다."
            })
        }

    } catch(err) {
        next(err)
    }
}

export default {
    signup,
    signin
}

