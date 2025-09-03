import { useSession } from "next-auth/react";

import { ID, Query } from "appwrite";
import { Client, Databases } from "appwrite";

const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;
const COMMENTS_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_COMMENTS_COLLECTION_ID;
const API_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;

const client = new Client().setEndpoint(API_ENDPOINT).setProject(PROJECT_ID);
const database = new Databases(client);

export const submitComment = async (
  formData,
  session,
  setComments,
  setBlog,
  blogId
) => {
  const comment = formData.get("commentquery");

  if (session?.user?.email === undefined) {
    alert("You must be logged in to comment.");
    return;
  }
  if (!comment) {
    alert("Comment should be at least 1 character.");
    return;
  }
  try {
    const freshBlog = await database.getDocument(
      DATABASE_ID,
      COLLECTION_ID,
      blogId
    );
    const blogComment = await database.createDocument(
      DATABASE_ID,
      COMMENTS_COLLECTION_ID,
      ID.unique(),
      {
        comment,
        likes: [],
        usermail: session.user.email,
      }
    );
    const blogCommentsId = freshBlog.commentsId || [];
    await database.updateDocument(DATABASE_ID, COLLECTION_ID, blogId, {
      commentsId: [...blogCommentsId, blogComment.$id],
    });
    setComments((prev) => [...prev, blogComment]);
    setBlog((prev) => ({
      prev,
      commentsId: [...(prev.commentsId || []), blogComment.$id],
    }));
  } catch (error) {
    console.error(error);
  }
};

export const handleCommentLike = async (
  commentId,
  session,
  comments,
  setComments
) => {
  if (!session?.user?.email) {
    alert("Log In to like a Comment");
    return;
  }

  // find the comment first
  const comment = comments.find((c) => c.$id === commentId);
  if (!comment) return;

  const alreadyLiked = comment.likes?.includes(session.user.email);

  // compute new likes
  const newLikes = alreadyLiked
    ? comment.likes.filter((l) => l !== session.user.email) // unlike
    : [...(comment.likes || []), session.user.email]; // like

  try {
    // 🔹 update local state first (optimistic update)
    setComments((prev) =>
      prev.map((c) => (c.$id === commentId ? { ...c, likes: newLikes } : c))
    );

    // 🔹 then update in database
    await database.updateDocument(
      DATABASE_ID,
      COMMENTS_COLLECTION_ID,
      commentId,
      { likes: newLikes }
    );
  } catch (error) {
    console.error("Failed to update like:", error);

    // rollback if DB update fails
    setComments((prev) =>
      prev.map(
        (c) => (c.$id === commentId ? comment : c) // revert to original comment
      )
    );
  }
};

export const handleDeleteComment = async (
  commentId,
  session,
  comments,
  setComments,
  blogId
) => {
  if (!session?.user?.email) {
    alert("Log in to delete a comment");
    return;
  }

  // find the comment locally
  const comment = comments?.find((c) => c.$id === commentId);
  if (!comment) {
    console.warn(
      `Comment ${commentId} not found locally. Cleaning blog references.`
    );
  } else if (comment.usermail !== session.user.email) {
    alert("You should be the comment owner to delete it");
    return;
  }

  // Optimistic UI update
  setComments((prev) => prev.filter((c) => c.$id !== commentId));

  try {
    // Delete comment if it exists
    if (comment) {
      await database.deleteDocument(
        DATABASE_ID,
        COMMENTS_COLLECTION_ID,
        commentId
      );
    }

    // Clean up blog's commentsId (remove orphaned IDs)
    const blogData = await database.getDocument(
      DATABASE_ID,
      COLLECTION_ID,
      blogId
    );
    const validCommentIds = [];

    for (const cid of blogData.commentsId || []) {
      try {
        await database.getDocument(DATABASE_ID, COMMENTS_COLLECTION_ID, cid);
        validCommentIds.push(cid); // keep only existing comments
      } catch {
        console.warn(`Comment ${cid} not found, removing from blog`);
      }
    }

    // Update blog only if there are removed IDs
    if (validCommentIds.length !== (blogData.commentsId?.length || 0)) {
      await database.updateDocument(DATABASE_ID, COLLECTION_ID, blogId, {
        commentsId: validCommentIds,
      });
    }
  } catch (error) {
    console.error("Failed to delete comment:", error);
    // Optional: rollback UI state by refetching comments
  }
};

export const fetchBlogAndComments = async (
  blogId,
  setBlog,
  setComments,
  setLoading
) => {
  try {
    const response = await database.getDocument(
      DATABASE_ID,
      COLLECTION_ID,
      blogId
    );
    setBlog(response);

    if (response.commentsId?.length > 0) {
      const results = await Promise.allSettled(
        response.commentsId.map((commentId) =>
          database.getDocument(DATABASE_ID, COMMENTS_COLLECTION_ID, commentId)
        )
      );

      // keep only the fulfilled results
      const existingComments = [];
      const validCommentIds = [];

      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          existingComments.push(result.value);
          validCommentIds.push(response.commentsId[index]);
        } else {
          console.warn(
            `Comment ${response.commentsId[index]} not found, removing from blog`
          );
        }
      });

      setComments(
        existingComments.sort(
          (a, b) => (b.likes?.length || 0) - (a.likes?.length || 0)
        )
      );

      // 🔹 update blog if there were invalid comment IDs
      if (validCommentIds.length !== response.commentsId.length) {
        await database.updateDocument(DATABASE_ID, COLLECTION_ID, blogId, {
          commentsId: validCommentIds,
        });
      }
    }
  } catch (error) {
    console.error("Failed to fetch blog:", error);
  }
  setLoading(false);
};
