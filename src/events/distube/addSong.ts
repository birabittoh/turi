import { Events } from "distube";
import { DisTubeEvent, type Metadata } from "../..";
import type { Queue, Song } from "distube";
import { getSourceColor, newEmbed } from "../../constants";

export default class AddSongEvent extends DisTubeEvent<Events.ADD_SONG> {
  readonly name = Events.ADD_SONG;
  run(_queue: Queue, song: Song<Metadata>) {
    song.metadata.interaction.editReply({
      embeds: [
        newEmbed(getSourceColor(song.source))
          .setDescription(`Added \`${song.name}\` to the queue`),
      ],
    });
  }
}
