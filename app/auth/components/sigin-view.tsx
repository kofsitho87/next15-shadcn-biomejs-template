import type { Metadata } from "next"
import UserAuthForm from "./user-auth-form"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function SignInViewPage() {
  return (
    <div className='relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r'>
        <div className='absolute inset-0 bg-zinc-900' />
        <div className='relative z-20 flex items-center font-medium text-lg'>
          <Image
            className='h-8 w-auto'
            src='/images/logos/logo_white.png'
            width={79.42}
            height={40}
            alt='Vijob'
            title='Vijob'
          />
        </div>
        {/* <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This library has saved me countless hours of work and helped me deliver stunning designs to my clients faster than ever before.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div> */}
      </div>
      <div className='flex h-full items-center p-4 lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='font-semibold text-2xl tracking-tight'>Login</h1>
            <p className='text-muted-foreground text-sm'>Enter your ID and password below to login</p>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </div>
  )
}
