/**
 * Die Schlussfrage. „What", „can" und „I" tragen dieselben drei Farben wie die
 * Türwörter im Hero — dieselbe Frage, in derselben Zuordnung: What → Gold,
 * can → Mint, I → Violett. Der Rest der Frage bleibt hell.
 *
 * Als Bauteil, weil sie auf der Projektseite und im About steht und beide
 * Stellen sonst auseinanderlaufen, sobald eine angefasst wird.
 */
export default function ClosingQuestion({ className = "t-h2" }: { className?: string }) {
  return (
    <p className={className}>
      <span className="block">
        <span style={{ color: "var(--dh-what)" }}>What</span>{" "}
        <span style={{ color: "var(--dh-can)" }}>can</span>{" "}
        <span style={{ color: "var(--dh-i)" }}>I</span>
      </span>
      <span className="block">get out of</span>
      <span className="block">your way?</span>
    </p>
  );
}
