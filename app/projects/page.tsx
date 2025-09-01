"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Github,
  ExternalLink,
  Search,
  Calendar,
  Code,
  Star,
} from "lucide-react";
import { MainNav } from "@/components/main-nav";

import projects from "@/public/projects/projects.json";
import { ProjectCard } from "@/components/project-card";
import { Footer } from "@/components/footer";
import Link from "next/link";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(projects.flatMap((p) => p.category))),
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tech.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "All" ||
        project.category.includes(selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const featuredProjects = projects.filter((p) => p.featured);
  console.log(featuredProjects);
  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      <MainNav />

      <div className="section-divider"></div>
      <div className="pt-20 section-separator">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-80 space-y-6">
              {/* Search */}
              <Card className="card-texture">
                <CardHeader>
                  <CardTitle className="text-lg font-serif flex items-center gap-2 text-foreground">
                    <Search className="w-5 h-5" />
                    Search Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="Search by title, description, or tech..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-muted border-border"
                  />
                </CardContent>
              </Card>

              {/* Categories */}
              <Card className="card-texture">
                <CardHeader>
                  <CardTitle className="text-lg font-serif text-foreground">
                    Categories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                          selectedCategory === category
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {category}
                        <span className="float-right text-sm">
                          {category === "All"
                            ? projects.length
                            : projects.filter((p) =>
                                p.category.includes(category)
                              ).length}
                        </span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Featured Projects */}
              <Card className="card-texture">
                <CardHeader>
                  <CardTitle className="text-lg font-serif flex items-center gap-2 text-foreground">
                    <Star className="w-5 h-5" />
                    Featured
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {featuredProjects.slice(0, 3).map((project, index) => (
                      <div key={index} className="text-sm">
                        <Link
                          href={project.github}
                          target="_blank"
                          className="font-medium text-foreground hover:text-primary cursor-pointer"
                        >
                          {project.title}
                        </Link>
                        <p className="text-muted-foreground text-xs mt-1">
                          {project.category.join(" | ")} • {project.date}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Projects */}
              <Card className="card-texture">
                <CardHeader>
                  <CardTitle className="text-lg font-serif flex items-center gap-2 text-foreground">
                    <Calendar className="w-5 h-5" />
                    Recent
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentProjects.map((project, index) => (
                      <div key={index} className="text-sm">
                        <Link
                          href={project.github}
                          target="_blank"
                          className="font-medium text-foreground hover:text-primary cursor-pointer"
                        >
                          {project.title}
                        </Link>
                        <p className="text-muted-foreground text-xs mt-1">
                          {project.category.join(" | ")} • {project.date}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              <div className="mb-8">
                <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
                  All Projects
                </h2>
                <p className="text-muted-foreground">
                  {filteredProjects.length} project
                  {filteredProjects.length !== 1 ? "s" : ""} found
                  {searchQuery && ` for "${searchQuery}"`}
                  {selectedCategory !== "All" && ` in ${selectedCategory}`}
                </p>
              </div>

              {filteredProjects.length === 0 ? (
                <Card className="card-texture">
                  <CardContent className="text-center py-12">
                    <Code className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      No projects found
                    </h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search terms or category filter.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredProjects.length === 0 ? (
                    <ProjectCard project={null} />
                  ) : (
                    filteredProjects.map((project, index) => (
                      <ProjectCard key={index} project={project} />
                    ))
                  )}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      <div className="section-divider"></div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
