// // // First, let's create a context to manage the saved posts state
// // // SavedPostsContext.tsx
// // import React, {createContext, useContext, useState} from 'react';

// // interface ContentItem {
// //   title: string;
// //   description: string;
// //   keywords: string[];
// //   hashtags: string[];
// //   images: string[];
// //   timestamp: number;
// // }

// // interface SavedPostsContextType {
// //   savedPosts: ContentItem[];
// //   addPost: (post: ContentItem) => void;
// //   removePost: (timestamp: number) => void;
// // }

// // const SavedPostsContext = createContext<SavedPostsContextType | undefined>(
// //   undefined,
// // );

// // export const SavedPostsProvider: React.FC<{children: React.ReactNode}> = ({
// //   children,
// // }) => {
// //   const [savedPosts, setSavedPosts] = useState<ContentItem[]>([]);

// //   const addPost = (post: ContentItem) => {
// //     setSavedPosts(prev => [{...post, timestamp: Date.now()}, ...prev]);
// //   };

// //   const removePost = (timestamp: number) => {
// //     setSavedPosts(prev => prev.filter(post => post.timestamp !== timestamp));
// //   };

// //   return (
// //     <SavedPostsContext.Provider value={{savedPosts, addPost, removePost}}>
// //       {children}
// //     </SavedPostsContext.Provider>
// //   );
// // };

// // export const useSavedPosts = () => {
// //   const context = useContext(SavedPostsContext);
// //   if (!context) {
// //     throw new Error('useSavedPosts must be used within a SavedPostsProvider');
// //   }
// //   return context;
// // };

// import React, {createContext, useContext, useState, useEffect} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// interface ContentItem {
//   title: string;
//   description: string;
//   keywords: string[];
//   hashtags: string[];
//   images: string[];
//   timestamp: number;
// }

// interface SavedPostsContextType {
//   savedPosts: ContentItem[];
//   addPost: (post: ContentItem) => Promise<void>;
//   removePost: (timestamp: number) => Promise<void>;
// }

// const SavedPostsContext = createContext<SavedPostsContextType | undefined>(
//   undefined,
// );

// export const SavedPostsProvider: React.FC<{children: React.ReactNode}> = ({
//   children,
// }) => {
//   const [savedPosts, setSavedPosts] = useState<ContentItem[]>([]);

//   // Load saved posts from storage when the app starts
//   useEffect(() => {
//     loadSavedPosts();
//   }, []);

//   // Load posts from AsyncStorage
//   const loadSavedPosts = async () => {
//     try {
//       const storedPosts = await AsyncStorage.getItem('savedPosts');
//       if (storedPosts) {
//         setSavedPosts(JSON.parse(storedPosts));
//       }
//     } catch (error) {
//       console.error('Error loading saved posts:', error);
//     }
//   };

//   // Save posts to AsyncStorage
//   const savePosts = async (posts: ContentItem[]) => {
//     try {
//       await AsyncStorage.setItem('savedPosts', JSON.stringify(posts));
//     } catch (error) {
//       console.error('Error saving posts:', error);
//     }
//   };

//   // Add a new post
//   const addPost = async (post: ContentItem) => {
//     const newPost = {...post, timestamp: Date.now()};
//     const updatedPosts = [newPost, ...savedPosts];
//     setSavedPosts(updatedPosts);
//     await savePosts(updatedPosts);
//   };

//   // Remove a post
//   const removePost = async (timestamp: number) => {
//     const updatedPosts = savedPosts.filter(
//       post => post.timestamp !== timestamp,
//     );
//     setSavedPosts(updatedPosts);
//     await savePosts(updatedPosts);
//   };

//   const contextValue: SavedPostsContextType = {
//     savedPosts,
//     addPost,
//     removePost,
//   };

//   return (
//     <SavedPostsContext.Provider value={contextValue}>
//       {children}
//     </SavedPostsContext.Provider>
//   );
// };

// export const useSavedPosts = () => {
//   const context = useContext(SavedPostsContext);
//   if (!context) {
//     throw new Error('useSavedPosts must be used within a SavedPostsProvider');
//   }
//   return context;
// };

// SavedPostsProvider.js
import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ContentItem {
  title: string;
  description: string;
  keywords: string[];
  hashtags: string[];
  images: string[];
  timestamp: number;
}

interface SavedPostsContextType {
  savedPosts: ContentItem[];
  addPost: (post: ContentItem) => Promise<void>;
  removePost: (timestamp: number) => Promise<void>;
}

const SavedPostsContext = createContext<SavedPostsContextType | undefined>(
  undefined,
);

export const SavedPostsProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [savedPosts, setSavedPosts] = useState<ContentItem[]>([]);

  // Load saved posts from storage when the app starts
  useEffect(() => {
    loadSavedPosts();
  }, []);

  const loadSavedPosts = async () => {
    try {
      const storedPosts = await AsyncStorage.getItem('savedPosts');
      if (storedPosts) {
        setSavedPosts(JSON.parse(storedPosts));
      }
    } catch (error) {
      console.error('Error loading saved posts:', error);
    }
  };

  const savePosts = async (posts: ContentItem[]) => {
    try {
      await AsyncStorage.setItem('savedPosts', JSON.stringify(posts));
    } catch (error) {
      console.error('Error saving posts:', error);
    }
  };

  const addPost = async (post: ContentItem) => {
    const newPost = {...post, timestamp: Date.now()};
    const updatedPosts = [newPost, ...savedPosts];
    setSavedPosts(updatedPosts);
    await savePosts(updatedPosts);
  };

  const removePost = async (timestamp: number) => {
    const updatedPosts = savedPosts.filter(
      post => post.timestamp !== timestamp,
    );
    setSavedPosts(updatedPosts);
    await savePosts(updatedPosts);
  };

  const contextValue: SavedPostsContextType = {
    savedPosts,
    addPost,
    removePost,
  };

  return (
    <SavedPostsContext.Provider value={contextValue}>
      {children}
    </SavedPostsContext.Provider>
  );
};

export const useSavedPosts = () => {
  const context = useContext(SavedPostsContext);
  if (!context) {
    throw new Error('useSavedPosts must be used within a SavedPostsProvider');
  }
  return context;
};
