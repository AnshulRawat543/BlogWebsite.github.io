"use client";
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import blogsDataA from "../data/blogs.json";
import BlogForm from "./BlogForm";
import Footer from "./Footer";
import BlogDetails from "./BlogDetails";

const LandingPage = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isDrawerOpenTwo, setDrawerOpenTwo] = useState(false);
  const [blogsData, setBlogsData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle subscription logic here
    setName("");
    setEmail("");
    toast.success(`${name} you are subscribed now`);
    console.log("Name:", name);
    console.log("Email:", email);
    // You can send this data to your server or perform any other necessary actions
  };

  const router = useRouter();

  // converting the description from hmtl to simple

  function convertHtmlToPlainText(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  function truncateToWords(inputString, wordLimit) {
    if (!inputString) {
      return ""; // Return an empty string for undefined or null input
    }

    const words = inputString.trim().split(/\s+/);
    const truncatedWords = words.slice(0, wordLimit);

    return truncatedWords.join(" ");
  }

  // converting the img coming the html img src to normal

  function extractImageSrcFromQuillHtml(quillHtml) {
    const doc = new DOMParser().parseFromString(quillHtml, "text/html");
    const imageSrcList = [];

    const images = doc.querySelectorAll("img");
    images.forEach((img) => {
      const src = img.getAttribute("src");
      if (src) {
        imageSrcList.push(src);
      }
    });

    return imageSrcList;
  }

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };
  const handleOpenDrawerTwo = (blog) => {
    setDrawerOpenTwo(true);
    setSelectedBlog(blog);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };
  const handleCloseDrawerTwo = () => {
    setDrawerOpen(false);
  };

  // storing the blogs data

  useEffect(() => {
    const existingBlogs = JSON.parse(localStorage.getItem("blogsData")) || [];
    // console.log("Retrieved blogs from localStorage:", existingBlogs);
    setBlogsData(existingBlogs);
  }, []);


  // console.log("truncatedPlainText",truncatedPlainText)
  // const blogDescription = truncateToWords(truncatedPlainText, 10);

  const handleDeleteAll = () => {
    localStorage.clear();
    setBlogsData([]);
    toast.success("All blogs deleted successfully!");
  };
  const handleLogout = () => {
    router.push("/");
    toast.success("Logout successful!");
  };

  const [blogs, setBlogs] = useState([]);

  const addBlog = (blog) => {
    setBlogs([...blogs, blog]);
    toast.success("Blog added successfully!");
  };

  
  return (
    <>
      <section className="p-12">
        <div className="md:my-0 my-6 ">
          <div className="flex md:flex-row flex-col md:justify-between justify-center  border border-b-2 p-5 rounded-md md:rounded-full">
            {/* <div>
              Hello <span className="text-blue-700">{email}</span>
            </div> */}
            <div className="flex justify-center md:m-0 m-2">
              <Image
                className="border rounded-3xl"
                src="/4e34612e4fb1471297c6f00709c16b51.png"
                alt="Picture of the author"
                width={80}
                height={70}
              />
            </div>

            <div className="">
              <button
                onClick={handleOpenDrawer}
                className="group relative h-12 p-3 m-2 mr-4 md:w-48 overflow-hidden rounded-lg bg-white text-lg shadow"
              >
                <div className="absolute inset-0 w-3 bg-blue-700 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                <span className="relative text-black group-hover:text-white">
                  Create blog
                </span>
              </button>
              <button
                onClick={handleLogout}
                className="group relative h-12 p-3 m-2 mr-4 md:w-48 overflow-hidden rounded-lg bg-white text-lg shadow"
              >
                <div className="absolute inset-0 w-3 bg-blue-700 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                <span className="relative text-black group-hover:text-white">
                  Logout
                </span>
              </button>
              <button
                onClick={handleDeleteAll}
                className="group relative h-12 p-3 m-2 mr-4 md:w-48 overflow-hidden rounded-lg bg-white text-lg shadow"
              >
                <div className="absolute inset-0 w-3 bg-blue-700 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                <span className="relative text-black group-hover:text-white">
                  Delete all
                </span>
              </button>
            </div>
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
            <h1 className="text-4xl font-bold text-white">Read Our Blog</h1>
            {/* <p className="mt-2">More text if needed</p> */}
          </div>
        </div>

        <div className="flex flex-col p-8">
          <h1 className="text-black p-2 flex justify-center">
            WEEKLY ARTICLES WITH INSIGHT INTO THE WEEKEND'S MESSAGE
          </h1>
          <p className="text-gray-600 p-2 flex justify-center">
            Our blog takes the message from the weekend and lays out next right
            steps, so you can hear a message and do a message in practical ways.
          </p>
        </div>

        <div className="grid grid-cols-2 md:ml-14 md:grid-cols-3 gap-4 p-0 md:p-9 min-h-64">
          {blogsData.map((blog, index) => (
            <Card
              onClick={() => handleOpenDrawerTwo(blog)}
              className=" cursor-pointer transform shadow-xl transition duration-300 hover:scale-105"
              key={index}
              sx={{ maxWidth: 345, marginBottom: 2 }}
            >
              <CardMedia
                sx={{ height: 140 }}
                image={extractImageSrcFromQuillHtml(blog.image)} // You can replace this with blog-specific images
                title={blog.title}
              />

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {/* <p dangerouslySetInnerHTML={{
                      __html: blog.description,
                    }}></p> */}
                  <p
                    dangerouslySetInnerHTML={{
                      __html: blog.description
                        .split(" ") // Split the content into an array of words
                        .slice(0, 10) // Take the first 10 words
                        .join(" ") // Join the words back into a string
                        .concat("..."), // Add an ellipsis to indicate truncated content
                    }}
                  ></p>
                </Typography>
              </CardContent>

              <div></div>
              <CardActions className="flex justify-between">
                <Button
                  size="small"
                  href={blog.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Link
                </Button>
                <Button size="small" onClick={() => handleOpenDrawerTwo(blog)}>
                  Learn More
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      </section>
      <div className="bg-[#f7f7f7] md:flex justify-between gap-10 md:text-md text-sm">
        <div className="md:p-11 p-6">
          <h1 className="py-3 text-black text-xl font-bold">
            Subscribe to Weekly All-Church Updates
          </h1>
          <p className="text-gray-500">
            New break Church partners with you and your family. Every week we
            send out an email providing helpful links to the week's content,
            guides for kids and students so they can follow along at home, as
            well as updated news and information that are important to New break
            Church as a whole and specific to our campuses across San Diego
            County.
          </p>
        </div>
        <div className="p-11">
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <button className="group relative h-12 p-3 m-2 mr-4 md:w-48 overflow-hidden rounded-lg bg-white text-lg shadow">
              <div className="absolute inset-0 w-3 bg-blue-700 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
              <span className="relative text-black group-hover:text-white">
                Subscribe Now
              </span>
            </button>
          </form>
        </div>
      </div>

      <Footer />

      {/* blog create form */}

      <Drawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
        elevation={24}
        className="max-h-4"
      >
        <BlogForm
          onSubmit={addBlog}
          blogsData={blogsData}
          setBlogsData={setBlogsData}
          setDrawerOpen={setDrawerOpen}
        />
        {/* </Box> */}
      </Drawer>

      <Drawer
        anchor="bottom"
        open={isDrawerOpenTwo}
        onClose={handleCloseDrawerTwo}
        blog={selectedBlog}
        elevation={24}
        className="max-h-4"
      >
        <BlogDetails
          blogsData={selectedBlog}
          setDrawerOpenTwo={setDrawerOpenTwo}
        />
        {/* </Box> */}
      </Drawer>
    </>
  );
};

export default LandingPage;
