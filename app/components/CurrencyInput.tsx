import { SyntheticEvent } from 'react';

interface Props {
  id: string;
  value: string | number;
  onChange(value: number | string): void;
}

export default function CurrencyInput({ id, value, onChange }: Props) {
  return (
    <div className='mt-1 relative rounded-md shadow-sm'>
      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
        <span className='text-gray-500 sm:text-sm'>$</span>
      </div>
      <input
        type='number'
        name='balance'
        id={id}
        className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md'
        placeholder='0.00'
        aria-describedby='price-currency'
        value={value}
        onChange={event => onChange(event.target.value)}
      />
      <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
        <span className='text-gray-500 sm:text-sm' id='price-currency'>
          USD
        </span>
      </div>
    </div>
  );
}
