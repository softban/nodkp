# nodkp
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

1. Navigate to the **Resources** tab. Set `web` dyno to **off**, `worker` dyno to **on**, and add the `MongoDB` to add-ons.

![Configure-Dyno](https://raw.githubusercontent.com/softban/nodkp/master/setup/configure-dyno.png)

2. Navigate to the **Settings** tab. After pressing **Reveal Config Vars**, you should see your `MONGODB_URI`. Add your `DISCORD_TOKEN` to **Config Vars**.

![Configure-Variables](https://raw.githubusercontent.com/softban/nodkp/master/setup/configure-variables.png)


Step One |
---------|
In the upper-right corner, the **More** dropdown will allow you to restart your worker dyno |
![Restart-Dyno](https://raw.githubusercontent.com/softban/nodkp/master/setup/restart-dyno.png) |
