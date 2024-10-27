import Link from "next/link";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MdMenuOpen } from "react-icons/md";

const Navbar = () => {
  return (
    <div className=" flex justify-end sm:justify-center py-4">
      <nav className=" hidden sm:block  rounded-tr-3xl rounded-bl-3xl bg-blue-300 text-white items-center px-4   sm:px-24 w-fit">
        <ul className="flex space-x-6 sm:space-x-14 b py-4 sd">
          <li>
            <Link href="/Components/Login">
              <p className=" capitalize">Login</p>
            </Link>
          </li>
          <li>
            <Link href="/Components/Product">
              <p className=" capitalize">Product</p>
            </Link>
          </li>
          <li>
            <Link href="/Components/User">
              <p className=" capitalize">User</p>
            </Link>
          </li>
          <li>
            <Link href="/Components/Sale">
              <p className=" capitalize">Sales</p>
            </Link>
          </li>
          <li>
            <Link href="/Components/Report">
              <p className=" capitalize">Report</p>
            </Link>
          </li>
        </ul>
      </nav>
      <nav className="sm:hidden block px-4">
        <Sheet>
          <SheetTrigger>
            <MdMenuOpen  className=" text-3xl"/>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col">
              <h1 className=" text-3xl py-2 uppercase border-b">Menu</h1><br /><br />
              <ol className=" space-y-7 ">
                <li>
                  <Link href="/Components/Login">
                    <p className=" hover:text-slate-600 capitalize">Login</p>
                  </Link>
                </li>
                <li>
                  <Link href="/Components/Product">
                    <p className=" hover:text-slate-600 capitalize">Product</p>
                  </Link>
                </li>
                <li>
                  <Link href="/Components/User">
                    <p className=" hover:text-slate-600 capitalize">User</p>
                  </Link>
                </li>
                <li>
                  <Link href="/Components/Sale">
                    <p className=" hover:text-slate-600 capitalize">Sales</p>
                  </Link>
                </li>
                <li>
                  <Link href="/Components/Report">
                    <p className=" hover:text-slate-600 capitalize">Report</p>
                  </Link>
                </li>
              </ol>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Navbar;
