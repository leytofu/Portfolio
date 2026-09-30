interface Line {
  command?: string
  output?: string[]
}

const LINES: Line[] = [
  { command: 'whoami' },
  { output: ['leytofu — developer & ML tinkerer'] },
  { command: 'cat stack.txt' },
  { output: ['TypeScript · React · Python · PyTorch · Tailwind'] },
  { command: 'ls projects/' },
  { output: ['mini-llm/  IslaSafeFrontend/'] },
]

export function Terminal() {
  return (
    <div className="border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full border border-border" />
        <span className="h-2.5 w-2.5 rounded-full border border-border" />
        <span className="h-2.5 w-2.5 rounded-full border border-border" />
        <span className="label ml-2">zsh — portfolio</span>
      </div>
      <div className="space-y-3 p-5 font-mono text-[13px] leading-relaxed">
        {LINES.map((line, i) =>
          line.command ? (
            <p key={i} className="text-foreground">
              <span className="text-muted-foreground">$ </span>
              {line.command}
            </p>
          ) : (
            <p key={i} className="text-muted-foreground">
              {line.output?.join('\n')}
            </p>
          ),
        )}
        <p className="text-foreground">
          <span className="text-muted-foreground">$ </span>
          <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-foreground" />
        </p>
      </div>
    </div>
  )
}
