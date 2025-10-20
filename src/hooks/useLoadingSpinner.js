import { useState } from "react";

const useLoadingSpinner = () => {
  const [loading, setLoading] = useState(false);

  const show = () => setLoading(true);
  const hide = () => setLoading(false);

  return { loading, show, hide };
};

export default useLoadingSpinner;
