import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="flex flex-col items-center w-[90%] max-w-md p-8 text-center gap-6 sm:w-2/3 lg:w-1/2">
        <div>
          <Image
            src="/images/logo.svg"
            width={48}
            height={48}
            alt={`${APP_NAME} logo`}
            priority={true}
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">Not Found</h1>
          <p className="text-red-400">Could not find requested page</p>
          <Button asChild variant="link" className="mt-4 ml-2">
            <Link href="/">Back To Home</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default NotFoundPage;
