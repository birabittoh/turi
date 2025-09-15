import { Command } from "..";
import { SlashCommandBuilder } from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";
import { EmbedColor, newEmbed } from "../constants";

export default class SkipToCommand extends Command {
  readonly name = "skipto";
  override readonly inVoiceChannel = true;
  override readonly playing = true;
  readonly slashBuilder = new SlashCommandBuilder()
    .setName("skipto")
    .setDescription("Skip to a specific position")
    .addIntegerOption(option => option.setName("position").setDescription("Position to skip to").setRequired(true));
  async onChatInput(interaction: ChatInputCommandInteraction<"cached">) {
    try {
      const position = interaction.options.getInteger("position", true);
      const song = await this.distube.jump(interaction, position);
      interaction.reply({
        embeds: [
          newEmbed()
            .setDescription(`Skipped to \`${song.name || song.url}\``),
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
