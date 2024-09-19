const AboutSection = () => {
  const cards = [
    {
      title: 'Streamlined Quotes',
      description:
        'DraftWise allows attorneys to set up and manage legal quotes easily, reducing time and effort.',
      icon: '💼'
    },
    {
      title: 'Antenuptial Contracts',
      description:
        'Create comprehensive antenuptial contracts efficiently and ensure legal compliance.',
      icon: '💍'
    },
    {
      title: 'Attorney-Focused',
      description:
        'Designed specifically for legal professionals, DraftWise supports your work with specialized features.',
      icon: '⚖️'
    }
  ];

  return (
    <section id="about" className="py-12 bg-black">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl mb-8">
          About DraftWise
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="p-6 hover:shadow-lg transition-shadow duration-300 rounded-lg shadow-sm divide-y divide-zinc-600 bg-zinc-900 transform hover:scale-105"
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-400">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
