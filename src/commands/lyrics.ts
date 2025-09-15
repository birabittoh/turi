import { Command } from "..";
import { SlashCommandBuilder } from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";
import { EmbedColor, getSongLyrics, newEmbed } from "../constants";

const MAX_EMBED_LENGTH = 4096;

export default class LyricsCommand extends Command {
  readonly name = "lyrics";
  override readonly inVoiceChannel = false;
  override readonly playing = false;
  readonly slashBuilder = new SlashCommandBuilder()
    .setName("lyrics")
    .setDescription("Get lyrics for the current song")
    .addStringOption(option => option.setName("song").setDescription("Song to search lyrics for").setRequired(false));
  async onChatInput(interaction: ChatInputCommandInteraction<"cached">) {
    try {
      const input = interaction.options.getString("song");
      const queue = !input ? this.distube.getQueue(interaction.guildId!) : null;

      const song =
        input ??
        (queue && queue.playing && queue.songs?.length
          ? queue.songs[0].name ?? "" : "");

      if (!song) {
        await interaction.reply({
          embeds: [newEmbed(EmbedColor.Error).setDescription("There is no song playing.")],
          flags: 64, // ephemeral
        });
        return;
      }
      
      const lyrics = await getSongLyrics(song);
      const trimmedLyrics = lyrics.length > MAX_EMBED_LENGTH
        ? lyrics.slice(0, MAX_EMBED_LENGTH - 3) + "..."
        : lyrics;
      await interaction.reply({
        embeds: [
          newEmbed()
            .setDescription(trimmedLyrics),
        ],
      });
    } catch (e) {
      console.error(e);
      await interaction.reply({
        embeds: [newEmbed(EmbedColor.Error).setDescription("An error occurred while fetching lyrics.")],
        flags: 64, // ephemeral
      });
    }
  }
}
