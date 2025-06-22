"use server"

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import ratelimit from "@/lib/ratelimit";
import { redirect } from "next/navigation";
import { workflowClient } from "../workflow";
import config from "../config";


export const signInWithCreadentials = async (params : Pick<AuthCredentials , "email" | "password">) => {
    const {email , password} = params;

    const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
    console.log("IP Address:", ip);
    const {success} = await ratelimit.limit(ip);
    if(!success) redirect('/too-fast') ;

    try {
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false
        })
        if(result?.error) {
            return {success : false , error : result.error};
        }
        return {success : true };
    } catch (error) {
        console.log(error , "Erreur lors de la connexion de l'utilisateur");
        return {success : false , error : "Une erreur s'est produite lors de la connexion. Veuillez réessayer plus tard."};
    }
}

export const signUp = async (params : AuthCredentials) => {
    const {fullName , email, universityId , password, universityCard} = params;
    const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
    console.log("IP Address:", ip);
    const {success} = await ratelimit.limit(ip);
    if(!success) redirect('/too-fast')
    //Verifier si l'utilisateur existe déjà
    const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email)) 
    .limit(1);

    if(existingUser.length > 0) {
        return {success : false , error : "Utilidateur déjà existant avec cet email."};
    }

    const hashPassword = await  hash (password , 10) ;

    try {
        await db.insert(users).values({
            fullName,
            email,
            universityId,
            password: hashPassword,
            universityCard
        }); 

        await workflowClient.trigger({
            url: `${config.env.prodApiEndpoint}/api/workflows/onboarding`,
            body: {
                email,
                fullName
            }
        })

        await signInWithCreadentials({ email, password });
        return {success : true};
    } catch (error) {
        console.error("Erreur lors de l'inscription de l'utilisateur :", error);
        return {success : false , error : "Une erreur s'est produite lors de l'inscription. Veuillez réessayer plus tard."};
        
    }
}