import { useRouter } from "next/router";

export const getStaticPaths = () => {
  return {
    paths: [{ params: { postId: "5" } }, { params: { postId: "10" } }],
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const data = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  );
  const serializedData = await data.json();
  return {
    props: {
      post: serializedData || null,
    },
  };
};

const PostDetails = ({ post }) => {
  const router = useRouter();
  //const { postId } = router.query;
  //console.log(router);

  return router.isFallback ? (
    <h1>loading....</h1>
  ) : (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};
export default PostDetails;
