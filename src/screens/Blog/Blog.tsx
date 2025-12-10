import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { blogApi } from '@/lib/eexploApi';
import { BlogPost } from '@/lib/supabase';
import { Clock, ArrowRight } from 'lucide-react';

export const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await blogApi.getAll();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const placeholderPosts = [
    { id: '1', title: '10 Hidden Gems in Southeast Asia You Must Visit', slug: 'hidden-gems-southeast-asia', excerpt: 'Discover lesser-known destinations that offer authentic experiences away from tourist crowds', content: '', image_url: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=600', read_time: 5, category: 'Destinations', published: true, created_at: new Date().toISOString() },
    { id: '2', title: 'Essential Travel Tips for First-Time Backpackers', slug: 'travel-tips-backpackers', excerpt: 'Everything you need to know before embarking on your first backpacking adventure', content: '', image_url: 'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=600', read_time: 7, category: 'Travel Tips', published: true, created_at: new Date().toISOString() },
    { id: '3', title: 'The Ultimate Guide to Solo Female Travel', slug: 'solo-female-travel-guide', excerpt: 'Safety tips, destination recommendations, and inspiration for women traveling alone', content: '', image_url: 'https://images.pexels.com/photos/2265876/pexels-photo-2265876.jpeg?auto=compress&cs=tinysrgb&w=600', read_time: 8, category: 'Travel Tips', published: true, created_at: new Date().toISOString() },
    { id: '4', title: 'Best Budget-Friendly Destinations for 2024', slug: 'budget-destinations-2024', excerpt: 'Explore amazing places without breaking the bank', content: '', image_url: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=600', read_time: 6, category: 'Budget Travel', published: true, created_at: new Date().toISOString() },
    { id: '5', title: 'How to Pack Like a Pro: Essential Travel Hacks', slug: 'packing-travel-hacks', excerpt: 'Learn the art of efficient packing from travel experts', content: '', image_url: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=600', read_time: 5, category: 'Travel Tips', published: true, created_at: new Date().toISOString() },
    { id: '6', title: 'Top Adventure Activities Around the World', slug: 'adventure-activities-world', excerpt: 'From skydiving to scuba diving - the most thrilling experiences', content: '', image_url: 'https://images.pexels.com/photos/2259232/pexels-photo-2259232.jpeg?auto=compress&cs=tinysrgb&w=600', read_time: 9, category: 'Adventures', published: true, created_at: new Date().toISOString() },
  ];

  const displayPosts = posts.length > 0 ? posts : placeholderPosts;

  return (
    <Layout>
      <section className="pt-32 pb-20 bg-white min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-inter font-bold text-5xl text-eexplo-text-primary mb-4">
              Travel Blog
            </h1>
            <p className="font-inter text-xl text-eexplo-text-secondary max-w-3xl mx-auto">
              Get inspired with our latest travel guides, destination insights, and expert advice
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-eexplo-accent-orange"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayPosts.map((post) => (
                <article
                  key={post.id}
                  className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-eexplo-light-gray"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="inline-block px-3 py-1 bg-eexplo-accent-orange/10 text-eexplo-accent-orange font-inter text-xs font-semibold rounded-full">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1 text-eexplo-text-secondary">
                        <Clock className="w-4 h-4" />
                        <span className="font-inter text-sm">{post.read_time} min read</span>
                      </div>
                    </div>
                    <h3 className="font-inter font-bold text-xl text-eexplo-text-primary mb-3 line-clamp-2 group-hover:text-eexplo-accent-orange transition-colors">
                      {post.title}
                    </h3>
                    <p className="font-inter text-eexplo-text-secondary mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-eexplo-accent-orange font-inter font-semibold text-sm group-hover:gap-3 transition-all">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};
