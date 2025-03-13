import React, { useState, useEffect } from 'react';

const ProjectShowcase = () => {
  const [typedText, setTypedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  // ASCII Art for the header
  const asciiArt = `
  ████████╗██╗  ██╗███████╗██████╗ ██╗████████╗████████╗██╗   ██╗
  ╚══██╔══╝██║  ██║██╔════╝██╔══██╗██║╚══██╔══╝╚══██╔══╝╚██╗ ██╔╝
     ██║   ███████║█████╗  ██████╔╝██║   ██║      ██║    ╚████╔╝ 
     ██║   ██╔══██║██╔══╝  ██╔══██╗██║   ██║      ██║     ╚██╔╝  
     ██║   ██║  ██║███████╗██████╔╝██║   ██║      ██║      ██║   
     ╚═╝   ╚═╝  ╚═╝╚══════╝╚═════╝ ╚═╝   ╚═╝      ╚═╝      ╚═╝   
  `;
  
  // Text to type in the intro
  const textToType = [
    "Initializing system...",
    "Loading security modules...",
    "Establishing secure connection...",
    "Deploying project database...",
    "System ready. Welcome to TheBitty's Project Showcase.",
    "Type 'help' or click a command below to navigate."
  ];

  // The projects data
  const projects = [
    {
      id: 'gopherstrike',
      name: 'GopherStrike',
      description: 'A developing red team framework written in Go, featuring a port scanner with plans to add OSINT tools, multiple vulnerability scanners, and subdomain enumeration for comprehensive offensive security operations.',
      link: 'https://github.com/TheBitty/GopherStrike',
      tags: ['Go', 'Python', 'Cybersecurity', 'Red Team', 'Port Scanner', 'OSINT']
    },
    {
      id: 'pythmap',
      name: 'Pythmap',
      description: 'A comprehensive network scanning and analysis tool built in Python that combines nmap, banner grabbing, and logging capabilities for network reconnaissance and security assessment.',
      link: 'https://github.com/TheBitty/Pythmap',
      tags: ['Python', 'Nmap', 'Network Security', 'Banner Grabbing', 'Reconnaissance']
    },
    {
      id: 'binaryripper',
      name: 'BinaryRipper',
      description: 'A specialized tool for binary analysis and reverse engineering, focused on extracting and examining components from executable files for security research.',
      link: 'https://github.com/TheBitty/BinaryRipper',
      tags: ['C++', 'Reverse Engineering', 'Binary Analysis', 'Security Research']
    },
    {
      id: 'bitstrike',
      name: 'BitStrike',
      description: 'Post-exploitation framework designed to complement GopherStrike, providing advanced tools for security professionals during offensive operations.',
      link: 'https://github.com/TheBitty/BitStrike',
      tags: ['Red Team', 'Security', 'Post-Exploitation', 'Offensive Security']
    },
    {
      id: 'rustcc',
      name: 'RustCC',
      description: 'A project exploring Rust programming language capabilities, likely for systems programming or security applications.',
      link: 'https://github.com/TheBitty/RustCC',
      tags: ['Rust', 'Systems Programming', 'Security Applications']
    },
    {
      id: 'kairosalgo',
      name: 'KairosAlgo',
      description: 'A collection of algorithms and data structures implementations, likely for educational or performance analysis purposes.',
      link: 'https://github.com/TheBitty/KairosAlgo',
      tags: ['Algorithms', 'Data Structures', 'Education', 'Performance Analysis']
    }
  ];

  // Available terminal commands
  const terminalCommands = [
    { command: 'ls', description: 'List all projects' },
    { command: 'cat README.md', description: 'Display about information' },
    { command: 'nmap -sV showcase', description: 'Scan projects for technologies' },
    { command: 'ssh git@github.com', description: 'View GitHub profile' },
    { command: 'whoami', description: 'Display author information' },
    { command: 'netstat -a', description: 'Show networking tools projects' },
    { command: 'hexdump -C skills', description: 'Display skills in hex format' },
    { command: 'cd contact', description: 'Show contact information' }
  ];

  // Typing effect for the intro text
  useEffect(() => {
    if (currentTextIndex < textToType.length) {
      const text = textToType[currentTextIndex];
      let currentChar = 0;
      
      const typingInterval = setInterval(() => {
        if (currentChar < text.length) {
          setTypedText(prev => prev + text.charAt(currentChar));
          currentChar++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            setTypedText(prev => prev + '\n');
            setCurrentTextIndex(prev => prev + 1);
          }, 500);
        }
      }, 50);
      
      return () => clearInterval(typingInterval);
    } else {
      setIsTypingComplete(true);
    }
  }, [currentTextIndex]);

  // Simulate command execution
  const executeCommand = (command) => {
    switch(command) {
      case 'ls':
        setActiveSection('projects');
        break;
      case 'cat README.md':
        setActiveSection('about');
        break;
      case 'nmap -sV showcase':
        setActiveSection('technologies');
        break;
      case 'ssh git@github.com':
        window.open('https://github.com/TheBitty', '_blank');
        break;
      case 'whoami':
        setActiveSection('author');
        break;
      case 'netstat -a':
        setActiveSection('network-tools');
        break;
      case 'hexdump -C skills':
        setActiveSection('skills');
        break;
      case 'cd contact':
        setActiveSection('contact');
        break;
      default:
        setActiveSection('home');
    }
  };

  // Filter projects based on active section
  const filteredProjects = () => {
    if (activeSection === 'network-tools') {
      return projects.filter(project => 
        project.tags.some(tag => 
          ['Network Security', 'Port Scanner', 'Nmap', 'Reconnaissance'].includes(tag)
        )
      );
    }
    return projects;
  };

  // ASCII representation of author profile
  const authorASCII = `
    .---.
   /     \\
  | () () |
   \\  ^  /
    '---'
  THEBITTY
  `;

  // Hex dump of skills
  const skillsHexDump = `
  00000000  43 79 62 65 72 73 65 63  75 72 69 74 79 20 53 6b  |Cybersecurity Sk|
  00000010  69 6c 6c 73 3a 20 50 65  6e 65 74 72 61 74 69 6f  |ills: Penetratio|
  00000020  6e 20 54 65 73 74 69 6e  67 2c 20 52 65 64 20 54  |n Testing, Red T|
  00000030  65 61 6d 2c 20 4e 65 74  77 6f 72 6b 20 53 65 63  |eam, Network Sec|
  00000040  75 72 69 74 79 2c 20 4f  53 49 4e 54 2c 20 52 65  |urity, OSINT, Re|
  00000050  76 65 72 73 65 20 45 6e  67 69 6e 65 65 72 69 6e  |verse Engineerin|
  00000060  67 2c 20 52 69 73 6b 20  41 73 73 65 73 73 6d 65  |g, Risk Assessme|
  00000070  6e 74 2c 20 49 6e 63 69  64 65 6e 74 20 52 65 73  |nt, Incident Res|
  00000080  70 6f 6e 73 65 20 20 20  20 20 20 20 20 20 20 20  |ponse           |
  00000090  
  
  00000090  50 72 6f 67 72 61 6d 6d  69 6e 67 20 4c 61 6e 67  |Programming Lang|
  000000a0  75 61 67 65 73 3a 20 47  6f 2c 20 50 79 74 68 6f  |uages: Go, Pytho|
  000000b0  6e 2c 20 43 2b 2b 2c 20  52 75 73 74 2c 20 42 61  |n, C++, Rust, Ba|
  000000c0  73 68 2c 20 4a 61 76 61  53 63 72 69 70 74 2c 20  |sh, JavaScript, |
  000000d0  52 65 61 63 74 20 20 20  20 20 20 20 20 20 20 20  |React           |
  `;

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono p-4">
      <div className="max-w-6xl mx-auto">
        {/* Terminal Header */}
        <div className="bg-gray-800 rounded-t-lg p-2 border-b border-green-500 flex items-center">
          <div className="flex items-center space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-1 text-center text-green-300">
            <span className="font-bold">thebitty@projects</span>: 
            <span className="ml-2 text-green-400">~/showcase/{activeSection}</span>
          </div>
          <div className="text-xs">bash - 90x25</div>
        </div>
        
        {/* Terminal Content */}
        <div className="bg-gray-900 rounded-b-lg border-l border-r border-b border-green-500 p-4 overflow-hidden">
          {/* ASCII Art Header */}
          <pre className="text-purple-400 text-xs sm:text-sm overflow-x-auto whitespace-pre-wrap">
            {asciiArt}
          </pre>
          
          {/* Typing Effect */}
          <div className="my-4 text-green-300">
            <pre className="whitespace-pre-line">{typedText}</pre>
            {isTypingComplete && (
              <div className="mt-2 flex items-center">
                <span className="text-green-500 font-bold">thebitty@projects:~$</span>
                <span className="ml-2 h-4 w-2 bg-green-400 animate-pulse"></span>
              </div>
            )}
          </div>
          
          {/* Terminal Commands */}
          {isTypingComplete && (
            <div className="mt-6">
              <div className="text-yellow-400 font-bold mb-2">Available Commands:</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {terminalCommands.map((cmd, index) => (
                  <button 
                    key={index}
                    onClick={() => executeCommand(cmd.command)}
                    className="text-left bg-gray-800 hover:bg-gray-700 p-2 rounded border border-green-700 hover:border-green-500 transition-colors text-sm"
                  >
                    <span className="text-green-500">$</span> <span className="text-cyan-400">{cmd.command}</span>
                    <div className="text-gray-400 text-xs ml-4">// {cmd.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Content Sections */}
          <div className="mt-8">
            {/* Home / Default Section */}
            {activeSection === 'home' && isTypingComplete && (
              <div className="animate-fade-in">
                <h2 className="text-xl text-purple-400 font-bold mb-4">Welcome to TheBitty's Project Showcase</h2>
                <p className="text-green-300 mb-4">
                  This interactive terminal-themed showcase highlights my cybersecurity and development projects.
                  Use the commands above to explore different sections and learn more about my work.
                </p>
                <div className="p-3 bg-gray-800 border-l-4 border-purple-500 text-sm">
                  <p className="text-gray-300">
                    Featured projects include penetration testing tools, network scanners, red team frameworks, and more.
                    All projects reflect my expertise in cybersecurity and software development.
                  </p>
                </div>
              </div>
            )}
            
            {/* Projects Section */}
            {activeSection === 'projects' && (
              <div className="animate-fade-in">
                <div className="terminal-output mb-4">
                  <span className="text-green-500">thebitty@projects:~$</span> ls -la
                  <div className="text-gray-400 mt-2">
                    total {projects.length}
                    <div className="mt-1">drwxr-xr-x 2 thebitty cyber 4096 Mar 13 2023 .</div>
                    <div>drwxr-xr-x 4 thebitty cyber 4096 Mar 13 2023 ..</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((project, index) => (
                    <div key={index} className="bg-gray-800 rounded border border-green-700 p-4 hover:border-green-500 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-purple-400">{project.name}</h3>
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-cyan-400 text-xs hover:underline"
                        >
                          [GITHUB]
                        </a>
                      </div>
                      <p className="text-green-200 text-sm mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.tags.map((tag, idx) => (
                          <span key={idx} className="bg-gray-700 text-xs px-2 py-1 rounded text-yellow-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* About Section */}
            {activeSection === 'about' && (
              <div className="animate-fade-in">
                <div className="terminal-output mb-4">
                  <span className="text-green-500">thebitty@projects:~$</span> cat README.md
                </div>
                <div className="bg-gray-800 rounded p-4 border border-green-700">
                  <h2 className="text-xl text-purple-400 font-bold mb-2">README.md</h2>
                  <div className="text-green-200">
                    <h3 className="text-lg font-bold text-yellow-400 mt-4"># About TheBitty</h3>
                    <p className="mt-2">
                      I am a cybersecurity professional and developer specializing in offensive security tools and frameworks. 
                      My work focuses on creating powerful, efficient solutions for security testing, penetration testing, 
                      and red team operations.
                    </p>
                    
                    <h3 className="text-lg font-bold text-yellow-400 mt-4"># Project Philosophy</h3>
                    <p className="mt-2">
                      I believe in building tools that are both practical and educational. Each project aims to solve 
                      real-world security challenges while also serving as a learning resource for the community.
                    </p>
                    
                    <h3 className="text-lg font-bold text-yellow-400 mt-4"># Technologies</h3>
                    <p className="mt-2">
                      My projects utilize a variety of languages and frameworks, with a focus on Go, Python, C++, and Rust 
                      for their performance, safety, and expressiveness in systems programming contexts.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Technologies Section */}
            {activeSection === 'technologies' && (
              <div className="animate-fade-in">
                <div className="terminal-output mb-4">
                  <span className="text-green-500">thebitty@projects:~$</span> nmap -sV showcase
                  <div className="text-gray-400 mt-2">
                    Starting Nmap 7.93 ( https://nmap.org ) at {new Date().toLocaleString()}
                    <div className="mt-1">Scanning for open technologies on showcase</div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded p-4 border border-green-700">
                  <h3 className="text-lg text-purple-400 font-bold mb-3">Technology Scan Results</h3>
                  
                  <div className="mb-4">
                    <div className="text-cyan-400 font-bold">PORT 22/tcp open  ssh</div>
                    <div className="text-green-300 ml-4">Service: Go (GopherStrike)</div>
                    <div className="text-gray-400 ml-4 text-sm">Details: Red team framework, port scanning, OSINT</div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-cyan-400 font-bold">PORT 80/tcp open  http</div>
                    <div className="text-green-300 ml-4">Service: Python (Pythmap)</div>
                    <div className="text-gray-400 ml-4 text-sm">Details: Network scanning, banner grabbing, service detection</div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-cyan-400 font-bold">PORT 443/tcp open  https</div>
                    <div className="text-green-300 ml-4">Service: C++ (BinaryRipper)</div>
                    <div className="text-gray-400 ml-4 text-sm">Details: Binary analysis, reverse engineering, component extraction</div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-cyan-400 font-bold">PORT 8080/tcp open  http-proxy</div>
                    <div className="text-green-300 ml-4">Service: Rust (RustCC)</div>
                    <div className="text-gray-400 ml-4 text-sm">Details: Systems programming, security applications</div>
                  </div>
                  
                  <div>
                    <div className="text-cyan-400 font-bold">PORT 9000/tcp open  cslistener</div>
                    <div className="text-green-300 ml-4">Service: Mixed (BitStrike)</div>
                    <div className="text-gray-400 ml-4 text-sm">Details: Post-exploitation framework, offensive security tools</div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Author Section */}
            {activeSection === 'author' && (
              <div className="animate-fade-in">
                <div className="terminal-output mb-4">
                  <span className="text-green-500">thebitty@projects:~$</span> whoami
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <pre className="text-cyan-400 text-xs sm:text-sm whitespace-pre">
                      {authorASCII}
                    </pre>
                  </div>
                  
                  <div className="md:w-2/3 bg-gray-800 rounded p-4 border border-green-700">
                    <h3 className="text-lg text-purple-400 font-bold mb-3">TheBitty</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-yellow-400 font-bold">ROLE:</div>
                        <div className="text-green-300">Cybersecurity Professional & Developer</div>
                      </div>
                      
                      <div>
                        <div className="text-yellow-400 font-bold">FOCUS:</div>
                        <div className="text-green-300">Offensive Security, Tool Development</div>
                      </div>
                      
                      <div>
                        <div className="text-yellow-400 font-bold">EXPERTISE:</div>
                        <div className="text-green-300">Red Team Operations, Penetration Testing</div>
                      </div>
                      
                      <div>
                        <div className="text-yellow-400 font-bold">LANGUAGES:</div>
                        <div className="text-green-300">Go, Python, C++, Rust, JavaScript</div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="text-yellow-400 font-bold">BIO:</div>
                      <p className="text-green-200 mt-1">
                        Security enthusiast with a passion for developing tools that help identify and mitigate
                        vulnerabilities. Specialized in creating practical frameworks for security testing and
                        research, with experience across multiple programming languages and security domains.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Network Tools Section */}
            {activeSection === 'network-tools' && (
              <div className="animate-fade-in">
                <div className="terminal-output mb-4">
                  <span className="text-green-500">thebitty@projects:~$</span> netstat -a
                  <div className="text-gray-400 mt-2">
                    Active Network Tool Projects
                    <div className="mt-1">Showing projects related to network security and scanning</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProjects().map((project, index) => (
                    <div key={index} className="bg-gray-800 rounded border border-green-700 p-4 hover:border-green-500 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-purple-400">{project.name}</h3>
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-cyan-400 text-xs hover:underline"
                        >
                          [GITHUB]
                        </a>
                      </div>
                      <p className="text-green-200 text-sm mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.tags.map((tag, idx) => (
                          <span key={idx} className="bg-gray-700 text-xs px-2 py-1 rounded text-yellow-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Skills Section */}
            {activeSection === 'skills' && (
              <div className="animate-fade-in">
                <div className="terminal-output mb-4">
                  <span className="text-green-500">thebitty@projects:~$</span> hexdump -C skills
                </div>
                
                <div className="bg-gray-800 rounded p-4 border border-green-700 overflow-x-auto">
                  <pre className="text-cyan-300 text-xs sm:text-sm font-mono">
                    {skillsHexDump}
                  </pre>
                </div>
                
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-800 p-4 rounded border border-green-700">
                    <h3 className="text-purple-400 font-bold mb-3">Cybersecurity Skills</h3>
                    <ul className="list-disc pl-5 text-green-300 space-y-1">
                      <li>Penetration Testing</li>
                      <li>Red Team Operations</li>
                      <li>Network Security</li>
                      <li>OSINT (Open Source Intelligence)</li>
                      <li>Reverse Engineering</li>
                      <li>Risk Assessment</li>
                      <li>Incident Response</li>
                      <li>Vulnerability Research</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-800 p-4 rounded border border-green-700">
                    <h3 className="text-purple-400 font-bold mb-3">Technical Skills</h3>
                    <ul className="list-disc pl-5 text-green-300 space-y-1">
                      <li>Go Programming</li>
                      <li>Python Development</li>
                      <li>C++ Development</li>
                      <li>Rust Programming</li>
                      <li>Bash Scripting</li>
                      <li>Web Development (JS, React)</li>
                      <li>System Administration</li>
                      <li>CI/CD & DevSecOps</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {/* Contact Section */}
            {activeSection === 'contact' && (
              <div className="animate-fade-in">
                <div className="terminal-output mb-4">
                  <span className="text-green-500">thebitty@projects:~$</span> cd contact
                </div>
                
                <div className="bg-gray-800 rounded p-4 border border-green-700">
                  <h3 className="text-lg text-purple-400 font-bold mb-3">Contact Information</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="text-green-500 w-8 text-xl">$</span>
                      <span className="text-yellow-400 w-24">GitHub:</span>
                      <a href="https://github.com/TheBitty" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">
                        github.com/TheBitty
                      </a>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-green-500 w-8 text-xl">$</span>
                      <span className="text-yellow-400 w-24">Email:</span>
                      <a href="mailto:youremail@example.com" className="text-cyan-300 hover:underline">
                        youremail@example.com
                      </a>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-green-500 w-8 text-xl">$</span>
                      <span className="text-yellow-400 w-24">LinkedIn:</span>
                      <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">
                        linkedin.com/in/yourprofile
                      </a>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-3 bg-gray-900 border-l-4 border-green-500 text-sm">
                    <div className="text-gray-300">
                      <span className="text-green-400">ssh-rsa</span> AAAAB3NzaC1yc2EAAAADA... <span className="text-green-400">thebitty@projects</span>
                    </div>
                    <div className="text-gray-400 mt-2 text-xs">// My public key (example)</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Terminal Footer */}
        <div className="bg-gray-800 p-2 mt-2 rounded text-xs flex justify-between items-center text-green-300">
          <div>
            <span className="text-yellow-400">[system]</span> Uptime: {Math.floor(Math.random() * 100)} days
          </div>
          <div>
            © {new Date().getFullYear()} <span className="text-purple-400">TheBitty</span> | All projects on <a href="https://github.com/TheBitty" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">GitHub</a>
          </div>
        </div>
      </div>
      
      {/* Styles */}
      <style jsx="true">{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in;
        }
        
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        /* For mobile responsiveness */
        @media (max-width: 640px) {
          pre {
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectShowcase; 