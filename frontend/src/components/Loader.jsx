function Loader({ message = "Loading…", subMessage = "" }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin mb-5" />
      <p className="text-gray-700 dark:text-gray-200 font-semibold text-base">{message}</p>
      {subMessage && (
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">{subMessage}</p>
      )}
    </div>
  );
}

export default Loader;
