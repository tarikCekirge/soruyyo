import { PropsWithChildren } from "react";
const AuthLayout = ({ children }: PropsWithChildren) => {



    return (
        <div className="flex">
            <div className="w-screen h-screen md:w-1/2 px-12 pt-8 pb-12">
                <h2 className="scroll-m-20 text-2xl font-medium tracking-tight lg:text-3xl text-primary">Soruyyo</h2>
                {children}
            </div>
            <div className="hidden md:block w-1/2 h-screen bg-sky-50">


            </div>
        </div>
    )
}

export default AuthLayout;
