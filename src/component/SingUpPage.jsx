import { useState } from "react";

export default function SingUpPage({singUpCancel}) {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="shadow-xl transition delay-150 h-auto bg-orange-50 flex justify-center align-center w-[350px] absolute top-40  rounded-2xl md:left-50 lg:left-160">
      <form action="#" className="">
        
        <h1 className="text-center text-2xl mb-10 mt-5">
          Sing<span className="text-orange-600">Up</span>
        </h1>
        <i onClick={singUpCancel} className="fa-solid fa-xmark cursor-pointer absolute left-75 top-8"></i>
        <div className="userImg">
         
        {/* Preview */}
        {image && (
          <img
            src={image}
            alt="Preview"
            className="mt-4 w-24 h-24 object-cover rounded-full mx-auto"
          />
        )}

         <div className="flex justify-center">
            {/* Image Upload */}
          <label className="block mb-2 mt-2 ml-11 text-sm font-medium text-gray-700">
          Upload Profile Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block ml-10 w-30 text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100 "
        />
          </div>

        </div>

        <div className="input ml-7">
          <input
            type="text"
            className="border-2 border-orange-500 rounded-lg pl-2 focus:border-orange-600 w-75 text-base/9 mt-4"
            placeholder="UserName"
            required
          />
          <input
            type="email"
            className="border-2 border-orange-500 rounded-lg pl-2 focus:border-orange-600 w-75 text-base/9 mt-4"
            placeholder="Email"
            required
          />
          <input
            type="password"
            className="border-2 border-orange-500 rounded-lg pl-2 focus:border-orange-600 w-75 text-base/9 mt-4"
            placeholder="Password"
            required
          />

          <button type="submit" className="bg-orange-500 text-red-50 cursor-pointer rounded-lg p-2 w-75 mt-5">
            SingUp
          </button>

          <div className="or flex justify-center mt-2 text-lg">
       <span className="mx-2 text-gray-500">or</span>
          </div>
        </div>

        <div className="googleLogin cursor-pointer mb-5 mx-7 rounded-2xl border-2 border-gray-300 text-base/9 flex">
          <div className="ml-25 text-gray-600">login with</div>
          <img
            src="../src/assets/google-color.png"
            alt=""
            className="w-6 h-6 mt-[8px] ml-2"
          />
        </div>
      </form>
    </div>
  );
}