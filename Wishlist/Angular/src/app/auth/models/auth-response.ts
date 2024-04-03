import {AuthUserResponse} from "./auth-user-response";

export class AuthResponse {
    public authToken!: string;
    public user!: AuthUserResponse;
}
