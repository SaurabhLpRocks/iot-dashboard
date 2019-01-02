export const appVariables = {
  userLocalStorage: 'user',
  accessTokenServer: 'X-Auth-Token',
  loginPageUrl: '/#/login',
  errorInputClass: 'has-error',
  successInputClass: 'has-success',
  actionSearchKey: 'Entity',
  resourceActions: {
    getActionName: 'Read',
    addActionName: 'Create',
    updateActionName: 'Update',
    deleteActionName: 'Delete'
  },
  defaultAvatarUrl: 'default_user',
  defaultDdlOptionValue: '-1',
  defaultStateDdlOptionText: 'Select State',
  defaultCityDdlOptionText: 'Select City',
  defaultCompanyDdlOptionText: 'Select Company',
  defaultRateUnitDdlOptionText: 'Select Unit',
  ng2SlimLoadingBarColor: 'red',
  ng2SlimLoadingBarHeight: '4px',
  accessTokenLocalStorage: 'accessToken',
  resourceNameIdentifier: 'Entity',
  docViewerurl: 'http://docs.google.com/gview?url=',
  msOfficeDocViewerPath: 'https://view.officeapps.live.com/op/embed.aspx?src=',
  goodleDocViewerPath: url => {
    return `http://docs.google.com/gview?url=${url}&embedded=true`;
  },
  defaultServerError: {
    error: 'Server Error!',
    message: 'Unknown error occured! Please try again.'
  }
};
