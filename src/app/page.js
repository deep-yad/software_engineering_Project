import Image from "next/image";
import Link from "next/link";
import Nav from "@/app/(components)/Nav";
import Dashboard from "./dashboard/page";
export default function Home() {
  return (
    <main>
      {/* <a href="/issue">here</a> */}
      <Dashboard />
    </main>
  );
}
