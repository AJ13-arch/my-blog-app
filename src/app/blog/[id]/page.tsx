import React from 'react';
import { getPostById } from '@/lib/blogService';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 60; // Revalidate this page every 60 seconds

interface BlogPostPageProps {
  params: {
    id: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const post = await getPostById(params.id);
    
    // Format date for display
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    };

    return (
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/blog" className="text-blue-600 hover:text-blue-800">
            ← Back to all posts
          </Link>
        </div>
        
        <article>
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-500 mb-8">
            Published on {formatDate(post.created_at)}
          </p>
          
          <div className="prose prose-lg max-w-none">
            {post.content.split('\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
        
        <div className="mt-8 flex justify-end">
          <Link
            href={`/blog/${post.id}/edit`}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Edit Post
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}