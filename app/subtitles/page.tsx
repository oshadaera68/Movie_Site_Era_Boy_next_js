import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import posts from "@/data/posts";

export default function SubtitlesPage() {
  const subtitlePosts = posts.filter(
    post => post.category === "subtitles"
  );

  return (
    <>
      <Header />
      <Navbar />

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-6">
        {/* LEFT CONTENT */}
        <section className="md:col-span-2 space-y-6">
          <div className="bg-red-700 px-4 py-2 font-bold rounded">
            Recently Added
          </div>

          {subtitlePosts.map(post => (
              <PostCard key={post.id} post={post} />
          ))}
        </section>

        {/* RIGHT SIDEBAR */}
        <Sidebar />
      </main>
    </>
  );
}
