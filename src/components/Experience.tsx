import { Box, Heading, HStack, IconButton, Image, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { FaPause, FaPlay, FaRegHeart, FaStar } from 'react-icons/fa';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';

interface IExpProps {
  pk: number;
  name: string;
  country: string;
  city: string;
  price: number;
  totalReviews: number;
  ratingAverage: number;
  thumbnail: string;
  video: string;
}

export default function Experience({
  pk,
  name,
  country,
  city,
  price,
  totalReviews,
  ratingAverage,
  thumbnail,
  video,
}: IExpProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <Link to={`/experiences/${pk}`}>
      <VStack key={pk} alignItems={'flex-start'} spacing={1}>
        <Box
          overflow={'hidden'}
          position='relative'
          rounded='xl'
          h='350px'
          w='100%'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {!isHovered && (
            <>
              <Image src={thumbnail} objectFit={'cover'} w='100%' h='100%' />
            </>
          )}
          {isHovered && (
            <Box position='absolute' top={0} left={0} w='100%' h='100%'>
              <ReactPlayer
                url={video}
                width='100%'
                height='100%'
                playing={!isPaused}
                loop={true}
                muted={true}
                style={{ objectFit: 'cover' }}
              />
              <IconButton
                size={'md'}
                rounded={'50%'}
                aria-label={isPaused ? 'Play' : 'Pause'}
                icon={isPaused ? <FaPlay /> : <FaPause />}
                position={'absolute'}
                bottom={3}
                left={3}
                onClick={(event) => {
                  event.preventDefault(); // Prevent default link behavior
                  event.stopPropagation(); // Stop event from bubbling up to the Link component
                  setIsPaused(!isPaused);
                }}
              />
            </Box>
          )}
          <IconButton
            size={'lg'}
            aria-label='Add to wishlist'
            icon={<FaRegHeart />}
            color={'white'}
            variant={'unstyled'}
            position={'absolute'}
            right={-3}
            top={0}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
          />
        </Box>
        <HStack spacing={1} fontSize={16} textColor={'gray.600'}>
          <FaStar />
          <Text>{ratingAverage}</Text>
          <Text>({totalReviews})</Text>
          <Text>·</Text>
          <Text>{country}</Text>
        </HStack>
        <Heading size={'sm'} fontWeight={'semibold'}>
          {name}
        </Heading>
        <Text textColor={'gray.600'}>${price} / person</Text>
      </VStack>
    </Link>
  );
}