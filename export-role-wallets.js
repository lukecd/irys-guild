import dotenv from "dotenv";
import { ethers } from "ethers";
dotenv.config();

import { createGuildClient, createSigner } from "@guildxyz/sdk";

const ethersWallet = new ethers.Wallet(process.env.PRIVATE_KEY);
const signerFunction = createSigner.fromEthersWallet(ethersWallet);
const guildName = "test876bs-21d308";
const guildID = "54486";

// The only parameter is the name of your project
const guildClient = createGuildClient(guildName);

const {
	guild: { role: roleClient },
} = guildClient;
// Get Guild by its urlName (slug)

// Get all roles of a guild
const roles = await roleClient.getAll(
	guildName,
	signerFunction, // Optional, if a valid signer is provided, the result will contain private data
);

// console.log("roles=", roles);

const { guild: client } = guildClient;

// Get the members of a guild
const members = await client.getMembers(
	guildID,
	signerFunction, // Optional, if a valid signer is provided, the result will contain private data
);
// 1. Create hardcoded variable for the XP of each Role.
const roleXP = {
	89687: 42,
	90844: 20,
	90898: 36,
};

// 2. Print each Role and the XP it's worth.
console.log(`Roles and XP`);
roles.forEach((role) => {
	console.log(`${role.id} - ${role.name} - ${roleXP[role.id]} XP`);
});
console.log("\n");
// 3. Calculate the XP each wallet address has.
let walletXP = {};
members.forEach((memberObj) => {
	memberObj.members.forEach((wallet) => {
		if (!walletXP[wallet]) {
			walletXP[wallet] = 0;
		}
		walletXP[wallet] += roleXP[memberObj.roleId];
	});
});

// 4. Print wallet addresses under each Role, sorted by XP.
roles.forEach((role) => {
	console.log(`${role.id} - ${role.name} - ${roleXP[role.id]} XP`);

	const sortedMembers = members.find((m) => m.roleId === role.id).members.sort((a, b) => walletXP[b] - walletXP[a]);

	sortedMembers.forEach((wallet) => {
		console.log(`${wallet} - ${walletXP[wallet]} TOTAL XP`);
	});

	console.log("\n");
});

// 5. Print a leaderboard of all wallet addresses sorted by XP.
console.log("LEADERBOARD");
const sortedWallets = Object.keys(walletXP).sort((a, b) => walletXP[b] - walletXP[a]);
sortedWallets.forEach((wallet) => {
	console.log(`${wallet} - ${walletXP[wallet]} XP`);
});
