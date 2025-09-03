import BlogsContent from "./BlogsContent";

export async function generateMetadata({ params }) {
  const siteUrl =
    process.env.NEXT_PUBLIC_WEBSITE_URL || "https://www.wgrealm.webflow.io";
  const pageUrl = `${siteUrl}/blogs/ghita`;
  const ogImage = `${siteUrl}/wglogo.png`;

  return {
    title: `Ghita's Blogs | WGrealm Project`,
    description: `Read insightful blogs by young talents on technology, books, and creative projects on WGrealm.`,
    openGraph: {
      title: `Ghita's Blogs | WGrealm Project`,
      description: `Read insightful blogs by young talents on technology, books, and creative projects on WGrealm.`,
      url: pageUrl,
      images: [ogImage],
      type: "website",
    },
    twitter: {
      title: `Ghita's Blogs | WGrealm Project`,
      description: `Read insightful blogs by young talents on technology, books, and creative projects on WGrealm.`,
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

export default function BlogsPage({ params }) {
  return (
    <main>
      <BlogsContent /> {/* client-side interactive part */}
    </main>
  );
}
