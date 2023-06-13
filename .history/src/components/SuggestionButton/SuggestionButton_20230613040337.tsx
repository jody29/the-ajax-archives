import { Button, Icon, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";

export interface SuggestionButtonProps {
  suggestion: string
}

export const SuggestionButton = (props: SuggestionButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeavle = () => {
    setIsHovered(false);
  };

  return (
    <Button variant='secondary' display='flex' alignItems='center' padding={0} color='black' w='fit-content' fontSize='1.2rem' fontWeight='bold' position='relative' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeavle}>
      <Text bg='white'>{props.suggestion}</Text>
      <Icon right={-10} transform={`translateY(12%) ${isHovered ? 'translateX(0)' : 'translateX(-300%)'}`} opacity={isHovered ? 1 : 0} transition='transform 0.4s ease-in-out, opacity 0.4s ease-in-out' fontSize='1.3rem' position='absolute'>
        <FaChevronRight />
      </Icon>
    </Button>
  );
}
