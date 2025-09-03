import BlogContent from "./BlogContent";
import { Client, Databases } from "appwrite";

const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;
const API_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;

const client = new Client().setEndpoint(API_ENDPOINT).setProject(PROJECT_ID);

const database = new Databases(client);

export async function generateMetadata({ params }) {
  const { blogId } = params;
  let blog = {};
  try {
    blog = await database.getDocument(DATABASE_ID, COLLECTION_ID, blogId);
  } catch (error) {
    console.log(error);
  }

  if (!blog.title) {
    return {
      title: "Blog Not Found | WGrealm Project",
      description: "This blog does not exist.",
    };
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_WEBSITE_URL || "https://www.wgrealm.webflow.io";
  const pageUrl = `${siteUrl}/blogs/ghita/${blogId}`;
  const ogImage = `${siteUrl}/wglogo.png`;

  return {
    title: `${blog?.title} | WGrealm Project`,
    description: `${blog?.description}`,
    openGraph: {
      title: `${blog?.title} | WGrealm Project`,
      description: `${blog?.description}`,
      url: pageUrl,
      images: [ogImage],
      type: "website",
    },
    twitter: {
      title: `${blog?.title} | WGrealm Project`,
      description: `${blog?.description}`,
      images: [ogImage],
      card: "summary_large_image",
    },
    icons: {
      icon: "/defaultFavicon.png",
      shortcut: "/shortcutFavicon.png",
      apple: "/appleFavicon.png",
    },
  };
}

export default function BlogPage({ params }) {
  return (
    <main>
      <BlogContent /> {/* client-side interactive part */}
    </main>
  );
}
