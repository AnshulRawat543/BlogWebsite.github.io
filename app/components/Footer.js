import React from 'react'
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import Link from "next/link";


const Footer = () => {
  return (
    <footer className="bg-blue-600 p-11 md:flex justify-between">
    <div className=" md:m-0 m-2 md:text-sm text-xs">
      <p>
        NEWBREAK CHURCH
        <br />
        10635 SCRIPPS RANCH BLVD. SUITE H SAN DIEGO, CA 92131 | (858)
        576-0007
        <br/>
        A CATALYST BUILT WEBSITE
        <br />
      </p>
    </div>
    <div className="flex gap-5 md:m-0 m-2">
      <Link href="" className="text-4xl ">
        <FaYoutube />
      </Link>
      <Link href="" className="text-4xl ">
      <RiInstagramFill />
      </Link>
      <Link href="" className="text-4xl "> 
      <FaFacebookF />
      </Link>
    </div>
  </footer>
  )
}

export default Footer
