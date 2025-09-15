import { Command } from "..";
import { SlashCommandBuilder } from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";
import { EmbedColor, newEmbed } from "../constants";

export default class ClearCommand extends Command {
  readonly name = "clear";
  override readonly inVoiceChannel = true;
  override readonly playing = true;
  readonly slashBuilder = new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clear queue contents");
  async onChatInput(interaction: ChatInputCommandInteraction<"cached">) {
    try {
      const queue = this.distube.getQueue(interaction);
      if (!queue) throw "No queue found";
      if (queue.songs.length <= 1) throw "No songs in the queue to clear";
      queue.songs = [queue.songs[0]];
      await interaction.reply({
        embeds: [newEmbed().setDescription("Cleared the queue!")],
      });
    } catch (e) {
      console.error(e);
      interaction.reply({
        embeds: [newEmbed(EmbedColor.Error).setDescription(`Error: \`${e}\``)],
      });
    }
  }
}
