import { Avatar, Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { IReview } from '../types';
import StartRating from './StarRating';

const getMonth = (num: number) => {
  const month = [
    '',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return month[num];
};

const capitalize = (word?: string) => {
  if (!word) return '';
  return word[0].toUpperCase() + word.slice(1);
};

interface ReviewCardProps {
  reviews: IReview[];
}

export default function ReviewCard({ reviews }: ReviewCardProps) {
  return (
    <>
      {reviews.map((review, index) => (
        <VStack key={index} alignItems={'flex-start'} mt={10}>
          <HStack>
            <Avatar
              name={review.user.username}
              src={review.user.profile_picture}
              size={'md'}
            />
            <VStack alignItems={'flex-start'} spacing={0}>
              <Heading size={'sm'} fontWeight={'semibold'}>
                {capitalize(review.user.username)}
              </Heading>
              <Text color={'gray.700'} fontSize={'sm'}>
                0 years on Airbnb
              </Text>
            </VStack>
          </HStack>
          <HStack fontSize={'sm'} fontWeight={'semibold'}>
            <StartRating rating={review.rating} size={11} />
            <Text>·</Text>
            <Text>
              {getMonth(parseInt(review.created_date.slice(5, 7)))}{' '}
              {review.created_date.slice(0, 4)}
            </Text>
          </HStack>
          <Text noOfLines={3}>{review.comments}</Text>
          <Button variant={'unstyled'} textDecoration={'underline'}>
            Show more
          </Button>
        </VStack>
      ))}
    </>
  );
}
