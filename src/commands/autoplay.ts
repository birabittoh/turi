import { Command } from "..";
import { SlashCommandBuilder } from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";
import { EmbedColor, newEmbed } from "../constants";

export default class AutoplayCommand extends Command {
  readonly name = "autoplay";
  override readonly inVoiceChannel = true;
  override readonly playing = true;
  readonly slashBuilder = new SlashCommandBuilder().setName("autoplay").setDescription("Toggle autoplay");
  async onChatInput(interaction: ChatInputCommandInteraction<"cached">) {
    try {
      await interaction.reply({
        embeds: [
          newEmbed()
            .setDescription(`Autoplay: \`${this.distube.toggleAutoplay(interaction) ? "On" : "Off"}\``),
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
