import hre from "hardhat";

async function main() {
  console.log("Deploying YamSmartContract...");

  // In Hardhat 3, you access providers through the network connection
  const { viem } = await hre.network.connect();

  if (!viem) {
    throw new Error("Viem plugin not found. Check your hardhat.config.ts");
  }

  const yam = await viem.deployContract("YamSmartContract");

  console.log("YamSmartContract deployed to:", yam.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
