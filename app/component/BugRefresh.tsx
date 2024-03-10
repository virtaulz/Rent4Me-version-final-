'use client';

import React, { useState, useEffect } from 'react';

interface bug {
  children: React.ReactNode;
}

const BugRefresh: React.FC<bug> = ({children}) => {
const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
      setHasMounted(true);
  }, [])

  if (!hasMounted) return null;

  return (
    <>
    {children}
    </>
  );
};

export default BugRefresh;
