import { Avatar, Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { IReview } from '../../types';
import StartRating from './StarRating';
import { useEffect, useRef, useState } from 'react';

const month: { [key: number]: string } = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec',
};

const getMonth = (num: number): string => month[num] || '';

const capitalize = (word?: string) => {
  if (!word) return '';
  return word[0].toUpperCase() + word.slice(1);
};

const calculateMembershipYears = (year?: string) => {
  if (!year) return 0;
  const currentYear = new Date().getFullYear();
  return currentYear - parseInt(year);
};

interface ReviewCardProps {
  reviews: IReview[];
  inModal?: boolean;
}

function ReviewCard({ reviews, inModal = false }: ReviewCardProps) {
  return (
    <>
      {reviews.map((review, index) => {
        const membershipYear = calculateMembershipYears(review.user.date_joined);
        return (
          <Review
            key={index}
            review={review}
            membershipYear={membershipYear}
            inModal={inModal}
          />
        );
      })}
    </>
  );
}

interface ReviewProps {
  review: IReview;
  membershipYear: number;
  inModal?: boolean;
}

function Review({ review, membershipYear, inModal = false }: ReviewProps) {
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      setIsTruncated(textRef.current.scrollHeight > textRef.current.clientHeight);
    }
  }, []);

  return (
    <VStack alignItems={'flex-start'} mt={10}>
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
            Member for {membershipYear} year{membershipYear < 1 ? '' : 's'}
          </Text>
        </VStack>
      </HStack>
      <HStack fontSize={'sm'} fontWeight={'semibold'} spacing={1}>
        <StartRating rating={review.rating} size={11} />
        <Text>·</Text>
        <Text>
          {getMonth(parseInt(review.created_date.slice(5, 7)))}{' '}
          {review.created_date.slice(0, 4)}
        </Text>
      </HStack>
      <Text
        ref={textRef}
        noOfLines={inModal ? undefined : 3}
        fontSize={inModal ? 'sm' : 'md'}
      >
        {review.comments}
      </Text>
      {isTruncated && (
        <Button variant={'unstyled'} textDecoration={'underline'} hidden={inModal}>
          Show more
        </Button>
      )}
    </VStack>
  );
}

export default ReviewCard;
