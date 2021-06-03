import MeetupDetail from "../../components/meetups/MeetupDetail";
import {MongoClient} from "mongodb";

function MeetupDetails() {

    return (
        <MeetupDetail
            image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg"
            title="First Meetup"
            address="Some Street 6, Some City"
            description="This is a first meetup"
        />
    );
}

export async function getStaticPaths() {

    const client = await MongoClient.connect("mongodb+srv://admin:curry2016@cluster0.iwtvf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();

    client.close();

    return {
        fallback: false,
        paths: meetups.map(meetup => ({params: {meetupId: meetup._id.toString()}}))
    }
}

export async function getStaticProps(context) {
    // fetch data for a single meetup

    const meetupId = context.params.meetupId;

    return {
        props: {
            meetupData: {
                id: meetupId,
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
                title: "First Meetup",
                address: "Some Street 6, Some City",
                description: "This is a first meetup"
            }
        },
    };
}

export default MeetupDetails;