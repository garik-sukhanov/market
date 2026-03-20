import { Button } from '../button';
import { Flex } from '../flex';
import { Typography } from '../typography';

interface PaginationProps {
  current: number;
  pageSize: number;
  total: number;
  onChange: (page: number, pageSize: number) => void;
}

const Pagination = ({
  current,
  pageSize,
  total,
  onChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(total / pageSize);

  if (totalPages <= 1) return null;

  return (
    <Flex $gap={10} $align="center">
      <Button
        $variant="round"
        $size="small"
        disabled={current === 1}
        onClick={() => onChange(current - 1, pageSize)}
      >
        {'<'}
      </Button>

      <Typography>
        Страница {current} из {totalPages}
      </Typography>

      <Button
        $variant="round"
        $size="small"
        disabled={current === totalPages}
        onClick={() => onChange(current + 1, pageSize)}
      >
        {'>'}
      </Button>
    </Flex>
  );
};

export { Pagination };
