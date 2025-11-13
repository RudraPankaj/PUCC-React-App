import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';
import DashboardLayout from '../components/dashboard/DashboardLayout.jsx';

// Sections
import ProfileSection from '../components/dashboard/sections/ProfileSection.jsx';
const EventsSection = React.lazy(() => import('../components/dashboard/sections/EventsSection.jsx'));
const ManageUsersSection = React.lazy(() => import('../components/dashboard/sections/ManageUsersSection.jsx'));
const GlobalChatSection = React.lazy(() => import('../components/dashboard/sections/GlobalChatSection.jsx'));
const AnnouncementSection = React.lazy(() => import('../components/dashboard/sections/AnnouncementSection.jsx'));
const ManageCoursesSection = React.lazy(() => import('../components/dashboard/sections/ProfileSection.jsx')); // Placeholder
const ManageWingsSection = React.lazy(() => import('../components/dashboard/sections/ProfileSection.jsx')); // Placeholder
const ReportsSection = React.lazy(() => import('../components/dashboard/sections/ProfileSection.jsx')); // Placeholder
const ManageStudentsSection = React.lazy(() => import('../components/dashboard/sections/ProfileSection.jsx')); // Placeholder
const GradeAssignmentSection = React.lazy(() => import('../components/dashboard/sections/ProfileSection.jsx')); // Placeholder
const EnrolledCoursesSection = React.lazy(() => import('../components/dashboard/sections/ProfileSection.jsx')); // Placeholder
const AssignmentsSection = React.lazy(() => import('../components/dashboard/sections/ProfileSection.jsx')); // Placeholder
const GradesSection = React.lazy(() => import('../components/dashboard/sections/ProfileSection.jsx')); // Placeholder
const SettingsSection = React.lazy(() => import('../components/dashboard/sections/ProfileSection.jsx')); // Placeholder
const NotFound = React.lazy(() => import('../pages/NotFound.jsx'));

const dashboardRoutes = [
    {
        path: 'dashboard',
        element: <ProtectedRoute><DashboardLayout><Outlet /></DashboardLayout></ProtectedRoute>,
        children: [
            {
                path: '',
                element: <Navigate to="executive/profile" replace />
            },
            {
                path: 'executive',
                element: <ProtectedRoute allowedRoles={['executive']}><Outlet /></ProtectedRoute>,
                children: [
                    { index: true, element: <ProfileSection /> },
                    { path: 'profile', element: <ProfileSection /> },
                    { path: 'global-chat', element: <GlobalChatSection /> },
                    { path: 'events', element: <EventsSection /> },
                    { path: 'announcements', element: <AnnouncementSection /> },
                    { path: 'manage-users', element: <ManageUsersSection /> },
                    { path: 'manage-courses', element: <ManageCoursesSection /> },
                    { path: 'manage-wings', element: <ManageWingsSection /> },
                    { path: 'reports', element: <ReportsSection /> },
                    { path: 'settings', element: <SettingsSection /> },
                    { path: '*', element: <NotFound /> },
                ]
            },
            {
                path: 'instructor',
                element: <ProtectedRoute allowedRoles={['instructor']}><Outlet /></ProtectedRoute>,
                children: [
                    { index: true, element: <Navigate to="profile" replace /> },
                    { path: 'profile', element: <ProfileSection /> },
                    { path: 'global-chat', element: <GlobalChatSection /> },
                    { path: 'events', element: <EventsSection /> },
                    { path: 'announcements', element: <AnnouncementSection /> },
                    { path: 'manage-courses', element: <ManageCoursesSection /> },
                    { path: 'manage-students', element: <ManageStudentsSection /> },
                    { path: 'grade-assignment', element: <GradeAssignmentSection /> },
                    { path: 'reports', element: <ReportsSection /> },
                    { path: 'settings', element: <SettingsSection /> },
                    { path: '*', element: <NotFound /> },
                ]
            },
            {
                path: 'member',
                element: <ProtectedRoute allowedRoles={['member']}><Outlet /></ProtectedRoute>,
                children: [
                    { index: true, element: <Navigate to="profile" replace /> },
                    { path: 'profile', element: <ProfileSection /> },
                    { path: 'global-chat', element: <GlobalChatSection /> },
                    { path: 'events', element: <EventsSection /> },
                    { path: 'announcements', element: <AnnouncementSection /> },
                    { path: 'enrolled-courses', element: <EnrolledCoursesSection /> },
                    { path: 'assignments', element: <AssignmentsSection /> },
                    { path: 'grades', element: <GradesSection /> },
                    { path: 'settings', element: <SettingsSection /> },
                    { path: '*', element: <NotFound /> },
                ]
            },
            // Fallback for /dashboard if no role-specific path is matched
            { path: '*', element: <NotFound /> },
        ]
    }
];

export default dashboardRoutes;
