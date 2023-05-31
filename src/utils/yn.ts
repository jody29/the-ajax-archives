const yn = (value: any, defaultValue = false) => {
  value = String(value).trim();

  if (/^(?:y|yes|true|1|on)$/i.test(value)) {
    return true;
  }

  if (/^(?:n|no|false|0|off)$/i.test(value)) {
    return false;
  }

  if (value === true) {
    return true;
  }

  return defaultValue;
};

export default yn;
