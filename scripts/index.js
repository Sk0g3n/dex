const { web3 } = require("hardhat");

require("@nomiclabs/hardhat-truffle5");
const SwappableToken = artifacts.require("SwappableToken");
const Dex = artifacts.require("Dex");

async function main() {
    const accounts = await web3.eth.getAccounts();
    const swappabletoken1 = await SwappableToken.new("suka", "suk", 10000);
    const swappabletoken2 = await SwappableToken.new("blyat", "bly", 10000);
    const dex = await Dex.new(swappabletoken1.address, swappabletoken2.address);
    await swappabletoken1.transfer(dex.address, 100, {from: accounts[0]});
    await swappabletoken2.transfer(dex.address, 100, {from: accounts[0]});
    await swappabletoken1.transfer(accounts[1], 10);
    await swappabletoken2.transfer(accounts[1], 10);
    await swappabletoken1.approve(dex.address, 10000, {from:accounts[1]});
    await swappabletoken2.approve(dex.address, 10000, {from:accounts[1]});
    await dex.swap(swappabletoken1.address, swappabletoken2.address, 10, {from: accounts[1]})
    await dex.swap(swappabletoken2.address, swappabletoken1.address, 20, {from: accounts[1]})
    await dex.swap(swappabletoken1.address, swappabletoken2.address, 24, {from: accounts[1]})
    await dex.swap(swappabletoken2.address, swappabletoken1.address, 30, {from: accounts[1]})
    await dex.swap(swappabletoken1.address, swappabletoken2.address, 41, {from: accounts[1]})
    await dex.swap(swappabletoken2.address, swappabletoken1.address, 45, {from: accounts[1]})
    console.log(await dex.balanceOf(swappabletoken1.address, dex.address));
    console.log(await dex.balanceOf(swappabletoken2.address, dex.address));
    
}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});