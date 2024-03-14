"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const page = async ({ params }) => {
  const router = useRouter();
  const res = await fetch(`http://localhost:3000/api/Persons/${params.id}`, {
    method: "DELETE",
  });
  if (res.ok) {
    router.refresh();
    router.push("/showPerson");
  }
};

export default page;
