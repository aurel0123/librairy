import React, { ReactNode } from 'react'
import "@/style/admin.css"
import Sidebar from '@/components/admin/Sidebar'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { users } from '@/database/schema'
import { db } from '@/database/drizzle'
import { eq } from 'drizzle-orm'
import Header from '@/components/admin/Header'


const Layout = async ({children} : {children : ReactNode}) => {
  const session = await auth()
  if(!session?.user?.id) redirect("/sign-in")

  const isAdmin = await db
    .select({isAdmin: users.role})
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1)
    .then((res => res[0].isAdmin === "ADMIN"))
  
  if(!isAdmin) redirect("/")
  return (
    <main className='flex min-h-screen w-full flex-row'>
        <Sidebar session={session}/>
        <div className='admin-container'>
          <Header session={session}/>
          {children}
        </div>
    </main>
  )
}

export default Layout