import React from "react";
import { useRouter } from "next/router";

import { useQueryClient } from "@tanstack/react-query";
import useCustomInfiniteQuery from "@/hooks/useCustomInfiniteQuery";

const ServerDetailsPage = () => {
  //   const {
  //     data,
  //     isFetching,
  //     error,
  //     status,
  //     fetchNextPage,
  //     hasNextPage,
  //     isFetchingNextPage,
  //   } = useCustomInfiniteQuery(filter, sorter, pageSize, app);
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <h1>Server Details</h1>
      <p>Server ID: {id}</p>
      <button onClick={() => router.back()}>Get Back</button>
    </div>
  );
};

export default ServerDetailsPage;

// import React from 'react';
// import { useRouter } from 'next/router';

// // Import other components or functions as needed
// // ...

// const ServerDetailsPage = () => {
//   const router = useRouter();
//   const { id } = router.query;

//   // Fetch server details based on the `id` parameter
//   // ...

//   return (
//     <div>
//       {/* Render the server details */}
//       <h1>Server ID: {id}</h1>
//       {/* Display server details */}
//       {/* ... */}
//     </div>
//   );
// };

// export default ServerDetailsPage;

// const PostView = () => {
//     const router = useRouter();
//     const { postId } = router.query;

//     const { data: fetchedPost, isLoading } = usePost(postId as string);

//     if (isLoading || !fetchedPost) {
//       return (
//         <div className="flex justify-center items-center h-full">
//           <ClipLoader color="lightblue" size={80} />
//         </div>
//       );
//     }

//     return (
//       <>
//         <Header showBackArrow label="Tweet" />
//         <PostItem data={fetchedPost} />
//         <Form postId={postId as string} isComment placeholder="Tweet your reply" />
//         <CommentFeed comments={fetchedPost?.comments} />
//       </>
//     );
//   };

//   export default PostView;
