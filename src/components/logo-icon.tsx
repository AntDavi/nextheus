import Image from "next/image";

export default function LogoIcon() {
  return (
    <div className="flex items-center space-x-2">
      <Image src="/nextheus-icon.svg" alt="Logo" width={50} height={50} />
    </div>
  );
}
