'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, signOut } from 'firebase/auth';
import { firestore, auth } from '@/app/myfirebase/firebase';
import { Box, Modal, Typography, Stack, TextField, Button, IconButton, CircularProgress } from '@mui/material';
import { collection, deleteDoc, doc, getDocs, query, getDoc, setDoc } from 'firebase/firestore';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, [auth]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/sign-in'); // Redirect to the sign-in page
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateInventory = async () => {
    if (!user) return;

    const snapshot = query(collection(firestore, `users/${user.uid}/inventory`));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
  };

  const addItem = async (item) => {
    if (!user) return;

    const docRef = doc(collection(firestore, `users/${user.uid}/inventory`), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  };

  const removeItem = async (item) => {
    if (!user) return;

    const docRef = doc(collection(firestore, `users/${user.uid}/inventory`), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
  };

  useEffect(() => {
    updateInventory();
  }, [user]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const themeStyles = {
    dark: {
      backgroundColor: "#001014",
      color: "#37889e",
      buttonColor: "#37889e",
      modalBg: "#37889e",
      borderColor: "#001014",
      textFieldBorder: "#37889e",
      buttonTextColor: "#37889e",
      textColor: "#b0ced6", 
      textFieldColor: "#001014",
      buttonIcon: "#f8ecf5"
    },
    light: {
      backgroundColor: "#f1eef1",
      color: "#ffffff",
      buttonColor: "#6a2460",
      modalBg: "#6a2461",
      borderColor: "#f1eef1",
      textFieldBorder: "#6a2461",
      buttonTextColor: "#ffffff",
      textColor: "#6a2461",
      textFieldColor: "#6a2461",
      buttonIcon: "#f1eef1"
    }
  };

  const theme = darkMode ? themeStyles.dark : themeStyles.light;

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      gap={2}
      bgcolor={theme.backgroundColor}
      sx={{ padding: 2, boxSizing: 'border-box' }}
    >
      <Box
        position="absolute"
        top={16}
        right={16}
        display="flex"
        alignItems="center"
        gap={1}
      >
        <IconButton
          onClick={toggleDarkMode}
          sx={{
            backgroundColor: theme.buttonColor,
            color: theme.buttonIcon,
            padding: 1.5,
            '&:hover': {
              backgroundColor: theme.buttonColor,
              opacity: 0.8,
              transform: 'scale(1.1)',
              transition: 'transform 0.2s ease-in-out'
            },
            borderRadius: '50%',
            fontFamily: "PT Sans, sans-serif"
          }}
        >
          {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
        <IconButton
          onClick={handleSignOut}
          sx={{
            backgroundColor: theme.buttonColor,
            color: theme.buttonIcon,
            padding: 1.5,
            '&:hover': {
              backgroundColor: theme.buttonColor,
              opacity: 0.8,
              transform: 'scale(1.1)',
              transition: 'transform 0.2s ease-in-out'
            },
            borderRadius: '50%',
            fontFamily: "PT Sans, sans-serif"
          }}
        >
          <ExitToAppIcon />
        </IconButton>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width="90%"
          maxWidth="400px"
          bgcolor={theme.modalBg}
          border={`2px solid ${theme.borderColor}`}
          boxShadow={24}
          p={2}
          display="flex"
          flexDirection="column"
          gap={2}
          sx={{
            transform: 'translate(-50%, -50%)',
            overflowY: 'auto',
            borderRadius: '8px',
            transition: 'all 0.3s ease-in-out'
          }}
        >
          <Stack width="100%" direction="row" spacing={1}>
            <TextField
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              sx={{
                backgroundColor: '#ffffff',
                borderColor: "#fff",
                color: theme.borderColor,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: theme.textFieldBorder,
                    color: theme.borderColor,
                  },
                  '&:hover fieldset': {
                    borderColor: theme.textFieldBorder,
                    color: theme.borderColor,
                  },
                },
                input: { color: theme.textFieldColor, fontFamily: "PT Sans, sans-serif" }
              }}
            />
            <Button
              variant="contained"
              onClick={() => {
                addItem(itemName)
                setItemName('')
                handleClose()
              }}
              sx={{
                backgroundColor: "#fff",
                color: theme.textFieldColor,
                fontFamily: "PT Sans, sans-serif",
                '&:hover': {
                  backgroundColor: "#fff",
                  color: theme.textFieldColor,
                  transform: 'scale(1.05)',
                  transition: 'transform 0.2s ease-in-out'
                }
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Box
        border={`1px solid transparent`}
        bgcolor={theme.backgroundColor}
        width="100%"
        maxWidth="800px"
        p={2}
        sx={{ marginTop: 5, overflow: 'auto', boxSizing: 'border-box', borderRadius: '8px' }}
      >
        <Box
          width="100%"
          height="60px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderBottom={`1px solid ${theme.buttonColor}`}
          sx={{ borderRadius: '8px 8px 0 0' }}
        >
          <Typography variant="h4" color={theme.textColor} sx={{ fontFamily: "PT Sans, sans-serif", textAlign: 'center' }}>My Pantry</Typography>
        </Box>
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
            marginBottom: 2,
            marginTop: 2,
            backgroundColor: theme.buttonColor,
            color: theme.backgroundColor,
            fontFamily: "PT Sans, sans-serif",
            width: '100%',
            '&:hover': {
              backgroundColor: theme.buttonColor,
              opacity: 0.8,
              transform: 'scale(1.05)',
              transition: 'transform 0.2s ease-in-out'
            }
          }}
        >
          Add Item
        </Button>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            marginBottom: 2,
            backgroundColor: '#ffffff',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: theme.textFieldBorder,
              },
              '&:hover fieldset': {
                borderColor: theme.textFieldBorder,
              },
            },
            input: { color: theme.textFieldColor, fontFamily: "PT Sans, sans-serif" }
          }}
        />
        {inventory.length === 0 ? (
          <Typography
          variant="h6"
          color={theme.textColor}
          sx={{ fontFamily: "PT Sans, sans-serif", textAlign: 'center', color: theme.textColor, opacity: 0.6 }}
        >
          Your pantry is empty. Let's go grocery shopping!
        </Typography>
        ) : (
          filteredInventory.map(({ name, quantity }) => (
            <Box
              key={name}
              width="100%"
              minHeight="60px"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              padding={2}
              border={`1px solid ${theme.borderColor}`}
              sx={{
                boxSizing: 'border-box',
                borderRadius: '8px',
                boxShadow: darkMode ? '0 4px 8px rgba(255, 255, 255, 0.2)' : '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'box-shadow 0.3s ease-in-out',
                marginBottom: 2, // Increased spacing between items
                '&:hover': {
                  boxShadow: darkMode ? '0 8px 16px rgba(255, 255, 255, 0.3)' : '0 8px 16px rgba(0, 0, 0, 0.2)',
                }
              }}
            >
              <Typography variant="h5" color={theme.textColor} sx={{ flex: 1, textAlign: 'left', fontFamily: "PT Sans, sans-serif" }}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Button
                  variant="text"
                  onClick={() => addItem(name)}
                  sx={{
                    color: theme.textColor,
                    fontFamily: "PT Sans, sans-serif",
                    padding: 0,
                    '&:hover': {
                      color: theme.textColor,
                      backgroundColor: darkMode ? '#022530' : '#c777bc',
                      transform: 'scale(1.1)',
                      transition: 'transform 0.2s ease-in-out'
                    }
                  }}
                >
                  +
                </Button>
                <Typography variant="h5" color={theme.textColor} sx={{ textAlign: 'center', fontFamily: "PT Sans, sans-serif" }}>
                  {quantity}
                </Typography>
                <Button
                  variant="text"
                  onClick={() => removeItem(name)}
                  sx={{
                    color: theme.textColor,
                    fontFamily: "PT Sans, sans-serif",
                    padding: 0,
                    '&:hover': {
                      color: theme.textColor,
                      backgroundColor: darkMode ? '#022530' : '#c777bc',
                      transform: 'scale(1.1)',
                      transition: 'transform 0.2s ease-in-out'
                    }
                  }}
                >
                  -
                </Button>
              </Stack>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}
