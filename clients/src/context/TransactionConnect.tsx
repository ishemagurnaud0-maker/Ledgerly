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
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    transactions:any[];
    isLoggedOut: boolean;
    setIsLoggedOut: React.Dispatch<React.SetStateAction<boolean>>;
    disconnectWallet: () => void;
    transactionCount:string;

    

}
export const TransactionConnect = React.createContext<TransactionContextType>({} as TransactionContextType);

// Function to get the Ethereum contract instance
const getEthereumContract = async():Promise<ethers.Contract | undefined> =>{

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
        return;
    }
   }


   const getEthereumContractReadOnly = async(): Promise<ethers.Contract | undefined> => {

    try{
        const provider = new ethers.BrowserProvider(window.ethereum);
        const transactionContract = new ethers.Contract(contractAddress,contractAbi,provider)

        return transactionContract;
    }catch(err){
        console.error("Error occurred in accessing contract(READ-Only)",err);
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
        message: "",
    });
    const [transactionCount,setTransactionCount] =useState(localStorage.getItem('transactionCount') || '0');
    const [transactions,setTransactions] = useState<any[]>([]);
    const [isLoggedOut, setIsLoggedOut] = useState<boolean>(true);

// Function to fetch all transactions from the blockchain
           const getAllTransactions = async() => {
            try{
                    if(!window.ethereum) throw new Error ('No Metamask wallet found, please install one.');
                
                const transactionContract = await getEthereumContract();
                if(transactionContract == null) throw new Error('Failed to connect to the contract instance.');

                const availableTransactions = await transactionContract.getAllTransactions();
                console.log('Available transactions:', availableTransactions);

                const structuredTransactions = availableTransactions.map((transaction:any) => ({
                    addressTo : transaction.receiver,
                    addressFrom : transaction.sender,
                    timestamp : new Date(Number(transaction.timestamp)* 1000).toLocaleString(),
                    message : transaction.message,
                    keyword : transaction.keyword,
                    amount : parseFloat(ethers.formatEther(transaction.amount)),
                    url:'https://media.tenor.com/CW5l9EuXAUYAAAAM/nft-nfts.gif',
                }))
                console.log('Structured transactions:', structuredTransactions);
                if(structuredTransactions.length === 0){
                    console.log('No transactions found.');
                }
                setTransactions(structuredTransactions);

            } catch(err) {
                console.error("Error occurred while fetching transactions:", err);
                
            }
           } 

    const checkIfWalletIsConnected = async() => {
                try{
                    if(!window.ethereum) throw new Error ("No Wallet Found,Please install one.");

                         const accounts = await window.ethereum.request({method:"eth_accounts"});
                     if(accounts.length === 0){
                         console.log("No accounts connected yet. Please connect your wallet.");
                         return;
                     }
                     
                        setCurrentAccount(accounts[0]);
                        console.log("Account connected:", accounts[0]);
                        getAllTransactions();
                          return;
                         
        }
                catch(err){
                    console.error("Error occurred while checking wallet connection:",err);
                }
            }

            // function to check if a transaction exits
            
            const checkIfTransactionExist = async() => {
                try{
                    const transactionContract = await getEthereumContractReadOnly();
                        if(transactionContract == null) throw new Error('Failed to connect to the contract instance.');

                    const transactionCount = await transactionContract.getTransactionCount();

                    window.localStorage.setItem('transactionCount',transactionCount.toString())
                    setTransactionCount(transactionCount.toString());
                }catch(err){
                    console.error("Error occurred while checking transaction existence:",err);
                    throw new Error("Failed to check transaction existence");
                }
            }
            
            //Function to check the account balance of the connected wallet
            const checkAccountBalance = async() =>{
                try{
                    if(!window.ethereum) throw new Error ('No wallet found, please install one.')
                        
                        const provider = new ethers.BrowserProvider(window.ethereum);
                        const balance = await provider.getBalance(currentAccount);
                        const balanceInEther = ethers.formatEther(balance);
                        console.log(`Current account balance: ${balanceInEther} ETH`);  
                        return balanceInEther;

                }catch(err){
                    console.log('Error occurred while checking account balance:', err);
                }
            }




            //Function to send a transaction to the blockchain

            const sendTransaction = async() => {
                const {addressTo, amount, keyword, message} = formData;
                const balance = await checkAccountBalance();
                
                try{
                    if(!window.ethereum) throw new Error ("No Wallet Found,Please install one.");
                    
                    if(!amount || amount.trim() === '') throw new Error("Amount is required and cannot be empty.");
                        if(isNaN(Number(amount))) throw new Error("Amount must be a valid number.");
                        if(Number(amount) <= 0) throw new Error("Amount must be greater than zero.");
                        
                        if(!ethers.isAddress(addressTo)) throw new Error("Invalid recipient address.");
                        if(Number(amount) > Number(balance)){
                            console.log('Insufficient balance to perform the transaction.');
                            alert('Insufficient funds to perform the transaction.');
                            return;
                        }


                    const transactionContract = await getEthereumContract();
                    if(transactionContract == null) throw new Error('Failed to connect to the contract instance.');
                    const parsedAmount = ethers.parseEther(amount);


                        await window.ethereum.request({
                            method:'eth_sendTransaction',
                            params:[{
                                from:currentAccount,
                                to:addressTo,
                                gas:'0x5208', //21000 wei
                                value: '0x'+ parsedAmount.toString(16),
                            }]

                        });

                        

                        
                            setIsLoading(true);
                          const transactionHash = await transactionContract.addToBlockchain(addressTo,parsedAmount,message,keyword);
                          
                            console.log(`Loading - ${transactionHash.hash}`);
                          await transactionHash.wait();
                        setIsLoading(false);
                        console.log(`Success - ${transactionHash.hash}`);

                        await getAllTransactions();
                        await checkIfTransactionExist();

                }
                catch(err:any){
                   if(err.code === 4001){
                    console.log('Transaction rejected by the user.');
                   }
                   else{
                    console.error("Error occurred while sending transaction:",err);
                   }
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
                    await getAllTransactions();
                    setIsLoggedOut(false);
                }catch(err){
                    console.error("Error occurred while connecting to the wallet:",err);
                }
            }

            const disconnectWallet = () => {
                setCurrentAccount("");
                setTransactions([]);
                setIsLoggedOut(true);
            }

    useEffect(() =>{
        const init = async() => {
           await checkIfWalletIsConnected();
           await checkIfTransactionExist();
         
        }
        init();
        
    },[]);
    
    return(
        <TransactionConnect.Provider value={{connectMyWallet,currentAccount,formData,handleChange: (e, name) => setFormData({...formData, [name]: e.target.value}) ,sendTransaction,isLoading,transactions,setIsLoading,isLoggedOut,setIsLoggedOut,disconnectWallet,transactionCount}}>{children}</TransactionConnect.Provider>
    )
   };


   export default TransactionProvider ;
   