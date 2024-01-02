import { PhoneIcon } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="w-9/12 mx-auto hidden">
      <div className="text-white w-9/12 fixed bottom-0 text-[9px]">
        <div className="flex flex-1 items-center  rounded-t-xl justify-between bg-blue-gray-900 px-4">
          <div>&copy; All rights reserved, powered by beeworks ltd</div>
          <div className="text-right">
            <PhoneIcon className="inline-block w-10 h-6" />
            <span>08133709989</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
