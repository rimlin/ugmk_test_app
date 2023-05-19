import { BrowserRouter } from 'react-router-dom';

import { IAppProvidersProps } from './AppProvidersProps';

export const AppProviders = (props: IAppProvidersProps): JSX.Element => {
  return <BrowserRouter>{props.children}</BrowserRouter>;
};
