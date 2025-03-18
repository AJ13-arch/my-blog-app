'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getPostById, updatePost, Post } from '@/lib/blogService';
import PostForm from '../../PostForm';
import { useAuth } from '@/context/AuthContext';

interface EditPostPageProps {
  params: {
    id: string;
  };
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getPostById(params.id);
        setPost(fetchedPost);
        
        // Check if the user is the author of the post
        if (user && fetchedPost.user_id !== user.id) {
          setError("You don't have permission to edit this post");
        }
      } catch (err) {
        setError("Failed to load post");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchPost();
    } else {
      setIsLoading(false);
      setError("Please log in to edit posts");
    }
  }, [params.id, user]);

  const handleUpdatePost = async (data: Partial<Post>) => {
    if (!post) return;
    
    setIsLoading(true);
    try {
      await updatePost(post.id, data);
      router.push(`/blog/${post.id}`);
    } catch (err) {
      setError("Failed to update post");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
        <div className="mt-4">
          <button 
            onClick={() => router.push('/blog')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  if (!post) {
    return <div className="p-8">Post not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      <PostForm 
        post={post}  // Changed to post which is the correct prop name
        onSubmit={handleUpdatePost}
        isLoading={isLoading}  // Changed isSubmitting to isLoading
      />
    </div>
  );
}