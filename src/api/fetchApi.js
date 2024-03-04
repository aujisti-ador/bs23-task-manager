import { LoginData, TaskListData, MemberListData } from "../data/fakeData";

const fetchLogin = async (req) => {
    if (JSON.stringify(LoginData) === JSON.stringify(req)) {
        return { success: true, username: LoginData.username };
    }
    else {
        // return { success: false, message: "Invalid credentials" };
        throw new Error("Invalid credentials");
    }
}

const fetchTaskList = async () => {
    return new Promise((resolve) => {
        // Simulate an asynchronous API call
        setTimeout(() => {
            resolve(TaskListData);
        }, 1000); // Simulating a delay of 1 second
    });
}

const fetchMemberList = async () => {
    return new Promise((resolve) => {
        // Simulate an asynchronous API call
        setTimeout(() => {
            resolve(MemberListData);
        }, 1000); // Simulating a delay of 1 second
    });
}

export { fetchLogin, fetchTaskList, fetchMemberList }