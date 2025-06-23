"use client"
import { adminSideBarLinks } from '@/constants/indes'
import { cn, getInitials } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Session } from 'next-auth'

export default function Sidebar({session} : {session:Session}) {
    const pathname = usePathname()
    return (
        <div className='admin-sidebar'>
            <div>
                <div className='logo'>
                    <Image
                        src="/icons/admin/logo.svg"
                        alt="Logo"
                        height={37}
                        width={37}
                    />
                    <h1>LibrairyWise</h1>
                </div>

                <div className='mt-10 flex flex-col gap-5'>
                    {
                        adminSideBarLinks.map((link)=> {
                            const isSelected = (link.route !== "/admin" && pathname.includes(link.route) && link.route.length> 1) || link.route === pathname
                            return(
                                <Link href={link.route} key={link.route}>
                                    <div className={cn("link", isSelected && "bg-primary-admin shadow-sm")}>
                                        <div className = "size-5 relative">
                                            <Image
                                                src={link.img}
                                                alt="icon"
                                                fill
                                                className = {`${isSelected ? "brightness-0 invert" : ""} object-contain`}
                                            />
                                        </div>
                                        <p className={cn(isSelected ? "text-white" : "text-gray-500")}>
                                            {link.text}
                                        </p>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
            <div className="user">
                <Avatar>
                    <AvatarFallback className="bg-amber-100">
                        {getInitials(session?.user?.name || "IN")}
                    </AvatarFallback>
                </Avatar>

                <div className="flex flex-col max-md:hidden">
                    <p className="font-semibold text-dark-200">{session?.user?.name}</p>
                    <p className="text-xs text-light-500">{session?.user?.name}</p>
                    </div>
            </div>
        </div>
    )
}
