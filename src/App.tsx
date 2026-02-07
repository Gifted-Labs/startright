import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import Landing from './pages/Landing';
import Speakers from './pages/Speakers';
import PastEvents from './pages/PastEvents';
import AboutUs from './pages/AboutUs';
import EventDetails from './pages/EventDetails';
import EventRegistration from './pages/EventRegistration';
import Gallery from './pages/Gallery';
import Schedule from './pages/Schedule';
import GetInvolved from './pages/GetInvolved';
import EventsList from './pages/EventsList';
import VolunteerApply from './pages/VolunteerApply';
import SponsorApply from './pages/SponsorApply';
import Articles from './pages/Articles';
import ArticleDetails from './pages/ArticleDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="speakers" element={<Speakers />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="articles" element={<Articles />} />
          <Route path="events/:eventId/articles/:articleId" element={<ArticleDetails />} />
          <Route path="events" element={<EventsList />} />
          <Route path="events/past" element={<PastEvents />} />
          <Route path="events/:eventId" element={<EventDetails />} />
          <Route path="events/:eventId/register" element={<EventRegistration />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="get-involved" element={<GetInvolved />} />
          <Route path="volunteer/apply/:eventId" element={<VolunteerApply />} />
          <Route path="sponsor/apply/:eventId" element={<SponsorApply />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
