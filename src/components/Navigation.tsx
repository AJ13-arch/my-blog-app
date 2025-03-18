'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Navigation() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-indigo-600">
              Portfolio Blog
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/blog" className="text-gray-700 hover:text-indigo-600">
                  My Posts
                </Link>
                <Link href="/blog/create" className="text-gray-700 hover:text-indigo-600">
                  New Post
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-gray-700 hover:text-indigo-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-indigo-600">
                  Login
                </Link>
                <Link href="/signup" className="text-gray-700 hover:text-indigo-600">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}