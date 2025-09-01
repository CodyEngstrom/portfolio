
interface Fact {
    icon: string,
    title: string,
    description: string
}

interface FunFactProps {
    fact: Fact
}

export function FunFact({fact}: FunFactProps) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
      <span className="text-2xl">{fact.icon}</span>
      <div>
        <p className="font-medium text-foreground">{fact.title}</p>
        <p className="text-sm text-muted-foreground">
          {fact.description}
        </p>
      </div>
    </div>
  );
}
