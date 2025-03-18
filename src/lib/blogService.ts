import { createClient } from '@supabase/supabase-js';
import { supabase } from './supabase';

export type Post = {
  id: string;
  title: string;
  content: string;
  user_id: string;
  created_at: string;
  updated_at: string;
};

export type NewPost = {
  title: string;
  content: string;
  user_id: string;
};

// Get all posts
export async function getAllPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Post[];
}

// Get posts by user ID
export async function getPostsByUser(userId: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Post[];
}

// Get a single post by ID
export async function getPostById(id: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as Post;
}

// Create a new post
export async function createPost(post: NewPost) {
  const { data, error } = await supabase
    .from('posts')
    .insert([post])
    .select();

  if (error) throw error;
  return data[0] as Post;
}

// Update a post
export async function updatePost(id: string, updates: Partial<Post>) {
  const { data, error } = await supabase
    .from('posts')
    .update(updates)
    .eq('id', id)
    .select();

  if (error) throw error;
  return data[0] as Post;
}

// Delete a post
export async function deletePost(id: string) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
}