import Link from "next/link";
import Image from "next/image";

export default function BooksContent() {
  return (
    <div>
      <div className="flex justify-center bg-primary">
        <div className="max-w-6xl w-full px-5 md:px-8 lg:px-12 ">
          <p className="font-poppins text-white text-xs text-center py-2 sm:text-sm md:text-lg">
            In order to get books physically or digitally please do
            <span> </span>
            <Link href={"/contactus"} className="text-secondary">
              contact us
            </Link>
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="max-w-6xl w-full px-5 md:px-8 lg:px-12 py-10">
          <div
            className="flex flex-wrap justify-center w-full gap-4 mb-10"
            id="sarkha"
          >
            <div className="">
              <Image
                src={"/sarkhaBookCover-min.png"}
                alt="Sarkha Book Cover"
                width={191}
                height={260}
                className="sm:w-[220px] sm:h-[300px]"
              />
            </div>
            <div
              dir="rtl"
              className="sm:max-w-[350px] text-center mt-5 sm:text-right"
            >
              <h2 className="font-reemkufi text-6xl text-secondary">صرخة</h2>
              <p className="font-rubik text-xl mt-1">وئام أيت صالح</p>
              <p className="font-rubik text-sm mt-2 lg:text-[16px]">
                في زمنٍ غابرٍ تاهت ليليان،تبحث عن حبٍ وأمان.أنوارٌ بنور قلبه
                أضاء،ليليان وجدت في قلبه النجاة. في بيت الشيخ أسرارٌ
                بانَت،حكايات حبٍ في القلوب عانَت.اقرأ الرواية، عش في الخيال،حيث
                الحب ينتصر رغم المحال.
              </p>
              <div className="flex justify-center gap-3 mt-3 sm:justify-start">
                <Link
                  href="https://www.youtube.com/shorts/mihKG3sDdn4"
                  target="_blank"
                >
                  <button className="py-2 px-8 bg-transparent flex justify-center gap-2 items-center rounded-lg border-2 border-secondary cursor-pointer">
                    <p className="text-secondary font-rubik text-lg">شريط</p>
                    <Image
                      src={"/playIcon.svg"}
                      width={18}
                      height={18}
                      href={"Buy Icon"}
                      className=""
                      alt="play Icon"
                    />
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div
            className="flex flex-wrap justify-center w-full gap-4 mb-10 sm:flex-row-reverse sm:items-center"
            id="beneathTheTable"
          >
            <div className="">
              <Image
                src={"/beneathTheTableBookCover-min.png"}
                alt="Beneath The Table Book Cover"
                width={191}
                height={260}
                className="sm:w-[220px] sm:h-[300px]"
              />
            </div>
            <div className="sm:max-w-[350px] text-center mt-5 sm:text-left">
              <h2 className="font-dmSerifText text-3xl text-[#54524F]">
                BENEATH THE TABLE
              </h2>
              <p className="font-poppins text-lg mt-1">Ghita Ayasse Ouamane</p>
              <p className="font-poppins text-sm mt-2 lg:text-[16px]">
                It was the earthquake of September 8th , 2023. A rattle that
                have shaken my world , collided my cosmos and tumbled the stars
                of my skies. As days and days passed since the calamity , I
                gathered the remains of myself and poured my anguish into my
                white papers , bleeding my perceptions of life and the realm of
                our convictions.
              </p>
              <div className="flex justify-center gap-3 mt-3 sm:justify-start">
                <Link
                  href="https://www.youtube.com/shorts/_ktcRli6BAA"
                  target="_blank"
                >
                  <button className="py-2 px-8 bg-transparent flex justify-center gap-2 items-center rounded-lg border-2 border-[#54524F] cursor-pointer">
                    <p className="text-[#54524F] font-poppins text-lg">
                      Trailer
                    </p>
                    <Image
                      src={"/grayPlayIcon.svg"}
                      width={18}
                      height={18}
                      className=""
                      alt="play Icon"
                    />
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div
            className="flex flex-wrap justify-center w-full gap-4"
            id="aadonaWaad"
          >
            <div>
              <Image
                src={"/aahdonaWaadBookCover-min.png"}
                width={191}
                height={260}
                className="sm:w-[220px] sm:h-[300px]"
                alt="Aadona Waad Book Cover"
              />
            </div>
            <div
              dir="rtl"
              className="sm:max-w-[350px] text-center mt-5 sm:text-right"
            >
              <h2 className="font-reemkufi text-6xl text-primary">عهدنا وعد</h2>
              <p className="font-rubik text-xl mt-1">وئام أيت صالح</p>
              <p className="font-rubik text-sm mt-2 lg:text-[16px]">
                حب ليلى وقيس كالبدر بَدَا،حلم ووعود وأمل قد هدى.لكن الحياة لم
                ترحم القلوب،صدمة وألم وجرح لا يذوب. في الله وَجَدَت ليلى
                السكينة،وتعلمت أن الحب في الحلال يكفينا. تعالوا نقرأ عن
                شجاعتها،وكيف بالصبر والإيمان وَجَدَت راحتها.
              </p>
              <div className="flex justify-center gap-3 mt-3 sm:justify-start">
                <Link
                  href="https://www.youtube.com/shorts/a0hQPhgWrQU"
                  target="_blank"
                >
                  <button className="py-2 px-8 bg-transparent flex justify-center gap-2 items-center rounded-lg border-2 border-primary cursor-pointer">
                    <p className="text-primary font-rubik text-lg">شريط</p>
                    <Image
                      src={"/primaryPlayIcon.svg"}
                      width={18}
                      height={18}
                      href={"Buy Icon"}
                      alt="play Icon"
                    />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
