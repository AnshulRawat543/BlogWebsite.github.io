import { React, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";

const BlogDetails = ({ blogsData, setDrawerOpenTwo }) => {
  const handleClose = () => {
    setDrawerOpenTwo(false);
  };

  const createMarkup = (c) => {
    return { __html: c };
  };

  console.log("blogData", blogsData);
  return (
    <>
      <section className=" md:p-28 p-7">
        <div className="">
          <div className="flex justify-end border border-b-2 p-5">
            {/* <div>Hello</div> */}

            <button
              className="hover:text-black bg-blue-700 p-3 text-white rounded-xl"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
        <div className="relative p-36 m-0 md:m-14  flex items-center justify-center">
          {/* Background Image with Dark Overlay */}
          <div className="absolute inset-0 z-0 overflow-hidden rounded-full">
            <img
              className="object-cover w-full h-full rounded-md"
              src="/coffee-2306471_1280.jpg"
              alt="Background"
            />
            <div className="absolute inset-0 bg-black opacity-40 rounded-md"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-white text-center">
            <h1 className="text-4xl font-bold text-white">{blogsData.title}</h1>
            {/* <p className="mt-2">More text if needed</p> */}
          </div>
        </div>

        <div className="text-black md:p-32 p-8">
          <div
            dangerouslySetInnerHTML={createMarkup(blogsData.description)}
          ></div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default BlogDetails;
