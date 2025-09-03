"use client";

import Link from "next/link";
import Form from "next/form";
import Image from "next/image";

import { Suspense } from "react";

import { Client, Databases, Query } from "appwrite";
import { useSession } from "next-auth/react";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { addLike, removeLike } from "@/app/utils/blogLikeHandling";

const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;
const API_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;

const client = new Client().setEndpoint(API_ENDPOINT).setProject(PROJECT_ID);

const database = new Databases(client);

function BlogsPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await database.listDocuments(
          DATABASE_ID,
          COLLECTION_ID,
          [Query.equal("author", "Wiame"), Query.orderDesc("createdAt")]
        );
        const data = response.documents.filter((doc) =>
          doc.title.toLowerCase().startsWith(query.toLowerCase())
        );
        setResults(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [query]);

  return (
    <div
      className="flex flex-col items-center justify-center pt-5 pb-10 bg-secondary/5 text-right font-rubik"
      dir="rtl"
    >
      <div className="max-w-6xl w-full px-5 md:px-8 lg:px-12 ">
        <p className="font-rubik text-sm pointer-cursor">
          <Link href="/blogs/wiame" className="text-primary underline ">
            وئام أيت صالح
          </Link>
          ,<span> </span>
          <Link href="/blogs/ghita" className="">
            غيتة اياسومان
          </Link>
        </p>
        <h1 className="font-reemkufi text-5xl mt-10 text-primary">المدونات</h1>
        <div className=" mt-5 ">
          <div className="relative max-w-2xl">
            {
              <Form action="/blogs/wiame">
                <input
                  name="query"
                  placeholder="ابحث عن شيء ما"
                  className="w-full py-[6px] px-[10px]  border-2 border-black rounded-md focus:outline-none pl-7 "
                />
                <button
                  type="submit"
                  className="absolute left-2 top-2 cursor-pointer"
                >
                  <Image
                    src={"/searchIcon.svg"}
                    width={25}
                    height={25}
                    alt="Search Icon"
                  />
                </button>
              </Form>
            }
          </div>
          <div className="mt-10">
            <div className="flex gap-5 justify-start flex-wrap">
              {results.length === 0 ? (
                <p className="text-lg text-black/70">
                  No blogs have been posted yet.
                </p>
              ) : (
                results.map((blog) => (
                  <div
                    className="bg-secondary/15 rounded-lg px-[10px] py-[10px] w-72 min-h-88"
                    style={{
                      boxShadow: "-4px 4px 8px 0 rgba(196,147,86,0.4)",
                    }}
                    key={blog.$id}
                  >
                    <div className="flex flex-col justify-between h-full">
                      <div>
                        <h3 className="text-sm  font-medium">{blog.title}</h3>
                        <span className="text-sm text-black/90 ">
                          نشرت في {blog.$createdAt.split("T")[0]}
                        </span>
                        <p className="text-sm  mt-2 break-words">
                          {blog.description}
                        </p>
                      </div>
                      <div>
                        <div className="flex">
                          {blog.tags.map((tag, id) => (
                            <span
                              className="ml-2 text-black/80 text-sm"
                              key={id}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              {blog.likes.includes(session?.user?.email) ? (
                                <button
                                  className="cursor-pointer"
                                  onClick={() =>
                                    removeLike(
                                      blog.$id,
                                      session.user.email,
                                      setResults,
                                      true
                                    )
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
                                    addLike(
                                      blog.$id,
                                      session?.user?.email,
                                      setResults,
                                      true
                                    )
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
                              <span> {blog.likes.length} </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Link
                                href={`/blogs/wiame/${blog.$id}#comments`}
                                className="cursor-pointer"
                              >
                                <Image
                                  src={"/commentIcon.svg"}
                                  width={28}
                                  height={28}
                                  alt="Read More"
                                />
                              </Link>
                              <span> {blog?.commentsId?.length} </span>
                            </div>
                          </div>
                          {session?.user?.email ===
                            process.env.NEXT_PUBLIC_WIAME_MAIL && (
                            <button
                              className="cursor-pointer"
                              onClick={async () => {
                                try {
                                  await database.deleteDocument(
                                    DATABASE_ID,
                                    COLLECTION_ID,
                                    blog.$id
                                  );
                                  setResults((results) =>
                                    results.filter(
                                      (item) => item.$id !== blog.$id
                                    )
                                  );
                                } catch (error) {
                                  console.log(error);
                                }
                              }}
                            >
                              <Image
                                src={"/trashIcon.svg"}
                                width={24}
                                height={24}
                                alt="Delete"
                              />
                            </button>
                          )}
                        </div>
                        <Link href={`/blogs/wiame/${blog.$id}`}>
                          <button className="py-[10px] w-full bg-secondary rounded-md  text-sm cursor-pointer mt-5 hover:bg-secondary/80">
                            اقرأ المزيد
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="flex flex-col items-start mt-10">
            {/* <button className="py-[10px] w-full bg-secondary rounded-md  text-sm cursor-pointer  hover:bg-secondary/80 max-w-72">
              تحميل المزيد
            </button> */}
            {session?.user?.email === process.env.NEXT_PUBLIC_WIAME_MAIL && (
              <Link
                href="/blogs/wiame/create"
                className="py-[10px] w-full bg-secondary rounded-md text-center text-sm cursor-pointer mt-5 hover:bg-secondary/80 max-w-72"
              >
                إنشاء مدونة
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlogsContent() {
  return (
    <Suspense fallback={<div dir="rtl">جاري تحميل معلمات البحث...</div>}>
      <BlogsPageContent />
    </Suspense>
  );
}
