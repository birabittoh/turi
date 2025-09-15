import { Command } from "..";
import { SlashCommandBuilder } from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";
import { EmbedColor, newEmbed } from "../constants";

export default class SkipCommand extends Command {
  readonly name = "skip";
  override readonly inVoiceChannel = true;
  override readonly playing = true;
  readonly slashBuilder = new SlashCommandBuilder().setName("skip").setDescription("Skip the current song");
  async onChatInput(interaction: ChatInputCommandInteraction<"cached">) {
    try {
      const song = await this.distube.skip(interaction);
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
