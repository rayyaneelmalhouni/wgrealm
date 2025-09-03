import Image from "next/image";
import Link from "next/link";

export default function ContactContent() {
  return (
    <div className="flex justify-center">
      <div className=" max-w-6xl w-full px-5 md:px-8 lg:px-12 my-10">
        <h1 className="text-center font-dmSerifText text-primary text-3xl sm:text-4xl md:text-5xl sm:text-left">
          Contact our friendly Team
        </h1>
        <p className="text-center font-poppins text-xs text-primary sm:text-sm md:text-lg sm:text-left">
          Let us know how we can support you and further improve our project.
        </p>
        <div className="flex flex-wrap gap-8 justify-center mt-5 sm:justify-start">
          <div className="w-[150px] h-[150px] bg-secondary/20 shadow-lg rounded-lg mb-2 hover:opacity-80 transition">
            <Image
              src={"/instagramlogo.svg"}
              width={45}
              height={45}
              alt="Instagram Icon"
              className="mt-2"
            />
            <p className="font-poppins font-medium text-[12px] ml-2 mt-7">
              Instagram
            </p>
            <p className="ml-2 font-poppins text-black/80 text-[10px] mb-1">
              Connect with us
            </p>
            <Link
              href={"https://www.instagram.com/wgrealm"}
              className="ml-2 font-poppins text-[10px] underline"
              target="_blank"
            >
              @wgrealm
            </Link>
          </div>
          <div className="w-[150px] h-[150px] bg-secondary/20 shadow-lg rounded-lg mb-2 hover:opacity-80 transition">
            <Image
              src={"/gmaillogo.svg"}
              width={45}
              height={45}
              alt="Gmail Icon"
              className="mt-2"
            />
            <p className="font-poppins font-medium text-[12px] ml-2 mt-7">
              Gmail
            </p>
            <p className="ml-2 font-poppins text-black/80 text-[10px] mb-1">
              Email Us
            </p>
            <Link
              href={"mailto:wgrealmbooks@gmail.com"}
              className="ml-2 font-poppins text-[10px] underline"
              target="_blank"
            >
              wgrealmbooks@gmail.com
            </Link>
          </div>
          <div className="w-[150px] h-[150px] bg-secondary/20 shadow-lg rounded-lg mb-2 hover:opacity-80 transition">
            <Image
              src={"/whatsapplogo.svg"}
              width={45}
              height={45}
              alt="Whatsapp Icon"
              className="mt-2"
            />
            <p className="font-poppins font-medium text-[12px] ml-2 mt-7">
              Whatsapp
            </p>
            <p className="ml-2 font-poppins text-black/80 text-[10px] mb-1">
              Chat with Us
            </p>
            <Link
              href={`https://wa.me/${process.env?.NEXT_PUBLIC_CONTACT_PHONE}`}
              className="ml-2 font-poppins text-[10px] underline"
              target="_blank"
            >
              {process.env?.NEXT_PUBLIC_CONTACT_PHONE}
            </Link>
          </div>
          <div className="w-[150px] h-[150px] bg-secondary/20 shadow-lg rounded-lg mb-2 hover:opacity-80 transition">
            <Image
              src={"/tiktoklogo.svg"}
              width={45}
              height={45}
              alt="Instagram Icon"
              className="mt-2"
            />
            <p className="font-poppins font-medium text-[12px] ml-2 mt-7">
              Tiktok
            </p>
            <p className="ml-2 font-poppins text-black/80 text-[10px] mb-1">
              Follow Us
            </p>
            <Link
              href={"https://www.tiktok.com/@wgrealm?lang=en"}
              className="ml-2 font-poppins text-[10px] underline"
              target="_blank"
            >
              @wgrealm
            </Link>
          </div>
        </div>
        <h1 className="text-center font-dmSerifText text-primary text-2xl sm:text-3xl md:text-4xl sm:text-left mt-5">
          Frequently asked Questions
        </h1>
        <div className="font-poppins text-center sm:text-left mb-3 mt-5">
          <p className="font-medium text-sm sm:text-[16px] md:text-lg">
            Are the books available in print, digital, or both?
          </p>
          <p className="text-xs sm:text-sm md:text-[16px]">
            Right now they are available only in digital
          </p>
        </div>
        <div className="font-poppins text-center sm:text-left mb-3 mt-5">
          <p className="font-medium text-sm sm:text-[16px] md:text-lg">
            What are the books prices?
          </p>
          <p className="text-xs sm:text-sm md:text-[16px]">
            Physical books are each 50 DHs, and for digital you can get all
            three for 100 DHS
          </p>
        </div>
        <div className="font-poppins text-center sm:text-left mb-3 mt-5">
          <p className="font-medium text-sm sm:text-[16px] md:text-lg">
            Where can the physical books be delivered?
          </p>
          <p className="text-xs sm:text-sm md:text-[16px]">
            In Marrackech, Morrocco
          </p>
        </div>
        <div className="font-poppins text-center sm:text-left mb-3 mt-5">
          <p className="font-medium text-sm sm:text-[16px] md:text-lg">
            Are you open to partnerships or sponsorships?
          </p>
          <p className="text-xs sm:text-sm md:text-[16px]">
            Yes we are open for them as we look forward to develop this project
            slowly through time
          </p>
        </div>
      </div>
    </div>
  );
}
