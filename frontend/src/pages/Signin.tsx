import React, { memo } from 'react'
import { Quote } from '../components/Quote'
import { SigninComp } from '../components/SigninComp'

export const Signin: React.FC = memo(() => {
    return (
        <div className='grid lg:grid-cols-2 grid-cols-1 h-screen w-full'>
            <div>
                <SigninComp />
            </div>
            <div className='md:visible invisible flex items-center justify-center'>
                <Quote />
            </div>
        </div>
    );
});
