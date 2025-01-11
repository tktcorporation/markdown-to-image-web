import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast"
import { useToast } from "../../hooks/useToast"
import { Copy, Check, AlertTriangle } from "lucide-react"
import { useState } from "react"

export function Toaster() {
  const { toasts } = useToast()
  const [copiedToasts, setCopiedToasts] = useState<Set<string>>(new Set())

  const handleCopyError = async (toastId: string, description: string) => {
    try {
      await navigator.clipboard.writeText(description)
      setCopiedToasts(prev => new Set([...prev, toastId]))
      setTimeout(() => {
        setCopiedToasts(prev => {
          const newSet = new Set(prev)
          newSet.delete(toastId)
          return newSet
        })
      }, 2000)
    } catch (error) {
      console.error('Failed to copy error message:', error)
    }
  }

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, variant, action, ...props }) {
        const isDestructive = variant === 'destructive'
        const isIOSClipboardError = variant === 'ios-clipboard-error'
        const isCopied = copiedToasts.has(id)

        return (
          <Toast key={id} variant={variant} {...props}>
            <div className="grid gap-1">
              <div className="flex items-center justify-between">
                {title && <ToastTitle>{title}</ToastTitle>}
                {(isDestructive || isIOSClipboardError) && description && (
                  <button
                    onClick={() => handleCopyError(id, description.toString())}
                    className="ml-2 p-1 rounded-md hover:bg-destructive/10 focus:outline-none focus:ring-2 focus:ring-destructive/20"
                  >
                    {isCopied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                )}
              </div>
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
