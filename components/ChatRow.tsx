import { ChatBubbleLeftIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase';

type Props = {
    id: string;
}

const ChatRow = ({ id }: Props) => {

    const pathname = usePathname();
    const router = useRouter();
    const { data: session } = useSession();
    const [active, setActive] = useState(false);

    const [messages] = useCollection(query(
        collection(db, "users", session?.user?.email!, 'chats', id, 'messages'),
        orderBy('createdAt', 'asc')
    ))

    useEffect(() => {
        if (!pathname) return;
        setActive(pathname.includes(id));
    }, [pathname])

    const removeChat = async () => {
        await deleteDoc(doc(db, "users", session?.user?.email!, 'chats', id));
        router.replace("/");
    }

    return (
        <Link href={`/chat/${id}`} className={`chatRow justify-center ${active && 'bg-gray-700/50'}`}>
            <ChatBubbleLeftIcon className='h-5 w-5' />
            <p className='flex-1 hidden md:inline-flex truncare'>
                {
                    messages?.docs[messages?.docs.length - 1]?.data().text.slice(0, 30) || "New Chat"
                }
            </p>
            <TrashIcon onClick={removeChat} className='h-5 w-5 text-gray-700 hover:text-red-700 transition-all duration-150' />
        </Link>
    )
}

export default ChatRow;