import React, { createContext, useContext, useState } from 'react';
import { DEFAULT_CUSTOMIZATION } from '../utils/constants';

const CustomizerContext = createContext(null);

export const CustomizerProvider = ({ children }) => {
  const [customization, setCustomization] = useState(DEFAULT_CUSTOMIZATION);

  const setColor = (color) => {
    setCustomization((prev) => ({ ...prev, color }));
  };

  const setStrap = (strap) => {
    setCustomization((prev) => ({ ...prev, strap }));
  };

  const setWatchFace = (watchFace) => {
    setCustomization((prev) => ({ ...prev, watchFace }));
  };

  const resetCustomization = () => {
    setCustomization(DEFAULT_CUSTOMIZATION);
  };

  const value = {
    customization,
    setColor,
    setStrap,
    setWatchFace,
    resetCustomization,
  };

  return <CustomizerContext.Provider value={value}>{children}</CustomizerContext.Provider>;
};

export const useCustomizerContext = () => {
  const context = useContext(CustomizerContext);
  if (!context) {
    throw new Error('useCustomizerContext must be used within a CustomizerProvider');
  }
  return context;
};
