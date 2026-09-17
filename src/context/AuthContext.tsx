import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { UserProfile, TesterFeedback, BetaApp, ActivityLog } from '../types';
import { INITIAL_FEEDBACK, INITIAL_APPS, INITIAL_ACTIVITY_LOGS } from '../data/mockApps';
import { 
  auth, 
  db, 
  googleProvider,
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup,
  signOut, 
  onAuthStateChanged, 
  sendPasswordResetEmail,
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  limit, 
  increment 
} from '../lib/firebase';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  activeNav: string;
  setActiveNav: (nav: string) => void;
  selectedAppId: string | null;
  setSelectedAppId: (id: string | null) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authMode: 'signin' | 'signup' | 'reset-password';
  setAuthMode: (mode: 'signin' | 'signup' | 'reset-password') => void;
  login: (email: string, password?: string, name?: string) => Promise<{ success: boolean; message?: string }>;
  signup: (email: string, password?: string, name?: string) => Promise<{ success: boolean; message?: string }>;
  sendResetEmail: (email: string) => Promise<{ success: boolean; message: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  toggleBookmark: (appId: string) => void;
  isBookmarked: (appId: string) => boolean;
  markAsTested: (appId: string) => void;
  trackAppLaunch: (appId: string) => void;
  redeemCredits: () => boolean;
  hasRedeemedCredits: boolean;
  feedbackList: Record<string, TesterFeedback[]>;
  submitFeedback: (feedback: Omit<TesterFeedback, 'id' | 'timestamp' | 'likes'>) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  // Apps Management & Real-time Metrics
  apps: BetaApp[];
  addApp: (app: BetaApp) => void;
  updateApp: (appId: string, updated: Partial<BetaApp>) => void;
  deleteApp: (appId: string) => void;
  resetAppsToDefault: () => void;
  toggleAppStatus: (appId: string, status: BetaApp['status']) => void;
  importAppsJSON: (jsonString: string) => boolean;
  // Activity Feed
  activityLogs: ActivityLog[];
  clearActivityLogs: () => void;
  isFirebaseConnected: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('delightylabs_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return null;
  });

  const [activeNav, setActiveNav] = useState<string>('gallery');
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'reset-password'>('signin');
  const [hasRedeemedCredits, setHasRedeemedCredits] = useState<boolean>(() => {
    return localStorage.getItem('delightylabs_redeemed') === 'true';
  });
  const [isFirebaseConnected, setIsFirebaseConnected] = useState<boolean>(false);

  const [feedbackList, setFeedbackList] = useState<Record<string, TesterFeedback[]>>(() => {
    const saved = localStorage.getItem('delightylabs_feedback');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_FEEDBACK;
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem('delightylabs_activity_logs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_ACTIVITY_LOGS;
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [rawApps, setRawApps] = useState<BetaApp[]>(() => {
    const saved = localStorage.getItem('delightylabs_published_apps');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const hasRealApp = parsed.some((a: any) => a.id === 'scribera' || a.id === 'refresh-studio' || a.id === 'refloww' || a.id === 'expendx');
          if (hasRealApp) {
            return parsed.map((app: BetaApp) => {
              const initialMatch = INITIAL_APPS.find(i => i.id === app.id);
              if (initialMatch) {
                return {
                  ...app,
                  thumbnail: initialMatch.thumbnail,
                  bannerImage: initialMatch.bannerImage,
                  featuredScreenshots: initialMatch.featuredScreenshots
                };
              }
              return app;
            });
          }
        }
      } catch (e) { /* ignore */ }
    }
    return INITIAL_APPS;
  });

  // 1. Firebase Auth listener
  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, async (fbUser: any) => {
        if (fbUser) {
          const userRef = doc(db, 'users', fbUser.uid);
          try {
            const snap = await getDoc(userRef);
            if (snap.exists()) {
              setUser({ id: fbUser.uid, ...snap.data() } as UserProfile);
            } else {
              const newProfile: UserProfile = {
                id: fbUser.uid,
                name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Beta Tester',
                email: fbUser.email || '',
                avatar: fbUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fbUser.email || 'user')}`,
                tier: 'TESTER',
                credits: 40,
                bookmarkedAppIds: [],
                testedAppIds: []
              };
              await setDoc(userRef, newProfile).catch(() => {});
              setUser(newProfile);
            }
          } catch (e) {
            // Fallback profile if Firestore read fails
            setUser({
              id: fbUser.uid,
              name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Beta Tester',
              email: fbUser.email || '',
              avatar: fbUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fbUser.email || 'user')}`,
              tier: 'TESTER',
              credits: 40,
              bookmarkedAppIds: [],
              testedAppIds: []
            });
          }
        }
      });
      return () => unsubscribe();
    } catch (err) {
      console.warn('Firebase auth listener fallback active');
    }
  }, []);

  // 2. Real-time Firestore Published Apps Listener
  useEffect(() => {
    try {
      const unsub = onSnapshot(collection(db, 'published_apps'), (snapshot: any) => {
        if (!snapshot.empty) {
          const fetchedApps: BetaApp[] = [];
          snapshot.forEach((docSnap: any) => {
            fetchedApps.push({ id: docSnap.id, ...docSnap.data() } as BetaApp);
          });
          setRawApps(fetchedApps);
          setIsFirebaseConnected(true);
        } else {
          // Auto-seed Firestore with default apps if empty
          INITIAL_APPS.forEach((app) => {
            setDoc(doc(db, 'published_apps', app.id), app).catch(() => {});
          });
          setIsFirebaseConnected(true);
        }
      }, () => {
        setIsFirebaseConnected(false);
      });
      return () => unsub();
    } catch (err) {
      setIsFirebaseConnected(false);
    }
  }, []);

  // 3. Real-time Firestore Feedback Listener
  useEffect(() => {
    try {
      const unsub = onSnapshot(collection(db, 'feedback'), (snapshot: any) => {
        const grouped: Record<string, TesterFeedback[]> = {};
        snapshot.forEach((docSnap: any) => {
          const item = { id: docSnap.id, ...docSnap.data() } as TesterFeedback;
          if (!grouped[item.appId]) grouped[item.appId] = [];
          grouped[item.appId].push(item);
        });
        if (Object.keys(grouped).length > 0) {
          setFeedbackList(grouped);
        }
      }, () => {});
      return () => unsub();
    } catch (err) {}
  }, []);

  // 4. Real-time Firestore Activity Logs Listener
  useEffect(() => {
    try {
      const q = query(collection(db, 'activity_logs'), orderBy('timestamp', 'desc'), limit(50));
      const unsub = onSnapshot(q, (snapshot: any) => {
        const logs: ActivityLog[] = [];
        snapshot.forEach((docSnap: any) => {
          logs.push({ id: docSnap.id, ...docSnap.data() } as ActivityLog);
        });
        if (logs.length > 0) {
          setActivityLogs(logs);
        }
      }, () => {});
      return () => unsub();
    } catch (err) {}
  }, []);

  // Calculate dynamic apps with live reviews and ratings
  const apps = useMemo(() => {
    return rawApps.map(app => {
      const feedbacks = feedbackList[app.id] || [];
      if (feedbacks.length === 0) {
        return app;
      }
      const totalRating = feedbacks.reduce((acc, f) => acc + f.rating, 0);
      const avgRating = Number((totalRating / feedbacks.length).toFixed(2));
      return {
        ...app,
        rating: avgRating,
        reviewsCount: feedbacks.length
      };
    });
  }, [rawApps, feedbackList]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('delightylabs_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('delightylabs_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('delightylabs_feedback', JSON.stringify(feedbackList));
  }, [feedbackList]);

  useEffect(() => {
    localStorage.setItem('delightylabs_published_apps', JSON.stringify(rawApps));
  }, [rawApps]);

  useEffect(() => {
    localStorage.setItem('delightylabs_activity_logs', JSON.stringify(activityLogs));
  }, [activityLogs]);

  const logActivity = (
    appId: string,
    appTitle: string,
    type: ActivityLog['type'],
    details: string
  ) => {
    const newLog: ActivityLog = {
      id: 'log-' + Date.now(),
      appId,
      appTitle,
      type,
      userName: user?.name || 'Guest User',
      userAvatar: user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guest',
      details,
      timestamp: 'Just now'
    };
    setActivityLogs(prev => [newLog, ...prev.slice(0, 49)]);

    // Write to Firestore background
    setDoc(doc(db, 'activity_logs', newLog.id), newLog).catch(() => {});
  };

  const trackAppLaunch = (appId: string) => {
    const targetApp = rawApps.find(a => a.id === appId);
    if (!targetApp) return;

    setRawApps(prev => prev.map(app => {
      if (app.id === appId) {
        return { ...app, testersCount: (app.testersCount || 0) + 1 };
      }
      return app;
    }));

    if (user && !user.testedAppIds.includes(appId)) {
      const updatedUser = { ...user, testedAppIds: [...user.testedAppIds, appId] };
      setUser(updatedUser);
      updateDoc(doc(db, 'users', user.id), { testedAppIds: updatedUser.testedAppIds }).catch(() => {});
    }

    updateDoc(doc(db, 'published_apps', appId), { testersCount: increment(1) }).catch(() => {});

    logActivity(
      appId,
      targetApp.title,
      'launch',
      `Launched application "${targetApp.title}"`
    );
  };

  const addApp = (newApp: BetaApp) => {
    setRawApps(prev => [newApp, ...prev]);
    setDoc(doc(db, 'published_apps', newApp.id), newApp).catch(() => {});
    logActivity(newApp.id, newApp.title, 'create', `Published new application "${newApp.title}"`);
    showToast(`Published app "${newApp.title}" created successfully!`);
  };

  const updateApp = (appId: string, updatedFields: Partial<BetaApp>) => {
    const target = rawApps.find(a => a.id === appId);
    setRawApps(prev => prev.map(app => (app.id === appId ? { ...app, ...updatedFields } : app)));
    updateDoc(doc(db, 'published_apps', appId), updatedFields).catch(() => {});
    if (target) {
      logActivity(appId, target.title, 'edit', `Updated metadata for "${target.title}"`);
    }
    showToast(`App details updated successfully.`);
  };

  const deleteApp = (appId: string) => {
    const target = rawApps.find(a => a.id === appId);
    setRawApps(prev => prev.filter(app => app.id !== appId));
    deleteDoc(doc(db, 'published_apps', appId)).catch(() => {});
    if (selectedAppId === appId) {
      setSelectedAppId(null);
    }
    if (target) {
      logActivity(appId, target.title, 'delete', `Removed app listing "${target.title}"`);
    }
    showToast(`App "${target?.title || appId}" removed.`);
  };

  const resetAppsToDefault = () => {
    setRawApps(INITIAL_APPS);
    setActivityLogs(INITIAL_ACTIVITY_LOGS);
    setFeedbackList(INITIAL_FEEDBACK);
    localStorage.removeItem('delightylabs_published_apps');
    localStorage.removeItem('delightylabs_activity_logs');
    localStorage.removeItem('delightylabs_feedback');

    INITIAL_APPS.forEach(app => {
      setDoc(doc(db, 'published_apps', app.id), app).catch(() => {});
    });

    showToast('Reset published apps catalog to default dataset.');
  };

  const toggleAppStatus = (appId: string, newStatus: BetaApp['status']) => {
    const target = rawApps.find(a => a.id === appId);
    setRawApps(prev => prev.map(app => (app.id === appId ? { ...app, status: newStatus } : app)));
    updateDoc(doc(db, 'published_apps', appId), { status: newStatus }).catch(() => {});
    if (target) {
      logActivity(appId, target.title, 'status_change', `Changed status of "${target.title}" to ${newStatus}`);
    }
    showToast(`App status updated to "${newStatus}".`);
  };

  const importAppsJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].id && parsed[0].title) {
        setRawApps(parsed);
        parsed.forEach((appItem: BetaApp) => {
          setDoc(doc(db, 'published_apps', appItem.id), appItem).catch(() => {});
        });
        logActivity('all', 'Catalog', 'create', `Imported ${parsed.length} app listings via JSON`);
        showToast(`Successfully imported ${parsed.length} published apps!`);
        return true;
      } else {
        showToast('Invalid JSON format: Expected array of BetaApp objects.');
        return false;
      }
    } catch (e) {
      showToast('Failed to parse JSON file.');
      return false;
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3500);
  };

  const login = async (email: string, password?: string, name?: string): Promise<{ success: boolean; message?: string }> => {
    try {
      if (password) {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const fbUser = cred.user;
        const userRef = doc(db, 'users', fbUser.uid);
        const snap = await getDoc(userRef);
        let profile: UserProfile;
        if (snap.exists()) {
          profile = { id: fbUser.uid, ...snap.data() } as UserProfile;
        } else {
          profile = {
            id: fbUser.uid,
            name: name || fbUser.displayName || email.split('@')[0],
            email,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
            tier: 'PRO',
            credits: 40,
            bookmarkedAppIds: [],
            testedAppIds: []
          };
          await setDoc(userRef, profile).catch(() => {});
        }
        setUser(profile);
        setAuthModalOpen(false);
        showToast(`Welcome back, ${profile.name}!`);
        return { success: true };
      }
    } catch (err: any) {
      let message = "Failed to sign in.";
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        message = "Invalid email or password.";
      } else if (err.code === 'auth/user-not-found') {
        message = "No account found with this email address.";
      } else if (err.code === 'auth/too-many-requests') {
        message = "Too many failed attempts. Please try again later.";
      } else if (err.message) {
        message = err.message;
      }
      return { success: false, message };
    }

    // Direct profile login fallback for quick testing
    const newUser: UserProfile = {
      id: 'user-' + Date.now(),
      name: name || email.split('@')[0],
      email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
      tier: 'PRO',
      credits: 40,
      bookmarkedAppIds: [],
      testedAppIds: []
    };
    setUser(newUser);
    setAuthModalOpen(false);
    showToast(`Welcome back, ${newUser.name}!`);
    return { success: true };
  };

  const signup = async (email: string, password?: string, name: string = 'Beta Tester'): Promise<{ success: boolean; message?: string }> => {
    try {
      if (password) {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        const fbUser = cred.user;
        const profile: UserProfile = {
          id: fbUser.uid,
          name,
          email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
          tier: 'TESTER',
          credits: 40,
          bookmarkedAppIds: [],
          testedAppIds: []
        };
        await setDoc(doc(db, 'users', fbUser.uid), profile).catch(() => {});
        setUser(profile);
        setAuthModalOpen(false);
        showToast(`Account created! Welcome to DelightyLabs, ${name}.`);
        return { success: true };
      }
    } catch (err: any) {
      let message = "Failed to create account.";
      if (err.code === 'auth/email-already-in-use') {
        message = "An account with this email already exists.";
      } else if (err.code === 'auth/weak-password') {
        message = "Password should be at least 6 characters long.";
      } else if (err.code === 'auth/invalid-email') {
        message = "Please enter a valid email address.";
      } else if (err.message) {
        message = err.message;
      }
      return { success: false, message };
    }

    const newUser: UserProfile = {
      id: 'user-' + Date.now(),
      name,
      email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      tier: 'TESTER',
      credits: 40,
      bookmarkedAppIds: [],
      testedAppIds: []
    };
    setUser(newUser);
    setAuthModalOpen(false);
    showToast(`Account created! Welcome to DelightyLabs, ${name}.`);
    return { success: true };
  };

  const sendResetEmail = async (email: string): Promise<{ success: boolean; message: string }> => {
    try {
      await sendPasswordResetEmail(auth, email);
      showToast(`Password reset email sent to ${email}`);
      return { success: true, message: `Password reset email sent to ${email}. Please check your inbox.` };
    } catch (err: any) {
      let message = "Failed to send reset link.";
      if (err.code === 'auth/user-not-found') {
        message = "No account found with this email address.";
      } else if (err.code === 'auth/invalid-email') {
        message = "Please enter a valid email address.";
      } else if (err.message) {
        message = err.message;
      }
      return { success: false, message };
    }
  };

  const loginWithGoogle = async (): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const fbUser = res.user;
      const userRef = doc(db, 'users', fbUser.uid);
      const snap = await getDoc(userRef);
      let profile: UserProfile;
      if (snap.exists()) {
        profile = { id: fbUser.uid, ...snap.data() } as UserProfile;
      } else {
        profile = {
          id: fbUser.uid,
          name: fbUser.displayName || 'Google Tester',
          email: fbUser.email || '',
          avatar: fbUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fbUser.email || 'google')}`,
          tier: 'PRO',
          credits: 40,
          bookmarkedAppIds: [],
          testedAppIds: []
        };
        await setDoc(userRef, profile).catch(() => {});
      }
      setUser(profile);
      setAuthModalOpen(false);
      showToast(`Welcome, ${profile.name}! Signed in via Google.`);
      return { success: true };
    } catch (err: any) {
      let message = "Google Sign-In was cancelled or failed.";
      if (err.code === 'auth/operation-not-allowed') {
        message = "Google Sign-In is not enabled in Firebase Console. Enable Google under Auth > Sign-in method.";
      } else if (err.code === 'auth/unauthorized-domain') {
        message = "This domain is not authorized in Firebase. Add your current domain under Auth > Settings > Authorized domains.";
      } else if (err.code === 'auth/popup-closed-by-user') {
        message = "Sign-in popup was closed before completing authentication.";
      } else if (err.code === 'auth/popup-blocked') {
        message = "Sign-in popup was blocked by browser. Please allow popups for this site.";
      } else if (err.message) {
        message = err.message;
      }
      return { success: false, message };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {}
    setUser(null);
    showToast('Signed out of DelightyLabs.');
  };

  const toggleBookmark = (appId: string) => {
    if (!user) {
      setAuthModalOpen(true);
      showToast('Please sign in to save apps.');
      return;
    }
    const isSaved = user.bookmarkedAppIds.includes(appId);
    const updated = isSaved 
      ? user.bookmarkedAppIds.filter(id => id !== appId)
      : [...user.bookmarkedAppIds, appId];
    
    const updatedUser = { ...user, bookmarkedAppIds: updated };
    setUser(updatedUser);
    updateDoc(doc(db, 'users', user.id), { bookmarkedAppIds: updated }).catch(() => {});

    // Increment / decrement upvotesCount in rawApps
    const targetApp = rawApps.find(a => a.id === appId);
    if (targetApp) {
      const newUpvotes = Math.max(0, (targetApp.upvotesCount || 0) + (isSaved ? -1 : 1));
      setRawApps(prev => prev.map(a => {
        if (a.id === appId) {
          return { ...a, upvotesCount: newUpvotes };
        }
        return a;
      }));
      updateDoc(doc(db, 'published_apps', appId), { upvotesCount: newUpvotes }).catch(() => {});

      logActivity(
        appId,
        targetApp.title,
        'bookmark',
        `${isSaved ? 'Removed bookmark from' : 'Bookmarked'} "${targetApp.title}"`
      );
    }

    showToast(isSaved ? 'Removed from saved apps' : 'Saved to your workspace list');
  };

  const isBookmarked = (appId: string) => {
    return !!user?.bookmarkedAppIds.includes(appId);
  };

  const markAsTested = (appId: string) => {
    if (!user) return;
    if (!user.testedAppIds.includes(appId)) {
      const updatedUser = { ...user, testedAppIds: [...user.testedAppIds, appId] };
      setUser(updatedUser);
      updateDoc(doc(db, 'users', user.id), { testedAppIds: updatedUser.testedAppIds }).catch(() => {});
    }
  };

  const redeemCredits = () => {
    if (!user) {
      setAuthModalOpen(true);
      return false;
    }
    if (hasRedeemedCredits) {
      showToast('Credits already redeemed for this cycle.');
      return false;
    }
    const updatedUser = { ...user, credits: user.credits + 40 };
    setUser(updatedUser);
    updateDoc(doc(db, 'users', user.id), { credits: updatedUser.credits }).catch(() => {});

    setHasRedeemedCredits(true);
    localStorage.setItem('delightylabs_redeemed', 'true');
    showToast('Success! $40 in Delighty credits added to your account.');
    return true;
  };

  const submitFeedback = (newFb: Omit<TesterFeedback, 'id' | 'timestamp' | 'likes'>) => {
    const item: TesterFeedback = {
      ...newFb,
      id: 'fb-' + Date.now(),
      timestamp: 'Just now',
      likes: 0
    };

    setFeedbackList(prev => ({
      ...prev,
      [newFb.appId]: [item, ...(prev[newFb.appId] || [])]
    }));

    setDoc(doc(db, 'feedback', item.id), item).catch(() => {});

    if (user) {
      markAsTested(newFb.appId);
    }

    const targetApp = rawApps.find(a => a.id === newFb.appId);
    if (targetApp) {
      logActivity(
        newFb.appId,
        targetApp.title,
        'review',
        `Submitted a ${newFb.rating}-star review for "${targetApp.title}"`
      );
    }

    showToast('Feedback submitted! Rating and statistics updated in real-time.');
  };

  const clearActivityLogs = () => {
    setActivityLogs([]);
    localStorage.removeItem('delightylabs_activity_logs');
    showToast('Activity logs cleared.');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        activeNav,
        setActiveNav,
        selectedAppId,
        setSelectedAppId,
        authModalOpen,
        setAuthModalOpen,
        authMode,
        setAuthMode,
        login,
        signup,
        sendResetEmail,
        loginWithGoogle,
        logout,
        toggleBookmark,
        isBookmarked,
        markAsTested,
        trackAppLaunch,
        redeemCredits,
        hasRedeemedCredits,
        feedbackList,
        submitFeedback,
        toastMessage,
        showToast,
        apps,
        addApp,
        updateApp,
        deleteApp,
        resetAppsToDefault,
        toggleAppStatus,
        importAppsJSON,
        activityLogs,
        clearActivityLogs,
        isFirebaseConnected
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

