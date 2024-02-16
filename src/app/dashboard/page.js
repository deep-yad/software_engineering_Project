import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";

export default function Dashboard() {
  return (
    <>
      <div className="header h-16 flex items-center px-4 bg-gray-300">
        Header
      </div>
      <div className="dashboard-container flex flex-1 h-screen"> 
        <div className="sidebar w-20 bg-purple-700">
          <div className="sidebar-content p-2 text-white">Sidebar</div>
        </div>

        <div className="main-content flex-1 p-4 bg-gray-200 ">
          <div className="row1 flex mb-4 h-1/5">
            <div className="card w-1/4 m-2 h-full bg-white shadow-md rounded-md">Card 1</div>
            <div className="card w-1/4 m-2 h-full bg-white shadow-md rounded-md">Card 2</div>
            <div className="card w-1/2 m-2 h-full bg-white shadow-md rounded-md">Card 3</div>
            <div className="card w-1/2 m-2 h-full bg-white shadow-md rounded-md">Card 4</div>
          </div>
          <div className="row2 flex mb-4 h-2/5">
            <div className="card w-3/4 m-2 h-full bg-white shadow-md rounded-md">Card 5</div>
            <div className="card w-1/4 m-2 h-full bg-white shadow-md rounded-md">Card 6</div>
          </div>
          <div className="row3 flex mb-4 h-2/5">
            <div className="card w-3/4 m-2  bg-white shadow-md rounded-md">Card 7</div>
            <div className="card w-1/4 m-2  bg-white shadow-md rounded-md">Card 8</div>
          </div>
        </div>
      </div>
    </>
  );
}
