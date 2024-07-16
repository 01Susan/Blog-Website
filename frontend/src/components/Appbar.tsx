import { memo } from 'react'
import { Avatar } from './Avatar'
import { Link } from 'react-router-dom'




export const AppBar = memo(() => {
    return (
        <div className='flex justify-between px-4 py-2 border-b border-slate-200'>
            <Link to='/blogs' >
                <div className='text-2xl font-bold cursor-pointer'>Bloify</div>
            </Link>
            <div className='flex gap-2'>
                <Link to='/publish' >
                    <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-3 py-2 text-center me-2 mb-2">New</button>
                </Link>
                <Avatar name="Author Name" size="medium"></Avatar>
            </div>
        </div>
    )
})