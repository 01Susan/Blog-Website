import { memo } from 'react'
import { Avatar } from './Avatar'
import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'




export const AppBar = memo(() => {
    const { isDarkTheme, toggleTheme } = useTheme();
    return (
        <div className='flex justify-between px-4 py-2 border-b border-slate-200 dark:bg-dark-100 dark:border-dark-200'>
            <Link to='/blogs' >
                <div className='text-2xl font-bold cursor-pointer dark:text-white'>Blogify</div>
            </Link>
            <div className='flex gap-3 items-center justify-center text-center'>
                <Link to='/publish' >
                    <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-3 py-2 text-center me-2 mb-2">New</button>
                </Link>
                <button type="button" onClick={toggleTheme}>
                    {
                        isDarkTheme ?
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 dark:text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 dark:text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                            </svg>
                    }

                </button>
                <Avatar name="Author Name" size="medium"></Avatar>
            </div>
        </div>
    )
})