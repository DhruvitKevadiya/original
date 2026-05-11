type LiveItemArtProps = {
  index: number;
  className?: string;
};

export function LiveItemArt({ index, className = "" }: LiveItemArtProps) {
  const col = index % 6;
  const row = Math.floor(index / 6);

  return (
    <div className={`live-item-sprite ${className}`} aria-hidden="true">
      <img
        src="/live-item-sheet.png"
        alt=""
        style={{
          width: "600%",
          height: "200%",
          transform: `translate(-${col * 16.6667}%, -${row * 50}%)`,
        }}
      />
    </div>
  );
}
