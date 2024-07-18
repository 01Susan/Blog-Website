export interface UserSignupInputs {
    name: string;
    email: string;
    password: string;
}

export type UserSigninInputs = Omit<UserSignupInputs, 'name'>;

export interface ZodAuthError {
    name?: string[];
    email?: string[];
    password?: string[];
}
