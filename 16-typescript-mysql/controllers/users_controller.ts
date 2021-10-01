import { Request,Response } from "express"
import User from "../models/user"

export const getUsers =async (req: Request, res: Response) => {
    const users=await User.findAll()
    res.json({
       users
    })
}

export const getUser =async (req: Request, res: Response) => {
    const {id} = req.params;
    const user=await User.findByPk(id)
    if(user){
        res.json({
            user
        })
    }else{
        res.status(404).json({
            msg:`User id ${id}, not found`
        })
    }
}

export const postUser =async (req: Request, res: Response) => {
    const {body} = req

    try {
        const existEmail = await User.findOne({
            where:{
                email:body.email
            }
        });
        if(existEmail){
            return res.status(400).json({
                msg:"Email already exists"
            })
        }

        const user=User.build(body)
        await user.save()
        return res.json(user);
        
    } catch (error:any) {
        console.log(error);
        
        res.status(500).json({
            msg:error.message
        })
    }
}

export const putUser =async (req: Request, res: Response) => {
    const {id} = req.params
    const {body} = req

    try {
        const user=await User.findByPk(id)
        if(!user){
            return res.status(404).json({
                msg:`User id ${id}, not found`
            })
        }
        await user.update(body);

        res.json({
            msg:"User updated"
        })
    } catch (error:any) {
        console.log(error);
        
        res.status(500).json({
            msg:error.message
        })
    }
}

export const deleteUser =async (req: Request, res: Response) => {
    const {id} = req.params
    const user=await User.findByPk(id)
    if(!user){
        return res.status(404).json({
            msg:`User id ${id}, not found`
        })
    }
    //Fisic delete
    //await user.destroy()

    //Soft delete
    await user.update({ state:false });

    res.json({user});
}