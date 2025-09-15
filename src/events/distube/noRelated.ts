import { Events } from "distube";
import { DisTubeEvent } from "../..";
import type { DisTubeError, Queue } from "distube";
import { newEmbed } from "../../constants";

export default class NoRelatedEvent extends DisTubeEvent<Events.NO_RELATED> {
  readonly name = Events.NO_RELATED;
  run(queue: Queue, error: DisTubeError) {
    queue.textChannel?.send({
      embeds: [newEmbed().setDescription(error.message)],
    });
  }
}
