import { cn } from '../lib/utils';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from '@nextui-org/react';
import Link from 'next/link';
import { useState } from 'react';

export const GridItem = ({ className, title, description, header, icon, onOpen, id }) => {

    return (
        <Link href={`/action?title=${title}id=${id}`}>
            <div
                className={cn(
                    'row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-gray-200 border border-transparent justify-between flex flex-col space-y-4 cursor-pointer',
                    className,
                )}
                onClick={onOpen}>
                {header}
                <div className="group-hover/bento:translate-x-2 transition duration-200">
                    {icon}
                    <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
                        {title}
                    </div>
                    <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
                        {description}
                    </div>
                </div>
            </div>
        </Link>
    );
};
