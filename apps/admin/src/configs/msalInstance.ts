import { PublicClientApplication } from '@azure/msal-browser';

import { msalConfig } from '../configs/auth';

export const msalInstance = new PublicClientApplication(msalConfig);
