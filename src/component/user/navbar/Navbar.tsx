
function Navbar() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-white p-4 px-20">
      {/* Left side logo */}
      <div className="flex items-center flex-shrink-0">
        <span className="font-semibold text-xl text-gray-800 font-lato">Your Logo</span>
      </div>

      {/* Right side links and login */}
      <div className="flex items-center">
        <div className="text-sm">
          <a
            href="#home"
            className="inline-block text-gray-800 hover:text-gray-600 mr-4 font-lato pr-10"
          >
            Home
          </a>
          <a
            href="#workspace"
            className=" inline-block text-gray-800 hover:text-gray-600 mr-4 font-lato pr-10"
          >
            Workspace
          </a>
          <a
            href="#contacts"
            className="inline-block text-gray-800 hover:text-gray-600 mr-4 font-lato pr-10"
          >
            Contacts
          </a>
          <a
            href="#login"
            className="inline-block text-sm text-gray-800 hover:text-gray-600 font-lato pr-10"
          >
            Login
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
