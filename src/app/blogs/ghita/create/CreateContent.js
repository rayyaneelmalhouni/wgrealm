"use client";

import Link from "next/link";
import Form from "next/form";
import verifyFormPublish from "@/app/utils/verifyFormPublish";

import { Client, Databases, Query, ID } from "appwrite";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

import { useRef } from "react";

import BlogEditor from "@/components/BlogEditor";

const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;
const API_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;

const client = new Client().setEndpoint(API_ENDPOINT).setProject(PROJECT_ID);

const database = new Databases(client);

export default function CreateContent() {
  const editorRef = useRef();
  const { data: session } = useSession();
  if (session?.user?.email !== process.env.NEXT_PUBLIC_GHITA_MAIL) {
    redirect("/blogs/ghita");
  }

  // Custom toolbar options

  return (
    <div className="font-poppins flex flex-col items-center justify-center bg-secondary/5">
      <div className="max-w-6xl w-full px-5 md:px-8 lg:px-12 pt-4">
        <Link
          href="/blogs/ghita"
          className=" text-sm cursor-pointer hover:text-primary transition-all"
        >
          Return to Blogs Page
        </Link>
        <h2 className="font-dmSerifText text-primary text-3xl mt-5">
          Create a Blog
        </h2>
        {
          <Form action="/blogs/ghita">
            <h2 className="text-[22px] mt-2">Title</h2>
            <input
              name="title"
              placeholder="Write your blog title here"
              className="w-full py-[6px] px-[10px] font-poppins border-2 border-black rounded-md focus:outline-none max-w-3xl "
            />
            <h2 className="text-[22px] mt-6">Description</h2>
            <input
              name="description"
              placeholder="Write your blog description here"
              className="w-full py-[6px] px-[10px] font-poppins border-2 border-black rounded-md focus:outline-none  max-w-3xl"
            />
            <h2 className="text-[22px] mt-6">Tags</h2>
            <input
              name="tags"
              placeholder="Seperate tags with a space"
              className="w-full py-[6px] px-[10px] font-poppins border-2 border-black rounded-md focus:outline-none  max-w-3xl"
            />
            <h2 className="text-[22px] mt-6 mb-2">Content</h2>
            {/* <textarea
              name="content"
              placeholder="Write your content  here"
              className="w-full py-[6px] px-[10px] font-poppins border-2 border-black rounded-md focus:outline-none  max-w-3xl"
            /> */}
            <BlogEditor
              isArabic={false}
              style={{ fontFamily: "poppins, sans-serif" }}
              ref={editorRef}
            />
            <div className="flex justify-start">
              <button
                type="submit"
                className="py-[10px] w-full bg-secondary rounded-md font-poppins text-sm cursor-pointer  hover:bg-secondary/80 max-w-72 mt-6 mb-5"
                onClick={async (e) => {
                  e.preventDefault();
                  const form = e.target.form;
                  const htmltext = editorRef.current?.getHTML();
                  if (verifyFormPublish(form, htmltext).state === false) {
                    alert(verifyFormPublish(form, htmltext).message);
                  } else {
                    try {
                      await database.createDocument(
                        DATABASE_ID,
                        COLLECTION_ID,
                        ID.unique(),
                        {
                          title: form.title.value,
                          description: form.description.value,
                          tags: form.tags.value.split(" "),
                          content: htmltext,
                          author: "Ghita",
                        }
                      );
                      form.reset();
                    } catch (error) {
                      console.error(error);
                    }
                  }
                }}
              >
                Publish
              </button>
            </div>
          </Form>
        }
      </div>
    </div>
  );
}
