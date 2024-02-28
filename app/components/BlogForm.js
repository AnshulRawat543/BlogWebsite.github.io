"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import ReactQuill from "react-quill";
import quill from "quill";
import Resizer from "react-image-file-resizer";

import Link from "next/link";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "react-quill/dist/quill.snow.css";

const BlogForm = ({ onSubmit, blogsData, setBlogsData, setDrawerOpen }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");
  const quillRef = useRef(null);
  const editor = useRef(null);

  const editorRef = useRef(false);
  // console.log("editorRef", editorRef);

  const modules = useMemo(
    () => ({
      // syntax: {
      //   highlight: (text) => hljs.highlightAuto(text).value,
      // },
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          ["bold", "italic", "underline", "strike"],
          // [{ script: "sub" }, { script: "super" }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          [{ script: "sub" }, { script: "super" }, "align"],
          ["link", "image", "video"],
        ],

        handlers: {
          image: (e) => imageHandler(e),
        },
      },
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      },
    }),
    []
  );

  const handleImageUpload = async (uri, range) => {
    const data = new FormData();
    data.append("file", uri);
    data.append("upload_preset", "uwaogjrw");
    data.append("cloud_name", "dzmbmfysg");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dzmbmfysg/image/upload",
        {
          method: "post",
          body: data,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image to Cloudinary");
      }

      const imageData = await response.json();
      const imageUrl = imageData.url;
      console.log("url", imageUrl);
      console.log(imageData);

      setDescription(
        (prevDescription) =>
          `${prevDescription}<img src="${imageUrl}" alt="uploaded image" />`
      );

      // Clear the image state
      setImage("");
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle error, show notification, etc.
    }
  };

  function imageHandler(e) {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    const range = editorRef.current.selection;

    input.onchange = () => {
      // console.log("input files: ", input.files)
      let file = input.files[0];
      // resize
      Resizer.imageFileResizer(
        file, // file location
        1000,
        1000,
        input.files[0].type, // file format
        100, // resolution
        0, // rotation

        (uri) => {
          handleImageUpload(uri, range);
        }
      );
    };
  }

  useEffect(() => {
    if (quillRef.current) {
      console.log(quillRef.current);
    }
  }, [quillRef]);

  function handleImage() {
    console.log("hello");
  }

  const handleSelectionChange = (hello) => {
    // Your custom function to handle image selection
    console.log("Image selected!", hello);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const newBlog = { title, description, link, image };
      const updatedBlogs = [...blogsData, newBlog];

      // Update local state
      setBlogsData(updatedBlogs);

      // Update localStorage
      localStorage.setItem("blogsData", JSON.stringify(updatedBlogs));

      // Clear the form fields after submission
      setTitle("");
      setDescription("");
      setLink("");
      setImage("");

      onSubmit(newBlog);
      setDrawerOpen(false);
    } catch (error) {
      toast.error("Failed to add blog. Local storage is full full.");
    }

    // toast.success('Blog added successfully!');
  };

  const handleClose = () => {
    setDrawerOpen(false);
  };

  return (
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
      <form
        onSubmit={handleSubmit}
        className="mt-8 p-6  bg-white rounded-md shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-black">Add a New Blog</h2>
        <div className="p-4">
          <label
            htmlFor="title"
            className="block text-gray-600 text-sm font-medium mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="p-4">
          <label
            htmlFor="description"
            className="block text-gray-600 text-sm font-medium mb-2"
          >
            Description
          </label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={(value) => setDescription(value)}
            className="border border-gray-300 rounded-md "
            modules={modules}
          />

          {console.log("description", description)}
        </div>
        <div className="p-4">
          <label
            htmlFor="image"
            className="block text-gray-600 text-sm font-medium mb-2"
          >
            Image
          </label>
          <ReactQuill
            theme="snow"
            ref={quillRef}
            value={image}
            onChange={(value) => setImage(value)}
            className="border border-gray-300 rounded-md"
            modules={{
              toolbar: [["image"]],
            }}
          />
        </div>
        <div className="p-4">
          <label
            htmlFor="link"
            className="block text-gray-600 text-sm font-medium mb-2"
          >
            Link
          </label>
          <input
            type="url"
            id="link"
            name="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default BlogForm;
