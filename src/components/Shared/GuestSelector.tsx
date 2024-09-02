import { Button, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

interface IGuestControlBtnProps {
  icon: React.ReactElement;
  onClick: () => void;
  disabled?: boolean;
}

const GuestControlButton = ({ icon, onClick }: IGuestControlBtnProps) => {
  return (
    <Button
      onClick={onClick}
      variant='outline'
      borderRadius='50%'
      h='30px'
      w='30px'
      minW='30px'
      minH='30px'
      padding='0'
      display='flex'
      alignItems='center'
      justifyContent='center'
      fontSize={'10px'}
      color={'gray.500'}
    >
      {icon}
    </Button>
  );
};

interface IGuestSelectorProps {
  label: string;
  description: string;
  count: number;
  onDecrement: () => void;
  onIncrement: () => void;
  maxCapacity: number;
}

export default function GuestSelector({
  label,
  description,
  count,
  onDecrement,
  onIncrement,
  maxCapacity,
}: IGuestSelectorProps) {
  return (
    <HStack justifyContent='space-between' my={'2'}>
      <VStack alignItems='flex-start' spacing={0}>
        <Text fontWeight={'semibold'} fontSize={'md'}>
          {label}
        </Text>
        <Text fontSize={'sm'}>{description}</Text>
      </VStack>
      <HStack spacing={4}>
        <GuestControlButton icon={<FaMinus />} onClick={onDecrement} />
        <Text fontSize={'md'} fontWeight={'semibold'} textColor={'gray.600'}>
          {count}
        </Text>
        <GuestControlButton
          icon={<FaPlus />}
          onClick={onIncrement}
          disabled={count >= maxCapacity}
        />
      </HStack>
    </HStack>
  );
}
