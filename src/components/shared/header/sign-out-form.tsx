import { Button } from '@/components/ui/button';
import { signOutUser } from '@/lib/actions/user.actions';

const SignOutForm = () => {
  return (
    <form action={signOutUser} className="w-full">
      <Button type="submit" className="w-full justify-start" variant="ghost">
        Sign Out
      </Button>
    </form>
  );
};

export default SignOutForm;
