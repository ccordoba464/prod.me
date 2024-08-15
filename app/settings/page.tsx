import { getCurrentUser } from "@/actions/users";
import { ModeToggle } from "@/components/ModeToggle";
import EditItem from "@/components/settings/EditItem";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/hooks/useUser";

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col w-full h-full ">
      <div className="flex justify-between items-center ">
        <h1 className="text-3xl">settings</h1>
        <ModeToggle />
      </div>

      <div className="flex flex-col py-6">
        <div className="py-2">Basics</div>

        <Separator />

        <EditItem
          title={"Username"}
          attribute={"username"}
          value={user?.username!}
        />

        <Separator />

        <EditItem title="Email" attribute="email" value={user.email} />

        <Separator />

        <EditItem title="Password" attribute="password" value={"-"} />

        <Separator />
      </div>
    </div>
  );
}
