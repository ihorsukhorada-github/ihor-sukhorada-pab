interface User {
    email: string;
    password: string;
    admin?: boolean;
    id?: number;
}

export default User