import { Client, Databases, Query, ID } from "appwrite";
import { useSession } from "next-auth/react";

const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;
const API_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;

const client = new Client().setEndpoint(API_ENDPOINT).setProject(PROJECT_ID);

const database = new Databases(client);

export async function addLike(blogId, usermail, setResults, listOfResults) {
  if (!usermail) {
    alert("Please sign in to like the blog.");

    return;
  }

  try {
    // 1. Get the blog document
    const blog = await database.getDocument(DATABASE_ID, COLLECTION_ID, blogId);

    // 2. Add username if not already liked
    const likes = blog.likes || [];
    if (!likes.includes(usermail)) {
      if (listOfResults) {
        setResults((prev) =>
          prev.map((blog) =>
            blog.$id === blogId
              ? { ...blog, likes: [...blog.likes, usermail] }
              : blog
          )
        );
      } else {
        setResults({ ...blog, likes: [...blog.likes, usermail] });
      }
      likes.push(usermail);
    }

    // 3. Update document
    await database.updateDocument(DATABASE_ID, COLLECTION_ID, blogId, {
      likes: likes,
    });
  } catch (err) {
    console.error(err);
  }
}

export async function removeLike(blogId, usermail, setResults, listOfResults) {
  if (!usermail) {
    alert("Please sign in to like the blog.");

    return;
  }
  try {
    const blog = await database.getDocument(DATABASE_ID, COLLECTION_ID, blogId);

    if (listOfResults) {
      setResults((prev) =>
        prev.map((blog) =>
          blog.$id === blogId
            ? { ...blog, likes: blog.likes.filter((mail) => mail !== usermail) }
            : blog
        )
      );
    } else {
      setResults({
        ...blog,
        likes: blog.likes.filter((mail) => mail !== usermail),
      });
    }
    const likes = (blog.likes || []).filter((mail) => mail !== usermail);

    await database.updateDocument(DATABASE_ID, COLLECTION_ID, blogId, {
      likes: likes,
    });
  } catch (err) {
    console.error(err);
  }
}
