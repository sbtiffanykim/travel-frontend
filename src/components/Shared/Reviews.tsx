import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { IReview } from '../../types';
import ReviewCard from './ReviewCard';

interface IReviewProps {
  totalRating: number;
  reviews: IReview[];
  isReviewsLoading: boolean;
  onReviewOpen: () => void;
  isReviewOpen: boolean;
  onReviewClose: () => void;
}

export default function Reviews({
  totalRating,
  reviews,
  isReviewsLoading,
  onReviewOpen,
  isReviewOpen,
  onReviewClose,
}: IReviewProps) {
  return (
    <Box my={10}>
      <Heading fontSize={'xl'} fontWeight={'semibold'}>
        <HStack>
          <FaStar />
          <Text>{totalRating.toFixed(2)}</Text>
          <Text>·</Text>
          <Text>
            {reviews.length} review{reviews.length < 1 ? '' : 's'}
          </Text>
        </HStack>
      </Heading>
      <Container maxW='container.lg' marginX={'none'} padding={0}>
        <Grid templateColumns={'1fr 1fr'} gap={10}>
          {!isReviewsLoading && <ReviewCard reviews={reviews} />}
        </Grid>
        <Button
          variant={'outline'}
          my={8}
          borderColor={'gray.800'}
          px={8}
          py={5}
          onClick={onReviewOpen}
        >
          Show all {reviews.length} review{reviews.length < 1 ? '' : 's'}
        </Button>

        <Modal
          isOpen={isReviewOpen}
          onClose={onReviewClose}
          scrollBehavior='inside'
          size={'xl'}
        >
          <ModalOverlay />
          <ModalContent py={10} px={7}>
            <ModalHeader>
              <ModalCloseButton />
              <Heading size={'md'} fontWeight={'semibold'}>
                {reviews.length} Review{reviews.length < 1 ? '' : 's'}
              </Heading>
            </ModalHeader>
            <ModalBody>
              {!isReviewsLoading && <ReviewCard reviews={reviews} inModal={true} />}
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
    </Box>
  );
}
