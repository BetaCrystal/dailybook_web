import { withAuthPage } from '@/lib/auth/server/withAuthPage';
import ProfileInformationsContent from './ProfileInformationsContent';

export default async function ProfileInformationsPage() {
        return withAuthPage(async (user) => {
                return <ProfileInformationsContent />;
        });
}
