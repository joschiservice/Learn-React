import MeetupList from "../components/meetups/MeetupList";
import {useState, useEffect} from "react";
import {MongoClient} from "mongodb";

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'This is a first meetup',
        image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg',
        address: 'Meetupstreet 5, 12345 Meetup City',
        description:
            'This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!',
    },
    {
        id: 'm2',
        title: 'This is a second meetup',
        image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg',
        address: 'Meetupstreet 5, 12345 Meetup City',
        description:
            'This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!',
    },
];

function HomePage(props) {
    return (
        <MeetupList meetups={props.meetups}/>
    );
}

// Server side rendering of meetups with Caching
// Problems: outdated data
// data only got when building the app
// SOLUTION: revalidate: regenerate page
export async function getStaticProps() {
    // fetch data from db because this is server-side

    const client = await MongoClient.connect("mongodb+srv://");

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            }))
        },
        revalidate: 1, // data never older than 10 seconds
    };
}

/*
// Server side rendering of meetups for Auth things for example
// runs always on the server after deployment
export async function getServerSideProps(context) {
    const req = context.req;
    const res = context.res;

    // fetch data from an API
    return {
        props: {
            meetups: DUMMY_MEETUPS
        }
    };
}
*/

export default HomePage;
