"use client";
import Dashboard from "@/components/dashboard";
import React, { useState, useEffect } from 'react';
import {socket} from '@/socket';
import Image from 'next/image';

export default function Page() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <>
        <Image src="/logo.png" style={{display: "block",
  margin: "auto",
  marginRight: "auto",
}} width="400" height="200"/>
        <Dashboard />
    </>
  );
}
