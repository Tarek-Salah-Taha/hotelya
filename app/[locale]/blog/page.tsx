import Image from "next/image";

export default function BlogPage() {
  const featuredPosts = [
    {
      title: "10 Hidden Gem Hotels in Europe",
      content:
        "Discover charming boutique hotels across Europe, from a converted monastery in Portugal to a vineyard hotel in Tuscany. The Hotel Alpina in Switzerland offers stunning mountain views and homemade cheeses from their own dairy.",
      date: "June 15, 2023",
      readTime: "3 min read",
      category: "Destinations",
      image: "/blog-europe.jpg",
    },
    {
      title: "How to Get the Best Hotel Deals",
      content:
        "Booking directly with hotels often yields better rates than third-party sites. Loyalty programs can unlock member-only prices and room upgrades. For business hotels, Sunday nights are often the cheapest.",
      date: "June 8, 2023",
      readTime: "4 min read",
      category: "Tips",
      image: "/blog-deals.jpg",
    },
  ];

  const recentPosts = [
    {
      title: "The Future of Sustainable Hotels",
      content:
        "Over 60% of travelers prefer eco-friendly accommodations. New properties generate renewable energy through solar panels, while luxury resorts cut water usage by 40% with smart shower systems.",
      date: "June 1, 2023",
      category: "Trends",
    },
    {
      title: "72 Hours in Tokyo on a Budget",
      content:
        "Business hotels offer compact rooms under $80/night. Enjoy conveyor belt sushi (¥100-500 per plate) and ramen shops (¥800-1200). The ¥1,600 72-hour subway pass provides unlimited rides.",
      date: "May 25, 2023",
      category: "Destinations",
    },
  ];

  const categories = [
    { name: "All", count: 24 },
    { name: "Destinations", count: 8 },
    { name: "Tips", count: 6 },
    { name: "Trends", count: 5 },
    { name: "Innovation", count: 3 },
    { name: "Interviews", count: 2 },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-dark mb-4">
          Hotelya <span className="text-primary">Blog</span>
        </h1>
        <p className="text-xl text-text max-w-3xl mx-auto">
          Get travel tips, destination guides, and insider news from the world
          of hospitality.
        </p>
      </div>

      {/* Featured Posts */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-2">
          Featured Stories
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {featuredPosts.map((post, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index < 2}
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                  <span className="text-xs font-semibold text-primary">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Recent Posts */}
        <div className="lg:w-2/3">
          <h2 className="text-2xl font-bold text-dark mb-8 border-b pb-2">
            Latest Articles
          </h2>
          <div className="space-y-6">
            {recentPosts.map((post, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all border border-border"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-primary">
                    {post.category}
                  </span>
                  <span className="text-sm text-text/80">{post.date}</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                <p className="text-text">{post.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-border mb-8">
            <h3 className="text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category, index) => (
                <li key={index}>
                  <button className="flex justify-between items-center w-full text-left hover:text-primary transition-colors">
                    <span>{category.name}</span>
                    <span className="text-sm text-text/80">
                      ({category.count})
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
