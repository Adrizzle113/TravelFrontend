import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  tour_count: number;
  image_url: string;
  featured: boolean;
  created_at: string;
}

export interface TourPackage {
  id: string;
  destination_id: string;
  name: string;
  duration: string;
  price: number;
  description: string;
  image_url: string;
  featured: boolean;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  read_time: number;
  category: string;
  published: boolean;
  created_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
  active: boolean;
}

export interface Service {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: string;
  featured: boolean;
  order: number;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  subscribed_at: string;
  active: boolean;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  destination: string;
  message: string;
  status: string;
  created_at: string;
}
