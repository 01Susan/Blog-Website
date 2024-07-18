/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useState, useCallback, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { LabelInput } from './LabelInput';
import { Button } from './Button';
import axios, { AxiosError } from 'axios';
import { BACKEND_URL } from '../config';
import { SignUpInHeader } from './SignUpInHeader';
import { toast } from 'react-toastify';
import { UserSignupInputs, ZodAuthError } from '../types/user';



export const SignupComp = memo(() => {
    console.log('Signup Component is rendered');
    const [validationError, setValidationError] = useState<ZodAuthError>({});
    const [globalError, setGlobalError] = useState<string>('');
    const [postInputs, setPostInputs] = useState<UserSignupInputs>({
        name: '',
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();


    const handleError = (error: any) => {
        // @ts-expect-error @ts-ignore
        if (error instanceof AxiosError && error.response?.status >= 400 && error.response.status < 500) {
            const errorData = error.response?.data?.error;
            if (typeof errorData === 'object') {
                setValidationError(errorData);
            } else if (typeof errorData === 'string') {
                console.log("global error logged");
                setGlobalError(errorData);
            }
        } else {
            toast.error('Unable to Sign up. Please try again later.');
            setPostInputs({
                name: '',
                email: '',
                password: '',
            });
            setGlobalError('');
        }
    };

    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {

        console.log("Signup: handleInputChange Function called");

        const { name, value } = e.target;
        setValidationError((prev) => ({ ...prev, [name]: undefined }));
        setGlobalError('');
        setPostInputs((prev) => ({ ...prev, [name]: value }));
    }, []);

    const sendAuthRequest = useCallback(async () => {
        setIsLoading(true);
        console.log("Signup: sendAuthRequest Function called");
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs);
            toast.success('Signed up successfully');
            setPostInputs({
                name: '',
                email: '',
                password: '',
            });
            const jwt = response.data.token;
            localStorage.setItem('token', jwt);
            navigate('/blogs');
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    }, [postInputs, navigate]);

    return (
        <div className='flex flex-col w-full items-center justify-center h-screen dark:bg-dark-100'>
            <SignUpInHeader type='signup' />
            {globalError && (
                <p className='text-red-500 mt-2'>{globalError}</p>
            )}
            <div className='w-1/2 flex flex-col gap-2 my-8'>
                <LabelInput
                    onchange={handleInputChange}
                    type='text'
                    name='name'
                    placeholder='John Doe'
                    label='Username'
                />
                {validationError && typeof validationError === 'object' && validationError.name && (
                    <p className='text-red-500'>{validationError.name[0]}</p>
                )}
                <LabelInput
                    onchange={handleInputChange}
                    type='email'
                    name='email'
                    placeholder='john@example.com'
                    label='Email'
                />
                {validationError && typeof validationError === 'object' && validationError.email && (
                    <p className='text-red-500'>{validationError.email[0]}</p>
                )}
                <LabelInput
                    onchange={handleInputChange}
                    type='password'
                    name='password'
                    placeholder='*********'
                    label='Password'
                />
                {validationError && typeof validationError === 'object' && validationError.password && (
                    <p className='text-red-500'>{validationError.password[0]}</p>
                )}
            </div>
            <Button label='Sign up' onclick={sendAuthRequest} disabled={isLoading} />
        </div>
    );
});
