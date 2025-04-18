import AuthLayout from "@/components/layout/AuthLayout";
import { authFormSchema, AuthFormValues } from "@/schemas/auth-schema";
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
import ImagePicker from "@/components/ImagePicker";

const SignUpForm = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const form = useForm<AuthFormValues>({
        resolver: zodResolver(authFormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            profilePic: undefined,
        },
    });

    const { isDirty, isValid } = form.formState;

    function onSubmit(values: AuthFormValues) {
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
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 md:grid items-start md:grid-cols-2 gap-x-2">

                        <ImagePicker
                            name="profilePic"
                            label="Profil Fotoğrafı"
                            form={form}
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Kullanıcı Adı</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Kullanıcı adınızı girin" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem className="relative">
                                    <FormLabel>Şifre Tekrarı</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="Şifrenizi tekrar girin"
                                                {...field}
                                            />
                                            <Button
                                                size={"icon"}
                                                variant={"ghost"}
                                                type="button"
                                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                                className="hover:bg-transparent size-3 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                            >
                                                {showConfirmPassword ? <LuEye size={16} /> : <LuEyeClosed size={16} />}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button className="col-span-full" type="submit" disabled={!isDirty || !isValid}>Kayıt ol</Button>

                    </form>
                </Form>
                <p className="text-muted-foreground text-sm mt-4">Zaten bir hesabın var mı? <Link className="underline underline-offset-2 text-primary" to={"/giris"}>Giriş yap</Link> </p>
            </div>
        </AuthLayout>
    );
};

export default SignUpForm;
