"use client";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { toast } from "react-hot-toast";
import ModelSelection from "./ModelSelection";
import useSWR from 'swr';

type Props = {
    chatId: string;
};
const ChatInput = ({ chatId }: Props) => {
    const [prompt, setPrompt] = useState("");
    const { data: session } = useSession();

    // useSWR to get model
    const { data: model } = useSWR('model', {
        fallbackData: 'text-davinci-003'
    });
    // const model = "text-davinci-003";

    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!prompt) return;

        const input = prompt.trim();
        setPrompt("");

        const message: Message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar:
                    session?.user?.image! ||
                    `https://ui-avatars.com/api/?name=${session?.user?.name}`,
            },
        };

        // add the message to the firebase storage
        await addDoc(
            collection(
                db,
                "users",
                session?.user?.email!,
                "chats",
                chatId,
                "messages"
            ),
            message
        );

        // toast notification to say loading
        const notification = toast.loading("Dialogix Engine is thinking...");

        await fetch("/api/askQuestion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: input,
                chatId,
                model,
                session,
            }),
        }).then(() => {
            // toast notification to say successully
            toast.success("Dialogix Engine has responded", {
                id: notification,
            });
        });
    };

    return (
        <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
            <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
                <input
                    type="text"
                    placeholder="Send a Message"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={!session}
                    className="bg-transparent text-2xl focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
                />
                <button
                    disabled={!prompt || !session}
                    className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />{" "}
                </button>
            </form>

            <div className="md:hidden sm:hidden">
                <ModelSelection />
            </div>
        </div>
    );
};

export default ChatInput;
