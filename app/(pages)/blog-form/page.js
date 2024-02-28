"use client"
import BlogForm from '@/app/components/BlogForm'
import React from 'react'

const page = () => {

  const handleSubmit = (formData) => {
    // You can handle the form submission logic here
    console.log(formData);
  };
  return (
    <BlogForm onSubmit={handleSubmit} />
  )
}

export default page
