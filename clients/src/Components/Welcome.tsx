
import { SiEthereum } from "react-icons/si"
import { BsInfoCircle } from "react-icons/bs"
import { useState } from "react"
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

const [isLoading,setIsLoading] = useState(false);
const [formData,setFormData] = useState({
  addressTo: "",
   amount: "",
    keyword: "", 
   message: "" 
  });
const {addressTo,amount,keyword,message} = formData;

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setFormData((prevState)=>({...prevState, [name]:e.target.value}));
  }
   
return (
    <>
      <div className= "w-full justify-center items-center h-auto py-30">
        <div className="flex-1 flex flex-col justify-center items-center justify-between md:p-20 px-4">
          <h1 className="text-4xl font-bold text-white text-8xl">Welcome to Ledgerly</h1>
          <p className=" text-white mt-8 text-3xl">Your decentralized financial platform.</p>
        </div>
        <div className="flex md:flex-row flex-col justify-between items-start md:p-20 py-12 px-4">
            <div className="flex-1 flex justify-start flex-col md:ml-45 ">
              <h1 className="text-4xl sm:text-5xl text-white text-gradient py-8 ">
                Send Crypto  <br/> across continents <br/> easily on Ledgerly.
              </h1>
              <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-2xl ">Secure and decentralized transactions <br/>powered by blockchain technology.</p>

          {!currentAccount && (<button
              type="button"
              onClick={connectMyWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] hover:bg-[#2546bd] text-white font-size-400 py-2  rounded-full cursor-pointer w-150">
            
              <p className="text-white text-base font-semibold">Connect Wallet</p>
            </button>)}
            

            <div className="grid sm:grid-cols-3 grid-cols-2 w-150 mt-10">
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

            <div className="flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10 ">
              <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
                <div className="flex justify-between flex-col w-full h-full">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                      <SiEthereum fontSize={21} color="#fff" />
                    </div>
                    <BsInfoCircle fontSize={17} color="#fff" />
                  </div>
                  <div>
                    <p className="text-white font-light text-sm">Address</p>
                      <p className="text-white font-bold text-sm pd ">
                        Ethereum
                      </p>
                    </div>
                  </div>
                    
              </div>
              <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                  <Input placeholder={"Address To"} name="addressTo" value={addressTo} type="text" onChange={handleChange}/>
                  <Input placeholder="Amount (ETH)" name="amount" type="number" value={amount} step="0.0001" onChange={handleChange} />
                  <Input placeholder="Keyword (Gif)" name="keyword" type="text" value={keyword} onChange={handleChange}  />
                    <Input placeholder="Enter Message" name="message" type="text" value={message} onChange={handleChange} />
                      <div className="h-[1px] w-full bg-gray-400 my-2" />
                  
                  {isLoading ? (
                    <Loader />
                  ) : (<button type="button" onClick={() => setIsLoading(true)} className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer">Send Now</button>)}
              </div>

            </div>

              
        </div>
      </div>
    </>
  )
}

export default Welcome