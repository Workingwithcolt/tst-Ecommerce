import React from 'react'

export default function CardRow({ name, value }) {
    return (
        <li className="block p-0">
            <div className="flex items-center space-x-4 gap-2 justify-between">
                <p className="text-md font-bold tracking-tight truncate text-gray-400 dark:text-gray-400">
                    {name}
                </p>
                <p className="truncate font-bold">
                    {value}
                </p>
                
            </div>
        </li>
    )
}
