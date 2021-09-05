import Layout from "../components/Layout";
import { posts } from "../posts";
import Link from "next/link";
import React from "react";

const axios = require('axios').default;

const getPost = async () => {
  const allPost = await axios.get("http://localhost:8082/post")
                              .then(response => {
                                if(response.status == 200) {
                                  return response.data.data
                                }  
                              })
                             .catch(error => {
                                return []
                              })

  return allPost;
                              
}

const Index = () => {

  const [posts, setPost] = React.useState([]);

  React.useEffect(() => {
    axios.get("http://localhost:8082/post")
      .then(response => {
        if(response.status == 200) {
          setPost(response.data.data)
        }  
      })
  }, [])

  

  return (
    <Layout pageTitle="My Blog">
      <PostsList posts={posts} />
    </Layout>
  );
};


const PostsList = ({posts}) => {
  if (!posts || !posts.length) return <p>Loading!</p>;
  return (
    <>
      {posts.map((post) => {
        const { id, summary, tagName, lastName, firstName, publishedAt, title, image_intro} = post;
        let tagShow = "";
        tagName.forEach(element => {
          tagShow += element + ", ";
          
        });
        tagShow = tagShow.slice(0, tagShow.length - 2)

        // Split timestamp into [ Y, M, D, h, m, s ]
        var t = publishedAt.split(/[- :]/);

        // Apply each element to the Date function
        var d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
        

        return (
          <Link href={`/blog/${id}
          
          }`} key={id}>
            <article className="flex flex-col shadow my-4">
              <a href="#" className="hover:opacity-75">
                <img style={styleImge} src={image_intro} />
              </a>
              <div className="bg-white flex flex-col justify-start p-6">
                <a href="#" className="text-blue-700 text-sm font-bold uppercase pb-4">{
                  tagShow
                }</a>
                <a href="#" className="text-3xl font-bold hover:text-gray-700 pb-4">{title}</a>
                <p href="#" className="text-sm pb-3">
                  By <a href="#" className="font-semibold hover:text-gray-800">{firstName + " " + lastName}</a>, Published on {d.toString().slice(0,15)}
                </p>
                <a href="#" className="pb-6">{summary}</a>
                <a href="#" className="uppercase text-gray-800 hover:text-black">Continue Reading <i className="fas fa-arrow-right"></i></a>
              </div>
            </article>
          </Link>
        );
      })}
    </>
  );
};

const styleImge = {
  "width" : '100%', "height": "20em", "object-fit": "cover"
}

export async function getStaticProps() {
  const postsData = posts();

  return {
    props: {
      posts: postsData,
    },
  };
}

export default Index;