"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signInAction } from "../actions"
import { Loader2 } from "lucide-react"
import { useFormStatus } from "react-dom"
import { useActionState } from "react"

export default function UserAuthForm() {
  // const [state, action] = useFormState(signInAction, undefined);
  const [state, action] = useActionState(signInAction, undefined)

  return (
    <>
      {/* <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
          <FormField
            control={form.control}
            name="sid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Login ID</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="아이디를 입력해주세요" disabled={loading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="비밀번호를 입력해주세요" disabled={loading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} className="ml-auto w-full" type="submit">
            Login
          </Button>
        </form>
      </Form> */}
      <form action={action} className='w-full'>
        <div className='mb-2 space-y-2'>
          <label htmlFor='sid' className='font-medium text-sm'>
            Login ID
          </label>
          <Input
            name='sid'
            type='text'
            placeholder='아이디를 입력해주세요'
            defaultValue={process.env.NODE_ENV === "development" ? "supreme" : ""}
          />
          {state?.errors?.sid && <p className='text-red-500 text-sm'>{state.errors.sid}</p>}
        </div>

        <div className='mb-4 space-y-2'>
          <label htmlFor='password' className='font-medium text-sm'>
            Password
          </label>
          <Input
            name='password'
            type='password'
            placeholder='비밀번호를 입력해주세요'
            defaultValue={process.env.NODE_ENV === "development" ? "a123456!" : ""}
          />
          {state?.errors?.password && <p className='text-red-500 text-sm'>{state.errors.password}</p>}
        </div>

        <SubmitButton />
      </form>
    </>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button disabled={pending} className='ml-auto w-full' type='submit'>
      {pending ? (
        <>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          Loading...
        </>
      ) : (
        "Login"
      )}
    </Button>
  )
}
