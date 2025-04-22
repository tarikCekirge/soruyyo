import { User } from '@/context/UserContext'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


type UserDetailCardProps = {
    user: User;
};

const UserDetailCard = ({ user }: UserDetailCardProps) => {
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <div className='flex gap-2 flex-nowrap'>
                    <div>
                        <Avatar className='size-16'>
                            <AvatarImage src={user.profileImg || ""} alt={user.username} />
                            <AvatarFallback>{user.username}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className='flex-1'>
                        <CardTitle>{user.username}</CardTitle>
                        <CardDescription>{user.fullName}</CardDescription>
                    </div>
                </div>

            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Name of your project" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Framework</Label>
                            <Select>
                                <SelectTrigger id="framework">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="next">Next.js</SelectItem>
                                    <SelectItem value="sveltekit">SvelteKit</SelectItem>
                                    <SelectItem value="astro">Astro</SelectItem>
                                    <SelectItem value="nuxt">Nuxt.js</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Deploy</Button>
            </CardFooter>
        </Card>
    )
}

export default UserDetailCard
