
export default function objectAssign(target, ...sources) {
  if (Object.assign) {
    for (const key in sources) {
      Object.assign(target, sources[key]);
    }
  } else {
    for (const key in sources) {
      const source = sources[key];
      for (const propKey in source) {
        const property = source[propKey];
        target[propKey] = property;
      }
    }
  }

  return target;
}