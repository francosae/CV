import { Fragment } from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { PageGrid } from './pagegrid'
const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const navigation = [
  { name: 'Home', href: '#', current: true },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
  return (
    <>
      <div className="min-h-full">       
        <main >
          <div className="mx-auto max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-gray-90 px-5 shadow sm:px-6">
                    <header className="py-10">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="my-0 text-3xl font-bold tracking-tight text-black">All Actions</h1>
                    </div>
                </header>

                <header className="py-2">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold tracking-tight text-black">Featured Actions</h1>
                    </div>
                </header>
                <PageGrid />
                
                <header className="py-5">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold tracking-tight text-black">Productivity Boosters</h1>
                    </div>
                </header>
                <PageGrid />

                <header className="py-5">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold tracking-tight text-black">Travel & Navigation</h1>
                    </div>
                </header>
                <PageGrid />

            </div>
          </div>
        </main>
      </div>
    </>
  )
}
