import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/dashboard';
import ManagerDashboard from './components/managerdashboard';
import EmployeeDashboard from './components/employeedashboard';
import ViewAllAdmin from './components/ViewAllAdmin';
import ViewAllManager from './components/ViewAllManager';
import ViewAllEmployee from './components/ViewAllEmployee';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          <Route path="/view-all-admin" element={<ViewAllAdmin />} />
          <Route path="/view-all-manager" element={<ViewAllManager />} />
          <Route path="/view-all-employee" element={<ViewAllEmployee />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
