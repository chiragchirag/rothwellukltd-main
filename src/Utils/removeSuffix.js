const removeSuffix = (string, suffix) => {
  if (string?.endsWith(suffix)) {
    return `${string?.slice(0, -suffix?.length)}Name`;
  } else {
    return string;
  }
};

export default removeSuffix;
