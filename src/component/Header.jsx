

import '../public/Header.css';


export default function Header() {



  

  return (
    <div className="header grid grid-cols-6 ">
      {/* <h1>hello</h1> */}
        <div className="logo w-19 mt-2 sm:w-25 col-start-1 md:ml-9 sm:pr-5">
         <img src="logo.png" alt="logo img error" className='w-14 sm:w-20 md:w-25' />
        </div>

        
        <div className="userProfile"></div>
    </div>
  )
}
