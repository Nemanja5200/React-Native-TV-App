import React, {useEffect, useState} from 'react';
import {findNodeHandle} from 'react-native';

export const useNodeHandle = (ref: React.RefObject<any>) => {
  const [nodeHandle, setNodeHandle] = useState<number | null>(null);

  useEffect(() => {
    if (ref.current) {
      setNodeHandle(findNodeHandle(ref.current));
    }
  }, [ref]);

  return nodeHandle;
};
