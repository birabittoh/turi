import { Command } from "..";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";
import { BOT_NAME } from "../constants";

export default class StopCommand extends Command {
  readonly name = "stop";
  override readonly inVoiceChannel = true;
  override readonly playing = true;
  readonly slashBuilder = new SlashCommandBuilder().setName("stop").setDescription("Stop the playing queue");
  async onChatInput(interaction: ChatInputCommandInteraction<"cached">) {
    try {
      await this.distube.stop(interaction);
      interaction.reply({
        embeds: [new EmbedBuilder().setColor("Blurple").setTitle(BOT_NAME).setDescription("Stopped!")],
      });
    } catch (e) {
      console.error(e);
      interaction.reply({
        embeds: [new EmbedBuilder().setColor("Blurple").setTitle(BOT_NAME).setDescription(`Error: \`${e}\``)],
      });
    }
  }
}
