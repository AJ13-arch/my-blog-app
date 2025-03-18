import React from 'react';
import Link from 'next/link';
import { Post } from '@/lib/blogService';

interface BlogPostCardProps {
  post: Post;
  showActions?: boolean;
  onDelete?: (id: string) => void;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, showActions = false, onDelete }) => {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Truncate content for preview
  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + '...';
  };

  return (
    <div className="border rounded-lg p-6 mb-4 shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-xl font-bold mb-2">
        <Link href={`/blog/${post.id}`} className="text-blue-600 hover:text-blue-800">
          {post.title}
        </Link>
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Published on {formatDate(post.created_at)}
      </p>
      <div className="prose prose-sm mb-4">
        {truncateContent(post.content)}
      </div>
      <div className="flex justify-between items-center">
        <Link href={`/blog/${post.id}`} className="text-blue-600 hover:text-blue-800 text-sm">
          Read more
        </Link>
        {showActions && (
          <div className="space-x-2">
            <Link href={`/blog/${post.id}/edit`} className="text-sm text-gray-600 hover:text-gray-800">
              Edit
            </Link>
            <button
              onClick={() => onDelete && onDelete(post.id)}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostCard;