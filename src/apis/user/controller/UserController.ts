import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { userSignup } from "../interfaces/user" 
import { UserService } from "../services";

// 회원가입
const signup = async (req: Request, res: Response, next: NextFunction) => {
    const { 
        id, 
        password, 
        nickname, 
        sex,  
        agree_info,
        agree_service,
    } = req.body;
    
    try {
        const foundUser = await UserService.findId(id);
        if(foundUser) {
            return res.status(400).json({ errors: "해당 id가 이미 존재합니다."})
        }

        const encryptedPassword = await bcrypt.hash(password, 10)
        const data: userSignup = {
            id: id,
            password: encryptedPassword,
            nickname: nickname,
            sex: sex,
            agree_info: agree_info === 'true',
            agree_service: agree_service === 'true',
        }
        console.log(data)
        await UserService.createUser(data)
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
        console.log(check_user?.password, check_user?.nickname)
        if (! check_user) {
            res.status(401).send({
                errorMessage: "아이디 또는 패스워드가 잘못됐습니다."
            })
        }

        const encoded_password = check_user?.password
        const same = await bcrypt.compare(password, encoded_password)

        if (!same) {
            res.status(401).send({
                errorMessage: "아이디 또는 패스워드가 잘못됐습니다."
            })
        }

        const token = jwt.sign({
            id,
            nickname: check_user?.nickname
        }, process.env.JWT_SECRET, {
            expiresIn: '1m', // 1분
            issuer: 'justin',
        });

        res.status(401).send({
            status: "success",
            token
        })

    } catch(err) {
        next(err)
    }
}

export default {
    signup,
    signin
}

