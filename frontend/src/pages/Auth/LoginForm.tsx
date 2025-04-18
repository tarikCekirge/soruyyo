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
import { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },

    });

    const { isDirty, isValid } = form.formState;

    function onSubmit(values: LoginFormValues) {
        console.log(values);
    }

    return (
        <AuthLayout>
            <div className="lg:w-[80%] h-3/4 md:h-full flex flex-col justify-center">
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

                        <Button type="submit" disabled={!isDirty || !isValid}>Giriş Yap</Button>
                    </form>
                </Form>
                <p className="text-muted-foreground text-sm mt-4">Henüz bir hesabın yok mu? <Link className="underline underline-offset-2 text-primary" to={"/kayit-ol"}>Kaydol</Link> </p>
            </div>
        </AuthLayout>
    );
};

export default LoginForm;
