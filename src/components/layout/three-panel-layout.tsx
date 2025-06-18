import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ThreePanelLayoutProps {
  children: [ReactNode, ReactNode, ReactNode]
  collapsed?: boolean
  className?: string
}

export function ThreePanelLayout({ children, collapsed = false, className }: ThreePanelLayoutProps) {
  const [leftPanel, centerPanel, rightPanel] = children

  return (
    <div
      className={cn(
        "h-screen grid transition-all duration-300 ease-in-out",
        collapsed ? "grid-cols-[0px_1fr_320px]" : "grid-cols-[320px_1fr_320px]",
        className,
      )}
    >
      {/* Left Panel */}
      <div
        className={cn("border-r bg-muted/30 transition-all duration-300", collapsed ? "w-0 overflow-hidden" : "w-full")}
      >
        {leftPanel}
      </div>

      {/* Center Panel */}
      <div className="flex-1 bg-background">{centerPanel}</div>

      {/* Right Panel */}
      <div className="border-l bg-muted/30 w-full">{rightPanel}</div>
    </div>
  )
}
