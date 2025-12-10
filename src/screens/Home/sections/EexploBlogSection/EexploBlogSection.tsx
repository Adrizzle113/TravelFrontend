import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Clock, ArrowRight } from 'lucide-react';
import { blogApi } from '@/lib/eexploApi';
import { BlogPost } from '@/lib/supabase';

export const EexploBlogSection = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await blogApi.getLatest(3);
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
    {
      id: '1',
      title: '10 Hidden Gems in Southeast Asia You Must Visit',
      slug: 'hidden-gems-southeast-asia',
      excerpt: 'Discover lesser-known destinations that offer authentic experiences away from tourist crowds',
      content: '',
      image_url: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=600',
      read_time: 5,
      category: 'Destinations',
      published: true,
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Essential Travel Tips for First-Time Backpackers',
      slug: 'travel-tips-backpackers',
      excerpt: 'Everything you need to know before embarking on your first backpacking adventure',
      content: '',
      image_url: 'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=600',
      read_time: 7,
      category: 'Travel Tips',
      published: true,
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      title: 'The Ultimate Guide to Solo Female Travel',
      slug: 'solo-female-travel-guide',
      excerpt: 'Safety tips, destination recommendations, and inspiration for women traveling alone',
      content: '',
      image_url: 'https://images.pexels.com/photos/2265876/pexels-photo-2265876.jpeg?auto=compress&cs=tinysrgb&w=600',
      read_time: 8,
      category: 'Travel Tips',
      published: true,
      created_at: new Date().toISOString()
    },
  ];

  const displayPosts = posts.length > 0 ? posts : placeholderPosts;

  return (
    <section className="py-20 bg-eexplo-warm-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-inter font-bold text-4xl text-eexplo-text-primary mb-4">
            Travel Stories & Tips
          </h2>
          <p className="font-inter text-lg text-eexplo-text-secondary max-w-2xl mx-auto">
            Get inspired and informed with our latest travel guides, destination insights, and expert advice
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-eexplo-accent-orange"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {displayPosts.map((post) => (
                <article
                  key={post.id}
                  className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  onClick={() => navigate('/blog')}
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
                    <p className="font-inter text-eexplo-text-secondary mb-4 line-clamp-2">
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

            <div className="text-center">
              <Button
                onClick={() => navigate('/blog')}
                className="bg-eexplo-accent-orange hover:bg-eexplo-accent-orange/90 text-white font-inter font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                View All Articles
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
