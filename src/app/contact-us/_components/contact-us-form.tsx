"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Textarea } from "@/components/ui/textarea"
import {Send}  from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { useSession } from "next-auth/react"

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters." })
    .max(50, { message: "Full name cannot exceed 50 characters." }),

  email: z
    .string()
    .email({ message: "Please enter a valid email address." }),

  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(500, { message: "Message cannot exceed 500 characters." }),
});



const ContactForm = () => {
    const session = useSession();
    console.log("session", session?.data)



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            message: "",
        },
    })


    const {mutate, isPending} = useMutation({
        mutationKey: ["contact-us"],
        mutationFn: async (values: {fullName:string, message:string, email:string})=>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contacts`,{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(values)
            })
            return res.json()
        },
        onSuccess: (data)=>{
            if(!data?.success){
                toast.error(data?.message || "Something went wrong");
                return 0;
            }
            toast.success(data?.message || "Contact Created successfully")
            form.reset();
        }
    })
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        mutate(values)
    }
    return (
        <div className="bg-black/60 w-full md:w-[688px] h-auto p-6  border border-[#999999] rounded-[16px]">
            <h4 className="text-white text-xl md:text-2xl lg:text-3xl font-bold text-center mb-5">Send us a Message</h4>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                       <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base text-white font-semibold ">Full Name *</FormLabel>
                                    <FormControl>
                                        <Input className="h-[48px] rounded-[8px] border border-[#999999] py-3 px-4 text-base font-semibold text-white placeholder:text-[#999999] outline-none ring-0" placeholder="your full name" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base text-white font-semibold ">Email Address *</FormLabel>
                                <FormControl>
                                    <Input className="h-[48px] rounded-[8px] border border-[#999999] py-3 px-4 text-base font-semibold text-white placeholder:text-[#999999] outline-none ring-0" placeholder="you.email@example.com" {...field} />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base text-white font-semibold ">Message *</FormLabel>
                                <FormControl>
                                    <Textarea className="h-[121px] rounded-[8px] border border-[#999999] py-3 px-4 text-base font-semibold text-white placeholder:text-[#999999] outline-none ring-0" placeholder="Tell us more about how can we help you....." {...field} />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />
                   <div className="pt-6">
                     <Button disabled={isPending} className="w-full h-[48px] flex items-center gap-2  text-lg text-black font-bold leading-[120%] rounded-[8px] bg-primary " type="submit"> <Send /> {isPending ? "Sending..." : "Send Message"}</Button>
                   </div>
                </form>
            </Form>
        </div>
    )
}

export default ContactForm