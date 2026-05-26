/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './components/layout/ErrorFallback';
import Landing from './app/Landing';
import Login from './app/Auth/Login';
import Register from './app/Auth/Register';
import ForgotPassword from './app/Auth/ForgotPassword';
import Dashboard from './app/Dashboard';
import Generator from './app/Generator';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

import { Toaster } from 'sonner';

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Router>
        <Toaster theme="dark" position="top-right" richColors />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/generator" element={<Generator />} />
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}
