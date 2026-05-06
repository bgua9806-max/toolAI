
import React, { useEffect, useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Clock, TrendingUp, ChevronRight, Search, Sparkles } from 'lucide-react';
import { BlogPost } from '../types';
import { supabase } from '../lib/supabase';
import { BLOG_POSTS as FALLBACK_POSTS } from '../constants';
import { slugify } from '../lib/utils';

const { Link } = ReactRouterDOM;

const CATEGORIES = [
  "All", "Công nghệ AI", "Thủ thuật", "Review", "Bảo mật", "Tin tức", "Design"
];

export const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);

    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
        
        if (!error && data && data.length > 0) {
            const enhancedPosts = data.map((post: BlogPost) => {
                const fallback = FALLBACK_POSTS.find(fp => 
                    String(fp.id) === String(post.id) ||
                    slugify(fp.title) === slugify(post.title || '') ||
                    (post.slug && slugify(fp.title) === post.slug)
                );

                const hasValidImage = typeof post.image === 'string' && post.image.trim() !== '';
                const shouldUseCanonicalSeedImage = Boolean(fallback);

                return {
                    ...(fallback || {}),
                    ...post,
                    image: shouldUseCanonicalSeedImage
                        ? fallback!.image
                        : hasValidImage
                            ? post.image
                            : 'https://placehold.co/1200x600?text=AIDAYNE+Blog'
                } as BlogPost;
            });
            setPosts(enhancedPosts);
        } else {
            setPosts(FALLBACK_POSTS);
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        setPosts(FALLBACK_POSTS);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredPosts = activeCategory === "All" 
    ? posts 
    : posts.filter(p => p.category === activeCategory);

  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);

  if (loading) return (
    <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-[#F5F5F7]">
       <div className="w-8 h-8 border-4 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#F5F5F7]">
      
      {/* =========================================
          MOBILE LAYOUT ( < 1024px )
          Premium Magazine Style
         ========================================= */}
      <div className="lg:hidden pb-24 pt-20">
        
        {/* 1. Ultra-Clean Sticky Header (Adjusted to avoid Navbar overlap) */}
        <div className={`sticky top-[56px] z-40 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-xl border-b border-gray-200/50 py-3' : 'bg-transparent pb-4'}`}>
            <div className="px-5 flex items-center justify-between mb-3">
                <h1 className={`text-2xl font-black text-gray-900 tracking-tighter transition-all origin-left ${isScrolled ? 'opacity-0 h-0 hidden' : 'opacity-100'}`}>
                    Khám phá
                </h1>
            </div>

            {/* Pills Categories */}
            <div className="flex overflow-x-auto no-scrollbar gap-2.5 px-5 pb-2">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`
                            whitespace-nowrap flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300
                            ${activeCategory === cat 
                                ? 'bg-black text-white shadow-md' 
                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                            }
                        `}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        <div className="px-5 mt-4 space-y-10">
            
            {/* 2. Hero Story Card (16:9 Compact) */}
            {featuredPost && (
                <Link to={`/blog/${featuredPost.slug || slugify(featuredPost.title)}`} className="block group relative w-full aspect-video rounded-3xl overflow-hidden shadow-[0_10px_30px_-15px_rgba(0,0,0,0.2)]">
                    <img 
                        src={featuredPost.image} 
                        alt={featuredPost.title}
                        onError={(e) => { e.currentTarget.src = '/blog/vpn-security.svg'; }}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />
                    {/* Gradient Mesh Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90"></div>
                    
                    <div className="absolute bottom-0 left-0 p-5 w-full">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/20 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-wider rounded-md border border-white/10">
                                <Sparkles size={10} className="text-yellow-400" /> Featured
                            </span>
                        </div>
                        <h2 className="text-lg font-black text-white leading-[1.25] mb-2 line-clamp-2">
                            {featuredPost.title}
                        </h2>
                        <div className="flex items-center gap-2 text-white/80 text-[10px] font-medium">
                            <span>{featuredPost.author}</span>
                            <span className="w-1 h-1 rounded-full bg-white/50"></span>
                            <span>{featuredPost.readTime} đọc</span>
                        </div>
                    </div>
                </Link>
            )}

            {/* 3. Trending (Horizontal Snap) */}
            <div>
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                        Trending <TrendingUp size={16} className="text-red-500" />
                    </h3>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Swipe</span>
                </div>
                
                <div className="flex overflow-x-auto gap-4 pb-4 -mx-5 px-5 snap-x snap-mandatory no-scrollbar">
                    {otherPosts.slice(0, 5).map((post) => (
                        <Link 
                            key={post.id} 
                            to={`/blog/${post.slug || slugify(post.title)}`}
                            className="snap-center flex-shrink-0 w-[240px] group"
                        >
                            <div className="aspect-video rounded-2xl overflow-hidden mb-3 relative shadow-sm border border-gray-100">
                                <img src={post.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wide">
                                    {post.category}
                                </div>
                            </div>
                            <h4 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
                                {post.title}
                            </h4>
                            <p className="text-[11px] text-gray-500 line-clamp-1">{post.excerpt}</p>
                        </Link>
                    ))}
                </div>
            </div>

            {/* 4. Latest Stories (Clean List) */}
            <div>
                <h3 className="text-lg font-black text-gray-900 mb-6">Latest Stories</h3>
                <div className="space-y-6">
                    {otherPosts.slice(5).map((post) => (
                        <Link 
                            key={post.id} 
                            to={`/blog/${post.slug || slugify(post.title)}`}
                            className="flex gap-4 items-start"
                        >
                            <div className="flex-1 min-w-0 py-0.5">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <span className="text-[8px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-md">{post.category}</span>
                                    <span className="text-[9px] font-bold text-gray-400">{post.readTime}</span>
                                </div>
                                <h4 className="text-[13px] font-bold text-gray-900 leading-snug line-clamp-2 mb-1.5">
                                    {post.title}
                                </h4>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-[7px] font-bold text-gray-500">
                                        {post.author.charAt(0)}
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-500">{post.author}</span>
                                </div>
                            </div>
                            <div className="w-28 aspect-video rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 shadow-sm border border-gray-100">
                                <img src={post.image} className="w-full h-full object-cover" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
      </div>

      {/* =========================================
          DESKTOP LAYOUT ( >= 1024px )
          Restored to Standard, Clean, Grid Layout
         ========================================= */}
      <div className="hidden lg:block pt-32 pb-24 max-w-7xl mx-auto px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Newsroom</h1>
            <p className="text-xl text-gray-500">Kiến thức, thủ thuật và tin tức công nghệ mới nhất.</p>
            
            {/* Desktop Categories */}
            <div className="flex items-center justify-center gap-2 mt-8">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === cat ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        {/* Featured Post (Landscape) */}
        {featuredPost && (
            <Link to={`/blog/${featuredPost.slug || slugify(featuredPost.title)}`} className="group block mb-16">
                <div className="grid grid-cols-2 gap-8 items-center bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all">
                    <div className="aspect-[16/10] rounded-3xl overflow-hidden relative">
                        <img 
                            src={featuredPost.image} 
                            alt={featuredPost.title}
                            onError={(e) => { e.currentTarget.src = '/blog/vpn-security.svg'; }}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                    </div>
                    <div className="pr-8">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase">Featured</span>
                            <span className="text-gray-400 text-sm">• {featuredPost.date}</span>
                        </div>
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight group-hover:text-blue-600 transition-colors">
                            {featuredPost.title}
                        </h2>
                        <p className="text-gray-600 text-lg mb-6 line-clamp-3">
                            {featuredPost.excerpt}
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
                                {featuredPost.author.charAt(0)}
                            </div>
                            <div className="text-sm font-bold text-gray-900">{featuredPost.author}</div>
                        </div>
                    </div>
                </div>
            </Link>
        )}

        {/* Grid Posts */}
        <div className="grid grid-cols-3 gap-10">
            {otherPosts.map(post => (
                <Link key={post.id} to={`/blog/${post.slug || slugify(post.title)}`} className="group flex flex-col">
                    <div className="aspect-[16/10] rounded-3xl overflow-hidden mb-5 bg-gray-100 relative">
                        <img 
                            src={post.image} 
                            alt={post.title}
                            onError={(e) => { e.currentTarget.src = '/blog/ai-comparison.svg'; }}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold shadow-sm">
                            {post.category}
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                            {post.title}
                        </h3>
                        <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                            {post.excerpt}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wide">
                        <Clock size={12} /> {post.readTime} đọc
                    </div>
                </Link>
            ))}
        </div>

      </div>
    </main>
  );
};
