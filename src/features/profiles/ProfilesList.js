import { useSelector } from "react-redux";
import { selectAllProfiles, getProfilesStatus, getProfilesError } from "./profilesSlice";

import Profile from "./Profile";

const ProfilesList = () => {
    const profiles = useSelector(selectAllProfiles);
    const profileStatus = useSelector(getProfilesStatus);
    const error = useSelector(getProfilesError);

    let content;
    if (profileStatus === 'loading') {
        content = <p>"Loading..."</p>;
    } else if (profileStatus === 'succeeded') {
        content = profiles.map(profile => <Profile key={profile.id} profile={profile}/>)
    } else if (profileStatus === 'failed') {
        content = <p>{error}</p>;
    }

    return (
        <section>
            {content}
        </section>
    )
}
export default ProfilesList