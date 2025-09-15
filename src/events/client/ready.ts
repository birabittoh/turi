import { ClientEvent } from "../..";
import { ActivityType, type Client, Routes } from "discord.js";

export default class ErrorEvent extends ClientEvent<"clientReady"> {
  readonly name = "clientReady";
  async run(c: Client<true>) {
    console.log(`Logged in as ${c.user.tag}!`);

    c.user.setActivity("FOSS", { type: ActivityType.Competing });

    await c.rest.put(Routes.applicationCommands(c.user.id), {
      body: this.client.commands.map(c => c.slashBuilder.toJSON()),
    });
  }
}
