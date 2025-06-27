import ImageKit from "imagekit";
import dummybooks from "../dummybooks.json";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";
import { books } from "./schema";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!, 
})
const uploadToImageKit = async (url : string, fileName : string, folder : string) => {
    try {
        const response = await imagekit.upload({
            file: url, // The file to upload
            fileName, // The name of the file
            folder, // The folder where the file will be uploaded
        })

        return response.filePath ;
    } catch (error) {
        console.error("Error uploading to ImageKit:", error);
    }
}
const seed = async () => {
    console.log("Seeding database..."); 

    try{
        for(const book of dummybooks){
            const coverUrl = (await uploadToImageKit(book.coverUrl , `${book.title}.jpg` , "/books/covers")) as string;
            const videoUrl =  (await uploadToImageKit(book.videoUrl , `${book.title}.mp4` , "/books/videos")) as string;

            await db.insert(books).values({
                ...book, 
                coverUrl, 
                videoUrl
            }) ; 
        }
        console.log("Database seeded successfully.");
    }catch (error) {
        console.error("Error seeding database:", error);
    }
}

seed(); 