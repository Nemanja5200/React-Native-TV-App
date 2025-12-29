import React, {createContext, useContext, useRef, useCallback} from 'react';

type FocusContextType = {
  registerRef: (key: string, ref: React.RefObject<any>) => void;
  focusOn: (key: string) => void;
};

const FocusContext = createContext<FocusContextType | null>(null);

export const FocusProvider = ({children}: {children: React.ReactNode}) => {
  const refs = useRef<Map<string, React.RefObject<any>>>(new Map());

  const registerRef = useCallback((key: string, ref: React.RefObject<any>) => {
    refs.current.set(key, ref);
  }, []);

  const focusOn = useCallback((key: string) => {
    const ref = refs.current.get(key);
    if (ref?.current?.setNativeProps) {
      setTimeout(() => {
        ref.current.setNativeProps({hasTVPreferredFocus: true});
      }, 100);
    }
  }, []);

  return (
    <FocusContext.Provider value={{registerRef, focusOn}}>
      {children}
    </FocusContext.Provider>
  );
};

export const useFocusContext = () => {
  const context = useContext(FocusContext);
  if (!context) {
    throw new Error('useFocusContext must be used within FocusProvider');
  }
  return context;
};
