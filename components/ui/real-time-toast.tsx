"use client"

import { useEffect } from "react"
import { useNotifications } from "@/components/providers/notification-provider"
import { toast } from "@/hooks/use-toast"
import { CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react"

export function RealTimeToast() {
  const { notifications } = useNotifications()

  useEffect(() => {
    // Listen for new notifications and show appropriate toasts
    const latestNotification = notifications[0]

    if (latestNotification && !latestNotification.read) {
      const getIcon = () => {
        switch (latestNotification.type) {
          case "payment_completed":
            return <CheckCircle className="h-4 w-4 text-green-500" />
          case "payment_failed":
            return <XCircle className="h-4 w-4 text-red-500" />
          case "payment_pending":
            return <Clock className="h-4 w-4 text-yellow-500" />
          default:
            return <AlertCircle className="h-4 w-4 text-blue-500" />
        }
      }

      const getToastVariant = () => {
        switch (latestNotification.type) {
          case "payment_completed":
          case "registration_confirmed":
            return "default"
          case "payment_failed":
            return "destructive"
          default:
            return "default"
        }
      }

      toast({
        title: (
          <div className="flex items-center space-x-2">
            {getIcon()}
            <span>{latestNotification.title}</span>
          </div>
        ),
        description: latestNotification.message,
        duration: latestNotification.priority === "high" ? 10000 : 5000,
        variant: getToastVariant() as any,
      })
    }
  }, [notifications])

  return null // This component doesn't render anything visible
}
