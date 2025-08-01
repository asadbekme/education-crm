"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, User, Eye, EyeOff, Shield, MessageSquare, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuthStore, type UserRole } from "@/stores/auth-store"
import { cn } from "@/lib/utils"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [selectedRole, setSelectedRole] = useState<UserRole>("admin") // Default to admin
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const { login, isLoading } = useAuthStore()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!username || !password || !selectedRole) {
      setError("Iltimos, barcha maydonlarni to'ldiring va rolni tanlang.")
      return
    }

    // The useAuthStore.login function will find the user based on username.
    // The selectedRole here is primarily for user guidance.
    const success = await login(username, password)

    if (success) {
      router.push("/dashboard")
    } else {
      setError("Noto'g'ri foydalanuvchi nomi, parol yoki rol kombinatsiyasi.")
    }
  }

  // Demo accounts data for display
  const demoAccounts = [
    {
      role: "admin" as UserRole,
      title: "Admin",
      username: "admin",
      password: "password",
      icon: Shield,
      color: "text-blue-600 bg-blue-50",
    },
    {
      role: "teacher" as UserRole,
      title: "Teacher",
      username: "teacher",
      password: "password",
      icon: MessageSquare,
      color: "text-green-600 bg-green-50",
    },
    {
      role: "student" as UserRole,
      title: "Student",
      username: "student",
      password: "password",
      icon: ShoppingCart,
      color: "text-purple-600 bg-purple-50",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto p-8 bg-white shadow-xl rounded-lg">
        {/* Lock Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Xush kelibsiz!</h2>
          <p className="text-gray-600">EduCRM akkauntingizga kiring</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6 mb-8">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Foydalanuvchi nomi
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="username"
                type="text"
                placeholder="Foydalanuvchi nomini kiriting"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 h-12"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Parol
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Parolni kiriting"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 h-12"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
              Rol
            </label>
            <Select
              value={selectedRole}
              onValueChange={(value: UserRole) => setSelectedRole(value)}
              disabled={isLoading}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Roliingizni tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="teacher">O'qituvchi</SelectItem>
                <SelectItem value="student">Talaba</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && <div className="text-red-600 text-sm text-center">{error}</div>}

          <Button
            type="submit"
            className="w-full h-12" // Shadcn default button style
            disabled={isLoading}
          >
            {isLoading ? "Kirilmoqda..." : "Kirish"}
          </Button>
        </form>

        {/* Demo Accounts Display */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 text-center mb-4">Demo Akkaunt Ma'lumotlari</h3>
          <div className="space-y-3">
            {demoAccounts.map((account) => (
              <Card key={account.role} className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", account.color)}>
                    <account.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{account.title}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-700">
                  <p>
                    Foydalanuvchi nomi: <span className="font-semibold">{account.username}</span>
                  </p>
                  <p>
                    Parol: <span className="font-semibold">{account.password}</span>
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
