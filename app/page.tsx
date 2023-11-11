"use client";
import Link from "next/link";
import useGetInitSign from "./hooks/useGetInitSign";

export default function Home(test: any) {
  const sign = useGetInitSign();

  return (
    <>
      <section className=" text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-extrabold mb-4">
            Horoscope Predictions
          </h1>
          <p className="text-lg mb-8">
            Get insights into your daily horoscope and uncover your future.
          </p>
          <Link
            href={`/daily${sign ? `?sign=${sign}` : ""}`}
            className="bg-white text-blue-500 hover:bg-blue-500 hover:text-white py-2 px-6 rounded-full text-lg font-semibold transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </section>
    </>
  );
}
