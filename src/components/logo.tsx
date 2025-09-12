import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <Image src="/nextheus-icon.svg" alt="Logo" width={32} height={32} />
      <span className="text-xl font-bold text-primary">Nextheus</span>
    </div>
  );
}
