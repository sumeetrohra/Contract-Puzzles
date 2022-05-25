const { assert } = require("chai");

describe("Game5", function () {
  it("should be a winner", async function () {
    const Game = await ethers.getContractFactory("Game5");

    // good luck
    const threshold = 0x00ffffffffffffffffffffffffffffffffffffff;
    let wallet;
    while (true) {
      wallet = ethers.Wallet.createRandom().connect(ethers.provider);
      if (wallet.address < threshold) {
        break;
      }
    }

    let signer = ethers.provider.getSigner(0);
    let tx = await signer.sendTransaction({
      to: wallet.address,
      value: ethers.utils.parseEther("1"),
    });

    const game = await Game.connect(wallet).deploy();
    await game.deployed();
    await game.win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
