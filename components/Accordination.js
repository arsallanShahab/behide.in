import React from 'react';

const Accordination = (
  { title = 'title', content = ['details 1', 'details 2', 'details 3'] },
  open = false,
) => {
  const [show, setShow] = React.useState(open);
  const [height, setHeight] = React.useState(0);
  const contentRef = React.useRef(null);
  React.useEffect(() => {
    setHeight(show ? contentRef.current.scrollHeight : 0);
  }, [show]);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div className="overflow-hidden rounded-xl bg-gray-50 p-3">
      <div
        onClick={handleShow}
        style={{ backgroundColor: !show ? 'rgb(243, 244, 246)' : 'rgb(229, 231, 235)' }}
        className="flex cursor-pointer items-center justify-between rounded-xl py-3 px-4 duration-300"
      >
        <h1 className="flex-1 text-sm font-semibold">{title}</h1>
        <div>{show ? <span>-</span> : <span>+</span>}</div>
      </div>
      <ul ref={contentRef} style={{ maxHeight: `${height}px` }} className="duration-150">
        {content.map((el, i) => {
          if (el.length < 3) return null;
          return (
            <li key={i} className="relative block px-4 py-2 font-sora text-gray-900 first:pt-5">
              • {el}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Accordination;
