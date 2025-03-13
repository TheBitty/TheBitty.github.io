import React, { useState, useEffect, useRef } from 'react';

const TerminalResume = () => {
  // Define sections and their content
  const sections = [
    { id: 'home', title: 'Home', content: () => <HomeSection /> },
    { id: 'summary', title: 'Summary', content: () => <SummarySection /> },
    { id: 'skills', title: 'Skills', content: () => <SkillsSection /> },
    { id: 'experience', title: 'Experience', content: () => <ExperienceSection /> },
    { id: 'education', title: 'Education', content: () => <EducationSection /> },
    { id: 'projects', title: 'Projects', content: () => <ProjectsSection /> },
    { id: 'contact', title: 'Contact', content: () => <ContactSection /> },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [terminalHistory, setTerminalHistory] = useState([
    { text: 'Loading resume data...', type: 'system' },
    { text: 'Resume data loaded successfully.', type: 'system' },
    { text: 'Type "help" for available commands or use arrow keys to navigate.', type: 'system' },
    { text: '> ', type: 'prompt' }
  ]);
  const [inputCommand, setInputCommand] = useState('');
  const commandLineRef = useRef(null);
  const historyRef = useRef(null);

  // Terminal cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Scroll to bottom of terminal history when updated
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  // Focus on command line when component mounts
  useEffect(() => {
    if (commandLineRef.current) {
      commandLineRef.current.focus();
    }
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        setActiveSection(prev => (prev > 0 ? prev - 1 : prev));
        addToHistory(`cd ../${sections[activeSection > 0 ? activeSection - 1 : 0].id}`, 'command');
        break;
      case 'ArrowDown':
        e.preventDefault();
        setActiveSection(prev => (prev < sections.length - 1 ? prev + 1 : prev));
        addToHistory(`cd ./${sections[activeSection < sections.length - 1 ? activeSection + 1 : activeSection].id}`, 'command');
        break;
      case 'Enter':
        e.preventDefault();
        processCommand();
        break;
      default:
        break;
    }
  };

  // Process command entered in the terminal
  const processCommand = () => {
    if (!inputCommand.trim()) return;
    
    addToHistory(inputCommand, 'command');
    
    const cmd = inputCommand.toLowerCase().trim();
    
    if (cmd === 'help') {
      addToHistory([
        'Available commands:',
        '  help               - Show this help message',
        '  clear              - Clear terminal history',
        '  ls                 - List all sections',
        '  cd [section]       - Navigate to a section',
        '  Arrow keys         - Navigate between sections',
        '  contact            - Show contact information',
        '  exit               - "Exit" the terminal (refreshes the page)'
      ].join('\n'), 'output');
    } 
    else if (cmd === 'clear') {
      setTerminalHistory([
        { text: '> ', type: 'prompt' }
      ]);
    }
    else if (cmd === 'ls') {
      addToHistory(sections.map(section => section.title).join('  '), 'output');
    }
    else if (cmd.startsWith('cd ')) {
      const sectionName = cmd.substring(3).toLowerCase();
      const sectionIndex = sections.findIndex(s => s.id.toLowerCase() === sectionName);
      
      if (sectionIndex >= 0) {
        setActiveSection(sectionIndex);
        addToHistory(`Navigated to ${sections[sectionIndex].title}`, 'output');
      } else {
        addToHistory(`Error: Section '${sectionName}' not found`, 'error');
      }
    }
    else if (cmd === 'contact') {
      setActiveSection(sections.length - 1);
      addToHistory('Navigated to Contact section', 'output');
    }
    else if (cmd === 'exit') {
      addToHistory('Exiting terminal...', 'system');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    else {
      addToHistory(`Command not found: ${inputCommand}. Type 'help' for available commands.`, 'error');
    }
    
    setInputCommand('');
  };

  // Add new line to terminal history
  const addToHistory = (text, type) => {
    setTerminalHistory(prev => [
      ...prev.slice(0, prev.length - 1),
      { text, type },
      { text: '> ', type: 'prompt' }
    ]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-purple-300 font-mono overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800 p-2 border-b border-purple-700 flex items-center">
        <div className="flex items-center space-x-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 text-center text-purple-300">
          <span className="font-bold">your-name@resume-terminal</span>: 
          <span className="ml-2 text-purple-400">~/portfolio/{sections[activeSection].id}</span>
        </div>
        <div className="text-xs">bash - 80x24</div>
      </div>

      {/* Main Content Area - Split between terminal history and current section */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel: Terminal history */}
        <div className="w-1/2 border-r border-purple-800 p-4 overflow-hidden flex flex-col">
          <div 
            ref={historyRef}
            className="flex-1 overflow-y-auto mb-2 terminal-history"
          >
            {terminalHistory.map((item, idx) => (
              <div key={idx} className={`terminal-line ${item.type}`}>
                {item.type === 'command' && <span className="text-green-400">root@terminal:~$ </span>}
                {item.text}
              </div>
            ))}
          </div>
          
          {/* Command input */}
          <div className="flex items-center">
            <span className="text-green-400 mr-2">root@terminal:~$</span>
            <input
              ref={commandLineRef}
              type="text"
              className="flex-1 bg-transparent border-none outline-none"
              value={inputCommand}
              onChange={(e) => setInputCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <span className={`h-4 w-2 bg-purple-400 ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
          </div>
        </div>

        {/* Right panel: Current section content */}
        <div className="w-1/2 p-4 overflow-y-auto">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-purple-400 mb-1">{sections[activeSection].title}</h2>
            <div className="text-xs mb-2 text-purple-600">
              {sections.map((section, idx) => (
                <span 
                  key={idx} 
                  className={`cursor-pointer ${idx === activeSection ? 'text-purple-300 underline' : ''}`}
                  onClick={() => setActiveSection(idx)}
                >
                  {section.title}
                  {idx < sections.length - 1 ? ' > ' : ''}
                </span>
              ))}
            </div>
          </div>
          
          <div className="section-content">
            {sections[activeSection].content()}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 p-2 border-t border-purple-700 text-xs flex justify-between">
        <div>Press <kbd className="bg-gray-700 px-1 rounded">↑</kbd> <kbd className="bg-gray-700 px-1 rounded">↓</kbd> to navigate | <kbd className="bg-gray-700 px-1 rounded">Enter</kbd> to execute commands</div>
        <div>© {new Date().getFullYear()} Your Name - Terminal v1.0.0</div>
      </div>
    </div>
  );
};

// Content sections
const HomeSection = () => (
  <div className="text-center">
    <h1 className="text-3xl font-bold text-purple-400 animate-pulse">Your Name</h1>
    <p className="text-xl text-purple-300 mt-2">Professional Title</p>
    <div className="mt-8 p-4 bg-gray-800 border border-purple-700 rounded">
      <p className="text-sm">
        Welcome to my terminal resume! Use the navigation on the left or arrow keys to explore.
        Type <code className="bg-gray-700 px-1 rounded">help</code> in the terminal for available commands.
      </p>
    </div>
    <p className="mt-6 text-green-400">
      <span className="blink">█</span> Press ↓ to continue...
    </p>
  </div>
);

const SummarySection = () => (
  <div>
    <div className="mb-4">
      <p className="text-sm leading-relaxed">
        Detail-oriented professional with X years of experience in [your field]. Proven track record of [key achievement]. 
        Skilled in [relevant skills] with a strong focus on [what you excel at]. 
        Passionate about [your professional interest] and committed to [your professional values].
      </p>
    </div>
    <div className="my-4 p-3 bg-gray-800 border-l-4 border-purple-500">
      <p className="text-xs italic">
        // This terminal UI showcases my passion for creating unique user experiences that combine
        // functionality with creative design elements.
      </p>
    </div>
  </div>
);

const SkillsSection = () => (
  <div>
    <div className="skills-grid grid grid-cols-2 gap-2">
      <div className="p-2 bg-gray-800 border border-purple-700 rounded">
        <span className="text-green-400">$</span> Skill 1
      </div>
      <div className="p-2 bg-gray-800 border border-purple-700 rounded">
        <span className="text-green-400">$</span> Skill 2
      </div>
      <div className="p-2 bg-gray-800 border border-purple-700 rounded">
        <span className="text-green-400">$</span> Skill 3
      </div>
      <div className="p-2 bg-gray-800 border border-purple-700 rounded">
        <span className="text-green-400">$</span> Skill 4
      </div>
      <div className="p-2 bg-gray-800 border border-purple-700 rounded">
        <span className="text-green-400">$</span> Skill 5
      </div>
      <div className="p-2 bg-gray-800 border border-purple-700 rounded">
        <span className="text-green-400">$</span> Skill 6
      </div>
      <div className="p-2 bg-gray-800 border border-purple-700 rounded">
        <span className="text-green-400">$</span> Skill 7
      </div>
      <div className="p-2 bg-gray-800 border border-purple-700 rounded">
        <span className="text-green-400">$</span> Skill 8
      </div>
    </div>
    <div className="mt-4 text-xs text-purple-400">
      <code>
        $ cat /var/log/skills.log<br />
        [INFO] Skills continuously updated and expanded through ongoing learning...
      </code>
    </div>
  </div>
);

const ExperienceSection = () => (
  <div>
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <p className="font-bold text-green-400">Job Position</p>
        <p className="text-xs text-purple-400">Month Year - Present</p>
      </div>
      <p className="text-sm italic mb-2">Company Name</p>
      <ul className="list-disc pl-5 text-sm space-y-1">
        <li>Accomplishment or responsibility 1</li>
        <li>Accomplishment or responsibility 2</li>
        <li>Accomplishment or responsibility 3</li>
      </ul>
    </div>
    
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <p className="font-bold text-green-400">Previous Job Position</p>
        <p className="text-xs text-purple-400">Month Year - Month Year</p>
      </div>
      <p className="text-sm italic mb-2">Previous Company Name</p>
      <ul className="list-disc pl-5 text-sm space-y-1">
        <li>Accomplishment or responsibility 1</li>
        <li>Accomplishment or responsibility 2</li>
        <li>Accomplishment or responsibility 3</li>
      </ul>
    </div>

    <div className="p-2 bg-gray-800 border border-purple-700 rounded text-xs">
      <code>
        $ git log --author="Your Name" --pretty=format:"%h - %s" --since="5 years ago"<br />
        <span className="text-yellow-400">fa7ac3d</span> - Implemented major feature at Current Company<br />
        <span className="text-yellow-400">3e5f12c</span> - Completed project ahead of schedule<br />
        <span className="text-yellow-400">bd4f2a1</span> - Led team initiative at Previous Company<br />
      </code>
    </div>
  </div>
);

const EducationSection = () => (
  <div>
    <div className="p-4 bg-gray-800 border border-purple-700 rounded mb-4">
      <p className="font-bold text-green-400">Degree Name</p>
      <p className="text-sm italic">University or School Name</p>
      <p className="text-xs text-purple-400 mt-1">Graduation Year</p>
      <p className="mt-2 text-sm">
        <span className="text-purple-500">Relevant coursework:</span> Course 1, Course 2, Course 3
      </p>
    </div>
    
    <div className="text-xs">
      <code>
        $ whoami | education --details<br />
        <span className="text-green-400">═════════════════════════════════════</span><br />
        <span className="text-purple-400">Education path initialized: {new Date().getFullYear() - 4}</span><br />
        <span className="text-purple-400">Path completed: Graduation Year</span><br />
        <span className="text-purple-400">Learning status: Ongoing</span><br />
        <span className="text-green-400">═════════════════════════════════════</span>
      </code>
    </div>
  </div>
);

const ProjectsSection = () => (
  <div className="space-y-4">
    <div className="p-3 bg-gray-800 border border-purple-700 rounded">
      <div className="flex justify-between mb-1">
        <h3 className="font-bold text-green-400">GopherStrike</h3>
        <a href="https://github.com/TheBitty/GopherStrike" target="_blank" rel="noopener noreferrer" className="text-purple-400 text-xs underline">
          github.com/TheBitty/GopherStrike
        </a>
      </div>
      <p className="text-sm mb-2">
        A developing red team framework written in Go, featuring a port scanner with plans to add OSINT tools, multiple vulnerability scanners, and subdomain enumeration for comprehensive offensive security operations.
      </p>
      <div className="flex flex-wrap gap-1">
        <span className="bg-purple-900 text-xs px-2 py-1 rounded">Go</span>
        <span className="bg-purple-900 text-xs px-2 py-1 rounded">Python</span>
        <span className="bg-purple-900 text-xs px-2 py-1 rounded">Cybersecurity</span>
      </div>
    </div>

    <div className="p-3 bg-gray-800 border border-purple-700 rounded">
      <div className="flex justify-between mb-1">
        <h3 className="font-bold text-green-400">Pythmap</h3>
        <a href="https://github.com/TheBitty/Pythmap" target="_blank" rel="noopener noreferrer" className="text-purple-400 text-xs underline">
          github.com/TheBitty/Pythmap
        </a>
      </div>
      <p className="text-sm mb-2">
        A comprehensive network scanning and analysis tool built in Python that combines nmap, banner grabbing, and logging capabilities for network reconnaissance and security assessment.
      </p>
      <div className="flex flex-wrap gap-1">
        <span className="bg-purple-900 text-xs px-2 py-1 rounded">Python</span>
        <span className="bg-purple-900 text-xs px-2 py-1 rounded">Nmap</span>
        <span className="bg-purple-900 text-xs px-2 py-1 rounded">Network Security</span>
      </div>
    </div>

    <div className="p-3 bg-gray-800 border border-purple-700 rounded">
      <div className="flex justify-between mb-1">
        <h3 className="font-bold text-green-400">BinaryRipper</h3>
        <a href="https://github.com/TheBitty/BinaryRipper" target="_blank" rel="noopener noreferrer" className="text-purple-400 text-xs underline">
          github.com/TheBitty/BinaryRipper
        </a>
      </div>
      <p className="text-sm mb-2">
        A specialized tool for binary analysis and reverse engineering, focused on extracting and examining components from executable files for security research.
      </p>
      <div className="flex flex-wrap gap-1">
        <span className="bg-purple-900 text-xs px-2 py-1 rounded">C++</span>
        <span className="bg-purple-900 text-xs px-2 py-1 rounded">Reverse Engineering</span>
      </div>
    </div>

    <div className="p-3 bg-gray-800 border border-purple-700 rounded">
      <div className="flex justify-between mb-1">
        <h3 className="font-bold text-green-400">BitStrike</h3>
        <a href="https://github.com/TheBitty/BitStrike" target="_blank" rel="noopener noreferrer" className="text-purple-400 text-xs underline">
          github.com/TheBitty/BitStrike
        </a>
      </div>
      <p className="text-sm mb-2">
        Post-exploitation framework designed to complement GopherStrike, providing advanced tools for security professionals during offensive operations.
      </p>
      <div className="flex flex-wrap gap-1">
        <span className="bg-purple-900 text-xs px-2 py-1 rounded">Red Team</span>
        <span className="bg-purple-900 text-xs px-2 py-1 rounded">Security</span>
      </div>
    </div>

    <div className="p-3 bg-gray-800 border border-purple-700 rounded">
      <div className="flex justify-between mb-1">
        <h3 className="font-bold text-green-400">RustCC</h3>
        <a href="https://github.com/TheBitty/RustCC" target="_blank" rel="noopener noreferrer" className="text-purple-400 text-xs underline">
          github.com/TheBitty/RustCC
        </a>
      </div>
      <p className="text-sm mb-2">
        A project exploring Rust programming language capabilities, likely for systems programming or security applications.
      </p>
      <div className="flex flex-wrap gap-1">
        <span className="bg-purple-900 text-xs px-2 py-1 rounded">Rust</span>
        <span className="bg-purple-900 text-xs px-2 py-1 rounded">Systems Programming</span>
      </div>
    </div>

    <div className="p-3 bg-gray-800 border border-purple-700 rounded">
      <div className="flex justify-between mb-1">
        <h3 className="font-bold text-green-400">KairosAlgo</h3>
        <a href="https://github.com/TheBitty/KairosAlgo" target="_blank" rel="noopener noreferrer" className="text-purple-400 text-xs underline">
          github.com/TheBitty/KairosAlgo
        </a>
      </div>
      <p className="text-sm mb-2">
        A collection of algorithms and data structures implementations, likely for educational or performance analysis purposes.
      </p>
      <div className="flex flex-wrap gap-1">
        <span className="bg-purple-900 text-xs px-2 py-1 rounded">Algorithms</span>
        <span className="bg-purple-900 text-xs px-2 py-1 rounded">Data Structures</span>
      </div>
    </div>

    <div className="text-xs text-purple-400">
      <code>
        $ ls -la ~/projects | grep -i "featured"<br />
        <span className="text-green-400">drwxr-xr-x</span> 5 yourname users 4096 Mar 10 2023 GopherStrike<br />
        <span className="text-green-400">drwxr-xr-x</span> 4 yourname users 4096 Jan 15 2023 Pythmap<br />
        <span className="text-green-400">drwxr-xr-x</span> 3 yourname users 4096 Nov 20 2022 BinaryRipper<br />
      </code>
    </div>
  </div>
);

const ContactSection = () => (
  <div>
    <div className="p-4 bg-gray-800 border border-purple-700 rounded mb-4">
      <p className="mb-3 text-sm">Feel free to reach out through any of these channels:</p>
      <div className="space-y-2">
        <div className="flex items-center">
          <span className="text-green-400 w-8">$</span>
          <span className="text-purple-400 w-24">Email:</span>
          <a href="mailto:youremail@example.com" className="text-purple-300 underline">youremail@example.com</a>
        </div>
        <div className="flex items-center">
          <span className="text-green-400 w-8">$</span>
          <span className="text-purple-400 w-24">Phone:</span>
          <span>(123) 456-7890</span>
        </div>
        <div className="flex items-center">
          <span className="text-green-400 w-8">$</span>
          <span className="text-purple-400 w-24">Location:</span>
          <span>City, State</span>
        </div>
        <div className="flex items-center">
          <span className="text-green-400 w-8">$</span>
          <span className="text-purple-400 w-24">LinkedIn:</span>
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-purple-300 underline">linkedin.com/in/yourprofile</a>
        </div>
        <div className="flex items-center">
          <span className="text-green-400 w-8">$</span>
          <span className="text-purple-400 w-24">GitHub:</span>
          <a href="https://github.com/TheBitty" target="_blank" rel="noopener noreferrer" className="text-purple-300 underline">github.com/TheBitty</a>
        </div>
      </div>
    </div>
    
    <div className="text-xs">
      <code>
        $ ./send_message.sh<br />
        <span className="text-green-400">Initializing secure connection...</span><br />
        <span className="text-green-400">Connection established.</span><br />
        <span className="text-purple-400">Ready to receive your message. I'll respond promptly!</span><br />
      </code>
    </div>
  </div>
);

export default TerminalResume; 