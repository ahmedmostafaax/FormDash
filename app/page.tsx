"use client";
import Image from "next/image";
import MainPage from "./Home/page";
import { useState } from "react";
import SideBar from "./Component/SideBar/SideBar";

export default function Home() {
 const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex min-h-screen">
      <SideBar activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      <MainPage/>

    </div>

  );
}
