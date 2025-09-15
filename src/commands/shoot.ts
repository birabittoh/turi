// src/commands/shoot.ts

import { Command } from "..";
import { SlashCommandBuilder, ChatInputCommandInteraction, GuildMember } from "discord.js";
import { EmbedColor, newEmbed } from "../constants";

const MAGAZINE_SIZE = 6;
const bustProbability = 0.5;

// Simple in-memory magazine system
const magazines = new Map<string, { left: number, size: number }>();

function getMagazine(userId: string) {
  let mag = magazines.get(userId);
  if (!mag) {
    mag = { left: MAGAZINE_SIZE, size: MAGAZINE_SIZE };
    magazines.set(userId, mag);
  }
  return {
    shoot() {
      if (mag!.left > 0) {
        mag!.left--;
        return true;
      }
      return false;
    },
    left: mag!.left,
    size: mag!.size,
    refill() {
      mag!.left = MAGAZINE_SIZE;
    }
  };
}

export default class ShootCommand extends Command {
  readonly name = "shoot";
  override readonly inVoiceChannel = true;
  readonly slashBuilder = new SlashCommandBuilder()
    .setName("shoot")
    .setDescription("Kick a random member of your voice channel.");

  async onChatInput(interaction: ChatInputCommandInteraction<"cached">) {
    const vc = interaction.member?.voice?.channel;
    if (!vc) return; // Handled by inVoiceChannel property

    const allMembers = Array.from(vc.members.values());
    const killerId = interaction.user.id;

    const magazine = getMagazine(killerId);
    if (!magazine.shoot()) {
      await interaction.reply({
        embeds: [
          newEmbed(EmbedColor.Error).setDescription(`💨 Too bad... You're out of bullets.`)
        ],
        flags: 64, // ephemeral
      });
      return;
    }

    let toBeKicked: GuildMember | undefined;
    if (Math.random() >= bustProbability) {
      toBeKicked = allMembers.find((e) => e.user.id === killerId);
    } else {
      const members = allMembers.filter((m) => !m.user.bot && m.user.id !== killerId);
      const l = members.length;
      if (l === 0) {
        await interaction.reply({
          embeds: [
            newEmbed(EmbedColor.Error).setDescription(`No valid targets in your voice channel.`)
          ],
          flags: 64, // ephemeral
        });
        return;
      }
      const randomIndex = Math.floor(Math.random() * l);
      toBeKicked = members[randomIndex];
    }

    if (!toBeKicked) {
      await interaction.reply({
        embeds: [
          newEmbed(EmbedColor.Error).setDescription(`Could not find a member to kick.`)
        ],
        flags: 64, // ephemeral
      });
      return;
    }

    try {
      await toBeKicked.voice.disconnect();
      const victimName = toBeKicked.nickname ?? toBeKicked.user.globalName ?? toBeKicked.user.tag;
      const bulletsLeft = magazine.left;
      await interaction.reply({
        embeds: [
          newEmbed().setDescription(`💥 Bang! **${victimName}** was shot. **${bulletsLeft}/${magazine.size} bullets** left in your magazine.`)
        ]
      });
    } catch (e) {
      await interaction.reply({
        embeds: [
          newEmbed(EmbedColor.Error).setDescription(`Failed to kick member: ${e}`)
        ],
        flags: 64, // ephemeral
      });
    }
  }
}
