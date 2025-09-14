import { Command } from "..";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";
import { BOT_NAME } from "../constants";

export default class VolumeCommand extends Command {
  readonly name = "volume";
  override readonly inVoiceChannel = true;
  override readonly playing = true;
  readonly slashBuilder = new SlashCommandBuilder()
    .setName("volume")
    .setDescription("Set the volume")
    .addNumberOption(option =>
      option.setName("volume").setDescription("The volume to set").setMinValue(0).setMaxValue(1000).setRequired(true),
    );
  async onChatInput(interaction: ChatInputCommandInteraction<"cached">) {
    const volume = interaction.options.getNumber("volume", true);
    this.distube.setVolume(interaction, volume);
    await interaction.reply({
      embeds: [
        new EmbedBuilder().setColor("Blurple").setTitle(BOT_NAME).setDescription(`Set volume to \`${volume}\``),
      ],
    });
  }
}
