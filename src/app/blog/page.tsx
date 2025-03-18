import React from 'react';
import { getAllPosts } from '@/lib/blogService';
import BlogPostList from '@/components/BlogPostList';
import Link from 'next/link';

export const revalidate = 60; // Revalidate this page every 60 seconds

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Blog</h1>
        <Link
          href="/blog/create"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Create Post
        </Link>
      </div>
      <BlogPostList posts={posts} />
    </div>
  );
}