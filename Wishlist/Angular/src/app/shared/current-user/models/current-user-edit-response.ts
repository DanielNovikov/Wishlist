import { UserSource } from "./enums/user-source";

export class CurrentUserEditResponse {
    public name!: string;
    public source!: UserSource;
    public email: string | undefined;
    public avatarPath: string | undefined;
}
