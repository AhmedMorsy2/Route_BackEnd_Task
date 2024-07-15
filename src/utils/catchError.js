export function catchError(callback) {
  return (req, res, next) => {
    callback(req, res, next).catch((err) => {
      console.log(err);
    });
  };
}
