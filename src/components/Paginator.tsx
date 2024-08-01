import { Button, HStack } from '@chakra-ui/react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

interface IPaginatorProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  goToPage: (page: number) => void;
  goNextPage: () => void;
  goPrevPage: () => void;
}

export default function Paginator({
  currentPage,
  totalPages,
  totalCount,
  goToPage,
  goNextPage,
  goPrevPage,
}: IPaginatorProps) {
  const generatePageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <HStack spacing={1} justify='center' mt={10} mb={5}>
      <Button variant={'ghost'} disabled={currentPage === 1} onClick={goPrevPage}>
        <GrFormPrevious />
      </Button>
      {generatePageNumbers().map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? 'solid' : 'ghost'}
          onClick={() => {
            goToPage(page);
          }}
          disabled={page === currentPage}
        >
          {page}
        </Button>
      ))}
      <Button
        variant={'ghost'}
        disabled={currentPage === totalPages}
        onClick={goNextPage}
      >
        <GrFormNext />
      </Button>
    </HStack>
  );
}
