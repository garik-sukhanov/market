import type { ComponentProps } from 'react';
import styled from 'styled-components';

interface TagProps extends ComponentProps<'span'> {
  $color?: 'success' | 'warning' | 'error' | 'info';
}

const Tag = styled.span<TagProps>`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;

  ${({ $color }) => {
    switch ($color) {
      case 'success':
        return `
          background-color: #f6ffed;
          border: 1px solid #b7eb8f;
          color: #389e0d;
        `;
      case 'warning':
        return `
          background-color: #fffbe6;
          border: 1px solid #ffe58f;
          color: #d46b08;
        `;
      case 'error':
        return `
          background-color: #fff1f0;
          border: 1px solid #ffa39e;
          color: #cf1322;
        `;
      case 'info':
      default:
        return `
          background-color: #e6f7ff;
          border: 1px solid #91d5ff;
          color: #096dd9;
        `;
    }
  }}
`;

export { Tag };
