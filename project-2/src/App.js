import {Route, Switch} from 'react-router-dom';

import AllMeetupsPage from "./pages/AllMeetups";
import NewMeetupPage from "./pages/NewMeetup";
import FavoritesPage from "./pages/Favorites";
import Layout from "./components/layout/Layout";

function App() {
    return (
        <Layout>
            <Switch>
                {/* The exact props telly the Switch to only render the page if the path exactly matches and not just start with the path */}
                <Route path='/' exact={true}>
                    <AllMeetupsPage/>
                </Route>
                <Route path='/new-meetup'>
                    <NewMeetupPage/>
                </Route>
                <Route path='/favorites'>
                    <FavoritesPage/>
                </Route>
            </Switch>
        </Layout>
    );
}

export default App;
