'use client'

import { useState } from 'react'
import { ArrowRight, Mail } from 'lucide-react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/emails/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setSuccess(true)
        setEmail('')
        setTimeout(() => setSuccess(false), 3000)
      }
    } catch (error) {
      console.error('Subscribe error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Moka Yakoubi</h1>
          <div className="space-x-6">
            <a href="#about" className="text-sm hover:text-gray-600">About</a>
            <a href="#courses" className="text-sm hover:text-gray-600">Courses</a>
            <a href="#blog" className="text-sm hover:text-gray-600">Blog</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center animate-fade-in">
          {/* Profile Image */}
          <div className="mb-8 flex justify-center">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-black to-gray-800 flex items-center justify-center text-white text-6xl font-bold">
              MK
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
            I help entrepreneurs build <span className="text-yellow-500">$1M+ businesses</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Using AI automation, atomic habits, and proven business frameworks. 
            Founder of Caractère Store, InvoiceDZ, and content creator with 183K followers.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2">
              Lancez votre marque
              <ArrowRight size={20} />
            </button>
            <button className="border-2 border-black px-8 py-4 rounded-lg font-semibold hover:bg-black hover:text-white transition">
              Habillez votre entreprise
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mb-16">
            <div>
              <p className="text-3xl font-bold">184</p>
              <p className="text-gray-600">Posts</p>
            </div>
            <div>
              <p className="text-3xl font-bold">183K</p>
              <p className="text-gray-600">Followers</p>
            </div>
            <div>
              <p className="text-3xl font-bold">$1M+</p>
              <p className="text-gray-600">Revenue</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Get Weekly Insights</h2>
          <p className="text-gray-300 mb-8">
            Join 5K+ entrepreneurs getting actionable strategies on AI, business growth, and building habits.
          </p>

          <form onSubmit={handleSubscribe} className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <Mail className="absolute right-3 top-3 text-gray-400" size={20} />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition disabled:opacity-50"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>

          {success && (
            <p className="text-green-400 mt-4">✓ Successfully subscribed!</p>
          )}
        </div>
      </section>

      {/* Featured Content Preview */}
      <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <article key={i} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
              <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Article Title {i}</h3>
                <p className="text-gray-600 mb-4">Brief description of the article content...</p>
                <a href="#" className="text-black font-semibold hover:text-yellow-500 transition">
                  Read More →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="mb-4">© 2024 Moka Yakoubi. All rights reserved.</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="hover:text-yellow-500">Instagram</a>
            <a href="#" className="hover:text-yellow-500">Twitter</a>
            <a href="#" className="hover:text-yellow-500">LinkedIn</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
