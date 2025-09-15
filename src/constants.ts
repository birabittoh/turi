import { ColorResolvable, EmbedBuilder } from "discord.js";

const BOT_NAME = "Turi";
const BOT_COLOR = "#FF73A8";

export enum EmbedColor {
    Default,
    Error,
    YouTube,
    SoundCloud,
    Spotify,
    Deezer,
}

function getEmbedColor(type: EmbedColor = EmbedColor.Default): ColorResolvable {
    switch (type) {
    case EmbedColor.Error:
        return "Red";
    case EmbedColor.YouTube:
        return "#FF0033";
    case EmbedColor.SoundCloud:
        return "#FF5500";
    case EmbedColor.Spotify:
        return "#1DB954";
    case EmbedColor.Deezer:
        return "#FF38A2";
    case EmbedColor.Default:
    default:
        return BOT_COLOR;
    }
}

export function getSourceColor(source: string): EmbedColor {
    switch (source) {
        case "youtube":
            return EmbedColor.YouTube;
        case "soundcloud":
            return EmbedColor.SoundCloud;
        case "spotify":
            return EmbedColor.Spotify;
        case "deezer":
            return EmbedColor.Deezer;
        default:
            console.warn(`Unknown source: ${source}`);
            return EmbedColor.Default;
    }
}

export function newEmbed(embedColor: EmbedColor = EmbedColor.Default): EmbedBuilder {
    return new EmbedBuilder().setColor(getEmbedColor(embedColor)).setTitle(BOT_NAME);
}
