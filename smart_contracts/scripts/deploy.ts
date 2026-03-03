import hre from "hardhat";

const main = async () => {
    const TransactionsFactory = await hre.ethers.getContractFactory("Transactions");
    const transactionsContract = await TransactionsFactory.deploy();

    await transactionsContract.waitForDeployment();

    console.log("Transactions deployed to:",await transactionsContract.getAddress());
}

const runMain = async () => {

    try{
        await main();
        process.exit(0);
    }catch(err){
        console.log("Error found:",err);
        process.exit(1); 
    }   
}

runMain();