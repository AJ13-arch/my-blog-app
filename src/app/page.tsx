import { Providers } from './providers';

export default function Home() {
  return (
    <Providers>
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-4xl font-bold mb-6">Welcome to Portfolio Blog</h1>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl text-center">
          Share your thoughts, showcase your work, and connect with others.
        </p>
        <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl w-full">
          <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
          <p className="text-gray-700 mb-4">
            Sign up to create your own blog posts and start sharing your ideas with the world.
          </p>
        </div>
      </div>
    </Providers>
  );
}