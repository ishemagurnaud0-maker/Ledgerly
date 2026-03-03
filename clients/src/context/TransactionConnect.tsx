import React, {useEffect,useState} from 'react';
import {ethers} from 'ethers';
import {contractAbi, contractAddress} from '../utils/constants';



interface TransactionContextType{
    connectMyWallet: () => Promise<void>;
    currentAccount: string;
    formData:{
        addressTo: string;
        amount: string;
        keyword: string;
        message: string;

    }
    handleChange:(e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
    sendTransaction: () =>Promise<void>;
}
export const TransactionConnect = React.createContext<TransactionContextType>({} as TransactionContextType);

// Function to get the Ethereum contract instance
const getEthereumContract = async() =>{

    try{
        const provider = new ethers.BrowserProvider(window.ethereum)
         const signer = await provider.getSigner();
         const transactionContract = new ethers.Contract(contractAddress, contractAbi, signer);

         console.log({ 
            provider,
            signer,
            transactionContract
        });


    return transactionContract;
    } catch(err){
        console.error("Error occurred while connecting to the contract",err);
    }
   }




        // Component to provide the transaction context to the application
    const TransactionProvider = ({children}:{children:React.ReactNode}) => {
    const [currentAccount, setCurrentAccount] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        addressTo: "",
        amount: "",
        keyword: "",
        message: ""
    });




    const checkIfWalletIsConnected = async() => {
                try{
                    if(!window.ethereum) throw new Error ("No Wallet Found,Please install one.");

                         const accounts = await window.ethereum.request({method:"eth_accounts"});
                     if(accounts.length === 0) 
                      console.log("No accounts connect yet. Please connect your wallet.");

                setCurrentAccount(accounts[0]);
                console.log("Account connected:", accounts[0]);

                return;
            

        }
                catch(err){
                    console.error("Error occurred while checking wallet connection:",err);
                }
            } 


            //Function to send a transaction to the blockchain

            const sendTransaction = async() =>{
                try{
                    if(!window.ethereum) throw new Error ("No Wallet Found,Please install one.");
                    const {addressTo, amount, keyword, message} = formData;
                    const transactionContract = await getEthereumContract();
                    const parsedAmount = ethers.parseEther(amount);


                        await window.ethereum.request({
                            method:'eth_sendTransaction',
                            params:[{
                                from:currentAccount,
                                to:addressTo,
                                gas:'0x5208', //21000 Gwei
                                value:parsedAmount.toString(),
                            }]

                        });

                        

                        if(transactionContract == null) throw new Error('Failed to connect to the contract instance.');

                          const transactionHash = await transactionContract.addToBlockChain(addressTo,parsedAmount,message,keyword);
                          setIsLoading(true);
                            console.log(`Loading - ${transactionHash.hash}`);
                          await transactionHash.wait();
                        setIsLoading(false);
                        console.log(`Success - ${transactionHash.hash}`);

                }
                catch(err){
                    console.error("Error occurred while sending transaction:",err);
                }
            }



            // Function to connect to the user's wallet
            const connectMyWallet = async() =>{
                
                try{
                    if(!window.ethereum) throw new Error ("No Wallet Found,Please install one.");
                    // Requesting access to the user's Ethereum accounts
                    const accounts = await window.ethereum.request({method:"eth_requestAccounts"});
                    console.log("Wallet connected:", accounts[0]);

                    setCurrentAccount(accounts[0]);
                }catch(err){
                    console.error("Error occurred while connecting to the wallet:",err);
                }
            }
    useEffect(() =>{
        checkIfWalletIsConnected();
         
    },[])
    
    return(
        <TransactionConnect.Provider value={{connectMyWallet,currentAccount,formData,handleChange: (e, name) => setFormData({...formData, [name]: e.target.value}) ,sendTransaction}}>{children}</TransactionConnect.Provider>
    )
   };


   export default TransactionProvider ;
   export {getEthereumContract};