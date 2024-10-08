import { Tooltip } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const Footer = () => {
  const [hoveredImages, setHoveredImages] = useState({
    twitter: false,
    telegram: false,
    facebook: false,
    instagram: false,
    phone: false,
  });

  const handleMouseEnter = (imageName) => {
    setHoveredImages((prevState) => ({
      ...prevState,
      [imageName]: true,
    }));
  };

  const handleMouseLeave = (imageName) => {
    setHoveredImages((prevState) => ({
      ...prevState,
      [imageName]: false,
    }));
  };

  return (
    <div className="bg-[#272727] relative sm:pt-[90px] pt-[75px] sm:pb-[120px] pb-[90px]">
      <div className="customContainer px-5 xl:px-0 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3  xl:space-y-3 lg:space-y-0 space-y-3">
          <div className=" sm:pt-3 pt-2">
            <img
              src="/images/client/footerLogo.svg"
              className="w-[120px] xl:w-[150px]"
              alt="footer Logo"
            />
          </div>
          <div className="md:flex lg:flex-col justify-center md:ms-3 lg:ms-0">
            <div>
              <h1 className="text-primary text-lg font-bold font-outfit">
                For Dives
              </h1>
              <div className="text-gray mt-1 font-roboto font-normal">
                <h1>About Us</h1>
                <h1>Groups or Charters</h1>
                <h1>Contact Us</h1>
                <h1>Terms & Conditions</h1>
                <h1>Privacy Policy</h1>
              </div>
            </div>
          </div>
          <div className="sm:static absolute right-8 top-16">
            <h1 className="text-primary text-lg font-bold font-outfit">
              For Operators
            </h1>
            <div className="text-gray mt-1">
              <Link
                className="mt-4 mr-4 font-roboto font-normal"
                href={"/auth"}
              >
                Login / SignUp
              </Link>
            </div>
          </div>
          <div className="md:flex lg:flex-col pb-6 md:justify-center lg:justify-start md:me-3 lg:ms-0">
            <div className="sm:static absolute right-12 top-44">
              <h1 className="text-primary text-lg font-bold font-outfit">
                {" "}
                For Agents
              </h1>
              <div className="text-gray mt-1 font-roboto font-normal">
                Login / SignUp
              </div>
            </div>
          </div>
          <hr className="text-primary md:hidden block  w-full  absolute left-0 bottom-[265px] pb-5 " />

          <div className="md:flex lg:flex-col md:justify-start md:pt-0 pt-16  lg:justify-start xl:text-end text-start">
            <div>
              <div className="flex gap-3 xl:justify-end text-start">
                <a href="https://twitter.com/Deeparture_dive/">
                  <img
                    target="_blank"
                    src={
                      hoveredImages.twitter
                        ? "/images/client/twitterHover.svg"
                        : "/images/client/twitter.svg"
                    }
                    className="size-10 cursor-pointer"
                    alt="Flowbite Logo"
                    onMouseEnter={() => handleMouseEnter("twitter")}
                    onMouseLeave={() => handleMouseLeave("twitter")}
                  />
                </a>
                <a href="">
                  <img
                    target="_blank"
                    src={
                      hoveredImages.telegram
                        ? "/images/client/telegramHover.svg"
                        : "/images/client/telegram.svg"
                    }
                    className="size-10 cursor-pointer"
                    alt="Flowbite Logo"
                    onMouseEnter={() => handleMouseEnter("telegram")}
                    onMouseLeave={() => handleMouseLeave("telegram")}
                  />
                </a>
                <a
                  target="_blank"
                  href="https://www.facebook.com/Deeparture.dive/"
                >
                  <img
                    src={
                      hoveredImages.facebook
                        ? "/images/client/facebookHover.svg"
                        : "/images/client/facebook.svg"
                    }
                    className="size-10 cursor-pointer"
                    alt="Flowbite Logo"
                    onMouseEnter={() => handleMouseEnter("facebook")}
                    onMouseLeave={() => handleMouseLeave("facebook")}
                  />
                </a>
                <a
                  href="https://www.instagram.com/deeparture_dive/"
                  target="_blank"
                >
                  <img
                    src={
                      hoveredImages.instagram
                        ? "/images/client/instagramHover.svg"
                        : "/images/client/instagram.svg"
                    }
                    className="size-10 cursor-pointer"
                    alt="Flowbite Logo"
                    onMouseEnter={() => handleMouseEnter("instagram")}
                    onMouseLeave={() => handleMouseLeave("instagram")}
                  />
                </a>
                <div>
                  <a href="tel:+642102413170">
                    <img
                      src={hoveredImages.phone ? "/phnh.svg" : "/phn.svg"}
                      className="size-10 cursor-pointer"
                      alt="Flowbite Logo"
                      onMouseEnter={() => handleMouseEnter("phone")}
                      onMouseLeave={() => handleMouseLeave("phone")}
                    />
                  </a>
                </div>
              </div>

              <div className="mt-5">
                <h1 className="text-[#f1f2f2] text-xl font-normal ">
                  +642102413170
                </h1>
                <h1>
                  <a
                    href="mailto:info@deeparture.travel"
                    className="text-primary text-xl font-normal"
                  >
                    info@deeparture.travel
                  </a>
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className=" sm:text-end text-start sm:mt-0 mt-4   ">
          <span className=" text-[14px] text-primary">
            Developed By
            <a
              href="https://ibizn.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              {" "}
              IBIZN
            </a>{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
