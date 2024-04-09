import { UserSource } from "./enums/user-source";

export class CurrentUserEditResponse {
    public id!: number;
    public name!: string;
    public source!: UserSource;
    public email: string | undefined;
}
