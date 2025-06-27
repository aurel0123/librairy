"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {borrowBook} from "@/lib/actions/book"
interface Props {
    userId : string , 
    bookId : string , 
    borrowingEligility : {
        isEligible : boolean , 
        message : string
    }
}
const BorrowBook = ({
    userId , 
    bookId, 
    borrowingEligility : { isEligible, message }
} : Props) => {
    const router = useRouter()
    const [borrowing , setBorrowing] = useState(false)

    const handlehandleBorrowBook = async ()=> {
        if(!isEligible){
            toast.error("Error" , {
                description :message
            })
        }

        try {
            const result = await borrowBook ({userId , bookId})
            if(result.success){
                toast.success("Succes" , {
                    description :  "Livre emprunté avec succès"
                })
                router.push("/")
            } else{
                toast.error ("Error" , {
                    description : result.error
                })
            }

        } catch (error) {
            console.log(error)
            toast.error("Error" , 
                {
                    description : "Une erreur s'est produite lors de l'emprunt du livre"
                }
            )
        } finally {
            setBorrowing(false)
        }
    }
    return (
        <Button className="book-overview_btn" onClick={handlehandleBorrowBook} disabled={borrowing}>
            <Image src="/icons/book.svg" alt="Book" height={20} width={20} />
            <p className='font-bebas-neue text-dark-100 text-xl'>
                {borrowing ? "Emprunter..." : "Emprunter un livre"}
            </p>
        </Button>
    )
}

export default BorrowBook