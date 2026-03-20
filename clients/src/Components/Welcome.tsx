
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
      
        
    
  
</>
)
}

export default Welcome