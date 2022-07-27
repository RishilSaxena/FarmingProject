import React, { useEffect } from "react";

const Review = ({ e }) => {
  useEffect(() => {

    switch (e.stars) {
      case 1:
        document.getElementById("1-star").style.fill = "#fbbf24";
        break;
      case 2:
        document.getElementById("1-star").style.fill = "#fbbf24";
        document.getElementById("2-star").style.fill = "#fbbf24";
        break;
      case 3:
        document.getElementById("1-star").style.fill = "#fbbf24";
        document.getElementById("2-star").style.fill = "#fbbf24";
        document.getElementById("3-star").style.fill = "#fbbf24";
        break;
      case 4:
        document.getElementById("1-star").style.fill = "#fbbf24";
        document.getElementById("2-star").style.fill = "#fbbf24";
        document.getElementById("3-star").style.fill = "#fbbf24";
        document.getElementById("4-star").style.fill = "#fbbf24";
        break;
      case 5:
        document.getElementById("1-star").style.fill = "#fbbf24";
        document.getElementById("2-star").style.fill = "#fbbf24";
        document.getElementById("3-star").style.fill = "#fbbf24";
        document.getElementById("4-star").style.fill = "#fbbf24";
        document.getElementById("5-star").style.fill = "#fbbf24";
    }
  }, []);

  return (
    <div
      className="p-6 ml-4 mr-4 rounded-md w-1/3 inline-block bg-white shadow-xl text-center"
      id="review"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 inline text-yellow-400 mr-1 ml-1"
        fill="#fbbf24"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        id="1-star"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 inline text-yellow-400 mr-1 ml-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        id="2-star"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 inline text-yellow-400 mr-1 ml-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        id="3-star"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 inline text-yellow-400 mr-1 ml-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        id="4-star"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 inline text-yellow-400 mr-1 ml-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        id="5-star"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
      <h1 className="font-bold text-lg mt-4">{e.title}</h1>
      <p className="font-medium text-md mt-4">{e.body}</p>
    </div>
  );
};

export default Review;
