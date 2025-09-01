"use client";

import { contactLinks, skills } from "@/lib/constants";
import type React from "react";
import { useState, useEffect, useRef, type JSX } from "react";
import projects from "@/public/projects/projects.json";
import Image from "next/image";

export function InteractiveTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<
    Array<{ command: string; output: string | JSX.Element }>
  >([
    {
      command: "start",
      output:
        "💻 Welcome! Try typing commands like 'help', 'cat', 'projects', or 'play' to get started.",
    },
    { command: "whoami", output: "software_engineer" },
    {
      command: "ls -la skills/",
      output: `drwxr-xr-x  ${skills.join(" • ")}`,
    },
  ]);
  const [currentTheme, setCurrentTheme] = useState<
    "mac" | "windows" | "ubuntu"
  >("mac");
  const [isPlaying, setIsPlaying] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  const commands = {
    start:
      "💻 Welcome! Try typing commands like help, cat, skills, projects, contact, clear, whoami, play, stop, theme [mac/windows/ubuntu]",
    help: "Available commands: start, help, cat, skills, projects, contact, clear, whoami, play, stop, theme [mac/windows/ubuntu]",
    // about:
    //   "Passionate software developer crafting innovative solutions with artistic flair.",
    skills: skills.join(" • "),
    projects: projects
      .filter((project) => project.featured === true)
      .map((project) => project.title)
      .join(" • "),
    contact: `Email: ${contactLinks.email} | LinkedIn: ${contactLinks.linkedin}`,
    clear: "CLEAR",
    whoami: "software_engineer",
    // ls: "about.txt  skills.json  projects/  contact.md  music/",
    cat: "CAT_IMAGE", // Special marker for cat command
    play: "PLAY_MUSIC", // Special marker for play command
    stop: "STOP_MUSIC", // Special marker for stop command
  };

  const lofiStreams = [
    { name: "Lofi Girl - beats to relax/study to", videoId: "jfKfPfyJRdk" },
    { name: "Lofi Girl - beats to sleep/chill to", videoId: "rUxyKA_-grg" },
    { name: "ChillHop Music - lofi hip hop radio", videoId: "7NOSDKb0HlU" },
  ];

  const themes = {
    mac: {
      bg: "bg-gray-800/95",
      border: "border-gray-600/50",
      text: "text-green-400",
      secondary: "text-gray-300",
      prompt: "text-gray-400",
      controls: ["bg-red-500", "bg-yellow-500", "bg-green-500"],
      title: "Terminal — zsh — 80×24",
      titleBar: "bg-gray-700/90",
      titleText: "text-gray-200",
    },
    windows: {
      bg: "bg-gray-900/95",
      border: "border-gray-500/50",
      text: "text-white",
      secondary: "text-gray-300",
      prompt: "text-blue-400",
      controls: ["bg-transparent", "bg-transparent", "bg-red-600"],
      title: "Command Prompt",
      titleBar: "bg-gray-800/90",
      titleText: "text-white",
    },
    ubuntu: {
      bg: "bg-[#300a24]",
      border: "border-[#222222]",
      text: "text-white",
      secondary: "text-purple-100",
      prompt: "text-[#84c72f]",
      controls: ["bg-orange-500", "bg-orange-400", "bg-red-500"],
      title: "developer@ubuntu: ~",
      titleBar: "bg-[#222222]",
      titleText: "text-white",
    },
  };

  const theme = themes[currentTheme];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const command = input.toLowerCase().trim();

    if (command.startsWith("theme ")) {
      const newTheme = command.split(" ")[1] as "mac" | "windows" | "ubuntu";
      if (themes[newTheme]) {
        setCurrentTheme(newTheme);
        setHistory((prev) => [
          ...prev,
          { command: input, output: `Theme switched to ${newTheme}` },
        ]);
      } else {
        setHistory((prev) => [
          ...prev,
          {
            command: input,
            output: `Invalid theme. Available: mac, windows, ubuntu`,
          },
        ]);
      }
      setInput("");
      return;
    }

    if (command === "cat") {
      try {
        const response = await fetch(
          "https://api.thecatapi.com/v1/images/search"
        );
        const data = await response.json();
        const catImageUrl = data[0]?.url;

        if (catImageUrl) {
          const catOutput = (
            <div className="space-y-2">
              <div>🐱 Random cat incoming...</div>
              <div className="relative w-full h-32 max-w-full">
                <Image
                  src={catImageUrl || "/placeholder.svg"}
                  alt="Random cat"
                  fill
                  className="object-contain object-left rounded border border-current/20"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextElementSibling!.textContent =
                      "😿 Failed to load cat image";
                  }}
                />
              </div>
            </div>
          );
          setHistory((prev) => [
            ...prev,
            { command: input, output: catOutput },
          ]);
        } else {
          setHistory((prev) => [
            ...prev,
            { command: input, output: "😿 No cats found. Try again!" },
          ]);
        }
      } catch {
        setHistory((prev) => [
          ...prev,
          {
            command: input,
            output: "😿 Cat API is sleeping. Try again later!",
          },
        ]);
      }
      setInput("");
      return;
    }

    if (command === "play") {
      if (isPlaying) {
        setHistory((prev) => [
          ...prev,
          {
            command: input,
            output:
              "🎵 Music is already playing! Use 'stop' to stop current track.",
          },
        ]);
      } else {
        const randomStream =
          lofiStreams[Math.floor(Math.random() * lofiStreams.length)];

        const musicOutput = (
          <div className="space-y-3">
            <div>🎵 Now playing: {randomStream.name}</div>
            <div className="border border-current/20 rounded overflow-hidden">
              <iframe
                width="100%"
                height="200"
                src={`https://www.youtube.com/embed/${randomStream.videoId}?autoplay=1&loop=1&playlist=${randomStream.videoId}&controls=1&modestbranding=1`}
                title={randomStream.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full"
              />
            </div>
            <div className="text-xs opacity-75">
              ♪ Use &apos;stop&apos; to remove player
            </div>
          </div>
        );

        setIsPlaying(true);
        setHistory((prev) => [
          ...prev,
          { command: input, output: musicOutput },
        ]);
      }
      setInput("");
      return;
    }

    if (command === "stop") {
      if (isPlaying) {
        setIsPlaying(false);
        setHistory((prev) =>
          prev.filter((entry) => {
            if (typeof entry.output !== "string") {
              const hasYouTubeIframe = JSON.stringify(entry.output).includes(
                "youtube.com/embed"
              );
              return !hasYouTubeIframe;
            }
            return true;
          })
        );
        setHistory((prev) => [
          ...prev,
          { command: input, output: "🎵 Music stopped and player removed." },
        ]);
      } else {
        setHistory((prev) => [
          ...prev,
          { command: input, output: "🎵 No music is currently playing." },
        ]);
      }
      setInput("");
      return;
    }

    const output =
      commands[command as keyof typeof commands] ||
      `Command not found: ${command}. Type 'help' for available commands.`;

    if (command === "clear") {
      setHistory([]);
      setIsPlaying(false);
    } else {
      setHistory((prev) => [...prev, { command: input, output }]);
    }

    setInput("");
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [history]);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div
      className={`${theme.bg} backdrop-blur-sm border ${theme.border} rounded-lg overflow-hidden font-mono text-sm max-w-2xl mx-auto shadow-2xl`}
    >
      <div
        className={`${theme.titleBar} px-4 py-2 flex items-center justify-between border-b border-gray-600/30`}
      >
        <div className="flex items-center gap-2">
          {currentTheme === "mac" && (
            <>
              <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 cursor-pointer"></div>
            </>
          )}
          {currentTheme === "ubuntu" && (
            <>
              <div className="w-3 h-3 rounded-full bg-orange-500 hover:bg-orange-400 cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-orange-400 hover:bg-orange-300 cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer"></div>
            </>
          )}
        </div>

        <div
          className={`${theme.titleText} text-sm font-medium flex-1 text-center`}
        >
          {theme.title}
        </div>

        {currentTheme === "windows" && (
          <div className="flex items-center gap-1">
            <button className="w-6 h-6 hover:bg-gray-600 flex items-center justify-center text-white text-xs">
              −
            </button>
            <button className="w-6 h-6 hover:bg-gray-600 flex items-center justify-center text-white text-xs">
              □
            </button>
            <button className="w-6 h-6 hover:bg-red-600 flex items-center justify-center text-white text-xs">
              ×
            </button>
          </div>
        )}

        <div className="flex gap-1">
          {Object.keys(themes).map((themeName) => (
            <button
              key={themeName}
              onClick={() =>
                setCurrentTheme(themeName as "mac" | "windows" | "ubuntu")
              }
              className={`px-2 py-1 text-xs rounded ${
                currentTheme === themeName
                  ? `${theme.titleText} bg-white/20`
                  : `${theme.titleText} opacity-60 hover:bg-white/10`
              } transition-colors`}
            >
              {themeName}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        <div
          ref={historyRef}
          className={`space-y-2 mb-4 max-h-64 overflow-y-auto terminal-scrollbar-${currentTheme}`}
          style={{
            scrollbarWidth: "thin",
            scrollbarColor:
              currentTheme === "mac"
                ? "#10b981 #374151"
                : currentTheme === "windows"
                ? "#3b82f6 #1f2937"
                : "#f97316 #222222",
          }}
        >
          {history.map((entry, index) => (
            <div key={index}>
              <div className={theme.text}>
                <span className={theme.prompt}>
                  {currentTheme === "windows" ? "C:\\>" : "$"}
                </span>{" "}
                {entry.command}
              </div>
              <div className={`${theme.secondary} ml-2`}>
                {typeof entry.output === "string" ? entry.output : entry.output}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex items-center">
          <span className={`${theme.prompt} mr-2`}>
            {currentTheme === "windows" ? "C:\\>" : "$"}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={`bg-transparent ${theme.text} outline-none flex-1 caret-current`}
            placeholder="Type 'help' for commands..."
            autoComplete="off"
          />
          <span className={`${theme.text} animate-pulse`}>|</span>
        </form>
      </div>

      <style jsx>{`
        .terminal-scrollbar-mac::-webkit-scrollbar {
          width: 8px;
        }
        .terminal-scrollbar-mac::-webkit-scrollbar-track {
          background: #374151;
          border-radius: 4px;
        }
        .terminal-scrollbar-mac::-webkit-scrollbar-thumb {
          background: #10b981;
          border-radius: 4px;
        }
        .terminal-scrollbar-mac::-webkit-scrollbar-thumb:hover {
          background: #059669;
        }

        .terminal-scrollbar-windows::-webkit-scrollbar {
          width: 8px;
        }
        .terminal-scrollbar-windows::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 4px;
        }
        .terminal-scrollbar-windows::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 4px;
        }
        .terminal-scrollbar-windows::-webkit-scrollbar-thumb:hover {
          background: #2563eb;
        }

        .terminal-scrollbar-ubuntu::-webkit-scrollbar {
          width: 8px;
        }
        .terminal-scrollbar-ubuntu::-webkit-scrollbar-track {
          background: #581c87;
          border-radius: 4px;
        }
        .terminal-scrollbar-ubuntu::-webkit-scrollbar-thumb {
          background: #f97316;
          border-radius: 4px;
        }
        .terminal-scrollbar-ubuntu::-webkit-scrollbar-thumb:hover {
          background: #ea580c;
        }
      `}</style>
    </div>
  );
}
