import React from 'react';
import BlogPostCard from './BlogPostCard';
import { Post } from '@/lib/blogService';

interface BlogPostListProps {
  posts: Post[];
  showActions?: boolean;
  onDelete?: (id: string) => void;
}

const BlogPostList: React.FC<BlogPostListProps> = ({ posts, showActions = false, onDelete }) => {
  if (!posts || posts.length === 0) {
    return <p className="text-center py-10 text-gray-500">No posts found.</p>;
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <BlogPostCard 
          key={post.id} 
          post={post} 
          showActions={showActions} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default BlogPostList;