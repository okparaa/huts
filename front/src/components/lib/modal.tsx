import { X } from "lucide-react";
import ImageCropper from "./image-cropper";

const Modal = ({ updateAvatar, closeModal }: any) => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="crop-image-dialog"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-all"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center px-2 py-12 text-center ">
          <div className="relative w-[95%] sm:w-[600px] min-h-[60vh] rounded-2xl bg-white text-slate-100 text-left shadow-xl transition-all">
            <X
              className="w-8 h-8 text-gray-950 top-2 cursor-pointer absolute right-4"
              onClick={closeModal}
            />
            <div className="px-5 py-4 flex flex-col justify-center items-center">
              <ImageCropper
                updateAvatar={updateAvatar}
                closeModal={closeModal}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
