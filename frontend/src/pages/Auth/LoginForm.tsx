import AuthLayout from "@/components/layout/AuthLayout";
import { loginFormSchema, LoginFormValues } from "@/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import { AxiosError } from "axios";
import { useUser } from "@/context/UserContext";

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const { updateUser } = useUser();
    const navigate = useNavigate();
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },

    });

    const { isDirty, isValid } = form.formState;


    useEffect(() => {
        const subscription = form.watch(() => {
            if (errorMessage) {
                setErrorMessage("");
            }
        });

        return () => subscription.unsubscribe();
    }, [form, errorMessage]);

    async function onSubmit(values: LoginFormValues) {
        console.log(values);
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, values);
            const { token, user } = response.data;
            if (token) {
                updateUser(user)
                localStorage.setItem("token", token);
                navigate("/dashboard")
            }
        } catch (error: unknown) {
            const err = error as AxiosError<any>;
            if (err.response && err.response.data.message) {
                console.error('ERROR', err.response.data.message);
                setErrorMessage(err.response.data.message);
            } else {
                console.error('ERROR', "Bir şeyler ters gitti");
                setErrorMessage("Bir şeyler ters gitti");
            }
        }
    }

    return (
        <AuthLayout>
            <div className="lg:w-[60%] h-3/4 md:h-full flex flex-col justify-center">
                <h3 className="scroll-m-20 text-2xl font-medium tracking-tight lg:text-3xl text-primary">
                    Tekrar Hoşgeldin
                </h3>
                <p className="text-muted-foreground text-sm">Lütfen giriş yapın.</p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="E-posta adresinizi girin" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="relative">
                                    <FormLabel>Şifre</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Şifrenizi girin"
                                                {...field}
                                            />
                                            <Button
                                                size={"icon"}
                                                variant={"ghost"}
                                                type="button"
                                                onClick={() => setShowPassword((prev) => !prev)}
                                                className="hover:bg-transparent size-3 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                            >
                                                {showPassword ? <LuEye size={16} /> : <LuEyeClosed size={16} />}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {errorMessage && (
                            <div className="text-red-500 text-sm mt-2">
                                {errorMessage}
                            </div>
                        )}

                        <Button type="submit" disabled={!isDirty || !isValid}>Giriş Yap</Button>
                    </form>
                </Form>
                <p className="text-muted-foreground text-sm mt-4">Henüz bir hesabın yok mu? <Link className="underline underline-offset-2 text-primary" to={"/kayit-ol"}>Kaydol</Link> </p>
            </div>
        </AuthLayout>
    );
};

export default LoginForm;
