import { Box, Button, Flex, Text } from '@chakra-ui/react';

export interface PaginationProps {
  total: number;
  perPage?: number;
  current?: number;
  onNavigate: (page: number) => void;
}

export function Pagination({ current = 1, perPage = 10, total, onNavigate }: PaginationProps) {
  const pages = Math.ceil(total / perPage);

  /**
   * Pagination should only show if there is enough content to fill more than one page.
   */
  if (total / perPage < 1 || !pages || current < 0 || current > pages) return null;

  /**
   *
   * @param toPage new page
   */
  const handleNavigate = (toPage: number) => {
    onNavigate(toPage);
    window.scrollTo(0, 0);
  };

  /**
   * Creates a new array based on a start & end parameter.
   * @param start start position of array
   * @param end end position of array
   */
  const getRestItems = (start: number, end: number): number[] =>
    [...Array(end - start + 1).keys()].map((_v, i) => i + start);

  /**
   * Determine delta
   */
  const getDelta = () => {
    if (pages <= 7) return 7;
    return current > 4 && current < pages - 3 ? 2 : 4;
  };

  /**
   * Adds a [...] item if there is enough content (based on delta)
   * @param items array of items
   */
  const handleDots = (items: (string | number)[]) => {
    const addDots = (value: number, pair: (string | number)[]) =>
      items.length + 1 !== pages ? pair : [value];

    if (items[0] !== 1) {
      items = addDots(1, [1, '...']).concat(items);
    }

    if (items[items.length - 1] < pages) {
      items = items.concat(addDots(pages, ['...', pages]));
    }

    return items;
  };

  /**
   * Build up items including
   */
  const getItems = () => {
    const delta = getDelta();

    let start = Math.round(current - delta / 2),
      end = Math.round(current + delta / 2);

    if (start - 1 === 1 || end + 1 === pages) {
      start += 1;
      end += 1;
    }

    const items =
      current > delta
        ? getRestItems(Math.min(start, pages - delta), Math.min(end, pages))
        : getRestItems(1, Math.min(pages, delta + 1));

    const enhancedItems = handleDots(items);

    return enhancedItems;
  };

  return (
    <Box my={8}>
      <Flex alignItems="center">
        <Button disabled={current <= 1} onClick={() => handleNavigate(current - 1)}>
          Prev page
        </Button>

        <Flex alignItems="center" mx={4}>
          {getItems().map((item: number | string) => (
            <Box key={item} mx={1}>
              {typeof item !== 'number' ? (
                <Text opacity={0.3}>{item}</Text>
              ) : (
                <Button
                  variant="clear"
                  onClick={() => handleNavigate(item)}
                  disabled={current === item}
                  p={2}
                >
                  {item}
                </Button>
              )}
            </Box>
          ))}
        </Flex>

        <Button disabled={current >= pages} onClick={() => handleNavigate(current + 1)}>
          Next page
        </Button>
      </Flex>
    </Box>
  );
}
