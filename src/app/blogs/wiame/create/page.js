import CreateContent from "./CreateContent";

export async function generateMetadata({ params }) {
  const siteUrl =
    process.env.NEXT_PUBLIC_WEBSITE_URL || "https://www.wgrealm.webflow.io";
  const pageUrl = `${siteUrl}/wiame/create`;
  const ogImage = `${siteUrl}/wglogo.png`;

  return {
    title: `Create a Blog | WGrealm Project`,
    description: `A page to Create a Blog by Ghita Ayasse Ouamane`,
    openGraph: {
      title: `Create a Blog | WGrealm Project`,
      description: `A page to Create a Blog by Ghita Ayasse Ouamane`,
      url: pageUrl,
      images: [ogImage],
      type: "website",
    },
    twitter: {
      title: `Create a Blog | WGrealm Project`,
      description: `A page to Create a Blog by Ghita Ayasse Ouamane`,
      images: [ogImage],
      card: "summary_large_image",
    },
  };
}

export default function CreateBlogPage({ params }) {
  return (
    <main>
      <CreateContent /> {/* client-side interactive part */}
    </main>
  );
}
