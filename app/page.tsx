import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import posts from "@/data/posts";

export default function Home() {
    return (<div className="min-h-screen bg-[#0a0a0a]">
            <Header/>
            <Navbar/>

            {/* Centering Wrapper */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Feed */}
                    <section className="lg:col-span-2 space-y-6">
                        {posts.map((post) => (<PostCard key={post.id} post={post}/>))}
                    </section>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <Sidebar/>
                    </aside>
                </div>
            </main>
        </div>);
}