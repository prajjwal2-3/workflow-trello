import Card from '../models/TaskModel';
import User from '../models/userModel';
import express, { Request, Response } from 'express';


export async function getUserCards(req: Request, res: Response) {
    const userId = req.query.userID;
    console.log(req.query)
    if(!userId) return res.status(400).json({ message: 'User ID is required' });
    try {
        const cards = await Card.find({ user:userId });
        res.json(cards);
    } catch (err: unknown) {
        res.status(500).json({ message: (err as Error).message });
    }
}

export async function createCard(req: Request, res: Response) {
    const userId = req.query.userID;
    console.log(req.query)
    if (!userId) return res.status(400).json({ message: 'User ID is required' });

    const card = new Card({ ...req.body, user: userId });
    try {
        const newCard = await card.save();
        await User.findByIdAndUpdate(userId, { $push: { cards: newCard._id } }); 
        res.status(201).json(newCard);
    } catch (err: unknown) {
        res.status(400).json({ message: (err as Error).message });
    }
}



export async function updateCard(req: Request, res: Response) {
    const userId = req.query.userID;
    console.log(req.query);
    
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }
    
    try {
        const card = await Card.findOne({ user: userId }); 
        
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        Object.assign(card, req.body);
        const updatedCard = await card.save();
        res.json(updatedCard);
    } catch (err: unknown) {
        console.log('cast error');
        res.status(400).json({ message: (err as Error).message });
    }
}


export async function deleteCard(req: Request, res: Response) {
    const userId = req.query.userID;
    console.log(req.query);
    
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }
    try {
        const card = await Card.findOne({ user: userId }); 
        if (!card) return res.status(404).json({ message: 'Card not found' });

        await Card.deleteOne({ _id: card._id });
        await User.findByIdAndUpdate(userId, { $pull: { cards: card._id } }); 
        res.json({ message: 'Card deleted' });
    } catch (err: unknown) {
        res.status(500).json({ message: (err as Error).message });
    }
}

