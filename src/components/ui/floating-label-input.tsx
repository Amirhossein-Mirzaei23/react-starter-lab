import { Box, defineStyle, Field, Input, InputProps, useControllableState } from '@chakra-ui/react';
import { useState } from 'react';

interface FloatingLabelInputProps extends InputProps {
  label: React.ReactNode;
  value?: string | undefined;
  labelBgColor?: string;
  labelTextColor?: string;
  defaultValue?: string | undefined;
  onValueChange?: ((value: string) => void) | undefined;
}
const FloatingLabelInput = (props: FloatingLabelInputProps) => {
  const {
    label,
    onValueChange,
    value,
    labelBgColor,
    labelTextColor,
    defaultValue = '',
    ...rest
  } = props;

  const [inputState, setInputState] = useControllableState({
    defaultValue,
    onChange: onValueChange,
    value,
  });

  const [focused, setFocused] = useState(false);
  const shouldFloat = inputState.length > 0 || focused;
  return (
    <Box pos="relative" w="full">
      <Input
        {...rest}
        placeholder={shouldFloat ? rest.placeholder : ''}
        onFocus={(e) => {
          props.onFocus?.(e);
          setFocused(true);
        }}
        onBlur={(e) => {
          props.onBlur?.(e);
          setFocused(false);
        }}
        onChange={(e) => {
          props.onChange?.(e);
          setInputState(e.target.value);
        }}
        value={inputState}
        data-float={shouldFloat || undefined}
      />
      <Field.Label
        css={floatingStyles}
        className="!rounded-xl !shadow-none"
        data-float={shouldFloat || undefined}
        style={{
          backgroundColor: shouldFloat
            ? labelBgColor || 'bg' // OR full white #fff
            : 'transparent',
          color: labelTextColor ? labelTextColor || 'bg' : '#8B909B',
        }}
      >
        {label}
      </Field.Label>
    </Box>
  );
};

const floatingStyles = defineStyle({
  pos: 'absolute',
  bg: 'bg',
  px: '0.5',
  top: '2.5',
  insetStart: '3',
  fontWeight: 'normal',
  pointerEvents: 'none',
  transition: 'all 0.15s ease',
  color: 'fg.muted',
  '&[data-float]': {
    top: '-3',
    insetStart: '2',
    color: 'fg',
  },
});
export default FloatingLabelInput;
