import { DisTubeEvent } from "../..";
import { Events, type Queue } from "distube";
import { newEmbed } from "../../constants";

export default class FinishEvent extends DisTubeEvent<Events.FINISH> {
  readonly name = Events.FINISH;
  run(queue: Queue) {
    queue.textChannel?.send({
      embeds: [newEmbed().setDescription("Finished!")],
    });
    queue.voice.leave();
  }
}
