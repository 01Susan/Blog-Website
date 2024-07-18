import { ChangeEvent, memo, useId } from 'react'



interface LabelInputType {
    placeholder: string
    type: string
    label: string
    name: string
    onchange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const LabelInput = memo(({ name, placeholder, type, label, onchange }: LabelInputType) => {
    const id = useId()
    return (
        <div className='w-full flex justify-center flex-col gap-1'>
            <label htmlFor={`${id}-name`} className="block mb-2 text-sm font-medium dark:text-white">{label}</label>
            <input id={`${id}-name`} name={name} type={type} placeholder={placeholder} onChange={onchange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
        </div>
    )
})