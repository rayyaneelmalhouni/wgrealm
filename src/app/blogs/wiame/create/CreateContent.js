"use client";

import Link from "next/link";
import Form from "next/form";

import { Client, Databases, ID } from "appwrite";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import verifyFormPublish from "@/app/utils/verifyFormPublish";

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
  if (session?.user?.email !== process.env.NEXT_PUBLIC_WIAME_MAIL) {
    redirect("/blogs/wiame");
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
        <h2 className="font-reemkufi text-primary text-3xl mt-5">
          إنشاء مدونة
        </h2>
        {
          <Form action="/blogs/ghita">
            <h2 className="text-[22px] mt-2">عنوان</h2>
            <input
              name="title"
              placeholder="اكتب عنوانك هنا"
              className="w-full py-[6px] px-[10px]  border-2 border-black rounded-md focus:outline-none max-w-3xl "
            />
            <h2 className="text-[22px] mt-6">وصف</h2>
            <input
              name="description"
              placeholder="اكتب وصفك هنا"
              className="w-full py-[6px] px-[10px]  border-2 border-black rounded-md focus:outline-none  max-w-3xl"
            />
            <h2 className="text-[22px] mt-6">العلامات</h2>
            <input
              name="tags"
              placeholder="افصل كل اسم علامة بمسافة"
              className="w-full py-[6px] px-[10px] border-2 border-black rounded-md focus:outline-none  max-w-3xl"
            />
            <h2 className="text-[22px] mt-6 mb-2">محتوى</h2>
            {/* <textarea
              name="content"
              placeholder="اكتب المحتوى الخاص بك هنا"
              className="w-full py-[6px] px-[10px] border-2 border-black rounded-md focus:outline-none  max-w-3xl"
            /> */}
            <BlogEditor
              isArabic={true}
              style={{ fontFamily: "rubik, sans-serif" }}
              ref={editorRef}
            />
            <div className="flex justify-start ">
              <button
                type="submit"
                className="py-[10px] w-full bg-secondary rounded-md  text-sm cursor-pointer  hover:bg-secondary/80 max-w-72 mt-6 mb-5"
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
                          author: "Wiame",
                        }
                      );
                      form.reset();
                    } catch (error) {
                      console.error(error);
                    }
                  }
                }}
              >
                انشر
              </button>
            </div>
          </Form>
        }
      </div>
    </div>
  );
}
