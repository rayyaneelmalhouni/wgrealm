import BooksContent from "./BooksContent";

export async function generateMetadata({ params }) {
  const siteUrl =
    process.env.NEXT_PUBLIC_WEBSITE_URL || "https://www.wgrealm.webflow.io";
  const pageUrl = `${siteUrl}/books`;
  const ogImage = `${siteUrl}/wglogo.png`;

  return {
    title: `Books | WGrealm Project`,
    description: `Read insightful books by young talents on WGrealm.`,
    openGraph: {
      title: `Books | WGrealm Project`,
      description: `Read insightful books by young talents on WGrealm.`,
      url: pageUrl,
      images: [ogImage],
      type: "website",
    },
    twitter: {
      title: `Books | WGrealm Project`,
      description: `Read insightful books by young talents on WGrealm.`,
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

export default function Home({ params }) {
  return (
    <main>
      <BooksContent /> {/* client-side interactive part */}
    </main>
  );
}
