import React from 'react';
import logo from "../../../assets/logo2.png";
import { useContext } from 'react';
import { TransactionConnect } from '../context/TransactionConnect';
import { BiLogOut } from 'react-icons/bi';
import { BiWallet } from 'react-icons/bi';

const NavBarItem = ({title}: {title: string})=>{
  return(
    <li className='cursor-pointer text-sm sm:text-base hover:text-blue-400 transition-colors duration-200 font-medium'>{title}</li>
  )
} 



const Navbar: React.FC = () => {
  const {isLoggedOut} = useContext(TransactionConnect);
const {disconnectWallet} = useContext(TransactionConnect);
const {connectMyWallet} = useContext(TransactionConnect);


const handleLogout = () => {
  disconnectWallet();
}

const handleLogin = () => {
  connectMyWallet();
}

  return (
    <>
      <nav className="w-full flex justify-center items-center h-16 sm:h-20 md:h-24 lg:h-28 pt-2 sm:pt-4 border-none px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center w-full max-w-7xl mx-auto gap-4 sm:gap-6 lg:gap-8">
          <div className="flex-shrink-0">
            <img src={logo} alt="logo" className="w-22 h-22 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 cursor-pointer object-contain" />
          </div>
          
          {/* Desktop Navigation */}
          <ul className="hidden lg:flex text-white list-none items-center gap-4 sm:gap-6 lg:gap-8">
            {["Market", "Exchange", "Transactions", "Wallets"].map((item, index) => (
              <NavBarItem key={item + index} title={item} />
            ))}
          </ul>
          
          {/* Mobile Menu Button - You can add hamburger menu later */}
          <div className="lg:hidden">
            <button className="text-white p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          {/* Connect/Logout Button */}
          <div className="hidden sm:block">
            {isLoggedOut ? (
              <button type="button" onClick={handleLogin} className="flex flex-row justify-center items-center bg-[#2952e3] hover:bg-[#2546bd] text-white px-3 sm:px-4 py-2 sm:py-3 rounded-full cursor-pointer transition-all duration-200 text-sm sm:text-base font-medium gap-2">
                <BiWallet fontSize={18} className="sm:text-xl" />
                <span className="hidden sm:inline">Connect Wallet</span>
                <span className="sm:hidden">Connect</span>
              </button>
            ) : (
              <button type="button" onClick={handleLogout} className="flex flex-row justify-center items-center bg-[#2952e3] hover:bg-[#2546bd] text-white px-3 sm:px-4 py-2 sm:py-3 rounded-full cursor-pointer transition-all duration-200 text-sm sm:text-base font-medium gap-2">
                <BiLogOut fontSize={18} className="sm:text-xl" />
                <span className="hidden sm:inline">Logout</span>
                <span className="sm:hidden">Out</span>
              </button>
            )}
          </div>
        </div>
        
      </nav>
      
      
    </>
  )
}

export default Navbar