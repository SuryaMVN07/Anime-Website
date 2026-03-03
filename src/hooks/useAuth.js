import { useState, useEffect } from 'react';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { auth } from '../services/firebase';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await signInAnonymously(auth);
      } catch (e) {
        console.error("Auth error:", e);
        // Set a mock user for development when Firebase fails
        setUser({ uid: 'demo-user', isAnonymous: true });
      }
    };

    try {
      initAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          // Fallback user for development
          setUser({ uid: 'demo-user', isAnonymous: true });
        }
      });
      return () => unsubscribe();
    } catch (e) {
      console.error("Auth initialization error:", e);
      // Set fallback user for development
      setTimeout(() => setUser({ uid: 'demo-user', isAnonymous: true }), 0);
    }
  }, []);

  return user;
};