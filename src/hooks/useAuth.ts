import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { User, getLogin } from "../api/auth";




export const useAuth = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient(

    );

    queryClient.defaultQueryOptions({

    })

    const login = useMutation(["user"], getLogin, {
        onSuccess: (data) => {
            console.log(data);
            queryClient.setQueryData(["user"], data);
            navigate("/app/home");
        },
        onError: (error) => {
            console.log(error)
        }
    });


    const isAuthenticated = queryClient.getQueryData<User>(["user"], {
        // stale: true,
        queryKey: ["user"],

    })?.isAuthenticated;

    // console.log(isAuthenticated);

    // const login = async ({ username, password }: User) => {
    //     try {

    //         const data = await loginMutation.mutateAsync({ username, password });
    //         // navigate('/app/home')
    //         // console.log(data);
    //         return data;
    //     }
    //     catch (error) {
    //         if (error.message && error.response.status === 401) {
    //             throw new Error("Credenciales incorrectas. Por favor intente de nuevo.");
    //         } else {
    //             throw error;
    //         }
    //     }
    //     // queryClient.setQueryData(["user"], data);
    // };

    const logout = async () => {
        const data = queryClient.getQueryData<User>(["user"]);

        queryClient.setQueryData(["user"], {
            ...data,
            isAuthenticated: false,
        });
        navigate("/auth");
    };

    return { login, logout, isAuthenticated };
}
