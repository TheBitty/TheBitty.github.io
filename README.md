# Terminal Resume

A modern, interactive terminal-style resume built with React and Tailwind CSS. This project transforms a traditional resume into an engaging, command-line interface where visitors can explore different sections using terminal commands.

## Features

- Interactive terminal interface with command support
- Responsive design that works on desktop and mobile
- Terminal commands like `help`, `ls`, `cd`, and `clear`
- Keyboard navigation with arrow keys
- Beautiful terminal-inspired animations and styling
- Project showcase section highlighting your GitHub repositories

## Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/TheBitty/TheBitty.github.io.git
cd TheBitty.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## Building for Production

To build the app for production:

```bash
npm run build
```

The build files will be generated in the `build` directory.

## Customization

### Personal Information

Update your personal information in the component sections:

- Edit `HomeSection` for your name and title
- Update `SummarySection` with your professional summary
- Modify `SkillsSection` to list your skills
- Edit `ExperienceSection` with your work history
- Update `EducationSection` with your educational background
- Customize `ProjectsSection` to showcase your projects
- Update `ContactSection` with your contact information

### Styling

The app uses Tailwind CSS for styling. You can customize the look and feel by:

1. Modifying the color scheme in the `tailwind.config.js` file
2. Updating the styles in the component classes

## Usage

Users can interact with your resume through:

- **Commands**: Type commands like `help`, `ls`, `cd [section]`, `clear`, etc.
- **Arrow keys**: Navigate between sections using the up/down arrow keys
- **Click navigation**: Click on section names in the breadcrumb navigation
- **Tab completion**: Coming soon!

## License

MIT