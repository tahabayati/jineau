import { getTranslations } from "next-intl/server"
import Image from "next/image"
import { Link } from "@/i18n/routing"
import AuthForm from "@/components/AuthForm"

export async function generateMetadata({ params }) {
  const { locale } = await params
  const titles = { en: "Login", fr: "Connexion", fa: "ورود" }
  return { title: titles[locale] || titles.en }
}

export default async function LoginPage() {
  const t = await getTranslations("auth")

  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-24 py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-brand-mist/20 via-white to-brand-gold/10">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-white rounded-full shadow-lg">
              <Image
                src="/jineau-home-images/account_marmot_icon.webp"
                alt="Jineau account mascot"
                width={80}
                height={80}
                className="w-20 h-20 object-contain"
                priority
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            {t("welcomeBack")}
          </h1>
          <p className="mt-2 text-gray-600">
            {t("signInSubtitle")}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <AuthForm mode="login" />
        </div>

        <p className="text-center text-gray-600">
          {t("noAccount")}{" "}
          <Link href="/register" className="text-brand-primary font-medium hover:underline">
            {t("createOne")}
          </Link>
        </p>
      </div>
    </div>
  )
}
