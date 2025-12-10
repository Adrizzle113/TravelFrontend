import { supabase, Destination, TourPackage, BlogPost, FAQ, Service, NewsletterSubscription, ContactInquiry } from './supabase';

export const destinationsApi = {
  getFeatured: async (): Promise<Destination[]> => {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .eq('featured', true)
      .order('tour_count', { ascending: false })
      .limit(6);

    if (error) throw error;
    return data || [];
  },

  getAll: async (): Promise<Destination[]> => {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .order('tour_count', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  getById: async (id: string): Promise<Destination | null> => {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  }
};

export const packagesApi = {
  getFeatured: async (): Promise<TourPackage[]> => {
    const { data, error } = await supabase
      .from('tour_packages')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(4);

    if (error) throw error;
    return data || [];
  },

  getAll: async (): Promise<TourPackage[]> => {
    const { data, error } = await supabase
      .from('tour_packages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  getByDestination: async (destinationId: string): Promise<TourPackage[]> => {
    const { data, error } = await supabase
      .from('tour_packages')
      .select('*')
      .eq('destination_id', destinationId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  getById: async (id: string): Promise<TourPackage | null> => {
    const { data, error } = await supabase
      .from('tour_packages')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  }
};

export const blogApi = {
  getLatest: async (limit: number = 3): Promise<BlogPost[]> => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  getAll: async (): Promise<BlogPost[]> => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  getByCategory: async (category: string): Promise<BlogPost[]> => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  getBySlug: async (slug: string): Promise<BlogPost | null> => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle();

    if (error) throw error;
    return data;
  }
};

export const faqApi = {
  getAll: async (): Promise<FAQ[]> => {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('active', true)
      .order('order', { ascending: true });

    if (error) throw error;
    return data || [];
  }
};

export const servicesApi = {
  getAll: async (): Promise<Service[]> => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('order', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  getByCategory: async (category: string): Promise<Service[]> => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('category', category)
      .order('order', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  getFeatured: async (): Promise<Service[]> => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('featured', true)
      .order('order', { ascending: true });

    if (error) throw error;
    return data || [];
  }
};

export const newsletterApi = {
  subscribe: async (email: string): Promise<NewsletterSubscription> => {
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .insert([{ email }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  checkSubscription: async (email: string): Promise<boolean> => {
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .select('id')
      .eq('email', email)
      .eq('active', true)
      .maybeSingle();

    if (error) throw error;
    return !!data;
  }
};

export const contactApi = {
  submit: async (inquiry: Omit<ContactInquiry, 'id' | 'created_at' | 'status'>): Promise<ContactInquiry> => {
    const { data, error } = await supabase
      .from('contact_inquiries')
      .insert([{ ...inquiry, status: 'pending' }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
