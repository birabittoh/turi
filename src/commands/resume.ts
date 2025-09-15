import { Command } from "..";
import { SlashCommandBuilder } from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";
import { EmbedColor, newEmbed } from "../constants";

export default class ResumeCommand extends Command {
  readonly name = "resume";
  override readonly inVoiceChannel = true;
  override readonly playing = true;
  readonly slashBuilder = new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Resume song playback");
  async onChatInput(interaction: ChatInputCommandInteraction<"cached">) {
    try {
      await this.distube.resume(interaction);
      interaction.reply({
        embeds: [
          newEmbed()
            .setDescription(`▶️ Resumed`),
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
