import * as React from 'react';

// Custom hook for maintaining form field state
export const useFormField = (defaultVal, validator) => {
  const [data, setData] = React.useState(defaultVal);
  const [error, setError] = React.useState(null);
  const [first, setFirst] = React.useState(true);

  // Validate and set error on data change
  React.useEffect(() => {
    (async () => {
      if (!first) {
        try {
          await validator.validate(data);
          setError(null);
        } catch (err) {
          setError(err.message);
        }
      }
    })();
    // eslint-disable-next-line
  }, [data, validator]);

  // Neutralize above effect on first mount
  React.useEffect(() => {
    setError(null);
    setFirst(false);
  }, []);

  return [data, setData, error];
};
