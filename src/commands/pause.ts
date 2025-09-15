import { Command } from "..";
import { SlashCommandBuilder } from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";
import { EmbedColor, newEmbed } from "../constants";

export default class PauseCommand extends Command {
  readonly name = "pause";
  override readonly inVoiceChannel = true;
  override readonly playing = true;
  readonly slashBuilder = new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pauses song playback");
  async onChatInput(interaction: ChatInputCommandInteraction<"cached">) {
    try {
      await this.distube.pause(interaction);
      interaction.reply({
        embeds: [
          newEmbed()
            .setDescription(`⏸️ Paused`),
        ],
      });
    } catch (e) {
      console.error(e);
      interaction.reply({
        embeds: [newEmbed(EmbedColor.Error).setDescription(`Error: \`${e}\``)],
      });
    }
  }
}
