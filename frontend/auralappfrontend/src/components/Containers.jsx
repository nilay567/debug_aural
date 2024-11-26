export default function Container({ className, children }) {
  return (
    <>
      <div
        className={`max-w-[1250px] mx-auto px-6 sm:px-4 md:px-4 lg:px-6 xl:px-8 h-full ${className}`}
      >
        {children}
      </div>
    </>
  );
}
