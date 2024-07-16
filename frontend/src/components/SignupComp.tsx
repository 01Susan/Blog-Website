import { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LabelInput } from './LabelInput'
import { Button } from './Button'
import axios, { AxiosError } from 'axios'
import { BACKEND_URL } from '../config'
import { SignUpInHeader } from './SignUpInHeader'
import { toast } from 'react-toastify'

interface PostInputs {
    name: string;
    email: string;
    password: string;
}
// Define a union type for validation errors
interface ZodSignupError {
    name?: string[];
    email?: string[];
    password?: string[];
}

type ValidationError = ZodSignupError | string;
export const SignupComp = memo(() => {
    const [validationError, setValidationError] = useState<ValidationError>({});
    const navigate = useNavigate()
    const [postInputs, setPostInputs] = useState<PostInputs>({
        name: "",
        email: "",
        password: ""
    })
    async function sendAuthRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs)
            toast.success("Signed up successfully")
            setPostInputs(
                {
                    name: "",
                    email: "",
                    password: ""
                }
            )
            const jwt = response.data.token;
            localStorage.setItem('token', jwt);
            navigate('/blogs')
        } catch (error) {
            if (error instanceof AxiosError) {
                if ((error.response?.status && error.response.status >= 400 && error.response.status < 500) && error.response?.data?.error) {
                    setValidationError(error.response.data.error);
                }
                toast.error('Unable to Sign up. Please try again.')
            }
        }
    }
    return (
        <div className='flex flex-col w-full items-center justify-center h-screen'>
            <SignUpInHeader type={"signup"}></SignUpInHeader>
            {validationError && typeof validationError === 'string' && (
                <p className='text-red-500 my-2'>{validationError}</p>)}
            <div className='w-1/2 flex flex-col gap-2 my-8'>
                <LabelInput onchange={(e) => setPostInputs({ ...postInputs, name: e.target.value })} type="text" placeholder='John Doe' label='Username' />
                {validationError && typeof validationError === 'object' && validationError.name && (
                    <p className='text-red-500'>{validationError.name[0]}</p>)}
                <LabelInput onchange={(e) => setPostInputs({ ...postInputs, email: e.target.value })} type="email" placeholder='john@example.com' label='Email' />
                {validationError && typeof validationError === 'object' && validationError.email && (
                    <p className='text-red-500'>{validationError.email[0]}</p>
                )}
                <LabelInput onchange={(e) => setPostInputs({ ...postInputs, password: e.target.value })} type="password" placeholder='*********' label='Password' />
                {validationError && typeof validationError === 'object' && validationError.password && (
                    <p className='text-red-500'>{validationError.password[0]}</p>
                )}
            </div>
            <Button label='Sign up' onclick={sendAuthRequest} />
        </div >
    )
})