declare global {
  interface GoogleIdentityServicesErrorType {
    Ie: string;
    Ke: string;
    Le: string;
    Pe: string;
  }

  interface IdNamespace {
    GoogleIdentityServicesErrorType: GoogleIdentityServicesErrorType;
  }

  interface Window {
    google: {
      accounts: {
        id: IdNamespace;
      };
    };
    googleInitialized?: boolean;
  }
}

export {};
