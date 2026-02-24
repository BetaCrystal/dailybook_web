import { withAuthPage } from '@/lib/auth/server/withAuthPage';
import ProfileSettingsContent from './ProfileSettingsContent';

export default async function ProfileSettingsPage() {
        return withAuthPage(async (user) => {
                return <ProfileSettingsContent />;
        });
}
