import { memo } from 'react'
import { Link } from 'react-router-dom'

export const SignUpInHeader = memo(({ type }: { type: 'signup' | 'signin' }) => {
    console.log('SignUpInHeader Component is rendered')
    return (

        <>
            <div className='text-4xl text-center text-bold font-bold dark:text-white'>
                {type === 'signup' ? 'Create an account' : 'Sign in'}
            </div>
            <div className='flex gap-2 text-1xl text-center text-slate-500 dark:text-slate-300'>
                {
                    type === 'signup' ? 'Alread have an account?' : "Don't have an account?"
                }

                <Link to={type === 'signup' ? '/signin' : '/signup'}>
                    <p className='underline'>{type === 'signup' ? 'Signin' : 'Signup'}</p>
                </Link>
            </div>

        </>
    )
})