
  // to.js
export default function to(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

[err, user] = await to(UserModel.findById(1));
if(!user) return cb('No user found');