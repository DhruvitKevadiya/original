type CaseArtProps = {
  index: number;
  className?: string;
};

const caseImages = [
  "/case-png/case-0.png",
  "/case-png/case-1.png",
  "/case-png/case-2.png",
  "/case-png/case-3.png",
  "/case-png/case-4.png",
];

export function CaseArt({ index, className = "" }: CaseArtProps) {
  const image = caseImages[index % caseImages.length];

  return (
    <div className={`case-sprite ${className}`} aria-hidden="true">
      <img src={image} alt="" />
    </div>
  );
}
