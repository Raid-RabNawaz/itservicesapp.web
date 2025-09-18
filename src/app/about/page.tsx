export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connecting customers with skilled technicians for all their service needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-4">
              We believe that finding reliable, skilled technicians should be simple and stress-free. 
              Our platform connects customers with verified professionals who can handle everything 
              from home repairs to specialized technical services.
            </p>
            <p className="text-lg text-gray-600">
              Whether you need a quick fix or a major project, we&apos;re here to make it happen 
              with quality, convenience, and peace of mind.
            </p>
          </div>
          <div className="bg-blue-100 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Us?</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="text-blue-600 mr-3">✓</span>
                <span className="text-gray-700">Verified and background-checked technicians</span>
              </li>
              <li className="flex items-center">
                <span className="text-blue-600 mr-3">✓</span>
                <span className="text-gray-700">Easy online booking and scheduling</span>
              </li>
              <li className="flex items-center">
                <span className="text-blue-600 mr-3">✓</span>
                <span className="text-gray-700">Transparent pricing and upfront quotes</span>
              </li>
              <li className="flex items-center">
                <span className="text-blue-600 mr-3">✓</span>
                <span className="text-gray-700">24/7 customer support</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Team</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We&apos;re a team of passionate professionals dedicated to revolutionizing the way 
            people find and book technical services. Our platform is built by technicians, 
            for technicians, ensuring that both service providers and customers have the 
            best possible experience.
          </p>
        </div>
      </div>
    </main>
  );
}
