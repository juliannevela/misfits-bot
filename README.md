# misfits-bot

## Introduction

A Wandering Bard is a simple Discord bot that allows you to play music in your server. Simply type `/play <url>` to play a song from a YouTube link.

## Commands

|    Command    |     Params?     | Description                                        |
| :-----------: | :-------------: | -------------------------------------------------- |
|    `/play`    | `query: string` | Plays a song from a YouTube link.                  |
|   `/pause`    |     `pause`     | Pauses the currently playing track.                |
|               |    `resume`     | Resumes playing the previously paused track.       |
| `/addtoqueue` | `query: string` | Adds another track to the queue from YouTube link. |
|    `/stop`    |        -        | Stops playing music in voice channel.              |
|    `/help`    |        -        | Responds with a list of these commands.            |
|               |                 |                                                    |

## Features

-   [x] Create audio player
-   [x] Create slash commands for music controls
    -   [x] play
    -   [x] pause
    -   [x] resume
    -   [x] stop
    -   [x] queue
    -   [x] Register commands
-   [x] ~~Setup YTDL connection~~ Used [discord-player]('https://www.npmjs.com/package/discord-player') NPM package instead.
