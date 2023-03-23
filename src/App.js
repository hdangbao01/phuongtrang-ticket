import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Manager from './pages/Manager'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Layout from './Layouts'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path='/'
          element={<Layout><Home /></Layout>}
        />        
        <Route
          path='/manager'
          element={<Layout><Manager /></Layout>}
        />
        <Route
          path='/profile'
          element={<Layout><Profile /></Layout>}
        />
        <Route
          path='/login'
          element={<Layout><Login /></Layout>}
        />
      </Routes>
    </div>
  );
}

export default App;
