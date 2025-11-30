import Link from "next/link"
import AuthForm from "@/components/AuthForm"
import MarmotMascot from "@/components/MarmotMascot"

export const metadata = {
  title: "Login",
  description: "Sign in to your Jineau account to manage your subscription and orders.",
}

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <MarmotMascot size="lg" className="mx-auto" />
          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome back
          </h1>
          <p className="mt-2 text-gray-600">
            Sign in to manage your subscriptions and orders
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <AuthForm mode="login" />
        </div>

        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <Link href="/register" className="text-brand-primary font-medium hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}

