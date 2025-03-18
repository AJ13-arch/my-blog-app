'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost, NewPost, Post } from '@/lib/blogService'; // Import Post type as well
import PostForm from '../PostForm';
import { useAuth } from '@/context/AuthContext';

export default function CreatePostPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Change the parameter type to match what PostForm expects
  const handleCreatePost = async (data: NewPost | Partial<Post>) => {
    if (!user) {
      router.push('/login');
      return;
    }

    setIsLoading(true);
    try {
      // Cast data to NewPost since we know in this context it should be a new post
      const newPost = await createPost({
        ...data as NewPost,
        user_id: user.id,
      });
      router.push(`/blog/${newPost.id}`);
    } catch (err) {
      console.error("Failed to create post:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <p>Please log in to create a post.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
      <PostForm onSubmit={handleCreatePost} isLoading={isLoading} />
    </div>
  );
}