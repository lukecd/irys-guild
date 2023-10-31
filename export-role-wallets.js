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

// console.log("members=", members);
roles.forEach((role) => {
	const memberObj = members.find((m) => m.roleId === role.id);
	console.log(`${role.id} - ${role.name}`);
	if (memberObj && memberObj.members.length) {
		memberObj.members.forEach((member) => {
			console.log(`- ${member}`);
		});
	}
	console.log("\n"); // For spacing between roles
});
