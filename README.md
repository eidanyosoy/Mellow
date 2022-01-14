# DawgBot 

<p align="center">
   <img src="src/resources/logo.png" width="256" height="256" link="https://discord.gg/zx2BWp2">
</p>
<p align="center">
   Mellow can communicate with several APIs like Ombi, Sonarr, Radarr and Tautulli which are related to home streaming to use those services directly in your Discord client.
</p>

## Features

* Search for Movies & TV Shows in Ombi or Sonarr / Radarr
* Request Movies & TV Shows in Ombi or Sonarr / Radarr
* Get a list of all Libraries on your Server in Tautulli
* Additional Features following soon!

## Requirements

* [NodeJS 12.4.1 LTS or higher](https://nodejs.org/en/download/)

## Create Bot

Go to this website: https://discordapp.com/developers/applications/ and press ``new Application``. Copy the Client ID first, you will need that later.
After you have done that go to the Settings Tab to the left and select Bot and press ``Add Bot``. You can now copy the Token from the Bot which you will
need for the Mellow Configuration later on.

## Invite Bot

Before your Bot actually listen to the channels on your server you will have to invite it first. I recommend using this for beginners: https://discordapi.com/permissions.html
Select the Permissions from below and paste the Client ID down there which you copied earlier. After that just click the link on the bottom and you will
be redirect to a new page where you can select the server you want to invite the Bot too.

* Read Messages
* Embed Links
* Read Message History
* Use External Emojis
* Send Messages
* Manage Messages
* Attach Files
* Mention @everyone
* Add Reactions



## Configuration

After starting the bot you will need to configure it by visiting ``youripordomain:port`` and filling out the Bot Settings which will start the bot with your token.
The default login credentials are username: ``mellow`` password: ``default``. Please change these as soon as possible!
Note: It's recommended to set a username and password in General Settings. This way only you can access the web interface.

## Docker Setup & Start

If you want to use this bot in a docker container you have to follow these steps:
* Pull from docker hub: ``docker pull voidp/mellow``
* Run docker image:
```
docker run -d --restart=unless-stopped --name mellow \
   -v /opt/appdata/mellow/:/usr/src/app/data/ \
   -e JWT_SECRET=secret_password \
   -e PORT=5060 \
   -p 5060:5060 \
   eidanyosoy/mellow
```
* if you want persistent data create a folder in ``/opt/appdata/mellow/`` or use docker compose. A yaml file is provided for this purpose.


