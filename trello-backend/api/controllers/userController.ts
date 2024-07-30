import User from '../models/userModel';
import express, { Request, Response } from 'express';
export async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err: unknown) {
        res.status(500).json({ message: (err as Error).message });
    }
}
export async function getUserByEmailId(req: Request, res: Response) {
    try {
        const { email } = req.query;
       
        const user = await User.findOne({ email });
        
        // if (!user) return res.json({ message: `User with email ${email} not found`,user:null });

        res.json(user);
    } catch (err: unknown) {
        res.json({ message: `User with email not found or their is some error`,user:null });
    }
}
export async function createUser(req: Request, res: Response) {
    const user = new User(req.body);
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err: unknown) {
        res.status(400).json({ message: (err as Error).message });
    }
}

export async function updateUser(req: Request, res: Response) {
    console.log(req.query);
    try {
        const user = await User.findById(req.query.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        Object.assign(user, req.body);
        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (err: unknown) {
        res.status(400).json({ message: (err as Error).message });
    }
}

export async function deleteUser(req: Request, res: Response) {
    console.log(req.query);
    try {
        const user = await User.findById(req.query.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await User.deleteOne({ _id: req.query.id });
        res.json({ message: 'User deleted' });
    } catch (err: unknown) {
        res.status(500).json({ message: (err as Error).message });
    }
}
