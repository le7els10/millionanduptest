/* 
  React 
*/
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

/* 
  Helpers 
*/
import availablePages from './AvailablePages';

/* 
  Views 
*/
import IndexPage from '../modules/cryptocurrency/pages/IndexPage';
import ExchangePage from "../modules/cryptocurrency/pages/ExchangePage";
import DetailsPage from "../modules/cryptocurrency/pages/DetailsPage";

function RouterComponent() {
  return (
    <Router>
      <Routes>
        <Route path={availablePages.HOME} element={<IndexPage />} />
        <Route path={`${availablePages.DETAILS}/:id`} element={<DetailsPage />} />
        <Route path={`${availablePages.EXCHANGES}/:id`} element={<ExchangePage />} />
      </Routes>
    </Router>
  );
}

export default RouterComponent;
