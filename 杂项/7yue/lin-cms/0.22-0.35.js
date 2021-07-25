// lin/mixin/index.js
<<<<<<< HEAD
        isAllowed(_auth) {
          const { auths } = this.user
          return !!auths.find(i => {
            const [moduleName] = Object.keys(i)
            return i[moduleName].find(j => j.auth === _auth)
          })
=======
        isAllowed(_permission) {
          /* eslint-disable no-restricted-syntax */
          /* eslint-disable guard-for-in */
          const { permissions } = this.user
          for (const mod of permissions) {
            for (const item in mod) {
              for (const a of mod[item]) {
                // console.log(a.permission)
                if (a.permission === _permission) {
                  return true
                }
                // console.log(a.module)
              }
            }
          }
          return false
>>>>>>> 142f5e54b2f215ab50de62c05c36e8f9f3601162
        },

// store/mutation.js


<<<<<<< HEAD:src/store/mutations.js
  [types.SET_USER_AUTHS](state, auths) {
    const _auths = []
    auths.forEach(i => {
      const [moduleName] = Object.keys(i)
      _auths.push(...i[moduleName].map(j => j.auth))
    })

    state.auths = _auths
=======
  [types.SET_USER_PERMISSIONS](state, permissions) {
    const _permissions = []
    for (let i = 0; i < permissions.length; i++) {
      for (const key in permissions[i]) {
        // console.log(i, state.user.permissions[i][key])
        for (let j = 0; j < permissions[i][key].length; j++) {
          _permissions.push(permissions[i][key][j].permission)
        }
      }
    }
    state.permissions = _permissions
>>>>>>> 142f5e54b2f215ab50de62c05c36e8f9f3601162:src/store/mutation.js
  },
