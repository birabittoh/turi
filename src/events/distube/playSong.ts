import { Events } from "distube";
import { DisTubeEvent, type Metadata, followUp } from "../..";
import type { Queue, Song } from "distube";
import { getSourceColor, newEmbed } from "../../constants";

export default class PlaySongEvent extends DisTubeEvent<Events.PLAY_SONG> {
  readonly name = Events.PLAY_SONG;
  run(queue: Queue, song: Song<Metadata>) {
    followUp(
      song.metadata.interaction,
      newEmbed(getSourceColor(song.source)).setDescription(`Playing: \`${song.name}\``),
      queue.textChannel!,
    ).catch(console.error);
  }
}
