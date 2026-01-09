

import '../public/Header.css';


export default function Header() {
  return (
    <div className="header grid grid-cols-6 ">
      {/* <h1>hello</h1> */}
        <div className="logo w-19 mt-2 sm:w-25 col-start-1 md:ml-9 sm:pr-5">
         <img src="../src/assets/logo.png" alt="logo img error" className='w-14 sm:w-20 md:w-25' />
        
        </div>
        <form className="search flex mt-3 gap-3 col-span-4 col-start-2 sm:">
           <input type="text" className='w-42 h-9 rounded-xl border-2 border-orange-500 text-[14px] pl-2 sm:w-110 sm:h-12' />
            <div>
              <button className="btn sm:h-12 bg-orange-500" type='button'>Search</button>
            </div>
        </form>
        <div className="userProfile"></div>
    </div>
  )
}
