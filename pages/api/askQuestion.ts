import query from '@/lib/queryApi';
import type { NextApiRequest, NextApiResponse } from 'next'
import admin from 'firebase-admin'
import { adminDb } from '@/firebaseAdmin';
// import logo1 from '../../public/logo1.jpg'

type Data = {
    answer: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { prompt, chatId, model, session } = req.body;
    if (!prompt) {
        res.status(400).json({ answer: "Please provide a prompt!" });
        return;
    }
    if (!chatId) {
        res.status(400).json({ answer: "Please provide a valid chat ID." });
        return;
    }

    // chat gpt query
    const response = await query(prompt, chatId, model);

    const message: Message = {
        text: response || "Dialogix Engine was unable to find the answer fot that!",
        createdAt: admin.firestore.Timestamp.now(),
        user: {
            _id: "Dialogix Engine",
            name: "Dialogix Engine",
            avatar: "https://links.papareact.com/89k"
        }
    }

    await adminDb.collection("users").doc(session?.user?.email).collection('chats').doc(chatId).collection('messages').add(message);

    res.status(200).json({ answer: message.text });
}