import { HStack } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

interface StarRatingProps {
  rating: number;
  size?: number;
  spacing?: number;
}

export default function StartRating({ rating, size = 11, spacing = 0 }: StarRatingProps) {
  const totalStars = 5;
  const stars = [];

  for (let i = 0; i < rating; i++) {
    stars.push(<FaStar key={i} color='black' size={size} />);
  }

  for (let i = 0; i < totalStars - rating; i++) {
    stars.push(<FaStar key={rating + i} color='gray' size={size} />);
  }

  return <HStack spacing={spacing}>{stars}</HStack>;
}
