
// Specific protected routes are children of 'authenticatedRoute'
const dashboardRoute = createRoute({
    getParentRoute: () => authenticatedRoute, // Child of the protected route
    path: '/dashboard',
    component: DashboardPage,
  });