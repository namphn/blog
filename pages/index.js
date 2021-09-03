import Layout from "../components/Layout";
import { posts } from "../posts";
import Link from "next/link";

const axios = require('axios').default;

const getPost = async () => {
  const allPost = await axios.get("http://localhost:8082/post")
                              .then(response => {
                                if(response.status == 200) {
                                  console.log(response.data.data)
                                  return response.data.data
                                }  
                              })
                              .catch(error => {
                                return []
                              })
}

const Index = ({ posts }) => {

  getPost();

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
      {posts.map((post, i) => {
        const { frontmatter, slug } = post;
        const { description, date, title } = frontmatter;

        return (
          <Link href={`/blog/${slug}`} key={i}>
            <article className="flex flex-col shadow my-4">
              <a href="#" className="hover:opacity-75">
                <img src="https://source.unsplash.com/collection/1346951/1000x500?sig=2" />
              </a>
              <div className="bg-white flex flex-col justify-start p-6">
                <a href="#" className="text-blue-700 text-sm font-bold uppercase pb-4">Automotive, Finance</a>
                <a href="#" className="text-3xl font-bold hover:text-gray-700 pb-4">Lorem Ipsum Dolor Sit Amet Dolor Sit Amet</a>
                <p href="#" className="text-sm pb-3">
                  By <a href="#" className="font-semibold hover:text-gray-800">David Grzyb</a>, Published on January 12th, 2020
                </p>
                <a href="#" className="pb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis porta dui. Ut eu iaculis massa. Sed ornare ligula lacus, quis iaculis dui porta volutpat. In sit amet posuere magna..</a>
                <a href="#" className="uppercase text-gray-800 hover:text-black">Continue Reading <i className="fas fa-arrow-right"></i></a>
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