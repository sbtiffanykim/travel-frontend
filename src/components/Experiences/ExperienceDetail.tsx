import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { getExperienceDetail } from '../../api';
import { FaStar } from 'react-icons/fa';
import { capitalize, formatDescription } from '../../utils';
import { useEffect, useRef, useState } from 'react';
import { IInclusion, IMedia } from '../../types';

export default function ExperienceDetail({}) {
  const { experiencePk } = useParams();
  const { data: expData, isLoading: isExpDataLoading } = useQuery({
    queryKey: ['experience', experiencePk],
    queryFn: getExperienceDetail,
  });
  const [isTruncated, setIsTruncated] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const handleReadMore = () => {
    setIsTruncated(false);
    setIsExpanded(true);
  };

  useEffect(() => {
    if (descriptionRef.current) {
      setIsTruncated(
        descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight
      );
    }
  }, [expData?.description]);

  return (
    <Box mt={10} mb={20} mx={10}>
      {/* Title */}
      <VStack alignItems={'flex-start'} spacing={1}>
        <Heading fontWeight={'semibold'} size={'lg'}>
          {expData?.name}
        </Heading>
        <HStack fontSize={'sm'} fontWeight={'semibold'} spacing={1}>
          <FaStar />
          <Text pl={1}>{expData?.rating_average}</Text>
          <Text fontWeight={'normal'}>({expData?.total_reviews})</Text>
          <Text px={1}>·</Text>
          <Text>
            {expData?.city}, {expData?.country}
          </Text>
        </HStack>
      </VStack>

      {/* Experience media */}
      <Grid
        templateColumns={'repeat(4, 1fr)'}
        gap={2}
        my={5}
        height={'30vh'}
        rounded={'xl'}
        overflow={'hidden'}
      >
        <GridItem colSpan={2}>
          <ReactPlayer
            url={expData?.video.file}
            w='100%'
            h='100%'
            style={{ objectFit: 'cover', overflow: 'hidden' }}
            muted={true}
            controls={true}
            playing={true}
          />
        </GridItem>
        {expData?.photos.slice(0, 3).map((photo: IMedia) => (
          <GridItem key={photo.pk}>
            <Image src={photo?.file} w='100%' h='100%' objectFit={'cover'} />
          </GridItem>
        ))}
      </Grid>

      {/* Host Information */}
      <HStack w={'60vh'} justifyContent={'space-between'} mt={10}>
        <VStack alignItems={'flex-start'} spacing={0}>
          <Heading fontSize={'2xl'} fontWeight={'semibold'}>
            Experience hosted by {capitalize(expData?.host.username)}
          </Heading>
          <Text>{expData?.duration}</Text>
        </VStack>
        <Avatar src={expData?.host.profile_picture} />
      </HStack>

      <Divider borderColor='gray.200' border={'2'} my={15} />

      {/* Description */}
      <Box py={8}>
        <Heading fontWeight={'semibold'} fontSize={'22px'}>
          What you'll do
        </Heading>
        <Text
          ref={descriptionRef}
          mt={4}
          noOfLines={isExpanded ? undefined : 10}
          dangerouslySetInnerHTML={{ __html: formatDescription(expData?.description) }}
        />
        {isTruncated && !isExpanded && (
          <Button
            variant={'unstyled'}
            textDecoration={'underline'}
            onClick={handleReadMore}
          >
            Read more
          </Button>
        )}
      </Box>

      <Divider borderColor='gray.200' border={'2'} my={15} />

      {/* Inclusions */}
      <Box py={8}>
        <Heading fontWeight={'semibold'} fontSize={'22px'}>
          What's included
        </Heading>
        <Grid templateColumns={'repeat(4, 1fr)'} mt={5} gap={3}>
          {expData?.inclusions.slice(0, 4).map((inclusion: IInclusion) => (
            <GridItem key={inclusion.pk}>
              <Card variant={'outline'} h={'150px'}>
                <CardHeader pt={5} pb={2}>
                  <Heading size={'md'} fontWeight={'semibold'}>
                    {inclusion?.name
                      .split(' ')
                      .map((word: string) => capitalize(word))
                      .join(' ')}
                  </Heading>
                </CardHeader>
                <CardBody pt={2}>
                  <Text fontSize={'15px'}>{inclusion?.details}</Text>
                </CardBody>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
