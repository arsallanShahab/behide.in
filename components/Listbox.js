import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Fragment, useEffect, useState } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
// how do get a selected value from the listbox and use it in the parent component
// how do i get the selected value from the listbox and use it in the parent component

export default function ListboxList({ label = 'label', data, onSelect, isColor = false }) {
  const [selected, setSelected] = useState(data[0]);
  useEffect(() => {
    onSelect(selected);
  }, [selected]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block whitespace-nowrap text-sm font-medium leading-6 text-gray-900">
            {label}
          </Listbox.Label>
          <div className="relative flex-1">
            <Listbox.Button className="relative w-full cursor-default rounded-xl bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                {/* //create a div with w-5 h-5 with color set to selected.color */}
                {isColor ? (
                  <span
                    style={{ backgroundColor: selected.color }}
                    className="block h-5 w-5 rounded-full"
                  ></span>
                ) : null}
                <span className="ml-3 block truncate">{selected.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {data.map((color, i) => (
                  <Listbox.Option
                    key={i}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9',
                      )
                    }
                    value={color}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          {isColor ? (
                            <span
                              style={{ backgroundColor: color.color }}
                              className="block h-5 w-5 rounded-full"
                            ></span>
                          ) : null}

                          <span
                            className={classNames(
                              selected ? 'font-semibold' : 'font-normal',
                              'ml-3 block truncate',
                            )}
                          >
                            {color.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
