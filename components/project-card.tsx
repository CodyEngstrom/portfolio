import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Code, Star } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  image: string;
  category: string[];
  date: string;
  featured: boolean;
}

interface ProjectCardProps {
  project: Project | null;
}

export function ProjectCard({ project }: ProjectCardProps) {
  if (project === null) {
    return (
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
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow card-texture flex flex-col h-full">
      <div className="aspect-video overflow-hidden relative">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {project.featured && (
          <Badge variant="muted" className="absolute top-3 left-3">
            <Star className="w-3 h-3 mr-1" />
            Featured
          </Badge>
        )}
      </div>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <div className="flex gap-1 flex-wrap">
            {project.category.map((cat, i) => (
              <Badge key={i} variant="muted" className="text-xs">
                {cat}
              </Badge>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">{project.date}</span>
        </div>
        <CardTitle className="font-serif text-foreground">
          {project.title}
        </CardTitle>
        <CardDescription className="text-muted-foreground flex-1">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech) => (
            <Badge key={tech} variant="accent" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="flex gap-3">
          <Button
            size="sm"
            // variant=""
            asChild
            // className="btn-background"
          >
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <Github className="w-4 h-4 mr-2" />
              Code
            </a>
          </Button>
          <Button size="sm" variant="secondary" asChild>
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Demo
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
