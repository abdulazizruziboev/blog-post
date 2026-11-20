import { Link } from "react-router-dom";
import HeroImage from "../../assets/images/landing-hero.jpg";
import Lightning from "../../assets/images/lightning.svg";
import Shield from "../../assets/images/shield.svg";
import Settings from "../../assets/images/settings.svg";
import Calendar from "../../assets/images/calendar.svg";
import PostOne from "../../assets/images/post-1.png";
import PostTwo from "../../assets/images/post-2.png";
import PostThree from "../../assets/images/post-3.png";

const features = [
  { icon: Lightning, title: "Fast", description: "Lightning-fast performance with modern web technologies for the best reading experience." },
  { icon: Shield, title: "Secure", description: "Your data is protected with industry-standard security practices and encryption." },
  { icon: Settings, title: "Easy to Manage", description: "Intuitive admin dashboard makes content management effortless and enjoyable." },
];

const posts = [
  { image: PostOne, category: "Technology", date: "Nov 20, 2025", title: "The Future of Web Development", description: "Exploring the latest trends and technologies shaping the future of web development in 2024." },
  { image: PostTwo, category: "Productivity", date: "Nov 18, 2025", title: "Mastering Productivity", description: "Proven strategies and tools to boost your productivity and achieve your goals faster." },
  { image: PostThree, category: "Design", date: "Nov 15, 2025", title: "Design Principles That Matter", description: "Essential design principles every creator should know to build stunning user experiences." },
];

function ArrowRight() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4"><path d="M5 12h14M12 5l7 7-7 7" /></svg>;
}

export default function HomePage() {
  return (
    <main>
      <section className="bg-linear-to-r from-[#F7F1FD] to-[#F1F1FE] px-4 py-20 lg:py-32">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-12 lg:flex-row">
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold leading-tight text-[#0F1729] sm:text-6xl">Create, Read, <br /><span className="text-[#8524E5]">Inspire.</span></h1>
            <p className="my-6 max-w-md text-lg leading-7 text-[#6B7280] sm:text-xl">Discover stories written by amazing people. Share your knowledge and inspire others with your unique perspective.</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/posts" className="flex items-center gap-2 rounded-xl bg-linear-to-r from-[#8524E5] to-[#4346EF] px-8 py-3 font-medium text-white">Explore Posts <ArrowRight /></Link>
              <Link to="/login" className="rounded-xl border border-black/10 bg-white px-8 py-3 font-medium text-[#0F1729]">Get Started</Link>
            </div>
          </div>
          <img src={HeroImage} alt="Creative workspace" className="w-full max-w-xl rounded-2xl object-cover shadow-2xl" />
        </div>
      </section>

      <section className="px-4 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-3xl font-bold text-[#0F1729] sm:text-4xl">Why Choose Blogify?</h2>
            <p className="mt-4 text-[#6B7280]">Built with modern technologies and best practices to provide the best blogging experience.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {features.map((feature) => <article key={feature.title} className="rounded-xl border border-[#E5E7EB] p-8">
              <span className="flex size-12 items-center justify-center rounded-xl bg-[#EEEEFF]"><img src={feature.icon} alt="" className="size-6" /></span>
              <h3 className="mt-5 text-xl font-semibold text-[#0F1729]">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#6B7280]">{feature.description}</p>
            </article>)}
          </div>
        </div>
      </section>

      <section className="bg-[#F9FAFB] px-4 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div><h2 className="text-3xl font-bold text-[#0F1729] sm:text-4xl">Latest Posts</h2><p className="mt-2 text-[#6B7280]">Check out our most recent articles</p></div>
            <Link to="/posts" className="flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-5 py-2.5 text-sm font-medium text-[#0F1729]">View All <ArrowRight /></Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {posts.map((post) => <article key={post.title} className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white">
              <div className="relative"><img src={post.image} alt="" className="aspect-[2/1] w-full object-cover" /><span className="absolute left-4 top-4 rounded-full bg-[#4346EF] px-3 py-1 text-xs font-medium text-white">{post.category}</span></div>
              <div className="p-6">
                <p className="flex items-center gap-2 text-xs text-[#6B7280]"><img src={Calendar} alt="" className="size-4" />{post.date}</p>
                <h3 className="mt-4 text-lg font-semibold text-[#0F1729]">{post.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#6B7280]">{post.description}</p>
                <Link to="/posts" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#4346EF]">Read more <ArrowRight /></Link>
              </div>
            </article>)}
          </div>
        </div>
      </section>
    </main>
  );
}
