let env = {};
// if(process.env.NODE_ENV === 'production') {
  env = {
    api: 'http://api.themoviedb.org/3'
  };
// } else {
//   env = {
//     api: 'http://localhost:3004'
//   }
// }

export default env;
