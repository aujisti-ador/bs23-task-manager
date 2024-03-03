import { LoginData } from "../data/fakeData";

const fetchLogin = async (req) => {
    if (JSON.stringify(LoginData) === JSON.stringify(req)) {
        return { success: true, username: LoginData.username };
    }
    else {
        return { success: false, message: "Invalid credentials" };
    }
}

export { fetchLogin }