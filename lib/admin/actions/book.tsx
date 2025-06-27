"use server"
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";

export const createBook = async (params : BookParams) => {
    try {
        const newBook = await db
            .insert(books)
            .values ({
                ...params, 
                availableCopies: params.totalCopies, // Assuming available copies start equal to total copies
            })
            .returning();

        return {
            success : true , 
            data : JSON.parse(JSON.stringify(newBook[0])),
        }
    } catch (error) {
        console.error("Error creating book:", error);

        return{
            success: false,
            message: "An error occurred while creating the book",
        }
    }
}