import React from "react";
import { Link } from "@mui/material";
import Image from "next/image";

const LogoIcon = () => {
  return (
    <Link href="/">
      <Image src={"/logo.png"} width={200} height={20} className="m-auto"></Image>
    </Link>
  );
};

export default LogoIcon;
