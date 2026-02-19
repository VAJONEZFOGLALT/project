import { AuthService } from './auth.service';
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(payload: any): Promise<{
        username: string;
        email: string;
        password_hash: string;
        name: string;
        avatar: string | null;
        role: string;
        id: number;
    } | null>;
}
export {};
