'use client';

import { useState, useCallback } from 'react';

export const useRickroll = () => {
  const [isRickrolling, setIsRickrolling] = useState(false);

  const rickroll = useCallback(() => {
    setIsRickrolling(true);
  }, []);

  const stopRickroll = useCallback(() => {
    setIsRickrolling(false);
  }, []);

  return {
    isRickrolling,
    rickroll,
    stopRickroll,
  };
};