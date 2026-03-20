import styled from 'styled-components';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
}

const SwitchWrapper = styled.div<{ $checked: boolean }>`
  width: 50px;
  height: 24px;
  background-color: ${({ $checked, theme }) => ($checked ? theme.colors.primary : theme.colors.bgContainer)};
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  padding: 0 4px;
  user-select: none;
  border: 1px solid ${({ theme }) => theme.colors.bgBase};
`;

const SwitchHandle = styled.div<{ $checked: boolean }>`
  width: 18px;
  height: 18px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  left: ${({ $checked }) => ($checked ? '28px' : '4px')};
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
`;

const SwitchLabel = styled.span<{ $checked: boolean; $position: 'left' | 'right' }>`
  font-size: 12px;
  color: ${({ $checked, theme }) => ($checked ? 'white' : theme.colors.textBase)};
  margin-left: ${({ $position }) => ($position === 'right' ? 'auto' : '0')};
  margin-right: ${({ $position }) => ($position === 'left' ? 'auto' : '0')};
  opacity: ${({ $checked, $position }) => ($checked && $position === 'left' ? 1 : !$checked && $position === 'right' ? 1 : 0)};
`;

const Switch = ({ checked, onChange, checkedChildren, unCheckedChildren }: SwitchProps) => {
  return (
    <SwitchWrapper $checked={checked} onClick={() => onChange(!checked)}>
      <SwitchLabel $checked={checked} $position="left">{checkedChildren}</SwitchLabel>
      <SwitchHandle $checked={checked} />
      <SwitchLabel $checked={checked} $position="right">{unCheckedChildren}</SwitchLabel>
    </SwitchWrapper>
  );
};

export { Switch };
