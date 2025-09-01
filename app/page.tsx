"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InteractiveTerminal } from "@/components/interactive-terminal";
import { AnimatedBlobs } from "@/components/animated-blobs";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import projects from "@/public/projects/projects.json";
import { ProjectCard } from "@/components/project-card";
import { ConnectSection } from "@/components/connect";
import { FunFact } from "@/components/fun-fact";
import { Footer } from "@/components/footer";
import { MainNav } from "@/components/main-nav";

import { skills, funFacts } from "@/lib/constants";

export default function HomePage() {
  const blobsRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const headerHeight = 80; // Account for fixed header
      const elementPosition = element.offsetTop - headerHeight;

      const startPosition = window.pageYOffset;
      const distance = elementPosition - startPosition;
      const duration = 600; // Faster animation (was using browser default ~1000ms)
      let start: number | null = null;

      function animation(currentTime: number) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      }

      // Easing function for smooth animation
      function ease(t: number, b: number, c: number, d: number) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      }

      requestAnimationFrame(animation);
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Header */}
      <MainNav />

      {/* Hero Section */}
      <section className="flex items-center relative pt-[calc(theme(spacing.16))] md:pt-0 min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-80px)]">
        <div ref={blobsRef} className="fixed inset-0 pointer-events-none z-0">
          <AnimatedBlobs />
        </div>

        <div className="container mx-auto px-4">
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Left side - Main content */}
            <div
              className={`space-y-8 transition-all duration-1200 delay-200 ${
                isLoaded
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <div>
                <h2 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
                  Always Learning
                </h2>
                <p className="text-xl text-foreground/60 mb-8">
                  Software engineer with a focus on writing clear, dependable code and growing with every project.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  variant="accent"
                  className="btn-glow"
                  onClick={() => smoothScrollTo("projects")}
                >
                  View My Work
                </Button>

                <Button
                  size="lg"
                  className="btn-glow"
                  onClick={() => smoothScrollTo("contact")}
                >
                  Get In Touch
                </Button>
              </div>
            </div>

            {/* Right side - Interactive Terminal */}
            <div
              className={`relative z-10 transition-all duration-1200 delay-400 ${
                isLoaded
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <InteractiveTerminal />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <div className="section-divider"></div>
      <section
        id="about"
        className="container mx-auto px-4 py-16 section-separator"
      >
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-serif font-bold text-foreground text-center mb-12">
            About Me
          </h3>

          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}
          >
            {/* Left side - Profile and intro */}
            <div className="space-y-6">
              <div className="relative">
                <div className="w-48 h-48 mx-auto lg:mx-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center grainy-texture">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <span className="text-6xl">🐱</span>
                  </div>
                </div>
              </div>

              <div className="text-center lg:text-left">
                <h4 className="text-2xl font-serif font-bold text-foreground mb-2">
                  Software Engineer
                </h4>
                <p className="text-primary font-medium mb-4">
                  Building reliable software, with cats as my QA team 🐾
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  I&apos;m a software engineer who enjoys writing code that&apos;s clear,
                  dependable, and a pleasure to work with. My background as a QA
                  Engineer has given me a strong appreciation for the entire
                  engineering process—from design and implementation to testing
                  and long-term maintainability. I&apos;m always eager to learn new
                  technologies, explore different ways to solve problems, and
                  grow a little with each project I take on. When I&apos;m not
                  coding, I&apos;m usually sharing my desk with my cats—who like to
                  think they&apos;re part of the development team.
                </p>
              </div>
            </div>

            {/* Fun facts with less cat focus */}
            <div className="space-y-8">
              <div>
                <h5 className="text-lg font-serif font-semibold text-foreground mb-4">
                  Fun Facts About Me
                </h5>
                <div className="space-y-4">
                  {funFacts.map((fact) => (
                    <FunFact fact={fact} key={fact.title} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Technology stack */}
          <div className="mt-12 text-center">
            <h5 className="text-lg font-serif font-semibold text-foreground mb-6">
              Technologies I Love Working With
            </h5>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="text-sm px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <div className="section-divider"></div>
      <section
        id="projects"
        className="container mx-auto px-4 py-16 section-separator"
      >
        <div className="max-w-6xl mx-auto">
          <Link href="/projects" className="group">
            <div className="text-center mb-12 relative">
              <h3 className="text-3xl font-serif font-bold text-foreground group-hover:text-primary transition-colors cursor-pointer">
                Featured Projects
              </h3>
              <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 translate-x-32 text-sm font-normal text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                → View All
              </span>
            </div>
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects
              .filter((project) => project.featured === true)
              .map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
          </div>
          <div className="text-center mt-8">
            <Button size="lg" variant="accent" asChild className="btn-glow">
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <div className="section-divider"></div>
      <section
        id="contact"
        className="container mx-auto px-4 py-16 section-separator"
      >
        <ConnectSection />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
