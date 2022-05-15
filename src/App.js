import './App.css';

// DEPENDENCIES
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// COMPONENTS
import Login from './components/views/Login';
import Tasks from './components/views/Tasks';
import Register from './components/views/Register/Register';
import Registered from './components/views/Registered';
import Donate from './components/views/Donate/Donate';
const Error404 = lazy(() => import('./components/views/404'));

// FUNCTIONS

// auth
const RequireAuth = ({ children }) => {
  return !localStorage.getItem('token') ? <Navigate to='/login' replace={true} /> : children
}

// page transition
const pageTransition = {
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
}

const App = () => {

  const location = useLocation()


  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>

        <Route
          path='/'
          element={
            <RequireAuth>
              <motion.div className="page" initial="out" animate="in" exit="out" variants={pageTransition}>
                <Tasks />
              </motion.div>
            </RequireAuth>}
        />

        <Route
          path='/login'
          element={
            <motion.div className="page" initial="out" animate="in" exit="out" variants={pageTransition}>
              <Login />
            </motion.div>}
        />

        <Route
          path='/register'
          element={
            <motion.div className="page" initial="out" animate="in" exit="out" variants={pageTransition}>
              <Register />
            </motion.div>}
        />

        <Route
          path='/registered/:teamID'
          element={
            <motion.div className="page" initial="out" animate="in" exit="out" variants={pageTransition}>
              <Registered />
            </motion.div>}
        />

        <Route
          path='/donate'
          element={
            <motion.div className="page" initial="out" animate="in" exit="out" variants={pageTransition}>
              <Donate />
            </motion.div>}
        />

        <Route
          path='*'
          element={
            <motion.div className="page" initial="out" animate="in" exit="out" variants={pageTransition}>
              <Suspense fallback={<>...</>}>
                <Error404 />
              </Suspense>
            </motion.div>}
        />

      </Routes>
    </AnimatePresence>
  );
}

export default App;
