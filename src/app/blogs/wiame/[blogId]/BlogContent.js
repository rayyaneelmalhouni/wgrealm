"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Form from "next/form";
import Image from "next/image";

import { useSession } from "next-auth/react";

import { addLike, removeLike } from "@/app/utils/blogLikeHandling";

import {
  submitComment,
  handleCommentLike,
  handleDeleteComment,
  fetchBlogAndComments,
} from "@/app/utils/handleComment";

export default function BlogContent() {
  const { data: session } = useSession();
  const { blogId } = useParams(); // 👈 matches [blogId] folder name
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!blogId) return;
    setLoading(true);
    fetchBlogAndComments(blogId, setBlog, setComments, setLoading);
  }, [blogId]);

  if (!blog && loading) {
    return <p dir="rtl">جارٍ تحميل المدونة...</p>;
  }
  if (!blog && !loading) {
    return <p dir="rtl">لم يتم العثور على مدونة</p>;
  }

  return (
    <div
      className="font-rubik flex flex-col items-center justify-center bg-secondary/5"
      dir="rtl"
    >
      <div className="max-w-6xl w-full px-5 md:px-8 lg:px-12 pt-4">
        <Link
          href="/blogs/wiame"
          className=" text-sm cursor-pointer hover:text-primary transition-all"
        >
          العودة إلى صفحة المدونات
        </Link>
        <h2 className="font-reemkufi text-primary text-2xl mt-5">
          {blog?.title}
        </h2>
        <div className="mt-2 flex justify-between w-full">
          <p className="text-black/70">
            نشرت في {blog?.$createdAt?.split("T")[0]}
          </p>
          <div className="flex items-center gap-1">
            {blog?.likes?.includes(session?.user?.email) ? (
              <button
                className="cursor-pointer"
                onClick={() =>
                  removeLike(blog?.$id, session?.user?.email, setBlog, false)
                }
              >
                <Image
                  src={"/filledHeartIcon.png"}
                  width={28}
                  height={28}
                  alt="Read More"
                />
              </button>
            ) : (
              <button
                className="cursor-pointer"
                onClick={() =>
                  addLike(blog.$id, session?.user?.email, setBlog, false)
                }
              >
                <Image
                  src={"/emptyHeartIcon.svg"}
                  width={28}
                  height={28}
                  alt="Read More"
                />
              </button>
            )}
            <span> {blog?.likes?.length} </span>
          </div>
        </div>
        <div
          className="prose  my-5"
          dangerouslySetInnerHTML={{ __html: blog?.content }}
        />
        <div className="flex text-xs text-black/80 mt-1">
          {blog?.tags?.map((tag, id) => (
            <span className="ml-2 text-black/80 text-sm" key={id}>
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mt-4 font-reemkufi text-3xl text-primary" id="comments">
          تعليقات
        </h3>
        {
          <Form
            action={async (formData) =>
              await submitComment(
                formData,
                session,
                setComments,
                setBlog,
                blogId
              )
            }
            className="relative mt-2 max-w-xl"
          >
            <input
              name="commentquery"
              placeholder="علق على المدونة"
              className="w-full py-[6px] px-9 font-rubik border-2 border-black rounded-md focus:outline-none "
            />
            <Image
              src={session?.user?.image || "/noUserIcon.png"}
              width={25}
              height={25}
              alt="Search Icon"
              className="absolute right-2 top-2 rounded-full "
            />
            <button
              type="submit"
              className="absolute left-2 top-2 cursor-pointer
            rotate-z-250"
            >
              <Image
                src={"/sendIcon.png"}
                width={25}
                height={25}
                alt="Search Icon"
              />
            </button>
          </Form>
        }

        {comments.map((comment) => (
          <div className="mt-5" key={comment.$id}>
            <p className="text-secondary">{comment.usermail}</p>
            <p>{comment.comment}</p>
            <div className="flex justify-between items-center mt-2">
              <div className="flex gap-2 items-center">
                <button
                  className="cursor-pointer"
                  onClick={async () =>
                    await handleCommentLike(
                      comment.$id,
                      session,
                      comments,
                      setComments
                    )
                  }
                >
                  {comment?.likes?.includes(session?.user?.email) ? (
                    <Image
                      src="/filledHeartIcon.png"
                      alt="Filled heart Icon"
                      width={28}
                      height={28}
                    />
                  ) : (
                    <Image
                      src="/emptyHeartIcon.svg"
                      alt="Empty heart Icon"
                      width={28}
                      height={28}
                    />
                  )}
                </button>
                <span className="text-lg">{comment.likes.length}</span>
              </div>
              {comment?.usermail === session?.user?.email && (
                <button
                  className="cursor-pointer"
                  onClick={async () =>
                    await handleDeleteComment(
                      comment.$id,
                      session,
                      comments,
                      setComments,
                      blogId
                    )
                  }
                >
                  <Image
                    src="/trashIcon.svg"
                    alt="trash Icon"
                    width={20}
                    height={24}
                  />
                </button>
              )}
            </div>
          </div>
        ))}

        <div className="flex justify-center md:justify-start mb-10">
          {/* <button className="py-[10px] w-full bg-secondary rounded-md font-rubik text-sm cursor-pointer hover:bg-secondary/80 max-w-72 mb-5 mt-7">
            تحميل المزيد
          </button> */}
        </div>
      </div>
    </div>
  );
}
