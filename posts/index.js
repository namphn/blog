import matter from "gray-matter";

export const posts = () =>
  ((context) => {
    const keys = context.keys();
    const documents = keys.map(context);

    return keys
      .map((key, index) => {
        // We'll use the filename as a 'slug' for the post - this will be used for the post's route
        const slug = key.replace(/^.*[\\\/]/, "").slice(0, -3);
        const document = documents[index];
        const { data: frontmatter, content: body } = matter(document.default);

        return { frontmatter, body, slug };
      })
      .sort(
        (post1, post2) =>
          new Date(post2.frontmatter.date) - new Date(post1.frontmatter.date)
      );
  })(
    // Since Next.js uses webpack we can take advantage of webpack's `require.context` to load our markdown files
    require.context("./", true, /\.md$/)
  )

export const postSlugs = () =>
  ((context) => {
    return context
      .keys()
      .map((key) => key.replace(/^.*[\\\/]/, "").slice(0, -3));
  })(require.context("./", true, /\.md$/));

  export const postForSlug = async (slug) => {
    const document = await import(`./${slug}.md`);
    const { data: frontmatter, content: body } = matter(document.default);
  
    return { frontmatter, body, slug };
  };