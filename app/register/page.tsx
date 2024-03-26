"use client"
import axios from "axios"
import {  useState } from "react"
import { Field, FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { FcGoogle } from "react-icons/fc"
import { AiFillGithub } from "react-icons/ai"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Heading from "../components/utils/heading/Heading"
import Input from "../components/utils/input/Input"
import Button from "../components/utils/button/Button"
import RegisterStyle from "./RegisterStyle"

const Register = () => {
    const [isLoading,setIsLoading] = useState(false)
    const router = useRouter()

    const {register,handleSubmit,formState : {
        errors,
    }} = useForm<FieldValues>({
        defaultValues : {
            username : "",
            email : "",
            password : ""
        }
    })

    const onSubmit : SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        axios.post('/api/register',data)
        .then(() => {
            toast.success('Registered!')
           
        })
        .catch((erorr) => {
          toast.error('something went wrong')
          console.log(erorr)
        })
        .finally(() => {
            setIsLoading(false)
        })
    } 

    
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
                title="Welcome to AirBnb"
                subtitle="Create an Account"
            />
            <Input 
                id="email" 
                label="email" 
                disabled={isLoading} 
                register={register} 
                errors={errors} 
                required
            />
            <Input 
                id="username" 
                label="Username" 
                disabled={isLoading} 
                register={register} 
                errors={errors} 
                required
            />
            <Input 
                id="password" 
                label="password" 
                type="password"
                disabled={isLoading} 
                register={register} 
                errors={errors} 
                required
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
          <hr />
          <Button
            outline 
            label="Continue with Google"
            icon={FcGoogle}
            onClick={() => signIn('google')} 
          />
          <Button 
            outline 
            label="Continue with Github"
            icon={AiFillGithub}
            onClick={() => signIn('github')}
          />
          <div 
            className="
              text-neutral-500 
              text-center 
              mt-4 
              font-light
            "
          >
            <p>Already have an account?
              <span 
                onClick={() => router.push('/login')} 
                className="
                  text-neutral-800
                  cursor-pointer 
                  hover:underline
                "
                > Log in</span>
            </p>
          </div>
        </div>
    )
  return (
    <RegisterStyle 
          disabled={isLoading}
          title="Register"
          actionLabel="Continue"
          onSubmit={handleSubmit(onSubmit)} 
          body={bodyContent} 
          footer={footerContent}
          secondaryActionLabel={""}   
     />
  )
}

export default Register