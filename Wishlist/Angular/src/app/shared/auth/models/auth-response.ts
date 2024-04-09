import { CurrentUserResponse } from "../../current-user/models/current-user-response";

export class AuthResponse {
    public authToken!: string;
    public user!: CurrentUserResponse;
}
