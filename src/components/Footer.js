import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="w-full bg-secondary/15   py-5 flex justify-center">
      <div className="max-w-6xl w-full px-5 md:px-8 lg:px-12 ">
        <div className="flex justify-between md:w-3/4 lg:w-3/5 ">
          <div className="flex flex-col items-center">
            <Link className="cursor-pointer" href={"/"}>
              <Image
                src={"/wglogo.png"}
                width={80}
                height={80}
                alt="Logo"
                className="sm:w-38 sm:h-38"
              />
            </Link>
            <h3 className=" text-lg relative font-dmSerifText text-secondary sm:text-2xl md:text-3xl">
              <span className="text-primary ">WG</span>realm
            </h3>
            <div className="flex">
              <Link href={"https://www.instagram.com/wgrealm"} target="_blank">
                <Image
                  src={"/instagramlogo.svg"}
                  alt="Logo"
                  width={20}
                  height={20}
                  className="cursor-pointer sm:w-8 sm:h-8 mr-1 md:w-12 md:h-12"
                />
              </Link>
              <Link href={"mailto:wgrealmbooks@gmail.com"} target="_blank">
                <Image
                  src={"/gmaillogo.svg"}
                  alt="Logo"
                  width={20}
                  height={20}
                  className="cursor-pointer sm:w-8 sm:h-8 mr-1
                  md:w-12 md:h-12"
                />
              </Link>
              <Link
                href={`https://wa.me/${process.env?.NEXT_PUBLIC_CONTACT_PHONE}`}
                target="_blank"
              >
                <Image
                  src={"/whatsapplogo.svg"}
                  alt="Logo"
                  width={20}
                  height={20}
                  className="cursor-pointer sm:w-8 sm:h-8 md:w-12 md:h-12"
                />
              </Link>
              <Link
                href={"https://www.tiktok.com/@wgrealm?lang=en"}
                target="_blank"
              >
                <Image
                  src={"/tiktoklogo.svg"}
                  alt="Logo"
                  width={20}
                  height={20}
                  className="cursor-pointer sm:w-8 sm:h-8 ml-1 md:w-12 md:h-12"
                />
              </Link>
            </div>
          </div>
          <div className="sm:mt-7 md:mt-9">
            <h3 className="text-lg font-poppins text-primary md:text-xl md:mb-2 ">
              Links
            </h3>
            <ul>
              <li>
                <Link
                  href={"/"}
                  className="font-poppins hover:text-primary text-sm md:text-lg "
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href={"/blogs/ghita"}
                  className="font-poppins hover:text-primary text-sm md:text-lg"
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  href={"/books"}
                  className="font-poppins hover:text-primary text-sm md:text-lg"
                >
                  Books
                </Link>
              </li>
              <li>
                <Link
                  href={"/contactus"}
                  className="font-poppins hover:text-primary text-sm md:text-lg"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="sm:mt-7 md:mt-9">
            <h3 className="text-lg font-poppins text-primary md:mb-2 md:text-xl">
              Books
            </h3>
            <ul>
              <li>
                <Link
                  href={"/books#beneathTheTable"}
                  className="font-poppins hover:text-primary text-sm md:text-lg"
                >
                  Beneath the table
                </Link>
              </li>
              <li>
                <Link
                  href={"/books#sarkha"}
                  className="font-rubik hover:text-primary text-sm md:text-lg"
                >
                  صرخة
                </Link>
              </li>
              <li>
                <Link
                  href={"/books#aadonaWaad"}
                  className="hover:text-primary text-sm font-rubik md:text-lg"
                >
                  عهدنا وعد
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-center text-[8px] font-poppins mt-5 sm:text-xs">
          © 2025 WG Realm. All rights reserved. Unauthorized reproduction or
          distribution of this website’s content is prohibited without prior
          written permission.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
