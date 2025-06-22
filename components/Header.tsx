'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn, getInitials } from '@/lib/utils'
import Image from 'next/image'
import { Session } from 'next-auth'
import { Avatar, AvatarFallback } from './ui/avatar'

export default function Header({session}: {session:Session}) {
  const pathname = usePathname()

  return (
    <header className='my-10 flex justify-between gap-5'>
      <Link href='/' >
        <Image src="/icons/logo.svg" alt='logo' height={40} width={40}/>
      </Link>

      <ul className='flex flex-row gap-8 items-center'>
        <li>
          <Link
            href="/library"
            className={cn(
              "text-base capitalize cursor-pointer",
              pathname === '/library' ? "text-light-200" : "text-light-100"
            )}
          >
            Library
          </Link>
        </li>
        <li>
          <Link href="/my-profile">
            <Avatar>
              <AvatarFallback className='bg-amber-100'>
                {getInitials(session?.user?.name || "IN")}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  )
}
