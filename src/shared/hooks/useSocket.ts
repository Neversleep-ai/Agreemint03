"use client"

import { useEffect, useRef, useCallback } from "react"
import { io, type Socket } from "socket.io-client"
import { tokenStorage } from "../services/storage/tokenStorage"

interface UseSocketOptions {
  autoConnect?: boolean
  onConnect?: () => void
  onDisconnect?: (reason: string) => void
  onError?: (error: Error) => void
}

export function useSocket(options: UseSocketOptions = {}) {
  const socketRef = useRef<Socket | null>(null)

  const connect = useCallback(() => {
    const token = tokenStorage.getToken()
    if (!token) return

    socketRef.current = io(import.meta.env.VITE_SOCKET_URL || "ws://localhost:8080", {
      auth: { token },
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })

    // Setup event handlers
    socketRef.current.on("connect", () => {
      console.log("Socket connected")
      options.onConnect?.()
    })

    socketRef.current.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason)
      options.onDisconnect?.(reason)
    })

    socketRef.current.on("connect_error", (error) => {
      console.error("Socket connection error:", error)
      options.onError?.(error)
    })
  }, [options])

  const disconnect = useCallback(() => {
    socketRef.current?.disconnect()
    socketRef.current = null
  }, [])

  const emit = useCallback((event: string, data?: any) => {
    socketRef.current?.emit(event, data)
  }, [])

  const on = useCallback((event: string, callback: (...args: any[]) => void) => {
    socketRef.current?.on(event, callback)

    // Return cleanup function
    return () => {
      socketRef.current?.off(event, callback)
    }
  }, [])

  useEffect(() => {
    if (options.autoConnect) {
      connect()
    }

    return disconnect
  }, [connect, disconnect, options.autoConnect])

  return {
    socket: socketRef.current,
    connect,
    disconnect,
    emit,
    on,
    isConnected: socketRef.current?.connected ?? false,
  }
}
