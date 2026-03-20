
import { SiEthereum } from "react-icons/si"
import { BsInfoCircle } from "react-icons/bs"
import { useState, useEffect } from "react"
import { TransactionConnect } from "../context/TransactionConnect"
import { useContext } from "react"
import {Loader} from "./"



const commonStyles = 'min-h-[70px] sm:px-0 px-0 sm:min-w-[100px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white ';
const Input = ({placeholder,name,type,value,step,onChange}:{placeholder:string,name:string,type:string,value:string,step?:string,onChange:(e:React.ChangeEvent<HTMLInputElement>,name:string) => void}) =>
   (
    <input 
      placeholder={placeholder}
      name={name}
      type={type}
      value={value}
      step={step}
      onChange={(e) => onChange(e, name)}
className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
  );
 


const Welcome = () => {
const{connectMyWallet} = useContext(TransactionConnect);
const {currentAccount} = useContext(TransactionConnect);
const {sendTransaction} = useContext(TransactionConnect);
const {formData} = useContext(TransactionConnect);
const {handleChange} = useContext(TransactionConnect);
const {checkAccountBalance} = useContext(TransactionConnect);

const [balance, setBalance] = useState<string | null>(null);
const [isLoading, setIsLoading] = useState(false);

const getBalance = async () => {
  const accountBalance = await checkAccountBalance();
  const formattedBalance = accountBalance ? parseFloat(accountBalance).toFixed(4) : null;
    

  setBalance(formattedBalance);
};

useEffect(() => {
  if (currentAccount) {
    getBalance();
  }
}, [currentAccount]);

const {addressTo,amount,keyword,message} = formData;



  const handleSubmit = async(e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if(!addressTo || !amount || !keyword || !message){
      console.log('Please fill in all fields.');
      return;
    }
    try{
      setIsLoading(true);
      await sendTransaction();
    }catch(err){
      console.log('Error sending transaction:',err);
    }
      finally{
        setIsLoading(false);
  }
      
}
   
return (
    <>
      <div className= "w-full justify-center items-center h-auto py-10 sm:py-20">
        <div className="flex-1 flex flex-col justify-center items-center justify-between px-4 sm:px-8 md:px-20">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center">Welcome to Ledgerly</h1>
          <p className="text-white mt-4 sm:mt-6 md:mt-8 text-lg sm:text-xl md:text-2xl text-center max-w-2xl">Your decentralized financial platform.</p>
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-start px-4 sm:px-8 md:px-20 py-8 sm:py-12">
            <div className="flex-1 flex justify-start flex-col w-full lg:w-auto mb-8 lg:mb-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl text-white text-gradient py-4 sm:py-6 md:py-8 text-center lg:text-left">
                Send Crypto  <br/> across continents <br/> easily on Ledgerly.
              </h1>
              <p className="text-left mt-4 sm:mt-5 text-white font-light w-full text-base sm:text-lg md:text-xl lg:text-2xl text-center lg:text-left">Secure and decentralized transactions <br/>powered by blockchain technology.</p>

          {!currentAccount && (<button
              type="button"
              onClick={connectMyWallet}
              className="flex flex-row justify-center items-center mx-auto lg:mx-0 my-4 sm:my-5 bg-[#2952e3] hover:bg-[#2546bd] text-white py-2 px-6 sm:px-8 rounded-full cursor-pointer transition-all duration-200 hover:scale-105">
            
              <p className="text-white text-sm sm:text-base font-semibold">Connect Wallet</p>
            </button>)}
            

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 w-full max-w-sm sm:max-w-md mt-6 sm:mt-8 mx-auto lg:mx-0">
              <div className={`rounded-tl-2xl ${commonStyles}`}>
                Reliability
              </div>
              <div className={commonStyles}> Security</div>
               <div className={`rounded-tr-2xl ${commonStyles}`}>
                Ethereum
              </div>
              <div className={`rounded-bl-2xl ${commonStyles}`}>
                WEB 3.0
              </div>
              <div className= {commonStyles}>
                Low Fees
              </div>
              <div className={`rounded-br-2xl ${commonStyles}`}>
                Blockchain
              </div>
  
            </div>
             

            </div>

            <div className="flex flex-col flex-1 items-center justify-start w-full mt-8 lg:mt-0 lg:ml-4">
              <div className="p-3 sm:p-4 justify-end items-start flex-col rounded-xl h-40 sm:h-44 w-full max-w-sm sm:max-w-md my-5 eth-card white-glassmorphism">
                <div className="flex justify-between flex-col w-full h-full">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                      <SiEthereum fontSize={21} color="#fff" />
                    </div>
                    <BsInfoCircle fontSize={17} color="#fff" />
                  </div>
                  <div className="p-2">
                    <p className="text-white font-light text-sm">
                      {currentAccount ? 
                      <>
                      <p className="text-white text-lg font-bold">{balance} SepoliaETH</p>
                      {currentAccount.slice(0,6)}...{currentAccount.slice(38,42)}
                        
                      </>
                      
                      : "Address"}
                    </p>
                      <p className="text-white font-bold text-sm pd-1 mt-2">
                        Ethereum
                      </p>
                    </div>
                  </div>
                    
              </div>
              <div className="p-4 sm:p-5 w-full max-w-sm sm:max-w-md flex flex-col justify-start items-center blue-glassmorphism mx-auto lg:mx-0">
                  <Input placeholder="Address To" name="addressTo" value={addressTo} type="text" onChange={handleChange}/>
                  <Input placeholder="Amount (ETH)" name="amount" type="text" value={amount} step="0.0001" onChange={handleChange}/>
                  <Input placeholder="Keyword (Gif)" name="keyword" type="text" value={keyword} onChange={handleChange}  />
                    <Input placeholder="Enter Message" name="message" type="text" value={message} onChange={handleChange} />
                      <div className="h-[1px] w-full bg-gray-400 my-2" />
                  
                  {isLoading ? (
                    <Loader />
                  ) : (<button type="button" onClick={handleSubmit} className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:border-[#2952e3] rounded-full cursor-pointer">Send Now</button>)}
              </div>

            </div>

              
        </div>
      </div>
      {/* Additional Features Section */}
      <div className="w-full mt-12 sm:mt-16 lg:mt-20">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white font-bold mb-4">Why Choose Ledgerly?</h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto px-4">
            Experience the future of decentralized finance with our cutting-edge platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 p-6 rounded-xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2 text-center">Bank-Grade Security</h3>
            <p className="text-gray-300 text-sm text-center">Military-grade encryption protects your assets at all times</p>
          </div>

          <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 p-6 rounded-xl border border-green-500/20 hover:border-green-400/40 transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2 text-center">Lightning Fast</h3>
            <p className="text-gray-300 text-sm text-center">Process transactions in seconds with our optimized infrastructure</p>
          </div>

          <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-6 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2 text-center">Global Network</h3>
            <p className="text-gray-300 text-sm text-center">Connect with users worldwide through our decentralized network</p>
          </div>

          <div className="bg-gradient-to-br from-orange-900/50 to-red-900/50 p-6 rounded-xl border border-orange-500/20 hover:border-orange-400/40 transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2 text-center">Low Fees</h3>
            <p className="text-gray-300 text-sm text-center">Transparent pricing with minimal transaction fees</p>
          </div>

          <div className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2 text-center">Trustworthy</h3>
            <p className="text-gray-300 text-sm text-center">Audited smart contracts and proven track record</p>
          </div>

          <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 p-6 rounded-xl border border-indigo-500/20 hover:border-indigo-400/40 transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2 text-center">Developer Friendly</h3>
            <p className="text-gray-300 text-sm text-center">Comprehensive APIs and SDKs for seamless integration</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full mt-16 sm:mt-20 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 sm:p-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white font-bold">Platform Statistics</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-400 mb-2">$2.5M+</div>
            <div className="text-gray-300 text-sm sm:text-base">Daily Volume</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-400 mb-2">50K+</div>
            <div className="text-gray-300 text-sm sm:text-base">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-400 mb-2">100K+</div>
            <div className="text-gray-300 text-sm sm:text-base">Transactions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-orange-400 mb-2">99.9%</div>
            <div className="text-gray-300 text-sm sm:text-base">Uptime</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full mt-16 sm:mt-20 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto px-4">
          Join thousands of users who trust Ledgerly for their decentralized financial needs
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 w-full sm:w-auto">
            Start Trading
          </button>
          <button className="border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 w-full sm:w-auto">
            Learn More
          </button>
        </div>
      </div>
        
    
  
</>
)
}

export default Welcome