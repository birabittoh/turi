import { Events } from "distube";
import { DisTubeEvent } from "../..";
import { Colors, EmbedBuilder } from "discord.js";
import type { DisTubeError, Queue } from "distube";
import { BOT_NAME } from "../../constants";

export default class NoRelatedEvent extends DisTubeEvent<Events.NO_RELATED> {
  readonly name = Events.NO_RELATED;
  run(queue: Queue, error: DisTubeError) {
    queue.textChannel?.send({
      embeds: [new EmbedBuilder().setColor(Colors.Red).setTitle(BOT_NAME).setDescription(error.message)],
    });
  }
}
