import Layout from "../components/Layout";
import { posts } from "../posts";
import Link from "next/link";

const Index = ({ posts }) => {
  return (
    <Layout pageTitle="My Blog">
      <PostsList posts={posts} />
    </Layout>
  );
};


const PostsList = ({ posts }) => {
  if (!posts || !posts.length) return <p>No posts found</p>;

  return (
    <>
      {posts.map((post) => {
        const { frontmatter, slug } = post;
        const { description, date, title } = frontmatter;

        return (
          <Link href={`/blog/${slug}`}>
            <article class="flex flex-col shadow my-4">
              <a href="#" class="hover:opacity-75">
                <img src="https://source.unsplash.com/collection/1346951/1000x500?sig=2" />
              </a>
              <div class="bg-white flex flex-col justify-start p-6">
                <a href="#" class="text-blue-700 text-sm font-bold uppercase pb-4">Automotive, Finance</a>
                <a href="#" class="text-3xl font-bold hover:text-gray-700 pb-4">Lorem Ipsum Dolor Sit Amet Dolor Sit Amet</a>
                <p href="#" class="text-sm pb-3">
                  By <a href="#" class="font-semibold hover:text-gray-800">David Grzyb</a>, Published on January 12th, 2020
                </p>
                <a href="#" class="pb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis porta dui. Ut eu iaculis massa. Sed ornare ligula lacus, quis iaculis dui porta volutpat. In sit amet posuere magna..</a>
                <a href="#" class="uppercase text-gray-800 hover:text-black">Continue Reading <i class="fas fa-arrow-right"></i></a>
              </div>
            </article>
          </Link>
        );
      })}
    </>
  );
};

export async function getStaticProps() {
  const postsData = posts();

  return {
    props: {
      posts: postsData,
    },
  };
}

export default Index;