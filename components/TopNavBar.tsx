'use client'

import Link from 'next/link'
import { Home, Book, User } from 'lucide-react'

export default function TopNavBar() {
  return (
    <nav className="bg-gray-900 text-white py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Vedic Tales</Link>
        <div className="flex space-x-4">
          <Link href="/" className="flex items-center">
            <Home className="mr-1" size={20} />
            Home
          </Link>
          <Link href="/stories" className="flex items-center">
            <Book className="mr-1" size={20} />
            Stories
          </Link>
          <Link href="/profile" className="flex items-center">
            <User className="mr-1" size={20} />
            Profile
          </Link>
        </div>
      </div>
    </nav>
  )
}