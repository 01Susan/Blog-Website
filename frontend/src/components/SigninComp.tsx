import { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LabelInput } from './LabelInput'
import { Button } from './Button'
import axios, { AxiosError } from 'axios'
import { BACKEND_URL } from '../config'
import { SignUpInHeader } from './SignUpInHeader'
import { toast } from 'react-toastify'

interface SigninInputs {
    email: string;
    password: string;
}
interface ZodSignupError {
    name?: string[];
    email?: string[];
    password?: string[];
}

type ValidationError = ZodSignupError | string;
export const SigninComp = memo(() => {
    const navigate = useNavigate()
    const [validationError, setValidationError] = useState<ValidationError>({});
    const [postInputs, setPostInputs] = useState<SigninInputs>({
        email: "",
        password: ""
    })

    async function sendAuthRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInputs)
            const jwt = response.data.token;
            localStorage.setItem('token', jwt);
            navigate('/blogs')
        } catch (error) {
            if (error instanceof AxiosError) {
                if ((error.response?.status && error.response.status >= 400 && error.response.status < 500) && error.response?.data?.error) {
                    setValidationError(error.response.data.error);
                }
            }
            toast.error("Unable to Sign in. Please try again.")
        }
    }
    return (
        <div className='flex flex-col w-full items-center justify-center h-screen'>
            <SignUpInHeader type='signin'></SignUpInHeader>

            {validationError && typeof validationError === 'string' && (
                toast.error(validationError))}
            <div className='w-1/2 flex flex-col gap-2 my-8'>
                <LabelInput onchange={(e) => setPostInputs({ ...postInputs, email: e.target.value })} type="email" placeholder='john@example.com' label='Email' />
                {validationError && typeof validationError === 'object' && validationError.email && (
                    <p className='text-red-500'>{validationError.email[0]}</p>
                )}
                <LabelInput onchange={(e) => setPostInputs({ ...postInputs, password: e.target.value })} type="password" placeholder='*********' label='Password' />
                {validationError && typeof validationError === 'object' && validationError.password && (
                    <p className='text-red-500'>{validationError.password[0]}</p>
                )}
            </div>
            <Button label='Sign in' onclick={sendAuthRequest} />
        </div >
    )
})