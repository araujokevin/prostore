import { Button } from '@/components/ui/button';
import { UserIcon } from 'lucide-react';
import Link from 'next/link';
import { auth } from '@/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import SignOutForm from './sign-out-form';

const UserButton = async () => {
  const session = await auth();

  if (!session) {
    return (
      <Button asChild className="px-3.5 py-5 cursor-pointer">
        <Link href="/api/auth/signin">
          <UserIcon /> Sign In
        </Link>
      </Button>
    );
  }

  const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? 'U';

  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center">
            <Button
              variant="default"
              className="relative w-8 h-8 rounded-full ml-2 flex items-center justify-center cursor-pointer"
            >
              {firstInitial}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-55" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1 p-2">
              <div className="text-sm text-primary font-medium leading-none">
                {session.user?.name}
              </div>
              <div className="text-sm  text-muted-foreground leading-none">
                {session.user?.email}
              </div>
            </div>
          </DropdownMenuLabel>
          <div className="mb-1">
            <SignOutForm />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButton;
