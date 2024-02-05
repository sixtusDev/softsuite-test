export function removeUndefinedProps(obj: { [key: string]: any }) {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  });
}
