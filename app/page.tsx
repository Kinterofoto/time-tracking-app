import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  try {
    const { userId } = await auth();
    if (userId) {
      redirect("/dashboard");
    }
  } catch {
    // Clerk not configured — redirect to dashboard directly
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <span className="text-sm font-medium tracking-tight">Damascus</span>
            <div className="flex items-center gap-8">
              <Link
                href="/time-clock"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Time Clock
              </Link>
              <Link
                href="/sign-in"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="text-sm bg-white text-black px-5 py-2.5 hover:bg-white/90 transition-colors"
              >
                Start free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 lg:px-8 pt-32 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-sm text-white/60 mb-8 tracking-wide uppercase">Time tracking</p>
            <h1 className="text-[72px] leading-[72px] tracking-[-0.77px] font-light mb-8">
              Control your team&apos;s time with precision
            </h1>
            <p className="text-lg text-white/60 mb-12 max-w-xl leading-relaxed">
              Facial recognition time tracking. Automatic, accurate, and effortless. No cards, no passwords, no fraud.
            </p>
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 text-base hover:bg-white/90 transition-colors group"
            >
              Get started for free
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Visual Section */}
      <section className="px-6 lg:px-8 pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-12">
            <div className="grid grid-cols-3 gap-8">
              <div className="border border-white/10 p-8">
                <div className="w-12 h-12 border border-white/20 mb-6" />
                <div className="h-1.5 bg-white/10 w-3/4 mb-3" />
                <div className="h-1.5 bg-white/10 w-1/2" />
              </div>
              <div className="border border-white/10 p-8">
                <div className="w-12 h-12 border border-white/20 mb-6" />
                <div className="h-1.5 bg-white/10 w-3/4 mb-3" />
                <div className="h-1.5 bg-white/10 w-1/2" />
              </div>
              <div className="border border-white/10 p-8">
                <div className="w-12 h-12 border border-white/20 mb-6" />
                <div className="h-1.5 bg-white/10 w-3/4 mb-3" />
                <div className="h-1.5 bg-white/10 w-1/2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="border-t border-white/10 px-6 lg:px-8 py-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-px bg-white/10">
            <div className="bg-black p-12 border-r border-b border-white/10">
              <h3 className="text-2xl mb-4 font-light tracking-tight">Facial recognition</h3>
              <p className="text-white/60 leading-relaxed">
                Clock in and out with face detection. Secure, instant, and impossible to fake.
              </p>
            </div>
            <div className="bg-black p-12 border-b border-white/10">
              <h3 className="text-2xl mb-4 font-light tracking-tight">Automatic tracking</h3>
              <p className="text-white/60 leading-relaxed">
                Hours calculated automatically. Real-time reports and precise time logs.
              </p>
            </div>
            <div className="bg-black p-12 border-r border-white/10">
              <h3 className="text-2xl mb-4 font-light tracking-tight">Team management</h3>
              <p className="text-white/60 leading-relaxed">
                Manage multiple employees, departments, and schedules from one place.
              </p>
            </div>
            <div className="bg-black p-12">
              <h3 className="text-2xl mb-4 font-light tracking-tight">Analytics</h3>
              <p className="text-white/60 leading-relaxed">
                Export reports, visualize patterns, and make data-driven decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-white/10 px-6 lg:px-8 py-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16">
            <div>
              <div className="text-6xl font-light mb-6 text-white/40">01</div>
              <h3 className="text-xl mb-3 font-light">Sign up</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Create your account in seconds. No credit card required.
              </p>
            </div>
            <div>
              <div className="text-6xl font-light mb-6 text-white/40">02</div>
              <h3 className="text-xl mb-3 font-light">Add employees</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Register your team with their data and facial photos.
              </p>
            </div>
            <div>
              <div className="text-6xl font-light mb-6 text-white/40">03</div>
              <h3 className="text-xl mb-3 font-light">Start tracking</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Your team clocks in and out using facial recognition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-white/10 px-6 lg:px-8 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-light tracking-tight mb-6">
            Ready to simplify time control?
          </h2>
          <p className="text-lg text-white/60 mb-12">
            Join companies that already trust Damascus to manage their teams.
          </p>
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 bg-white text-black px-10 py-5 text-base hover:bg-white/90 transition-colors group"
          >
            Start free now
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-sm text-white/40 mt-8">
            No credit card · Free forever · 5 minute setup
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-sm text-white/40">Damascus</span>
            <p className="text-sm text-white/40">&copy; 2026 Damascus. All rights reserved.</p>
            <div className="flex gap-8 text-sm text-white/40">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
