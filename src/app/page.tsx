// src/app/page.js

import Link from "next/link";
import Hinton from "./component/hinton";
import Reality from "./component/reality";
import Timeline from "./component/timeline";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main>
        <Hinton/>
        <Reality/>
        <Timeline/>

        <div className="relative rounded-3xl px-8 py-10 sm:p-12 text-center">
            
            <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Discover the nDNA Project
            </h2>
            <div className="mt-8">
              <Link
                href="https://pragyaai.github.io/ndna/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center rounded-full py-3 px-7 text-sm font-semibold text-white shadow-lg transition-all duration-300 ease-in-out bg-gradient-to-r from-cyan-500 via-purple-500 to-indigo-600 hover:scale-105 hover:shadow-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
              >
                 nDNA Project
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
    </main>
  );
}