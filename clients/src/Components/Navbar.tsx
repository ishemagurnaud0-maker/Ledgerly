import React from 'react'
import logo from "../../../assets/logo2.png"

const NavBarItem = ({title}: {title: string})=>{
  return(
    <li className='mx-10 cursor-pointer font-family--apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'>{title}</li>
  )
} 

const Navbar: React.FC = () => {

  return (
    <>
      <nav className="w-full flex md:justify-center justify-center items-center h-20 pt-4 border-none">
        <div className="md:flex-[0.9] flex-initial justify-start items-center mr-10 mt-8">
          <img src={logo} alt="logo" className="w-65 cursor-pointer" />
        </div>
        <ul className="text-white flex list-none  flex-row justify-between items-center flex-initial ">
          {["Market", "Exchange", "Transactions", "Wallets"].map((item, index) => (
            <NavBarItem key={item + index} title={item} />
          ))}

        </ul>
        <button className="bg-blue-600 hover:bg-blue-900 text-white font-size-400 py-2 px-10 rounded-full ml-15 mr-20 cursor-pointer">
          Login
        </button>
      </nav>
      
      
    </>
  )
}

export default Navbar