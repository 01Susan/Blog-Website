import React, { memo } from 'react'
import { Quote } from '../components/Quote'
import { SignupComp } from '../components/SignupComp'


export const Signup: React.FC = memo(() => {


    return (
        <div className='grid lg:grid-cols-2 grid-cols-1 h-screen w-full'>
            <div>
                <SignupComp />
            </div>
            <div className='md:visible invisible flex items-center justify-center'>
                <Quote />
            </div>
        </div>
    );
});
