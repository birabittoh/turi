import { Command } from "..";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";
import { BOT_NAME } from "../constants";

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
          new EmbedBuilder()
            .setColor("Blurple")
            .setTitle(BOT_NAME)
            .setDescription(`Skipped to \`${song.name || song.url}\``),
        ],
      });
    } catch (e) {
      console.error(e);
      interaction.reply({
        embeds: [new EmbedBuilder().setColor("Blurple").setTitle(BOT_NAME).setDescription(`Error: \`${e}\``)],
      });
    }
  }
}
