import { UserSource } from "./enums/user-source";

export class CurrentUserEditRequest {
    public name!: string;
    public email: string | undefined;
    public password: string | undefined;
}
