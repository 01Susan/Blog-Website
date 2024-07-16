import { ChangeEvent, memo } from 'react'



interface LabelInputType {
    placeholder: string
    type: string
    label: string
    onchange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const LabelInput = memo(({ placeholder, type, label, onchange }: LabelInputType) => {
    return (
        <div className='w-full flex justify-center flex-col gap-1'>
            <label className="block mb-2 text-sm font-medium ">{label}</label>
            <input type={type} placeholder={placeholder} onChange={onchange} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
        </div>
    )
})