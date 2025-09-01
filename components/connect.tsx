import { Button } from "@/components/ui/button";
import { contactLinks } from "@/lib/constants";
import { Github, Linkedin, Mail } from "lucide-react";


export function ConnectSection() {
    return (
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-serif font-bold text-foreground mb-8">
            Let&apos;s Connect
          </h3>
          <p className="text-lg text-muted-foreground mb-8">
            I&apos;m always interested in new opportunities and collaborations. Feel
            free to reach out if you&apos;d like to work together!
          </p>
          <div className="flex justify-center gap-6">
            <Button
              variant="accent"
              size="lg"
              asChild
              className="btn-glow"
            >
              <a href={"mailto:" + contactLinks.email}>
                <Mail className="w-5 h-5 mr-2" />
                Email
              </a>
            </Button>
            <Button
              variant="default"
              size="lg"
              asChild
              className="btn-glow"
            >
              <a
                href={contactLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn
              </a>
            </Button>

            <Button
              variant="muted"
              size="lg"
              asChild
              className="btn-glow"
            >
              <a
                href={contactLinks.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
    )
}