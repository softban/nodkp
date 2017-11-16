# nodkp

nodkp, is a Discord bot aimed at the management of DKP. It allows the allocation of DKP to players & allows bidding for items through Discord and can handle multiple raid groups, separated by text channels.

---

![discord-preview](https://raw.githubusercontent.com/softban/nodkp/master/setup/discord-preview.png)

---

## Setup
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy) |
:---------:|
**Step One** navigate to the **Resources** tab. Set `web` dyno to **off**, `worker` dyno to **on**, and add the `MongoDB` to add-ons. |
![Configure-Dyno](https://raw.githubusercontent.com/softban/nodkp/master/setup/configure-dyno.png) |
**Step Two** navigate to the **Settings** tab. After pressing **Reveal Config Vars**, you should see your `MONGODB_URI`. Add your `DISCORD_TOKEN` to **Config Vars**. |
![Configure-Variables](https://raw.githubusercontent.com/softban/nodkp/master/setup/configure-variables.png) |
**Step Three** in the upper-right corner, the **More** dropdown will allow you to restart your worker dyno |
![Restart-Dyno](https://raw.githubusercontent.com/softban/nodkp/master/setup/restart-dyno.png) |
**Step Four** If you have issues, you can troubleshoot through **View logs**. Once finished, add a role to your server named `Raid Leader`, anyone leading a raid will need this to access the bots internal `leader` commands. Note that the role does not need any special permissions. Finally create a text channel with the name of your raid group and run `@bot init` in your new channel! |
