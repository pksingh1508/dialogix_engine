import SideBar from '@/components/SideBar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from '@/components/SessionProvider'
import { getServerSession } from 'next-auth/next'
// import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
// import { authOptions } from './api/auth/[...nextAuth]'
import Login from '@/components/Login'
import ClientProvider from '@/components/ClientProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dialogix Engine',
  description: 'This is an AI for generating the answer of the given prompt.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions);
  // console.log(session);

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>

          {
            !session ? (
              <Login />
            ) : (
              <div className='flex'>

                {/* Sidebar */}
                <div className='bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]'>
                  <SideBar />
                </div>

                {/* clientProvider - Notification */}
                <ClientProvider />
                <div className='bg-[#9fd8fb] flex-1'>{children}</div>
              </div>
            )
          }

        </SessionProvider>
      </body>
    </html>
  )
}
