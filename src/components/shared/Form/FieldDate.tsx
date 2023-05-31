import { Box, Button, VisuallyHidden } from '@chakra-ui/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { format, isValid, parse } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import Calendar, { OnChangeDateCallback } from 'react-calendar';
import { HiOutlineCalendar } from 'react-icons/hi';
import useClickAway from 'react-use/lib/useClickAway';

import { FieldInput, FieldInputProps } from './FieldInput';

export type FieldDateProps = Omit<FieldInputProps, 'value' | 'onChange' | 'type'> & {
  value?: Date | undefined;
  openOnFocus?: boolean;
  onChange: (date: Date) => void;
  onClose?: () => void;
  inputFormat?: string;
};

const CalendarWrapper = styled(Box)`
  z-index: 1;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14),
    0px 3px 14px 2px rgba(0, 0, 0, 0.12);
`;

function assertDate(date: any) {
  if (!(date instanceof Date)) {
    throw new Error('Value should be an instance of Date');
  }
}

export const FieldDate = ({
  value,
  onClose,
  onChange,
  openOnFocus,
  inputFormat = 'dd-MM-yyyy',
  ...props
}: FieldDateProps) => {
  const [inputDate, setInputDate] = useState(() => {
    if (value) {
      assertDate(value);
      return format(value, inputFormat);
    }

    return '';
  });

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      assertDate(value);
    }
    setInputDate(value ? format(value, inputFormat) : '');
  }, [value, setInputDate, inputFormat]);

  useClickAway(ref, () => {
    if (isOpen) {
      setIsOpen(false);
      if (onClose) {
        onClose();
      }
    }
  });

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    if (openOnFocus) {
      setIsOpen(true);
    }
    if (props.onFocus) {
      props.onFocus(e);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.currentTarget.value;

    setInputDate(inputValue);

    if (inputValue.length === inputFormat.length) {
      const parsedDate = parse(inputValue, inputFormat, new Date());

      const isValidDate = isValid(parsedDate);

      if (isValidDate) {
        onChange(parsedDate);
      }
    }
  }

  const handleCalendarChange: OnChangeDateCallback = newDate => {
    if (!Array.isArray(newDate)) {
      onChange(newDate);
      setIsOpen(false);
    }
  };

  return (
    <Wrapper position="relative" ref={ref}>
      <FieldInput
        autoComplete={'off'}
        {...props}
        type="text"
        value={inputDate}
        onChange={handleInputChange}
        onFocus={handleFocus}
        end={
          <Button
            variant="icon"
            width="30px"
            height="30px"
            onClick={() => {
              setIsOpen(true);
            }}
            color="gray.800"
          >
            <HiOutlineCalendar />
            <VisuallyHidden>Open calendar</VisuallyHidden>
          </Button>
        }
      />
      <CalendarWrapper display={isOpen ? 'block' : 'none'} position="absolute">
        <Calendar locale="nl" value={value || new Date()} onChange={handleCalendarChange} />
      </CalendarWrapper>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  ${({ theme }) => css`
    .react-calendar {
      width: 350px;
      max-width: 100%;
      background: ${theme.colors.white};
      line-height: 1.125em;
      abbr[title] {
        text-decoration: none;
      }
    }
    .react-calendar,
    .react-calendar *,
    .react-calendar *:before,
    .react-calendar *:after {
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
    .react-calendar button {
      margin: 0;
      border: 0;
      outline: none;
    }
    .react-calendar button:enabled:hover {
      cursor: pointer;
    }
    .react-calendar__navigation {
      height: 44px;
      margin-bottom: 1em;
    }
    .react-calendar__navigation button {
      min-width: 44px;
      background: none;
    }
    .react-calendar__navigation button:enabled:hover,
    .react-calendar__navigation button:enabled:focus {
      background-color: #e6e6e6;
    }
    .react-calendar__navigation button[disabled] {
      background-color: #f0f0f0;
    }
    .react-calendar__month-view__weekdays {
      text-align: center;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 0.75em;
    }
    .react-calendar__month-view__weekdays__weekday {
      padding: 0.5em;
    }
    .react-calendar__month-view__weekNumbers {
      font-weight: bold;
    }
    .react-calendar__month-view__weekNumbers .react-calendar__tile {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75em;
      padding: calc(0.75em / 0.75) calc(0.5em / 0.75);
    }
    .react-calendar__month-view__days__day--weekend {
      color: ${theme.colors.error};
    }
    .react-calendar__month-view__days__day--neighboringMonth {
      color: ${theme.colors.gray[200]};
    }
    .react-calendar__year-view .react-calendar__tile,
    .react-calendar__decade-view .react-calendar__tile,
    .react-calendar__century-view .react-calendar__tile {
      padding: 2em 0.5em;
    }
    .react-calendar__tile {
      max-width: 100%;
      text-align: center;
      padding: 0.75em 0.5em;
      background: none;
    }
    .react-calendar__tile:disabled {
      background-color: #fff;
    }
    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus {
      background-color: ${theme.colors.gray[300]};
    }
    .react-calendar__tile--hasActive {
      background: ${theme.colors.primary};
    }
    .react-calendar__tile--hasActive:enabled:hover,
    .react-calendar__tile--hasActive:enabled:focus {
      background: ${theme.colors.primary};
    }
    .react-calendar__tile--active {
      background: ${theme.colors.primary};
      color: white;
    }
    .react-calendar__tile--active:enabled:hover,
    .react-calendar__tile--active:enabled:focus {
      background: ${theme.colors.primary};
    }
    .react-calendar--selectRange .react-calendar__tile--hover {
      background-color: ${theme.colors.gray[300]};
    }
  `}
`;
