import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Header} from './components/header';
import {Footer} from './components/footer';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Auth} from "./public/pages/auth/auth";
import {ExpenseTracker} from "./public/pages/expenseTracker";
import Container from 'react-bootstrap/Container';

function App() {

  return (
    <>
      <Header/>      
      <Container>
        <Router>
          <Routes>
            <Route path="/" exact element={<Auth />}/>
            <Route path="expenseTracker" element={<ExpenseTracker />}/>
          </Routes>
        </Router>
      </Container>
      <Footer />
    </>
  )
}

export default App
