export default function Footer(){
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg grid place-items-center mr-4">
                <span className="text-white font-bold text-xl">AK</span>
              </div>
              <span className="text-2xl font-bold">Abdul Kader</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Full Stack Developer passionate about creating innovative digital solutions that drive business success and user satisfaction.
            </p>
            <div className="flex space-x-4">
              {[
                ["linkedin-in","hover:bg-blue-600"],
                ["github","hover:bg-gray-700"],
                ["twitter","hover:bg-blue-400"],
                ["instagram","hover:bg-pink-600"],
              ].map(([n,hover])=>(
                <a key={n} href="#" className={`w-10 h-10 bg-gray-800 rounded-lg grid place-items-center transition-colors ${hover}`}>
                  <i className={`fab fa-${n}`}/>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {["home","about","experience","portfolio"].map(id=>(
                <li key={id}><a href={`#${id}`} className="text-gray-300 hover:text-white transition-colors">{id[0].toUpperCase()+id.slice(1)}</a></li>
              ))}wwh
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {["Web Development","Mobile Apps","UI/UX Design","Cloud Solutions"].map(s=><li key={s}><a href="#services" className="text-gray-300 hover:text-white transition-colors">{s}</a></li>)}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">&copy; 2025 Abdul Kader. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
