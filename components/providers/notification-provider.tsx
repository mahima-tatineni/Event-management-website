"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { toast } from "@/hooks/use-toast"

interface Notification {
  id: string
  type:
    | "payment_completed"
    | "payment_failed"
    | "payment_pending"
    | "registration_confirmed"
    | "event_reminder"
    | "system"
  title: string
  message: string
  timestamp: string
  read: boolean
  targetUser?: string
  targetRole?: string
  data?: any
  priority: "low" | "medium" | "high"
  actionUrl?: string
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearNotifications: () => void
  isConnected: boolean
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}

interface NotificationProviderProps {
  children: React.ReactNode
  userId?: string
  userRole?: string
}

export function NotificationProvider({ children, userId, userRole }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isConnected, setIsConnected] = useState(false)

  // Load notifications from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("notifications")
    if (stored) {
      try {
        const parsedNotifications = JSON.parse(stored)
        setNotifications(parsedNotifications)
      } catch (error) {
        console.error("Error loading notifications:", error)
      }
    }
  }, [])

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications))
  }, [notifications])

  // WebSocket connection simulation using Server-Sent Events
  useEffect(() => {
    if (!userId || !userRole) return

    let eventSource: EventSource

    const connectToNotifications = () => {
      try {
        eventSource = new EventSource(`/api/websocket?userId=${userId}&userRole=${userRole}`)

        eventSource.onopen = () => {
          setIsConnected(true)
          console.log("Connected to notification service")
        }

        eventSource.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)

            if (data.type === "notification") {
              const notification: Notification = {
                id: data.id || `notif_${Date.now()}`,
                type: data.notificationType || "system",
                title: data.title,
                message: data.message,
                timestamp: data.timestamp,
                read: false,
                targetUser: data.targetUser,
                targetRole: data.targetRole,
                data: data.data,
                priority: data.priority || "medium",
                actionUrl: data.actionUrl,
              }

              setNotifications((prev) => [notification, ...prev])

              // Show toast notification
              toast({
                title: notification.title,
                description: notification.message,
                duration: notification.priority === "high" ? 10000 : 5000,
              })

              // Play notification sound for high priority
              if (notification.priority === "high") {
                try {
                  const audio = new Audio("/notification-sound.mp3")
                  audio.play().catch(() => {
                    // Ignore audio play errors (user interaction required)
                  })
                } catch (error) {
                  // Ignore audio errors
                }
              }
            }
          } catch (error) {
            console.error("Error processing notification:", error)
          }
        }

        eventSource.onerror = () => {
          setIsConnected(false)
          console.log("Notification connection lost, attempting to reconnect...")

          // Attempt to reconnect after 5 seconds
          setTimeout(() => {
            if (eventSource.readyState === EventSource.CLOSED) {
              connectToNotifications()
            }
          }, 5000)
        }
      } catch (error) {
        console.error("Error connecting to notifications:", error)
        setIsConnected(false)
      }
    }

    connectToNotifications()

    return () => {
      if (eventSource) {
        eventSource.close()
      }
    }
  }, [userId, userRole])

  const addNotification = useCallback((notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif_${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false,
    }

    setNotifications((prev) => [newNotification, ...prev])

    // Send to server for broadcasting
    fetch("/api/websocket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNotification),
    }).catch((error) => {
      console.error("Error sending notification to server:", error)
    })

    // Show toast
    toast({
      title: notification.title,
      description: notification.message,
      duration: notification.priority === "high" ? 10000 : 5000,
    })
  }, [])

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }, [])

  const clearNotifications = useCallback(() => {
    setNotifications([])
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    isConnected,
  }

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}
