const { web3 } = require("hardhat");
const token1add = "0x459743A42d83654AF85F3d940fa8eb1dB754e212";
const token2add = "0xC53B3701a6d1C157215F2CC83c7BA04E8caD84C0";
const dexAdd = "0xf2a8CdAF1Ccb52635990e88Af8Ad368885a38c83";

require("@nomiclabs/hardhat-truffle5");
const SwappableToken = artifacts.require("SwappableToken");
const Dex = artifacts.require("Dex");

async function main() {
    const accounts = await web3.eth.getAccounts();
    const dex = await new web3.eth.Contract(Dex.abi, dexAdd);
    const token1 = await new web3.eth.Contract(SwappableToken.abi, token1add);
    const token2 = await new web3.eth.Contract(SwappableToken, token2add);
    console.log(await dex.methods.token1().call());
    
    //await dex.methods.approve(dexAdd, 10000).send({from: accounts[0], gas: 100000});
    console.log(await token1.methods.allowance(accounts[0], dexAdd).call());
    
}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});