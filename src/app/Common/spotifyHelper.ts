import { IUser } from "../Interfaces/IUser";

export function SpotifyUserforUser(user: SpotifyApi.CurrentUsersProfileResponse): IUser{
    return {
        id: user.id,
        name: user.display_name,
        imageUrl: user.images.pop().url
    }
}