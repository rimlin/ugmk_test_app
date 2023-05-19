import { useRouteConfig } from 'infrastructure/routes';

function App() {
  const { buildRoutes } = useRouteConfig();

  return buildRoutes();
}

export default App;
