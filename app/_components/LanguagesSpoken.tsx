function LanguagesSpoken({ languages }: { languages: string[] }) {
  return (
    <div className="mt-2 p-6 bg-white rounded-xl shadow text-text">
      <h2 className="text-2xl font-semibold mb-4">Languages Spoken</h2>
      <div className="flex flex-wrap gap-2">
        {languages.map((lang, index) => (
          <span
            key={index}
            className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
          >
            {lang}
          </span>
        ))}
      </div>
    </div>
  );
}

export default LanguagesSpoken;
