import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { Image } from "./image";
import Modal from "./modal";

const Avatar = ({ avatarUrl, updateAvatar }: any) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="flex flex-col items-start">
      <div className="relative pb-4">
        <Image
          onClick={() => setModalOpen(true)}
          src={avatarUrl.current}
          alt=""
          className="w-[150px] cursor-pointer h-[150px] rounded-full border-2 border-gray-400"
        />
        <div className="text-center text-gray-400">upload photo</div>
        <PencilIcon
          onClick={() => setModalOpen(true)}
          className="w-6 h-6 rounded-md font-extrabold shadow-xl left-1/2 border-gray-400 bg-gray-200 top-0 p-0 cursor-pointer text-black absolute translate-y-[-50%] translate-x-[-50%]"
        />
      </div>
      {modalOpen && (
        <Modal
          updateAvatar={updateAvatar}
          closeModal={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Avatar;
