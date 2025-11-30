import Link from "next/link"
import AuthForm from "@/components/AuthForm"
import MarmotMascot from "@/components/MarmotMascot"

export const metadata = {
  title: "Create Account",
  description: "Create a Jineau account to start your microgreens subscription.",
}

export default function RegisterPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <MarmotMascot size="lg" className="mx-auto" />
          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Create your account
          </h1>
          <p className="mt-2 text-gray-600">
            Join Jineau and start your fresh microgreens journey
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <AuthForm mode="register" />
        </div>

        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-brand-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

