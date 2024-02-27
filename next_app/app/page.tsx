'use client';

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState();

  const fetchPost = async () => {
    const res = await fetch("http://localhost:8000/test/user/1/posts", {
      method: "Get",
      headers: {
        authorization: `bearer ${session?.user.accessToken}`,
      }
    });
    const response = await res.json();
    setPosts(response);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Home Page</h1>
      <button onClick={fetchPost}>Get User Posts</button>
      {posts && JSON.stringify(posts)}
    </main>
  );
}
