import axios from "axios";
import { Client } from "discord.js";
import InitData from "./interfaces/InitData";
import CoolBotListConfig from "./interfaces/CoolBotListConfig";

export default class CoolBotList {
  constructor(private config: CoolBotListConfig) {
    if (!config.token || !config.client || config.client! instanceof Client) throw new Error("Please provide a valid config.");
    if (900000 < config.interval) config.interval = 90000;
    if (config.logging === undefined) config.logging = true;
  }

  /**
   * Initialize your discord bot.
   * @param {}
   */

  init(data: InitData) {
    let sendTotalGuilds: boolean;
    let sendTotalUsers: boolean;
    let sendPresence: boolean;
    if (!data) {
      sendTotalGuilds = true;
      sendTotalUsers = true;
      sendPresence = true;
    }
    setInterval(async () => {
      const r = await axios.put("http://localhost:5000/api/bots/client", { token: this.config.token, client: this.config.client, sendTotalGuilds: data.sendTotalGuilds, sendPresence: data.sendPresence, sendUsers: data.sendTotalUsers });
      if (r.status === 200 || r.status === 201) {
        if (!this.config.logging) return;
        else return r.data.message;
      }
    }, this.config.interval);
  }
}
