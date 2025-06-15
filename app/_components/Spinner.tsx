function Spinner() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-background">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default Spinner;
