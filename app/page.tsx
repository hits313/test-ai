'use client'

import { useState, useEffect, useRef } from 'react'
import { useChat } from 'ai/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Moon, Sun, Send, Trash, Settings } from 'lucide-react'
import { useTheme } from "next-themes"
import ChatMessage from '@/components/ChatMessage'
import SettingsDialog from '@/components/SettingsDialog'

export default function Chat() {
  const { theme, setTheme } = useTheme()
  const { messages, input, handleInputChange, handleSubmit, setMessages, isLoading } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(e)
  }

  const clearChat = () => {
    setMessages([])
  }

  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-full max-w-5xl mx-auto">
        <header className="flex justify-between items-center p-4 border-b">
          <h1 className="text-2xl font-bold">Cybercook-o1</h1>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="icon" onClick={() => setIsSettingsOpen(true)}>
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={clearChat}>
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map((message, i) => (
            <ChatMessage key={i} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 border-t">
          <form onSubmit={onSubmit} className="flex space-x-2">
            <Textarea
              value={input}
              onChange={handleInputChange}
              placeholder="Ask Cybercook-o1 about cybersecurity..."
              className="flex-grow resize-none"
              rows={1}
            />
            <Button type="submit" disabled={isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
      <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
    </div>
  )
}