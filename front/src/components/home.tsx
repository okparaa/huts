import { MailIcon, PhoneIcon } from "lucide-react";
import { Image } from "./lib/image";
import Navbar from "./lib/navbar";
import wstbrka from "../assets/wstbrka.jpg";

const Home = () => {
  return (
    <div className="h-[100vh] bg-gradient-to-br from-[#3d141a] via-[#3d141a] to-[#725b7d]">
      <div className="flex flex-col justify-center w-10/12 mx-auto">
        <Navbar />
        <div className="flex mt-10 justify-center p-3">
          <div className="flex flex-1 flex-col justify-center tilt-in-left">
            <p className="text-4xl mb-8 font-extrabold text-blue-200">
              WESTBROOK HOTELS LTD
            </p>
            <p className="leading-7 text-gray-300 text-2xl">
              Quality is never an accident. It is always the result of diligence
            </p>
            <div>
              <button className="text-2xl mt-8 bg-blue-200 mr-6 font-bold border border-gray-600 px-4 py-2 rounded-3xl hover:bg-blue-400">
                Reserve rooms
              </button>
              <button className="text-2xl text-blue-200 mt-8 font-bold border border-gray-600 px-4 py-2 rounded-3xl hover:bg-blue-400 hover:text-black">
                Get in touch
              </button>
            </div>
            <div className="mt-8 flex text-white">
              <PhoneIcon className="w-5 h-5 text-blue-200 m-1" /> 0809-0000-000,
              <MailIcon className="ml-8 w-6 h-6 mr-1" /> info@westbrook.ng
            </div>
          </div>
          <div className="flex-1">
            <Image
              src={wstbrka}
              alt="westbrook"
              className="box p-2 rotate-15 border-blue-200 border-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
