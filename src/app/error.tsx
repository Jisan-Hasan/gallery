"use client";

import Link from "next/link";

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="text-red-600 text-5xl font-semibold mb-4">
                Oops!
            </div>
            <h1 className=" text-3xl font-semibold text-center">
                Something Went Wrong
            </h1>
            <p className=" text-lg mt-4">
                Don&apos;t worry, our team is on it!
            </p>
            <Link
                    href="/"
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 mt-12 rounded transition duration-150"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                    <span>Return Home</span>
                </Link>
        </div>
    );
};

export default ErrorPage;
