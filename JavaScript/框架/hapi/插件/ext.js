this.extensions = {
  server: {
      onPreStart: new Ext('onPreStart', this),
      onPostStart: new Ext('onPostStart', this),
      onPreStop: new Ext('onPreStop', this),
      onPostStop: new Ext('onPostStop', this)
  },
  route: {
      onRequest: new Ext('onRequest', this),
      onPreAuth: new Ext('onPreAuth', this),
      onCredentials: new Ext('onCredentials', this),
      onPostAuth: new Ext('onPostAuth', this),
      onPreHandler: new Ext('onPreHandler', this),
      onPostHandler: new Ext('onPostHandler', this),
      onPreResponse: new Ext('onPreResponse', this)
  }
};
