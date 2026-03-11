import React from 'react';
import logo from "../../../assets/logo2.png";
import { useContext } from 'react';
import { TransactionConnect } from '../context/TransactionConnect';


const NavBarItem = ({title}: {title: string})=>{
  return(
    <li className='mx-10 cursor-pointer font-family--apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'>{title}</li>
  )
} 

const {isLoggedOut} = useContext(TransactionConnect);
const {disconnectWallet} = useContext(TransactionConnect);
const {setIsLoggedOut} = useContext(TransactionConnect);
const {connectMyWallet} = useContext(TransactionConnect);

const handleLogout = () => {
  disconnectWallet();
}

const handleLogin = () => {
  setIsLoggedOut(false);
  connectMyWallet();

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
          {isLoggedOut ? (
            <button type="button" onClick={handleLogin} className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]">
            Connect Wallet
            </button>
          ) : (
            <button type="button" onClick={handleLogout} className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]">
            Logout
            </button>
          )}

        
      </nav>
      
      
    </>
  )
}

export default Navbar