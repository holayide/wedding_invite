import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  if (totalItems <= itemsPerPage) return null;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const getPages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }

    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-4 select-none">
      <p className="text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-medium text-foreground">{startIndex + 1}</span> to{" "}
        <span className="font-medium text-foreground">{endIndex}</span> of{" "}
        <span className="font-medium text-foreground">{totalItems}</span> guests
      </p>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            "h-9 px-4",
            currentPage === 1
              ? "cursor-not-allowed opacity-50 pointer-events-auto"
              : "cursor-pointer",
          )}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>

        {/* <div className="flex items-center justify-center text-sm font-medium min-w-[32px] h-9 border rounded-md bg-muted/50">
          {currentPage}
        </div> */}
        {pages.map((page, i) =>
          page === "..." ? (
            <span key={i} className="px-2 text-muted-foreground">
              ...
            </span>
          ) : (
            <Button
              key={i}
              size="sm"
              variant={page === currentPage ? "default" : "outline"}
              onClick={() => onPageChange(page as number)}
              className="cursor-pointer min-w-9"
            >
              {page}
            </Button>
          ),
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            "h-9 px-4",
            currentPage === totalPages
              ? "cursor-not-allowed opacity-50 pointer-events-auto"
              : "cursor-pointer",
          )}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
