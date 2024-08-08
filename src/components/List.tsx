import { Box, Grid } from '@chakra-ui/react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { ILinkInfo, IListItem } from '../types';
import Paginator from './Paginator';
import { useState } from 'react';

interface ListProps<T extends IListItem> {
  queryKey: (number | string)[];
  queryFn: (page: number) => Promise<{ page: ILinkInfo; content: T[] }>;
  renderSkeleton: () => JSX.Element;
  renderItem: (item: T) => JSX.Element;
}

export default function List<T extends IListItem>({
  queryKey,
  queryFn,
  renderSkeleton,
  renderItem,
}: ListProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: [...queryKey, currentPage],
    queryFn: () => queryFn(currentPage),
    placeholderData: keepPreviousData,
  });

  const linkInfo: ILinkInfo = data?.page ?? {
    current_page: 1,
    total_pages: 1,
    next_link: null,
    prev_link: null,
    count: 1,
  };

  const items: T[] = data?.content ?? [];

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goNextPage = () => {
    if (linkInfo.next_link) {
      setCurrentPage((page) => page + 1);
    }
  };

  const goPrevPage = () => {
    if (linkInfo.prev_link) {
      setCurrentPage((page) => page - 1);
    }
  };

  return (
    <>
      <Grid
        mt={10}
        px={30}
        columnGap={4}
        rowGap={8}
        templateColumns={{
          sm: '1fr',
          md: '1fr 1fr',
          lg: 'repeat(3, 1fr)',
          xl: 'repeat(4, 1fr)',
          '2xl': 'repeat(5, 1fr)',
        }}
      >
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <Box key={index}>{renderSkeleton()}</Box>
            ))
          : items.map((item) => <Box key={item.pk}>{renderItem(item)}</Box>)}
      </Grid>

      {!isLoading && linkInfo.total_pages > 1 ? (
        <Paginator
          currentPage={linkInfo.current_page}
          totalPages={linkInfo.total_pages}
          totalCount={linkInfo.count}
          goToPage={goToPage}
          goNextPage={goNextPage}
          goPrevPage={goPrevPage}
        />
      ) : null}
    </>
  );
}
