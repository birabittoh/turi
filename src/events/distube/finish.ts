import { DisTubeEvent } from "../..";
import { EmbedBuilder } from "discord.js";
import { Events, type Queue } from "distube";
import { BOT_NAME } from "../../constants";

export default class FinishEvent extends DisTubeEvent<Events.FINISH> {
  readonly name = Events.FINISH;
  run(queue: Queue) {
    queue.textChannel?.send({
      embeds: [new EmbedBuilder().setColor("Blurple").setTitle(BOT_NAME).setDescription("Finished!")],
    });
    queue.voice.leave();
  }
}
