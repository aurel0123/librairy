"use client"

import ImageUpload from '@/components/imageUpload';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { bookSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';

import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import ColorPicker from '../ColorPicker';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createBook } from '@/lib/admin/actions/book';
interface Props extends Partial<Book>{
    type?: 'create' | 'update';
}


const BookForm = ({type , ...book} : Props) => {
    const router = useRouter(); 

    const form = useForm<z.infer<typeof bookSchema>>({
        resolver:zodResolver(bookSchema),
        defaultValues : {
            title:  '',
            description: '',
            author : '',
            genre: '',
            rating: 1,
            totalCopies: 1,
            coverUrl: '',
            coverColor: '',
            videoUrl: '',
            summary: '',
        }
    }) ; 
    const onSubmit = async (value : z.infer<typeof bookSchema>) => {
        const result = await createBook(value);
        if(result.success) {
            toast.success("Success", {
                description : "Book added successfully",
            });
            router.push(`/admin/books/${result.data.id}`);
        }else{
            toast.error("Error", {
                description: result.message || "Something went wrong",
            });
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name={"title"}
                    render={({ field }) => (
                    <FormItem className='flex flex-col gap-1'>
                        <FormLabel className = 'text-base font-normal text-dark-500'>Book Title</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter the Book Title" {...field} className='book-form_input' />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"author"}
                    render={({ field }) => (
                    <FormItem className='flex flex-col gap-1'>
                        <FormLabel className = 'text-base font-normal text-dark-500'>Author</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter the Book author" {...field} className='book-form_input' />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"genre"}
                    render={({ field }) => (
                    <FormItem className='flex flex-col gap-1'>
                        <FormLabel className = 'text-base font-normal text-dark-500'>Genre</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter the genere of the book" {...field} className='book-form_input' />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"rating"}
                    render={({ field }) => (
                    <FormItem className='flex flex-col gap-1'>
                        <FormLabel className = 'text-base font-normal text-dark-500'>Rating</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter rating" {...field} className='book-form_input' type="number" min={1} max={5}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"totalCopies"}
                    render={({ field }) => (
                    <FormItem className='flex flex-col gap-1'>
                        <FormLabel className = 'text-base font-normal text-dark-500'>Total Copies</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter total copies" {...field} className='book-form_input' type="number" min={1} max={10000}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"coverUrl"}
                    render={({ field }) => (
                    <FormItem className='flex flex-col gap-1'>
                        <FormLabel className = 'text-base font-normal text-dark-500'>Book Image</FormLabel>
                        <FormControl>
                            <ImageUpload
                                type='image'
                                accept='image/*'
                                folder='books/covers'
                                variant='light'
                                placeholder='Upload Book Cover Image'
                                value={field.value}
                                onFileChange={field.onChange}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"coverColor"}
                    render={({ field }) => (
                    <FormItem className='flex flex-col gap-1'>
                        <FormLabel className = 'text-base font-normal text-dark-500'>Primary Color</FormLabel>
                        <FormControl>
                            <ColorPicker
                                onPickerChange={field.onChange}
                                value={field.value}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"description"}
                    render={({ field }) => (
                    <FormItem className='flex flex-col gap-1'>
                        <FormLabel className = 'text-base font-normal text-dark-500'>Book description</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Book description" {...field} className='book-form_input' rows={10}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"videoUrl"}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                        <FormLabel className="text-base font-normal text-dark-500">
                            Book Trailer
                        </FormLabel>
                        <FormControl>
                            <ImageUpload
                                type="video"
                                accept="video/*"
                                placeholder="Upload a book trailer"
                                folder="books/videos"
                                variant="light"
                                onFileChange={field.onChange}
                                value={field.value}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"summary"}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                        <FormLabel className="text-base font-normal text-dark-500">
                            Book Summary
                        </FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder="Book summary"
                            {...field}
                            rows={5}
                            className="book-form_input"
                            />
                        </FormControl>

                        <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="book-form_btn text-white">
                    Add Book to Library
                </Button>
            </form>
        </Form>
    )
}

export default BookForm