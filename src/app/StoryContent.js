"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

export default function StoryContent() {
  const { data: session } = useSession();
  return (
    <main className="text-center flex justify-center">
      <div className="max-w-6xl w-full px-5 md:px-8 lg:px-12">
        <div className="h-[50vh] lg:h-[80vh] flex flex-col justify-center">
          <div>
            <h1 className="text-xl text-primary font-dmSerifText  mb-1 sm:text-3xl  sm:mb-2  ">
              Our Story, From High School to Publishing Dreams
            </h1>
            <p className="font-poppins text-sm text-primary mb-10 sm:text-lg sm:mb-16 md:text-xl md:mb-20">
              Four friends from Marrakech turning passion into books and
              projects.
            </p>
            <Link href={"/books"}>
              <button className="px-7 py-1.5 bg-primary text-white font-dmSerifText rounded-md text-lg  hover:bg-primary/90 sm:px-10 sm:py-2 sm:text-xl md:px-14 md:py-3 md:text-2xl cursor-pointer">
                Explore Our Books
              </button>
            </Link>
          </div>
        </div>
        {/* --------------------- */}

        <section className=" flex flex-wrap justify-between sm:items-center">
          <div className="sm:max-w-1/2">
            <h2 className="mb-2 text-primary font-dmSerifText text-lg text-center sm:text-left sm:text-xl md:text-2xl lg:text-3xl">
              It All Started With a Call
            </h2>
            <p className="font-poppins text-sm mb-2 sm:text-left sm:text-[16px] md:text-lg lg:text-xl">
              It began with a late-night phone call between Ghita Ayasswaman and
              Wiame Aitsalh. Both were passionate about writing, each with a
              book in progress. Soon after, they reached out to Yassine Lotfi, a
              friend and talented designer, to bring their book covers to life.
            </p>
          </div>
          <div className="flex justify-center max-sm:w-full sm:w-1/2">
            <Image
              src={"nightCall.svg"}
              width={240}
              height={240}
              className="sm:w-4/5 md:w-3/4"
              alt="Night Call Image"
            />
          </div>
        </section>

        {/* --------------------- */}
        <section className="mt-20 flex flex-wrap flex-row-reverse justify-between sm:items-center">
          <div className="sm:max-w-1/2">
            <h2 className="mb-2 text-primary font-dmSerifText text-lg text-center sm:text-left sm:text-xl md:text-2xl lg:text-3xl ">
              From Pages to a Project
            </h2>
            <p className="font-poppins text-sm mb-2 sm:text-left sm:text-[16px] md:text-lg lg:text-xl">
              What started as shared passion quickly grew. With time, our small
              team realized we could do more than just write — we could share
              our words with the world. That’s when Rayyane El Malhouni joined,
              suggesting a website to publish our work and building it from
              scratch.
            </p>
          </div>
          <div className="flex justify-center max-sm:w-full sm:w-1/2">
            <Image
              src={"websiteImage.svg"}
              width={240}
              height={240}
              className="sm:w-4/5 md:w-3/4"
              alt="A website wireframe Image"
            />
          </div>
        </section>
        {/* --------------------- */}

        <section className="mt-20 flex flex-wrap justify-between sm:items-center">
          <div className="sm:max-w-1/2">
            <h2 className="mb-2 text-primary font-dmSerifText text-lg text-center sm:text-left sm:text-xl md:text-2xl lg:text-3xl">
              The Books We Wrote
            </h2>
            <div className="font-poppins text-sm mb-2 sm:text-left sm:text-[16px] md:text-lg lg:text-xl">
              <p>So far, we&apos;ve published three books: </p>
              <p>&apos;Beneath the Table&apos; by Ghita Ayasswaman</p>
              <p>
                {" "}
                &apos;صرخة &apos;and &apos;عهدنا وعد &apos;By Wiame Aitsalh
              </p>
              <p>For now, they&apos;re available as PDF editions.</p>
              <Link href={"/books"} className="text-secondary underline">
                Explore Our Books
              </Link>
            </div>
          </div>
          <div className="flex justify-center max-sm:w-full sm:w-1/2">
            <Image
              src={"booksImage.svg"}
              width={240}
              height={240}
              className="sm:w-4/5 md:w-3/4"
              alt="Books Image"
            />
          </div>
        </section>
        {/* --------------------- */}

        <section className="mt-20 flex flex-wrap justify-between sm:items-center sm:flex-row-reverse">
          <div className="sm:max-w-1/2">
            <h2 className="mb-2 text-primary font-dmSerifText text-lg text-center sm:text-left sm:text-xl md:text-2xl lg:text-3xl">
              Challenges We Faced
            </h2>
            <p className="font-poppins text-sm mb-2 sm:text-left sm:text-[16px] md:text-lg lg:text-xl">
              As teenagers, with no experience in publishing, printing was our
              biggest challenge. But step by step, we learned — from formatting
              pages to managing covers and social media. Those lessons built the
              foundation for what we’re creating today.
            </p>
          </div>
          <div className="flex justify-center max-sm:w-full sm:w-1/2">
            <Image
              src={"problemImage.svg"}
              width={240}
              height={240}
              className="sm:w-4/5 md:w-3/4"
              alt="Image of a Problem"
            />
          </div>
        </section>

        {/* --------------------- */}
        <section className="mt-20 flex flex-wrap justify-between sm:items-center">
          <div className="sm:max-w-1/2">
            <h2 className="mb-2 text-primary font-dmSerifText text-lg text-center sm:text-left sm:text-xl md:text-2xl lg:text-3xl ">
              Stepping Into the Spotlight
            </h2>
            <p className="font-poppins text-sm mb-2 sm:text-left sm:text-[16px] md:text-lg lg:text-xl">
              Our project first went public during a school event at Ariha’ High
              School. In front of a crowd, we presented our books — a moment
              we’ll never forget. Since then, our work has been featured in two
              episodes of Marrakech Radio, hosted by Anass El Malhouni, and sold
              in local bookstores.
            </p>
          </div>
          <div className="flex justify-center max-sm:w-full sm:w-1/2">
            <Image
              src={"popularImage.svg"}
              width={240}
              height={240}
              className="sm:w-4/5 md:w-3/4"
              alt="Image illustrating the sharing process"
            />
          </div>
        </section>
        {/* --------------------- */}

        <section className="mt-20 flex flex-wrap justify-between sm:items-center sm:flex-row-reverse">
          <div className="sm:max-w-1/2">
            <h2 className="mb-2 text-primary font-dmSerifText text-lg text-center sm:text-left sm:text-xl md:text-2xl lg:text-3xl">
              Beyond the Books
            </h2>
            <div className="font-poppins text-sm mb-2 sm:text-left sm:text-[16px] md:text-lg lg:text-xl">
              <p>
                Our project isn’t just about publishing. We’ve built a new
                website with blogs, user accounts, and interactive features. We
                imagine a space where readers don’t just read — they connect
                directly with writers, share ideas, and follow the creative
                journey.
              </p>
              <Link href={"/blogs/ghita"} className="text-secondary underline">
                Visit our BlogPage
              </Link>
            </div>
          </div>
          <div className="flex justify-center max-sm:w-full sm:w-1/2">
            <Image
              src={"communityImage.svg"}
              width={240}
              height={240}
              className="sm:w-4/5 md:w-3/4"
              alt="Image illustrating a community"
            />
          </div>
        </section>

        {/* --------------------- */}
        <section className="mt-20 flex flex-wrap justify-between sm:items-center">
          <div className="sm:max-w-1/2">
            <h2 className="mb-2 text-primary font-dmSerifText text-lg text-center sm:text-left sm:text-xl md:text-2xl lg:text-3xl ">
              Behind the scenes
            </h2>
            <p className="font-poppins text-sm mb-2 sm:text-left sm:text-[16px] md:text-lg lg:text-xl">
              From designing covers and formatting pages to managing social
              media and coding the website — we do it all ourselves. Every book
              and every post reflects teamwork, creativity, and persistence.
            </p>
          </div>
          <div className="flex justify-center max-sm:w-full sm:w-1/2">
            <Image
              src={"workingImage.svg"}
              width={240}
              height={240}
              className="sm:w-4/5 md:w-3/4"
              alt="Work Image"
            />
          </div>
        </section>
        {/* --------------------- */}

        <section className="mt-20 flex flex-wrap justify-between sm:items-center sm:flex-row-reverse mb-20">
          <div className="sm:max-w-1/2">
            <h2 className="mb-2 text-primary font-dmSerifText text-lg text-center sm:text-left sm:text-xl md:text-2xl lg:text-3xl">
              Join the Journey
            </h2>
            <div className="font-poppins text-sm mb-2 sm:text-left sm:text-[16px] md:text-lg lg:text-xl">
              <p>
                We’re still at the beginning, and the best chapters are yet to
                come. Be part of our story, explore our books, and stay
                connected.
              </p>
              {!session?.user && (
                <div className="flex justify-center mt-2 sm:justify-start">
                  <button
                    className=" px-4 py-1 bg-secondary text-white rounded 
                       hover:bg-secondary/70 transition z-40 relative font-poppins cursor-pointer"
                    onClick={() => signIn()}
                  >
                    Sign In
                  </button>
                </div>
              )}

              {/* <Link href={"/blogs"} className="text-secondary underline">
                Visit our BlogPage
              </Link> */}
            </div>
          </div>
          <div className="flex justify-center max-sm:w-full sm:w-1/2">
            <Image
              src={"joinImage.svg"}
              width={240}
              height={240}
              className="sm:w-4/5 md:w-3/4"
              alt="A join Us Image"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
