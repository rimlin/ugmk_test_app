import { useCallback, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';

import { GeneralChartScreen } from 'screens/GeneralChart';
import { DetailChartScreen } from 'screens/DetailChart';

import { ROUTE_PATHS } from './paths';
import {
  PublicRouteWrapper,
  PublicRouteWrapperProps
} from './wrappers/PublicRoute';

export const useRouteConfig = () => {
  const publicRoutes = useMemo<Array<PublicRouteWrapperProps>>(() => {
    return [
      {
        path: ROUTE_PATHS.HOME,
        screen: <GeneralChartScreen />
      },
      {
        path: ROUTE_PATHS.DETAIL,
        screen: <DetailChartScreen />
      }
    ];
  }, []);

  const buildRoutes = useCallback(() => {
    return (
      <Routes>
        {publicRoutes.map(route => (
          <Route
            key={route.path}
            path={route.path}
            element={<PublicRouteWrapper {...route} />}
          />
        ))}
      </Routes>
    );
  }, [publicRoutes]);

  return { publicRoutes, buildRoutes };
};
