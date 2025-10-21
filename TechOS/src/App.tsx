import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Footer } from "@/components/Footer";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const CompleteRegistration = lazy(() => import("./pages/CompleteRegistration"));
const MapPage = lazy(() => import("./pages/MapPage"));
const CaracasMapPage = lazy(() => import("./pages/CaracasMapPage"));
const JobOffersPage = lazy(() => import("./pages/JobOffersPage"));
const ApplicationsPortal = lazy(() => import("./pages/ApplicationsPortal"));
const TeacherApplication = lazy(() => import("./pages/TeacherApplication"));
const InstitutionApplication = lazy(() => import("./pages/InstitutionApplication"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const TeacherDashboard = lazy(() => import("./pages/TeacherDashboard"));
const TeacherCourseDetail = lazy(() => import("./pages/TeacherCourseDetail"));
const StudentDashboard = lazy(() => import("./pages/StudentDashboard"));
const RepresentativeDashboard = lazy(
  () => import("./pages/RepresentativeDashboard")
);
const ProfilePage = lazy(() => import("./pages/Profile"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));
const TestImage = lazy(() => import("./pages/TestImage"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
          <div className="min-h-screen flex flex-col">
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/complete-registration" element={<CompleteRegistration />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/caracas-map" element={<CaracasMapPage />} />
                <Route path="/job-offers" element={<JobOffersPage />} />
                <Route path="/test-image" element={<TestImage />} />
                <Route path="/applications" element={<ApplicationsPortal />} />
                <Route path="/applications/teacher" element={<TeacherApplication />} />
                <Route path="/applications/institution" element={<InstitutionApplication />} />
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/teacher/dashboard"
                  element={
                    <ProtectedRoute>
                      <TeacherDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/teacher/course/:courseId"
                  element={
                    <ProtectedRoute>
                      <TeacherCourseDetail />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/dashboard"
                  element={
                    <ProtectedRoute>
                      <StudentDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/representative/dashboard"
                  element={
                    <ProtectedRoute>
                      <RepresentativeDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
            <Footer />
          </div>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
