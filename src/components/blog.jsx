import AnimatedButton from "./button-strate";
import { useState, useEffect } from "react";
import bimg from '../assets/bimg.svg';
import tabsimg from "../tabs-data/galleryimg1.svg";

function Blog() {
    const [blogposts, setBlogposts] = useState([]);
    const [visiblePosts, setVisiblePosts] = useState(20); // Default to show first 20 posts

    useEffect(() => {
        const fetchBlogPosts = async () => {
            try {
                const response = await fetch(
                    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@xisvariable"
                );
                const data = await response.json();
                const items = data.items || [];
                setBlogposts(items);
            } catch (error) {
                console.error("Error fetching blog posts:", error);
            }
        };
        fetchBlogPosts();
    }, []);

    // Extracts the first image URL from the content
    const extractImageUrl = (content) => {
        const imgRegex = /<img[^>]+src="([^">]+)"/g;
        const match = imgRegex.exec(content);
        return match ? match[1] : null;
    };

    // Removes all HTML tags from the given string
    const stripTags = (html) => {
        return html.replace(/<\/?[^>]+(>|$)/g, "");
    };

    const handleShowAll = () => {
        setVisiblePosts(blogposts.length); // Show all posts when "Show All" is clicked
    };

    const latestPost = blogposts[0]; // Most recent post

    return (
        <section className="space-y-2 lg:space-y-9">
            {latestPost && (
                <section className="space-y-2 lg:space-y-8">
                    <h1 className="font-semibold lg:font-bold text-lg lg:text-5xl md:text-5xl w-full lg:w-9/12">
                        {latestPost.title}
                    </h1>
                    <p className="text-[#5F6980] font-normal text-base md:text-xl m-auto">
  {stripTags(latestPost.description).split(' ').slice(0, 70).join(' ')}...
</p>

                    <AnimatedButton
                        text="Read article"
                        buttonClass="bg-[#F8F7FB] border-0"
                        onClick={() => window.open(latestPost.link, "_blank")}
                    />
                    <div className="w-full h-[55vh] py-6">
                        <img
                            src={extractImageUrl(latestPost.content) || latestPost.thumbnail || bimg}
                            className="w-full h-full rounded-md object-cover mx-auto"
                            alt={latestPost.title}
                        />
                    </div>
                </section>
            )}

            <h1 className="font-[inter] lg:text-4xl lg:font-semibold text-xl font-bold">
                Latest Articles
            </h1>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:grid-cols-3">
                {blogposts.slice(1, visiblePosts).map((post, index) => (
                    <div key={index} className="space-y-6">
                        <div className="h-[13rem]">
                            <img
                                src={extractImageUrl(post.content) || post.thumbnail || tabsimg}
                                className="w-full object-cover rounded-3xl h-full"
                                alt={post.title}
                            />
                        </div>
                        <h3 className="text-2xl font-semibold">{post.title}</h3>
                        <p className="text-[#5F6980]">
  {stripTags(post.description).split(' ').slice(0, 30).join(' ')}...
</p>
 <div>
  <a
                            href={post.link}
                            className="text-[#7C71DF] text-sm rounded-3xl p-3 bg-[#F8F7FB] w-fit"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Read More
                        </a>   
 </div>
                       
                    </div>
                ))}
            </section>
            {visiblePosts < blogposts.length && (
                <AnimatedButton
                    buttonClass="m-auto"
                    textClass=""
                    text="Show All"
                    onClick={handleShowAll}
                />
            )}
        </section>
    );
}

export default Blog;

