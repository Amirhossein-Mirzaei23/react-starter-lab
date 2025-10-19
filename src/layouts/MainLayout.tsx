import { Outlet } from 'react-router-dom';
import NavigationBar from '../components/navigationBar';
import Header from '../components/header';
import { Box, Button, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';
import BottomSheet from '../components/ui/base-bottom-sheet';

const CustomBodyContent = () => (
  <Box>
    <Text fontWeight="bold">Custom Form</Text>
    <Input placeholder="Enter your name" mb={4} />
    <Text>This is a custom component rendered in the bottom sheet!</Text>
  </Box>
);

export default function MainLayout() {


  return (
    <div className="min-h-screen flex flex-col text-white bg-gradient-to-b from-slate-800-300 to-slate-600 max-md:!p-4">
      <Header />
      <main className="flex-1 container mx-auto !p-4">
        <Outlet />
      </main>
      <NavigationBar />
    </div>
  );
}
