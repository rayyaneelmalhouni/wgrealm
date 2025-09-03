import ContactContent from "./ContactContent";

export async function generateMetadata({ params }) {
  const siteUrl =
    process.env.NEXT_PUBLIC_WEBSITE_URL || "https://www.wgrealm.webflow.io";
  const pageUrl = `${siteUrl}/contactus`;
  const ogImage = `${siteUrl}/wglogo.png`;

  return {
    title: `Contact Us | WGrealm Project`,
    description: `Get in touch with the WGrealm team for inquiries, collaborations, or project ideas.`,
    openGraph: {
      title: `Contact Us | WGrealm Project`,
      description: `Get in touch with the WGrealm team for inquiries, collaborations, or project ideas.`,
      url: pageUrl,
      images: [ogImage],
      type: "website",
    },
    twitter: {
      title: `Contact Us | WGrealm Project`,
      description: `Get in touch with the WGrealm team for inquiries, collaborations, or project ideas.`,
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

export default function Contactus({ params }) {
  return (
    <main>
      <ContactContent /> {/* client-side interactive part */}
    </main>
  );
}
