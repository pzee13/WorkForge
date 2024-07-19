

interface Facility {
  name: string;
  icon: JSX.Element;
}


function Facilities({ facilities }: { facilities: Facility[] }) {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 dark:bg-gray-100 dark:text-gray-800">
      <h2 className="mb-8 text-4xl font-bold leading-none text-center">What do we have to offer?</h2>
      <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {facilities.map((facility, index:number) => (
          <li key={index} className="flex items-center space-x-2">
            {facility.icon}
            <span>{facility.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Facilities;