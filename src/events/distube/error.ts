import { Events } from "distube";
import { DisTubeEvent, type Metadata, followUp } from "../..";
import type { Queue, Song } from "distube";
import { EmbedColor, newEmbed } from "../../constants";

export default class ErrorEvent extends DisTubeEvent<Events.ERROR> {
  readonly name = Events.ERROR;
  async run(error: Error, queue: Queue, song?: Song<Metadata>) {
    if (song) {
      await followUp(
        song.metadata.interaction,
        newEmbed(EmbedColor.Error).setDescription(`Error: \`${error.message}\``),
        queue.textChannel!,
      );
    } else if (queue.textChannel) {
      await queue.textChannel.send({
        embeds: [
          newEmbed(EmbedColor.Error).setDescription(`Error: \`${error.message}\``),
        ],
      });
    } else {
      console.error(error);
    }
  }
}
