import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export default function SearchInput() {
  return (
    <div className="flex w-full max-w-xs items-center border border-gray-300 rounded-lg px-2.5 py-1.5">
      <SearchIcon className="h-4 w-4 mr-2.5" />
      <Input
        type="search"
        placeholder="Buscar..."
        className="w-full border-0"
      />
    </div>
  );
}
