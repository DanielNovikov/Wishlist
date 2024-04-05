export class AuthSignInByTelegramRequest {
    public id!: string;
    public firstName: string | undefined;
    public lastName: string | undefined;
    public query!: Map<string, string>;
}
