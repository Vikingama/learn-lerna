export default {
  name: 'InjectPageStack',
  inject: {
    getPageStack: { default: '' },
    openPage: { default: '' },
    popTopPage: { default: '' },
    popPage: { default: '' },
    isStackEmpty: { default: false },
    pIsPageStack: { default: false },
  },
}
