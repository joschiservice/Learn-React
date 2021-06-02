import { useHistory } from 'react-router-dom';

import NewMeetupForm from "../components/meetups/NewMeetupForm";

function NewMeetupPage() {
    const history = useHistory();

    function addMeetupHandler(meetupData) {
        // Usually do post request

        history.replace('/');
    }

    return (
        <div>
            <h1>New Meetup Page</h1>
            <NewMeetupForm onAddMeetup={addMeetupHandler}/>
        </div>
    );
}

export default NewMeetupPage;