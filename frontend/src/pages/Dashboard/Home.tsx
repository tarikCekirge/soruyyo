import DashboardLayout from "@/components/layout/DashboardLayout"
import UserDetailCard from "@/components/UserDetailCard"
import { useUser } from "@/context/UserContext"

const Home = () => {
    const { user } = useUser()
    return (
        <>
            <DashboardLayout activeMenu="Dashboard">
                <div className="container mx-auto">
                    {user && <UserDetailCard user={user} />}
                </div>
            </DashboardLayout>
        </>
    )
}

export default Home
