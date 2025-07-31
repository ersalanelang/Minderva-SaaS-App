import Image from 'next/image'
import Link from 'next/link'
import { SignInButton, SignedIn, SignedOut} from '@clerk/nextjs'
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, BookOpen, MessageCircle, Users, Zap } from 'lucide-react'
import { redirect } from 'next/navigation'

const Page = async () => {
  // Redirect authenticated users to dashboard
  const user = await currentUser()
  
  if (user) {
    redirect('/home')
  }
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Backed by Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 px-4 py-2 rounded-full text-sm text-orange-700 dark:text-orange-300 mb-8">
            <div className="w-6 h-6 bg-orange-500 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold">Y</span>
            </div>
            Powered by AI Technology
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            An AI tutor made for{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              you
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Turns your learning materials into notes, interactive chats, quizzes, and more
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <div
              className="px-8 py-4 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 flex items-center gap-2"
            >
              See features
              <ArrowRight className="w-5 h-5" />
            </div> 
            
            <SignedOut>
              <SignInButton>
                <button className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black text-lg font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Get Started
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <Link 
                href="/home"
                className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black text-lg font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Go to Dashboard
              </Link>
            </SignedIn>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-3 text-gray-600 dark:text-gray-400">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">C</div>
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">G</div>
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold">A</div>
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">M</div>
            </div>
            <span className="text-lg">Loved by 1,000,000+ learners</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Minderva?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Experience personalized AI-powered learning that adapts to your pace and style
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
              <MessageCircle className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Interactive Chat
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Engage with AI companions that understand your learning style and provide personalized guidance
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-6">
              <BookOpen className="w-7 h-7 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Smart Notes
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Transform your learning materials into organized, searchable notes automatically
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-6">
              <Zap className="w-7 h-7 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Quick Quizzes
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Test your knowledge with AI-generated quizzes tailored to your learning progress
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mb-6">
              <Users className="w-7 h-7 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              AI Companions
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Choose from various AI companions, each specialized in different subjects and teaching styles
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join millions of learners who are already experiencing personalized AI education
          </p>
          
          <SignedOut>
            <SignInButton>
              <button className="px-8 py-4 bg-white text-blue-600 text-lg font-medium rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Start Learning Now
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Link 
              href="/home"
              className="inline-block px-8 py-4 bg-white text-blue-600 text-lg font-medium rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Go to Dashboard
            </Link>
          </SignedIn>
        </div>
      </section>
    </main>
  )
}

export default Page