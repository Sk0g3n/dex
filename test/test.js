const { assert } = require("hardhat");

const Dex = artifacts.require("Dex");
const SwappableToken = artifacts.require("SwappableToken");
const SwappableToken2 = artifacts.require("SwappableToken");

contract("Dex", (accounts) => {
    let swappabletoken1, swappabletoken2, dex;

    beforeEach( async () => {
        swappabletoken1 = await SwappableToken.new("suka", "sck", 10000);
        swappabletoken2 = await SwappableToken.new("blyat", "bly", 10000);
        dex = await Dex.new(swappabletoken1.address, swappabletoken2.address);

    })
    xit("dep test", async () => {
        //let dex = await Dex.deployed();
        //console.log(dex.address);

        console.log(swappabletoken1.address);
        console.log(swappabletoken2.address);
        assert.equal(await dex.token1.call(), swappabletoken1.address);
        assert.equal(await dex.token2.call(), swappabletoken2.address);
    })

    xit("replicating challenge enviorment", async () => {
        await swappabletoken1.transfer(dex.address, 100, {from: accounts[0]});
        await swappabletoken2.transfer(dex.address, 100, {from: accounts[0]});
        console.log(await dex.balanceOf(swappabletoken1.address, dex.address));
        console.log(await dex.balanceOf(swappabletoken2.address, dex.address));
        await swappabletoken1.transfer(accounts[1], 10);
        await swappabletoken2.transfer(accounts[1], 10);
        console.log(await dex.balanceOf(swappabletoken1.address, accounts[1]));
        console.log(await dex.balanceOf(swappabletoken1.address, accounts[0]));
    })

    it("testing swap meth", async () => {
        await swappabletoken1.transfer(dex.address, 100, {from: accounts[0]});
        await swappabletoken2.transfer(dex.address, 100, {from: accounts[0]});
        await swappabletoken1.transfer(accounts[1], 10);
        await swappabletoken2.transfer(accounts[1], 10);

        await swappabletoken1.approve(dex.address, 10000, {from:accounts[1]});
        await swappabletoken2.approve(dex.address, 10000, {from:accounts[1]});
        await dex.swap(swappabletoken1.address, swappabletoken2.address, 10, {from: accounts[1]})
        console.log(await dex.balanceOf(swappabletoken1.address, accounts[1]));
        console.log(await dex.balanceOf(swappabletoken2.address, accounts[1]));
        await dex.swap(swappabletoken2.address, swappabletoken1.address, 20, {from: accounts[1]})
        console.log(await dex.balanceOf(swappabletoken1.address, accounts[1]));
        console.log(await dex.balanceOf(swappabletoken2.address, accounts[1]));
        await dex.swap(swappabletoken1.address, swappabletoken2.address, 24, {from: accounts[1]})
        console.log(await dex.balanceOf(swappabletoken1.address, accounts[1]));
        console.log(await dex.balanceOf(swappabletoken2.address, accounts[1]));
        await dex.swap(swappabletoken2.address, swappabletoken1.address, 30, {from: accounts[1]})
        console.log(await dex.balanceOf(swappabletoken1.address, accounts[1]));
        console.log(await dex.balanceOf(swappabletoken2.address, accounts[1]));
        await dex.swap(swappabletoken1.address, swappabletoken2.address, 41, {from: accounts[1]})
        console.log(await dex.balanceOf(swappabletoken1.address, accounts[1]));
        console.log(await dex.balanceOf(swappabletoken2.address, accounts[1]));
        await dex.swap(swappabletoken2.address, swappabletoken1.address, 45, {from: accounts[1]})
        console.log(await dex.balanceOf(swappabletoken1.address, dex.address));
        console.log(await dex.balanceOf(swappabletoken2.address, dex.address));

    })
})