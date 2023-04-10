

export type Credentials = {
    username: string;
    password: string;

}

export type User = {
    credentials: Credentials;
    isAuthenticated: boolean;

}



export const getLogin = async (credentials: Credentials): Promise<User> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (credentials.username === 'admin' && credentials.password === 'admin') {
                resolve({
                    credentials: {
                        username: credentials.username,
                        password: credentials.password
                    },

                    isAuthenticated: true
                })
            } else {
                resolve({
                    credentials: {
                        username: credentials.username,
                        password: credentials.password
                    },

                    isAuthenticated: false
                })
            }
        }, 500)
    })
}

// export const authenticate = async () => {
//     try {
//         const response = await fetch(`${API_URL}/authenticate`, {
//             credentials: "include",
//         });

//         if (response.status === 401) {
//             throw new Error("Unauthorized");
//         }

//         const data = await response.json();
//         queryClient.setQueryData(["user"], data);
//         return data;
//     } catch (error) {
//         queryClient.removeQueries(["user"]);
//         throw error;
//     }
// }